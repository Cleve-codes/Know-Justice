"use client"

import type React from "react"
import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Eye, EyeOff, Check, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

gsap.registerPlugin(useGSAP)

export default function NewPasswordPage() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const passwordRequirements = [
    { text: "At least 8 characters", test: (pwd: string) => pwd.length >= 8 },
    { text: "Contains uppercase letter", test: (pwd: string) => /[A-Z]/.test(pwd) },
    { text: "Contains lowercase letter", test: (pwd: string) => /[a-z]/.test(pwd) },
    { text: "Contains number", test: (pwd: string) => /\d/.test(pwd) },
    { text: "Contains special character", test: (pwd: string) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd) },
  ]

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!password) {
      newErrors.password = "Password is required"
    } else if (!passwordRequirements.every((req) => req.test(password))) {
      newErrors.password = "Password does not meet requirements"
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSuccess(true)
      toast({ title: "Password Changed", description: "Your password has been updated successfully." })
      // Auto redirect after 2 seconds
      setTimeout(() => {
        router.push("/auth/login")
      }, 2000)
    }, 1500)
  }

  const container = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.set([
      headerRef.current,
      formRef.current,
      footerRef.current
    ], { opacity: 0, y: 40 })
    gsap.to([
      headerRef.current,
      formRef.current,
      footerRef.current
    ], {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.15
    })
  }, { dependencies: [], scope: container })

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
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-300">Password Updated!</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-200">Your password has been successfully updated.</p>
          </div>
          <p className="text-sm text-gray-500">Redirecting to login...</p>
        </div>
      </div>
    )
  }

  return (
    <div ref={container} className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-[#23244a] p-8 rounded-xl shadow-lg">
        <div ref={headerRef} className="text-center">
          <Link href="/auth/forgot-password">
            <ArrowLeft className="h-6 w-6 text-gray-600 mx-auto mb-4" />
          </Link>
          <h1 className="text-3xl font-bold text-primary-700 dark:text-primary-300">Know Freedom</h1>
          <h2 className="mt-6 text-2xl font-bold text-gray-900 dark:text-primary-400">Create New Password</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">Your new password must be different from previously used passwords.</p>
        </div>
        <div ref={formRef}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                label="New Password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
                labelClassName="text-gray-700 dark:text-gray-200 font-medium"
                className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
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
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={errors.confirmPassword}
                labelClassName="text-gray-700 dark:text-gray-200 font-medium"
                className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
              <button
                type="button"
                className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            {/* Password Requirements */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Password must contain:</p>
              <div className="space-y-1">
                {passwordRequirements.map((req, index) => {
                  const isValid = req.test(password)
                  return (
                    <div key={index} className="flex items-center space-x-2">
                      {isValid ? <Check className="h-4 w-4 text-green-500" /> : <X className="h-4 w-4 text-gray-300" />}
                      <span className={`text-sm ${isValid ? "text-green-600" : "text-gray-500"}`}>{req.text}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Password"}
            </Button>
          </form>
        </div>
        <div ref={footerRef}>
          {/* ...footer links/buttons if any... */}
        </div>
      </div>
    </div>
  )
}
