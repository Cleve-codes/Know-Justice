"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/contexts/auth-context"
import { Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"

export default function SignupPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState("")
  const { signup, isLoading, user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (user) {
      router.push("/")
    }
  }, [user, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    const success = await signup(name, email, password)
    if (success) {
      toast({ title: "Signup Successful", description: `Welcome, ${name}!` })
      router.push("/")
    } else {
      setError("Failed to create account")
      toast({ title: "Signup Failed", description: "Failed to create account", variant: "destructive" })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-[#23244a] p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary-700 dark:text-primary-300">Know Freedom</h1>
          <h2 className="mt-6 text-2xl font-bold text-gray-900 dark:text-gray-100">Create account</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">Sign up to get started</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            type="text"
            label="Full Name"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            labelClassName="text-gray-700 dark:text-gray-200 font-medium"
            required
            className="bg-white dark:bg-gray-700 dark:borders-none text-gray-900 dark:text-gray-100"
          />

          <Input
            type="email"
            label="Email Address"
            placeholder="Enter your email"
            labelClassName="text-gray-700 dark:text-gray-200 font-medium"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-white text-gray-900 dark:text-gray-100"
          />

          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              label="Password"
              placeholder="Enter your password"
              labelClassName="text-gray-700 dark:text-gray-200 font-medium"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>

          <div className="relative">
            <Input
              type={showConfirmPassword ? "text" : "password"}
              label="Confirm Password"
              placeholder="Confirm your password"
              labelClassName="text-gray-700 dark:text-gray-200 font-medium"
              
              className="dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-9 text-gray-400 hover:text-gray-600 "
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          <Button type="submit" className="w-full dark:hover:bg-[#43245c]" size="lg" disabled={isLoading}>
            {isLoading ? "Creating account..." : "Create Account"}
          </Button>

          <div className="text-center">
            <span className="text-gray-600 dark:text-primary-300">Already have an account? </span>
            <Link href="/auth/login" className="text-primary-700 hover:text-primary-800 font-medium dark:text-primary-300 hover:dark:text-primary-400">
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
