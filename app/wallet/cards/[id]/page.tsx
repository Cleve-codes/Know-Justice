"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { mockBankCards } from "@/lib/mock-data"
import { maskCardNumber } from "@/lib/utils"
import { ArrowLeft, Trash2 } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
gsap.registerPlugin(useGSAP)

export default function CardDetailPage() {
  const params = useParams()
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [cards, setCards] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("cards")
      if (stored) return JSON.parse(stored)
    }
    return mockBankCards
  })

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("cards")
      if (stored) setCards(JSON.parse(stored))
    }
  }, [])

  // Add type for cards
  const card = cards.find((c: typeof mockBankCards[number]) => c.id === params.id)

  const container = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardDisplayRef = useRef<HTMLDivElement>(null)
  const cardInfoRef = useRef<HTMLDivElement>(null)
  const actionsRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.set([
      headerRef.current,
      cardDisplayRef.current,
      cardInfoRef.current,
      actionsRef.current
    ], { opacity: 0, y: 40 })
    gsap.to([
      headerRef.current,
      cardDisplayRef.current,
      cardInfoRef.current,
      actionsRef.current
    ], {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.15
    })
  }, { dependencies: [], scope: container })

  if (!card) {
    return <div>Card not found</div>
  }

  const handleRemoveCard = () => {
    if (showConfirmation) {
      // Handle card removal logic here
      alert("Card removed successfully!")
      setShowConfirmation(false)
    } else {
      setShowConfirmation(true)
    }
  }

  return (
    <div ref={container} className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div ref={headerRef} className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-4">
        <div className="flex items-center space-x-3">
          <Link href="/wallet/cards">
            <ArrowLeft className="h-6 w-6 text-gray-600 dark:text-gray-300" />
          </Link>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Card Details</h1>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Card Display */}
        <div ref={cardDisplayRef}>
          <Card className="bg-gradient-to-r from-gray-800 to-gray-900 text-white">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-300 text-sm">{card.bankName}</p>
                  </div>
                  <div className="text-right">
                    <div className="w-12 h-8 bg-white bg-opacity-20 rounded flex items-center justify-center">
                      <span className="text-xs font-bold">{card.cardType.toUpperCase()}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xl font-mono tracking-wider">{maskCardNumber(card.cardNumber)}</p>
                </div>

                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-gray-300 text-xs">CARD HOLDER</p>
                    <p className="font-medium">{card.cardHolder}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-300 text-xs">EXPIRES</p>
                    <p className="font-medium">{card.expiryDate}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Card Information */}
        <div ref={cardInfoRef}>
          <Card className="bg-white dark:bg-[#23244a]">
            <CardContent className="p-6 space-y-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-300">Bank Name</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">{card.bankName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-300">Card Holder</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">{card.cardHolder}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-300">Card Number</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">{maskCardNumber(card.cardNumber)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-300">Expiry Date</p>
                <p className="font-medium text-gray-900 dark:text-gray-100  ">{card.expiryDate}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Remove Card Button */}
        <div ref={actionsRef} className="space-y-3">
          <Button
            variant="outline"
            className="w-full border-red-300 text-red-600 hover:bg-red-50 bg-transparent dark:bg-[#23244a] dark:text-red-400 dark:hover:bg-red-900"
            onClick={handleRemoveCard}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            {showConfirmation ? "Confirm Remove Card" : "Remove Card"}
          </Button>

          {showConfirmation && (
            <Button variant="ghost" className="w-full dark:text-gray-100" onClick={() => setShowConfirmation(false)}>
              Cancel
            </Button>
          )}
        </div>

        {/* Recent Transactions for Large Screens */}
        <div className="hidden md:block mt-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Recent Transactions</h2>
          {Array.isArray(card.transactions) && card.transactions.length > 0 ? (
            <div className="space-y-3">
              {card.transactions.map((tx: any) => (
                <Card key={tx.id} className="bg-white dark:bg-[#23244a]">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">{tx.description}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-300">{tx.date}</p>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${tx.type === "credit" ? "text-green-600 dark:text-green-400" : "text-gray-900 dark:text-gray-100"}`}>
                        {tx.type === "credit" ? "+" : "-"}{tx.amount}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-300">No recent transactions for this card.</p>
          )}
        </div>
      </div>
    </div>
  )
}
