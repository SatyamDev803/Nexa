// src/components/DepositModal.tsx
"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { type IntentWithQuote } from "@/types"
import { ArrowRight, CheckCircle, Loader2, Clock, XCircle, Copy } from "lucide-react"

export type DepositStatus = "PLAN" | "SENDING" | "SUBMITTED" | "POLLING" | "SUCCESS" | "ERROR";

interface DepositModalProps {
  intentWithQuote: IntentWithQuote | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  status: DepositStatus;
  txHash: string | null;
}

export function DepositModal({ intentWithQuote, isOpen, onClose, onConfirm, status, txHash }: DepositModalProps) {
  if (!intentWithQuote) return null;

  const { steps, quote } = intentWithQuote;

  const renderStatusContent = () => {
    switch (status) {
      case "SENDING":
        return (
          <div className="text-center space-y-4 p-8">
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
            <h3 className="font-semibold text-lg">Sending Transaction...</h3>
            <p className="text-muted-foreground">Please confirm the transaction in your Sender wallet.</p>
          </div>
        );
      case "SUBMITTED":
      case "POLLING":
        return (
          <div className="text-center space-y-4 p-8">
            <Clock className="h-12 w-12 text-primary mx-auto" />
            <h3 className="font-semibold text-lg">Processing Deposit</h3>
            <p className="text-muted-foreground">Your transaction is being processed on-chain. This can take a few minutes.</p>
            {txHash && (
              <a href={`https://explorer.mainnet.near.org/transactions/${txHash}`} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline break-all">
                View on Explorer: {txHash.slice(0, 10)}...
              </a>
            )}
          </div>
        );
      case "SUCCESS":
        return (
          <div className="text-center space-y-4 p-8">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
            <h3 className="font-semibold text-lg text-green-500">Deposit Successful!</h3>
            <p className="text-muted-foreground">Your funds have been successfully deposited into the pool.</p>
            <Button onClick={onClose} className="w-full">Done</Button>
          </div>
        );
      case "ERROR":
         return (
          <div className="text-center space-y-4 p-8">
            <XCircle className="h-12 w-12 text-red-500 mx-auto" />
            <h3 className="font-semibold text-lg text-red-500">Transaction Failed</h3>
            <p className="text-muted-foreground">Something went wrong. Please try again.</p>
            <Button onClick={onClose} variant="outline" className="w-full">Close</Button>
          </div>
        );
      case "PLAN":
      default:
        return (
          <>
            <DialogDescription className="text-center">Review your deposit plan. You will be asked to confirm in your wallet.</DialogDescription>
            <div className="space-y-4 py-4">
              <div className="p-4 bg-muted rounded-lg space-y-2">
                <h4 className="font-semibold">Execution Plan:</h4>
                <div className="flex items-center justify-center space-x-2 text-sm">
                  {steps.map((step, index) => (
                    <div key={index} className="flex items-center">
                      <span className="capitalize">{step.type}</span>
                      {index < steps.length - 1 && <ArrowRight className="h-4 w-4 mx-2 text-muted-foreground" />}
                    </div>
                  ))}
                </div>
              </div>
              <Separator />
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>You send:</span>
                  <span className="font-semibold">{quote.inputAmount} {intentWithQuote.fromToken}</span>
                </div>
                <div className="flex justify-between">
                  <span>You will receive (approx.):</span>
                  <span className="font-semibold">{quote.outputAmount} {intentWithQuote.toPool.token}</span>
                </div>
                <div className="flex justify-between items-center break-all">
                  <span>Deposit Address:</span>
                  <span className="font-mono text-xs flex items-center gap-2">{quote.depositAddress} <Copy className="h-3 w-3 cursor-pointer" /></span>
                </div>
              </div>
            </div>
            <Button onClick={onConfirm} className="w-full">Confirm & Deposit</Button>
          </>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Confirm Your Deposit</DialogTitle>
        </DialogHeader>
        {renderStatusContent()}
      </DialogContent>
    </Dialog>
  )
}