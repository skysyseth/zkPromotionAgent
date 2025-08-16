"use client"

import dynamic from "next/dynamic"
import { AdvertiserDashboard } from "@/components/AdvertiserDashboard"
import { useAccount } from "wagmi"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function AdvertiserPage() {
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
      <AdvertiserDashboard walletAddress={address} />
    </div>
  )
}