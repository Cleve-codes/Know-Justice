"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useToast } from "@/hooks/use-toast"

interface User {
  id: string
  name: string
  email: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  signup: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    // Check if user is logged in on app start
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Dummy validation - accept any email/password combo
    if (email && password) {
      const userData = {
        id: "1",
        name: email.split("@")[0].charAt(0).toUpperCase() + email.split("@")[0].slice(1),
        email: email,
      }
      setUser(userData)
      localStorage.setItem("user", JSON.stringify(userData))
      setIsLoading(false)
      toast({ title: "Login Successful", description: `Welcome, ${userData.name}!` })
      return true
    }

    setIsLoading(false)
    toast({ title: "Login Failed", description: "Invalid email or password", variant: "destructive" })
    return false
  }

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Dummy validation
    if (name && email && password) {
      const userData = {
        id: "1",
        name: name,
        email: email,
      }
      setUser(userData)
      localStorage.setItem("user", JSON.stringify(userData))
      setIsLoading(false)
      toast({ title: "Signup Successful", description: `Welcome, ${name}!` })
      return true
    }

    setIsLoading(false)
    toast({ title: "Signup Failed", description: "Failed to create account", variant: "destructive" })
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    toast({ title: "Logged Out", description: "You have been logged out." })
  }

  return <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
