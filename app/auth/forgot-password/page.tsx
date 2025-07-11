"use client"

import type React from "react"
import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

gsap.registerPlugin(useGSAP)

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const container = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.set(
      [headerRef.current, formRef.current, footerRef.current],
      { opacity: 0, y: 40 }
    )
    gsap.to(
      [headerRef.current, formRef.current, footerRef.current],
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.15,
      }
    )
  }, { dependencies: [], scope: container })

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email) {
      setError("Email is required")
      return
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address")
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSuccess(true)
      toast({ title: "Password Reset Email Sent", description: `Check your inbox for reset instructions.` })
      // Auto redirect after 2 seconds
      setTimeout(() => {
        router.push("/auth/new-password")
      }, 2000)
    }, 1500)
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center space-y-6 bg-white dark:bg-[#23244a] p-8 rounded-xl shadow-lg">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Check your email</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              We've sent a password reset link to <strong>{email}</strong>
            </p>
          </div>
          <p className="text-sm text-gray-500">Redirecting to password reset...</p>
        </div>
      </div>
    )
  }

  return (
    <div ref={container} className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-[#23244a] p-8 rounded-xl shadow-lg">
        <div ref={headerRef} className="text-center">
          <Link href="/auth/login">
            <ArrowLeft className="h-6 w-6 text-gray-600 mx-auto mb-4" />
          </Link>
          <h1 className="text-3xl font-bold text-primary-700 dark:text-primary-300">Know Freedom</h1>
          <h2 className="mt-6 text-2xl font-bold text-gray-900 dark:text-primary-200">Forgot Password?</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>
        <div ref={formRef}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              type="email"
              label="Email Address"
              placeholder="Enter your email"
              labelClassName="text-gray-700 dark:text-gray-200 font-medium"
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={error}
            />

            <Button type="submit" className="w-full dark:hover:bg-[#43245c]" size="lg" disabled={isLoading}>
              {isLoading ? "Sending..." : "Send Reset Link"}
            </Button>

            <div className="text-center">
              <Link href="/auth/login" className="text-primary-700 hover:text-primary-800 dark:text-primary-300 dark:hover:underline text-sm">
                Back to Login
              </Link>
            </div>
          </form>
        </div>
        <div ref={footerRef}>
          {/* ...footer links/buttons if any... */}
        </div>
      </div>
    </div>
  )
}
