"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { mockBankCards } from "@/lib/mock-data"
import { maskCardNumber } from "@/lib/utils"
import { useAuth } from "@/contexts/auth-context"
import { ArrowLeft, Plus, CreditCard } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState, useRef } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(useGSAP)

export default function BankCardsPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [showAddCard, setShowAddCard] = useState(false)
  const [cards, setCards] = useState([...mockBankCards])
  const [newCard, setNewCard] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    bankName: "",
    cardType: "visa" as "visa" | "mastercard" | "amex"
  })

  const container = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const actionsRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.set([
      headerRef.current,
      cardsRef.current,
      actionsRef.current
    ], { opacity: 0, y: 40 })
    gsap.to([
      headerRef.current,
      cardsRef.current,
      actionsRef.current
    ], {
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

  // Load cards from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("cards")
    if (stored) {
      setCards(JSON.parse(stored))
    }
  }, [])

  // Save cards to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("cards", JSON.stringify(cards))
  }, [cards])

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCard.cardNumber || !newCard.cardHolder || !newCard.expiryDate || !newCard.bankName) return
    setCards([
      {
        ...newCard,
        id: (Date.now()).toString(), // Use timestamp for unique id
        cardType: newCard.cardType as "visa" | "mastercard" | "amex"
      },
      ...cards
    ])
    setNewCard({ cardNumber: "", cardHolder: "", expiryDate: "", bankName: "", cardType: "visa" })
    setShowAddCard(false)
    toast({
      title: "Card Added",
      description: `Card for '${newCard.cardHolder}' was added successfully!`
    })
  }

  // Card removal handler
  const handleRemoveCard = (id: string) => {
    setCards(cards.filter(card => card.id !== id))
    toast({
      title: "Card Removed",
      description: `Card was removed successfully!`
    })
  }

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

  const getCardIcon = (cardType: string) => {
    switch (cardType) {
      case "visa":
        return (
          <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
            VISA
          </div>
        )
      case "mastercard":
        return (
          <div className="w-8 h-5 bg-red-600 rounded text-white text-xs flex items-center justify-center font-bold">
            MC
          </div>
        )
      case "amex":
        return (
          <div className="w-8 h-5 bg-green-600 rounded text-white text-xs flex items-center justify-center font-bold">
            AMEX
          </div>
        )
      default:
        return <CreditCard className="h-5 w-5 text-gray-400" />
    }
  }

  return (
    <div ref={container} className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div ref={headerRef} className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-4 flex items-center space-x-3">
        <Link href="/">
          <ArrowLeft className="h-6 w-6 text-gray-600 dark:text-gray-300" />
        </Link>
        <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">My Cards</h1>
      </div>
      <div className="px-4 py-6 space-y-6">
        {/* Cards List */}
        <div ref={cardsRef} className="space-y-4">
          {cards.map((card) => (
            <Card
              key={card.id}
              className="hover:shadow-md transition-shadow cursor-pointer group relative bg-white dark:bg-[#23244a] hover:bg-gray-100 dark:hover:bg-[#2B2C54]"
            >
              <CardContent className="p-4 flex items-center">
                <div className="flex items-center space-x-4 flex-1" onClick={() => router.push(`/wallet/cards/${card.id}`)}>
                  <div className="flex-shrink-0">{getCardIcon(card.cardType)}</div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-[#2B2C54] dark:group-hover:text-white">{maskCardNumber(card.cardNumber)}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-300 group-hover:text-[#2B2C54] dark:group-hover:text-white">
                      {card.bankName} • Expires {card.expiryDate}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400 group-hover:text-[#2B2C54] dark:group-hover:text-white">{" >"}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={e => { e.stopPropagation(); handleRemoveCard(card.id) }}
                  title="Remove Card"
                >
                  <span className="sr-only">Remove</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-red-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        {/* Add Card Button - Responsive */}
        <div ref={actionsRef} className="flex justify-end mt-6">
          <Dialog open={showAddCard} onOpenChange={setShowAddCard}>
            <DialogTrigger asChild>
              {/* Responsive single button: text on md+, icon on mobile */}
              <Button
                size="lg"
                className="flex items-center justify-center rounded-lg shadow-lg font-semibold text-lg bg-white dark:bg-[#23244a] text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 px-6 py-4 md:rounded-xl md:text-lg md:px-6 md:py-4"
              >
                <Plus className="h-8 w-8 md:h-6 md:w-6 md:mr-2" />
                <span className="hidden md:inline">Add Card</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Card</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddCard} className="space-y-4">
                <Input
                  label="Card Number"
                  value={newCard.cardNumber}
                  onChange={e => setNewCard({ ...newCard, cardNumber: e.target.value })}
                  required
                  labelClassName="text-gray-700 dark:text-gray-200 font-medium"
                  className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
                <Input
                  label="Card Holder"
                  value={newCard.cardHolder}
                  onChange={e => setNewCard({ ...newCard, cardHolder: e.target.value })}
                  required
                  labelClassName="text-gray-700 dark:text-gray-200 font-medium"
                  className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
                <Input
                  label="Expiry Date"
                  placeholder="MM/YY"
                  value={newCard.expiryDate}
                  onChange={e => setNewCard({ ...newCard, expiryDate: e.target.value })}
                  required
                  labelClassName="text-gray-700 dark:text-gray-200 font-medium"
                  className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
                <Input
                  label="Bank Name"
                  value={newCard.bankName}
                  onChange={e => setNewCard({ ...newCard, bankName: e.target.value })}
                  required
                  labelClassName="text-gray-700 dark:text-gray-200 font-medium"
                  className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Card Type</label>
                  <select
                    className="w-full mt-1 border rounded p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    value={newCard.cardType}
                    onChange={e => setNewCard({ ...newCard, cardType: e.target.value as any })}
                  >
                    <option value="visa">Visa</option>
                    <option value="mastercard">Mastercard</option>
                    <option value="amex">Amex</option>
                  </select>
                </div>
                <DialogFooter>
                  <Button type="submit">Add Card</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}
