"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"
import { mockTransactions, mockBankCards } from "@/lib/mock-data"
import { useAuth } from "@/contexts/auth-context"
import { ArrowLeft, Plus, Send, TrendingUp, LogOut } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState, useRef } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { ThemeToggle } from "@/components/theme-provider"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(useGSAP)

export default function WalletOverview() {
  const { user, logout, isLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [showAddPayment, setShowAddPayment] = useState(false)
  const [wallets, setWallets] = useState([
    { id: 1, name: "Main Wallet", balance: 2847.5, rewards: 125.75 }
  ])
  const [paymentAmount, setPaymentAmount] = useState("")
  const [paymentDesc, setPaymentDesc] = useState("")
  const [paymentCard, setPaymentCard] = useState("")
  const [transactions, setTransactions] = useState([...mockTransactions])
  const container = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const walletsRef = useRef<HTMLDivElement>(null)
  const actionsRef = useRef<HTMLDivElement>(null)
  const transactionsRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const elements = [
      headerRef.current,
      walletsRef.current,
      actionsRef.current,
      transactionsRef.current
    ].filter(Boolean)
    gsap.set(elements, { opacity: 0, y: 40 })
    gsap.to(elements, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.15
    })
  }, { dependencies: [], scope: container })

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-700 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const handleLogout = () => {
    logout()
    router.push("/auth/login")
  }

  const handleAddPayment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!paymentAmount || !paymentDesc || !paymentCard) return
    const newTransaction = {
      id: (transactions.length + 1).toString(),
      type: "debit" as const,
      amount: Number(paymentAmount),
      description: paymentDesc,
      date: new Date().toISOString().slice(0, 10),
      category: "Payment"
    }
    setTransactions([newTransaction, ...transactions])
    toast({
      title: "Payment Added",
      description: `Payment of ${formatCurrency(Number(paymentAmount))} for '${paymentDesc}' was added!`
    })
    setShowAddPayment(false)
    setPaymentAmount("")
    setPaymentDesc("")
    setPaymentCard("")
  }

  // Simulate Pay button
  const handlePay = () => {
    toast({
      title: "Pay Feature",
      description: "This would open a payment flow in a real app."
    })
  }

  return (
    <div ref={container} className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div ref={headerRef} className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <ArrowLeft className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            <div>
              <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">My Wallet</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Welcome back, {user.name}!</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            {/* Desktop: Cards button */}
            <Link href="/wallet/cards" className="hidden md:inline-block hover:text-gray-700">
              <Button variant="ghost" size="sm">
                Cards
              </Button>
            </Link>
            {/* Mobile: Icon button with tooltip */}
            <Link href="/wallet/cards" className="md:hidden relative group">
              <Button variant="ghost" size="sm" className="p-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                  <rect x="3" y="7" width="18" height="10" rx="2" className="fill-current text-gray-400 dark:text-gray-200" />
                  <rect x="7" y="13" width="4" height="2" rx="1" className="fill-current text-gray-200 dark:text-gray-400" />
                </svg>
              </Button>
              <span className="absolute left-1/2 -translate-x-1/2 mt-2 z-10 whitespace-nowrap rounded bg-gray-900 text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                View All Cards
              </span>
            </Link>
            <Button variant="ghost" size="sm" className="hover:text-gray-700" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Wallets List */}
        <div ref={walletsRef} className="space-y-4">
          {wallets.map((wallet) => (
            <Card key={wallet.id} className="bg-gradient-to-r from-primary-700 to-primary-800 text-white">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-primary-200 text-sm">{wallet.name} Balance</p>
                    <p className="text-3xl font-bold">{formatCurrency(wallet.balance)}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-primary-200" />
                    <span className="text-sm text-primary-100">Rewards: {formatCurrency(wallet.rewards)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Action Buttons */}
        <div ref={actionsRef} className="grid grid-cols-2 gap-4">
          <Dialog open={showAddPayment} onOpenChange={setShowAddPayment}>
            <DialogTrigger asChild>
              <Button size="lg" className="h-14">
                <Plus className="h-5 w-5 mr-2" />
                Add Payment
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Payment</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddPayment} className="space-y-4">
                <Input
                  label="Amount"
                  type="number"
                  value={paymentAmount}
                  onChange={e => setPaymentAmount(e.target.value)}
                  required
                  labelClassName="text-gray-700 dark:text-gray-200 font-medium"
                  className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
                <Input
                  label="Description"
                  value={paymentDesc}
                  onChange={e => setPaymentDesc(e.target.value)}
                  required
                  labelClassName="text-gray-700 dark:text-gray-200 font-medium"
                  className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Card</label>
                  <select
                    className="w-full mt-1 border rounded p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    value={paymentCard}
                    onChange={e => setPaymentCard(e.target.value)}
                    required
                  >
                    <option value="">Select Card</option>
                    {mockBankCards.map(card => (
                      <option key={card.id} value={card.id}>
                        {card.cardHolder} - {card.cardNumber.slice(-4)}
                      </option>
                    ))}
                  </select>
                </div>
                <DialogFooter>
                  <Button type="submit">Add Payment</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          <Button size="lg" variant="outline" className="h-14 bg-transparent hover:text-gray-700"  onClick={handlePay}>
            <Send className="h-5 w-5 mr-2" />
            Pay
          </Button>
        </div>

        {/* Recent Transactions */}
        <div ref={transactionsRef} className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Recent Transactions</h2>
          <div className="space-y-3">
            {transactions.map((transaction, idx) => (
              <Card
                key={transaction.id}
                className="hover:shadow-md transition-shadow cursor-pointer bg-white dark:bg-[#23244a] hover:bg-gray-100 dark:hover:bg-[#2B2C54] group"
                onClick={() => {
                  const cardId = mockBankCards[idx % mockBankCards.length]?.id
                  if (cardId) router.push(`/wallet/cards/${cardId}`)
                }}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-[#2B2C54] dark:group-hover:text-white">
                        {transaction.description}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-300 group-hover:text-[#2B2C54] dark:group-hover:text-white">
                        {transaction.category} • {transaction.date}
                      </p>
                    </div>
                    <div className="text-right">
                      <p
                        className={`font-semibold ${
                          transaction.type === "credit"
                            ? "text-green-600 dark:text-green-400 group-hover:text-[#2B2C54] dark:group-hover:text-white"
                            : "text-gray-900 dark:text-gray-100 group-hover:text-[#2B2C54] dark:group-hover:text-white"
                        }`}
                      >
                        {transaction.type === "credit" ? "+" : "-"}
                        {formatCurrency(transaction.amount)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  )
}
