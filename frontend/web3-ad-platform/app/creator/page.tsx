"use client"

import dynamic from "next/dynamic"
import { CreatorDashboard } from "@/components/CreatorDashboard"
import { useAccount } from "wagmi"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function CreatorPage() {
  const { address, isConnected } = useAccount()
  const router = useRouter()

  useEffect(() => {
    if (!isConnected) {
      router.push("/")
    }
  }, [isConnected, router])

  if (!isConnected || !address) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <CreatorDashboard walletAddress={address} />
    </div>
  )
}