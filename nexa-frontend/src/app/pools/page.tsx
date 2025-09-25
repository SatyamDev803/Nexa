"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Header } from "@/components/Header"
import { PoolFilters } from "@/components/pool-filters"
import { YieldResultsTable } from "@/components/YieldResultsTable"
import { WinnerPoolCard } from "@/components/WinnerPoolCard"
import { DepositModal, type DepositStatus } from "@/components/deposit-modal"
import { getRankedPools, createIntent, submitTransaction, getTransactionStatus } from "@/lib/api"
import { type RankResponse, type RankedPool, type IntentWithQuote } from "@/types"
import { useWallet } from "@/components/providers/AppProviders"
import { toast } from "sonner"
import { utils } from "near-api-js"
import { Separator } from "@/components/ui/separator"
import { Loader2 } from "lucide-react"

export default function PoolsPage() {
  const [amount, setAmount] = useState("1000")
  const [sourceToken, setSourceToken] = useState("NEAR");
  const [destinationToken, setDestinationToken] = useState("USDC")
  const [selectedChains, setSelectedChains] = useState<string[]>([])
  
  const [poolsResponse, setPoolsResponse] = useState<RankResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { accountId, selector } = useWallet()
  const isInitialMount = useRef(true);

  const [intentWithQuote, setIntentWithQuote] = useState<IntentWithQuote | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [depositStatus, setDepositStatus] = useState<DepositStatus>("PLAN");
  const [txHash, setTxHash] = useState<string | null>(null);

  const handleSearch = useCallback(async () => {
    setIsLoading(true)
    setPoolsResponse(null)
    try {
      const response = await getRankedPools({ 
        amount: Number(amount),
        token: destinationToken,
        chains: selectedChains,
      })
      setPoolsResponse(response)
      if (response.top.length === 0) {
        toast.info("No pools found for the selected filters.")
      }
    } catch (error) {
      console.error("Failed to fetch pools:", error)
      toast.error("Failed to fetch pools. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }, [amount, destinationToken, selectedChains]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    handleSearch();
  }, [handleSearch]);

  const handleDeposit = async (pool: RankedPool) => {
    if (!accountId) {
      toast.error("Please connect your wallet to deposit.");
      return;
    }
    setIntentWithQuote(null);
    setTxHash(null);
    setDepositStatus("PLAN");
    setIsModalOpen(true);
    
    try {
      const intentResponse = await createIntent({
        user: accountId,
        amount: amount,
        fromToken: sourceToken,
        fromChain: "near",
        winner: pool,
      });
      setIntentWithQuote(intentResponse);
    } catch {
      toast.error("Failed to create deposit plan.");
      setIsModalOpen(false);
    }
  };

  const executeTransaction = async () => {
    if (!selector || !accountId || !intentWithQuote) return;
    
    setDepositStatus("SENDING");
    try {
      const wallet = await selector.wallet();
      const amountInYocto = utils.format.parseNearAmount(intentWithQuote.quote.inputAmount);
      
      const result = await wallet.signAndSendTransaction({
        signerId: accountId,
        receiverId: intentWithQuote.quote.depositAddress,
        actions: [{
          type: "Transfer",
          params: { deposit: amountInYocto! }
        }]
      });

      if (!result) {
        throw new Error("Transaction failed or was cancelled.");
      }

      const hash = typeof result === 'string' ? result : result.transaction.hash;
      setTxHash(hash);
      setDepositStatus("SUBMITTED");
      await submitTransaction({ intent: intentWithQuote, txHash: hash });
      pollStatus();

    } catch (error) {
      console.error("Transaction Error:", error);
      const errorMessage = (error as Error).message;
      if (!errorMessage.includes("User rejected")) {
        toast.error("Transaction failed.");
      }
      setDepositStatus("PLAN");
    }
  };

  const pollStatus = useCallback(() => {
    setDepositStatus("POLLING");
    const intervalId = setInterval(async () => {
      try {
        if (!intentWithQuote) {
          clearInterval(intervalId);
          return;
        }
        const res = await getTransactionStatus(intentWithQuote.quote.depositAddress);
        if (res.status === "SUCCESS" || res.status === "REFUNDED") {
          clearInterval(intervalId);
          setDepositStatus(res.status === "SUCCESS" ? "SUCCESS" : "ERROR");
          toast.success("Deposit completed successfully!");
        }
      } catch (_error) {
        console.error("Polling failed:", _error);
        clearInterval(intervalId);
        setDepositStatus("ERROR");
      }
    }, 5000);
  }, [intentWithQuote]);
  
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Yield Pools</h1>
          <p className="text-muted-foreground">
            Discover high-yield opportunities across DeFi protocols with automated strategies.
          </p>
        </div>

        <PoolFilters 
          amount={amount}
          setAmount={setAmount}
          sourceToken={sourceToken}
          setSourceToken={setSourceToken}
          destinationToken={destinationToken}
          setDestinationToken={setDestinationToken}
          selectedChains={selectedChains}
          setSelectedChains={setSelectedChains}
          onSearch={handleSearch}
          isLoading={isLoading}
        />
        
        {isLoading && (
          <div className="flex flex-col items-center justify-center text-center p-12">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Fetching the best pools for you...</p>
          </div>
        )}

        {poolsResponse && !isLoading && (
          <div className="space-y-8 mt-8">
            {poolsResponse.winnerOverall && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Overall Best Pool</h2>
                <div className="max-w-md">
                  <WinnerPoolCard 
                    title="Top Pick"
                    pool={poolsResponse.winnerOverall}
                    onDeposit={handleDeposit}
                    isOverallWinner={true}
                  />
                </div>
              </div>
            )}

            {poolsResponse.winnersByChain.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Best by Chain</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {poolsResponse.winnersByChain.map(({ chain, pool }) => (
                    <WinnerPoolCard 
                      key={chain}
                      title={`Best on ${chain}`}
                      pool={pool}
                      onDeposit={handleDeposit}
                    />
                  ))}
                </div>
              </div>
            )}
            
            <Separator />

            <div>
              <h2 className="text-2xl font-bold mb-4">All Pools</h2>
              <YieldResultsTable data={poolsResponse.top} onDeposit={handleDeposit} />
            </div>
          </div>
        )}
      </main>
      <DepositModal 
        isOpen={isModalOpen}
        onClose={closeModal}
        intentWithQuote={intentWithQuote}
        onConfirm={executeTransaction}
        status={depositStatus}
        txHash={txHash}
      />
    </div>
  );
}