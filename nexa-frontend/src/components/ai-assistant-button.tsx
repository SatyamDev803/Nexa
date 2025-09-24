"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { MessageCircle, X, Send, Sparkles, TrendingUp, Loader2 } from "lucide-react"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
  suggestions?: string[]
  poolRecommendation?: {
    name: string
    apy: string
    risk: string
    reason: string
  }
}

const quickSuggestions = [
  "I have $1000 USDC, where should I invest?",
  "What are the best low-risk pools?",
  "How can I maximize my yields?",
  "Show me trending strategies",
]

const sampleResponses = {
  "I have $1000 USDC, where should I invest?": {
    content:
      "Based on your $1000 USDC, I recommend the Stable Yield Pool. It offers 18.4% APY with low risk, perfect for conservative investors. The pool has $15.2M TVL and uses automated rebalancing across USDC, USDT, and DAI.",
    poolRecommendation: {
      name: "Stable Yield Pool",
      apy: "18.4%",
      risk: "Low",
      reason: "Optimal for your risk profile and amount",
    },
  },
  "What are the best low-risk pools?": {
    content:
      "For low-risk investments, I recommend: 1) Stable Yield Pool (18.4% APY) - Multi-stablecoin strategy, 2) rsweETH Harvest (17.92% APY) - Ethereum staking with compound rewards. Both have excellent safety records and consistent returns.",
    suggestions: ["Tell me more about Stable Yield Pool", "How does rsweETH Harvest work?", "Compare these pools"],
  },
  "How can I maximize my yields?": {
    content:
      "To maximize yields: 1) Enable compound rewards (+23% returns), 2) Consider higher APY pools like sUSDe Bull (31.97%), 3) Diversify across 3-4 pools, 4) Stake governance tokens for bonus multipliers. Your current portfolio could earn an additional $1,200/year with optimization.",
    suggestions: ["Enable compound rewards", "Show me high-yield pools", "Optimize my portfolio"],
  },
  "Show me trending strategies": {
    content:
      "Trending strategies this week: 1) Bullish BTC - Leveraged Bitcoin positions (27.9% APY), 2) Trending ETH - Ethereum liquid staking (21.65% APY), 3) Synthetic USD strategies (31.97% APY). These are capturing current market momentum.",
    suggestions: ["Explain Bullish BTC strategy", "How risky are these strategies?", "Show me entry points"],
  },
}

export function AIAssistantButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content:
        "Hi! I'm your DeFi assistant. I can help you find the best investment opportunities based on your goals and risk tolerance. What would you like to know?",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (message: string = inputMessage) => {
    if (!message.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: message,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate AI response delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const response = sampleResponses[message as keyof typeof sampleResponses] || {
      content:
        "I understand you're looking for investment advice. Let me analyze the current market conditions and your portfolio to provide personalized recommendations. Based on current trends, I suggest exploring our high-yield pools with automated risk management.",
      suggestions: ["Show me high-yield pools", "Analyze my portfolio", "What's trending now?"],
    }

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: "assistant",
      content: response.content,
      timestamp: new Date(),
      suggestions: response.suggestions,
      poolRecommendation: response.poolRecommendation,
    }

    setMessages((prev) => [...prev, assistantMessage])
    setIsTyping(false)
  }

  const handleQuickSuggestion = (suggestion: string) => {
    handleSendMessage(suggestion)
  }

  return (
    <>
      {/* Floating Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-40 bg-primary hover:bg-primary/90"
        size="icon"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>

      {/* Chat Panel */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-96 h-[500px] shadow-xl z-40 flex flex-col">
          <CardHeader className="pb-3 border-b border-border/40">
            <CardTitle className="text-lg flex items-center gap-2">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-primary" />
              </div>
              AI Investment Assistant
              <Badge variant="secondary" className="ml-auto bg-green-500/10 text-green-500 border-green-500/20">
                Online
              </Badge>
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] ${message.type === "user" ? "order-2" : "order-1"}`}>
                    <div
                      className={`p-3 rounded-lg ${
                        message.type === "user" ? "bg-primary text-primary-foreground ml-2" : "bg-muted mr-2"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>

                    {/* Pool Recommendation */}
                    {message.poolRecommendation && (
                      <Card className="mt-2 mr-2 bg-primary/5 border-primary/20">
                        <CardContent className="p-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-sm">{message.poolRecommendation.name}</span>
                            <Badge variant="outline" className="text-primary border-primary/20">
                              {message.poolRecommendation.apy}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="text-xs">
                              {message.poolRecommendation.risk} Risk
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mb-3">{message.poolRecommendation.reason}</p>
                          <Button size="sm" className="w-full">
                            <TrendingUp className="mr-2 h-3 w-3" />
                            Deposit Now
                          </Button>
                        </CardContent>
                      </Card>
                    )}

                    {/* Suggestions */}
                    {message.suggestions && (
                      <div className="mt-2 mr-2 space-y-1">
                        {message.suggestions.map((suggestion, index) => (
                          <Button
                            key={index}
                            variant="ghost"
                            size="sm"
                            onClick={() => handleQuickSuggestion(suggestion)}
                            className="w-full justify-start text-xs h-auto p-2 bg-muted/50 hover:bg-muted"
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    )}

                    <div className="text-xs text-muted-foreground mt-1 px-1">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-muted p-3 rounded-lg mr-2 flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm text-muted-foreground">AI is thinking...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions */}
            {messages.length === 1 && (
              <>
                <Separator />
                <div className="p-4">
                  <div className="text-xs text-muted-foreground mb-2">Quick suggestions:</div>
                  <div className="grid grid-cols-1 gap-2">
                    {quickSuggestions.map((suggestion, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        size="sm"
                        onClick={() => handleQuickSuggestion(suggestion)}
                        className="justify-start text-xs h-auto p-2 bg-muted/30 hover:bg-muted"
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Input Area */}
            <div className="border-t border-border/40 p-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Ask about investments, pools, or strategies..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
                  className="flex-1 text-sm"
                  disabled={isTyping}
                />
                <Button onClick={() => handleSendMessage()} size="sm" disabled={!inputMessage.trim() || isTyping}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-xs text-muted-foreground mt-2 text-center">
                AI responses are for informational purposes only
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  )
}
