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

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const { login, isLoading, user } = useAuth()
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

    if (!email || !password) {
      setError("Please fill in all fields")
      return
    }

    const success = await login(email, password)
    if (success) {
      toast({ title: "Login Successful", description: `Welcome back!` })
      router.push("/")
    } else {
      setError("Invalid email or password")
      toast({ title: "Login Failed", description: "Invalid email or password", variant: "destructive" })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-[#23244a] p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary-700 dark:text-primary-300">Know Freedom</h1>
          <h2 className="mt-6 text-2xl font-bold text-gray-900 dark:text-gray-100">Welcome back</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            type="email"
            label="Email Address"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            labelClassName="text-gray-700 dark:text-gray-200 font-medium"
          />

          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              labelClassName="text-gray-700 dark:text-gray-200 font-medium"
            />
            <button
              type="button"
              className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          <div className="flex items-center justify-between">
            <Link href="/auth/forgot-password" className="text-sm text-primary-700 hover:text-primary-800 dark:text-primary-300 hover:dark:text-primary-400 dark:hover:text-secondary-400">
              Forgot password?
            </Link>
          </div>

          <Button type="submit" className="w-full dark:hover:bg-[#43245c]" size="lg" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>

          <div className="text-center">
            <span className="text-gray-600 dark:text-primary-300">Don't have an account? </span>
            <Link href="/auth/signup" className="text-primary-700 hover:text-primary-800 font-medium dark:text-primary-300 dark:hover:text-primary-400 dark:hover:text-primary-400 hover:underline">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
