// src/components/deposit-modal.tsx
"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner" // <-- IMPORT FROM SONNER
import {
  ArrowRight,
  Wallet,
  TrendingUp,
  Shield,
  AlertTriangle,
  Info,
  CheckCircle,
  Loader2,
  ExternalLink,
} from "lucide-react"

// ... (interface Pool and getRiskIcon function remain the same)
interface Pool {
  id: string
  name: string
  tokens: string[]
  apy: string
  tvl: string
  risk: "Low" | "Medium" | "High"
  strategy: string
  description: string
  minDeposit: string
  lockPeriod?: string
}

interface DepositModalProps {
  pool: Pool | null
  isOpen: boolean
  onClose: () => void
}

type TransactionStep = "input" | "review" | "processing" | "success" | "error"

const getRiskIcon = (risk: string) => {
  switch (risk) {
    case "Low":
      return <Shield className="h-4 w-4 text-green-500" />
    case "Medium":
      return <Info className="h-4 w-4 text-yellow-500" />
    case "High":
      return <AlertTriangle className="h-4 w-4 text-red-500" />
    default:
      return <Info className="h-4 w-4" />
  }
}


export function DepositModal({ pool, isOpen, onClose }: DepositModalProps) {
  const [amount, setAmount] = useState("")
  const [step, setStep] = useState<TransactionStep>("input")
  const [progress, setProgress] = useState(0)
  const [txHash, setTxHash] = useState("")
  // const { toast } = useToast() // <-- REMOVE OLD HOOK

  // ... (rest of the component logic is the same until the handleConfirm function)
  const walletBalance = "5,247.83"
  const tokenSymbol = pool?.tokens[0] || "USDC"

  useEffect(() => {
    if (isOpen) {
      setAmount("")
      setStep("input")
      setProgress(0)
      setTxHash("")
    }
  }, [isOpen])

  const calculateProjectedEarnings = () => {
    if (!amount || !pool) return "0.00"
    const principal = Number.parseFloat(amount)
    const apy = Number.parseFloat(pool.apy) / 100
    const monthlyReturn = (principal * apy) / 12
    return monthlyReturn.toFixed(2)
  }

  const handleMaxClick = () => {
    setAmount(walletBalance.replace(",", ""))
  }

  const handleDeposit = async () => {
    if (!amount || !pool) return
    setStep("review")
  }


  const handleConfirm = async () => {
    setStep("processing")
    setProgress(0)

    const progressSteps = [
      { progress: 25, message: "Preparing transaction..." },
      { progress: 50, message: "Waiting for confirmation..." },
      { progress: 75, message: "Processing on blockchain..." },
      { progress: 100, message: "Transaction confirmed!" },
    ]

    for (const progressStep of progressSteps) {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setProgress(progressStep.progress)
    }

    const isSuccess = Math.random() > 0.2

    if (isSuccess) {
      setTxHash("0x1234567890abcdef1234567890abcdef12345678")
      setStep("success")
      // USE NEW TOAST FUNCTION
      toast.success("Deposit Successful!", {
        description: `Successfully deposited ${amount} ${tokenSymbol} to ${pool?.name}`,
      })
    } else {
      setStep("error")
      // USE NEW TOAST FUNCTION
      toast.error("Transaction Failed", {
        description: "Please try again or contact support if the issue persists.",
      })
    }
  }

  const handleClose = () => {
    setStep("input")
    onClose()
  }

  if (!pool) return null
  
  // ... (JSX is the same, no changes needed there)
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {step === "success" ? (
              <>
                <CheckCircle className="h-5 w-5 text-green-500" />
                Deposit Successful
              </>
            ) : step === "error" ? (
              <>
                <AlertTriangle className="h-5 w-5 text-red-500" />
                Transaction Failed
              </>
            ) : (
              <>
                <TrendingUp className="h-5 w-5 text-primary" />
                Deposit to {pool.name}
              </>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Card className="bg-muted/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{pool.name}</span>
                <Badge variant="outline" className="text-primary border-primary/20">
                  {pool.apy} APY
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                {getRiskIcon(pool.risk)}
                <span>{pool.risk} Risk</span>
                <span>•</span>
                <span>{pool.strategy}</span>
              </div>
            </CardContent>
          </Card>

          {step === "input" && (
            <>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Deposit Amount</label>
                  <div className="text-sm text-muted-foreground">
                    Balance: {walletBalance} {tokenSymbol}
                  </div>
                </div>
                <div className="relative">
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="pr-16 text-lg"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={handleMaxClick} className="h-6 px-2 text-xs">
                      MAX
                    </Button>
                    <span className="text-sm text-muted-foreground">{tokenSymbol}</span>
                  </div>
                </div>
              </div>

              {amount && (
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Projected Monthly Earnings</span>
                        <span className="font-medium text-primary">
                          +${calculateProjectedEarnings()} {tokenSymbol}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Annual Projected Return</span>
                        <span className="font-medium">
                          +${(Number.parseFloat(calculateProjectedEarnings()) * 12).toFixed(2)} {tokenSymbol}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="space-y-2 text-xs text-muted-foreground">
                <div className="flex justify-between">
                  <span>Minimum Deposit:</span>
                  <span>{pool.minDeposit}</span>
                </div>
                {pool.lockPeriod && (
                  <div className="flex justify-between">
                    <span>Lock Period:</span>
                    <span>{pool.lockPeriod}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Network Fee:</span>
                  <span>~$2.50</span>
                </div>
              </div>

              <Button onClick={handleDeposit} className="w-full" disabled={!amount || Number.parseFloat(amount) <= 0}>
                Review Deposit
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </>
          )}

          {step === "review" && (
            <>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {amount} {tokenSymbol}
                  </div>
                  <div className="text-sm text-muted-foreground">Deposit Amount</div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Pool</span>
                    <span className="text-sm font-medium">{pool.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Expected APY</span>
                    <span className="text-sm font-medium text-primary">{pool.apy}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Monthly Earnings</span>
                    <span className="text-sm font-medium">
                      ~${calculateProjectedEarnings()} {tokenSymbol}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Network Fee</span>
                    <span className="text-sm font-medium">~$2.50</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between font-medium">
                  <span>Total Cost</span>
                  <span>${(Number.parseFloat(amount) + 2.5).toFixed(2)}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep("input")} className="flex-1">
                  Back
                </Button>
                <Button onClick={handleConfirm} className="flex-1">
                  <Wallet className="mr-2 h-4 w-4" />
                  Confirm Deposit
                </Button>
              </div>
            </>
          )}

          {step === "processing" && (
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
              </div>
              <div>
                <div className="font-medium mb-2">Processing Transaction</div>
                <div className="text-sm text-muted-foreground mb-4">
                  Please don&apos;t close this window while we process your deposit.
                </div>
                <Progress value={progress} className="w-full" />
                <div className="text-xs text-muted-foreground mt-2">{progress}% Complete</div>
              </div>
            </div>
          )}

          {step === "success" && (
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <CheckCircle className="h-12 w-12 text-green-500" />
              </div>
              <div>
                <div className="font-medium mb-2">Deposit Successful!</div>
                <div className="text-sm text-muted-foreground mb-4">
                  Your {amount} {tokenSymbol} has been deposited to {pool.name}
                </div>
                {txHash && (
                  <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <span>Transaction:</span>
                    <Button variant="ghost" size="sm" className="h-auto p-0 text-xs">
                      {txHash.slice(0, 10)}...{txHash.slice(-8)}
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                )}
              </div>
              <Button onClick={handleClose} className="w-full">
                Done
              </Button>
            </div>
          )}

          {step === "error" && (
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <AlertTriangle className="h-12 w-12 text-red-500" />
              </div>
              <div>
                <div className="font-medium mb-2">Transaction Failed</div>
                <div className="text-sm text-muted-foreground mb-4">
                  Your transaction could not be processed. Please try again.
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={handleClose} className="flex-1 bg-transparent">
                  Cancel
                </Button>
                <Button onClick={() => setStep("input")} className="flex-1">
                  Try Again
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}