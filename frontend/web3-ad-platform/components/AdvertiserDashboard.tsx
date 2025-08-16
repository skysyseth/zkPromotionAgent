"use client"

import { useState } from "react"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Wallet, Users, TrendingUp, DollarSign, Target, BarChart3, Eye } from "lucide-react"
import {
  CreateCampaignPage,
  MatchingResultsPage,
  PaymentPage,
  CampaignsPage,
  CampaignTrackingPage,
} from "./CampaignPages" // Import the missing components

const mockCreators = [
  {
    id: "c_001",
    name: "科技小王子",
    handle: "@tech_prince",
    avatar: "/tech-reviewer-avatar.png",
    platforms: ["微博", "抖音"],
    followers: { 微博: 320000, 抖音: 180000 },
    tags: ["数码科技", "手机评测", "开箱"],
    matchScore: 0.94,
    price: 800,
    rating: 4.9,
    responseTime: "2小时内",
    zkTLSVerified: true,
    recentWork: [
      { title: "iPhone 15 Pro 深度评测", views: 45000, engagement: 0.08 },
      { title: "小米14 Ultra 拍照对比", views: 38000, engagement: 0.12 },
    ],
    bio: "专注数码产品评测5年，粉丝互动率高，内容质量优秀",
    completedCampaigns: 28,
    avgDeliveryTime: "3天",
  },
  {
    id: "c_002",
    name: "数码达人Lisa",
    handle: "@digital_lisa",
    avatar: "/female-tech-reviewer.png",
    platforms: ["微博", "小红书"],
    followers: { 微博: 280000, 小红书: 150000 },
    tags: ["数码科技", "女性视角", "生活方式"],
    matchScore: 0.89,
    price: 650,
    rating: 4.8,
    responseTime: "4小时内",
    zkTLSVerified: true,
    recentWork: [
      { title: "适合女生的数码好物推荐", views: 52000, engagement: 0.15 },
      { title: "MacBook Air vs Pro 选购指南", views: 41000, engagement: 0.11 },
    ],
    bio: "从女性角度分享数码产品使用体验，内容贴近生活",
    completedCampaigns: 35,
    avgDeliveryTime: "2天",
  },
  {
    id: "c_003",
    name: "极客老张",
    handle: "@geek_zhang",
    avatar: "/male-tech-expert.png",
    platforms: ["微博", "Twitter"],
    followers: { 微博: 450000, Twitter: 85000 },
    tags: ["数码科技", "深度测评", "技术解析"],
    matchScore: 0.87,
    price: 1200,
    rating: 4.7,
    responseTime: "6小时内",
    zkTLSVerified: true,
    recentWork: [
      { title: "骁龙8 Gen3 性能深度解析", views: 68000, engagement: 0.09 },
      { title: "2024年旗舰手机横评", views: 95000, engagement: 0.07 },
    ],
    bio: "资深数码博主，技术功底深厚，专业性强",
    completedCampaigns: 42,
    avgDeliveryTime: "4天",
  },
]

export function AdvertiserDashboard({ walletAddress }: { walletAddress: string }) {
  const [currentPage, setCurrentPage] = useState<
    "dashboard" | "create-campaign" | "campaigns" | "matching-results" | "payment" | "tracking"
  >("dashboard")
  const [campaigns, setCampaigns] = useState([
    {
      id: "cmp_001",
      title: "数码产品推广",
      status: "executing",
      budget: 1500,
      creators: 3,
      createdAt: "2025-01-15",
      performance: {
        totalViews: 125000,
        totalEngagement: 8500,
        avgEngagementRate: 0.068,
        completedContent: 2,
        totalContent: 3,
      },
    },
    {
      id: "cmp_002",
      title: "美妆品牌合作",
      status: "matching",
      budget: 2800,
      creators: 5,
      createdAt: "2025-01-14",
    },
    {
      id: "cmp_003",
      title: "科技评测",
      status: "completed",
      budget: 900,
      creators: 2,
      createdAt: "2025-01-10",
      performance: {
        totalViews: 89000,
        totalEngagement: 6200,
        avgEngagementRate: 0.07,
        completedContent: 2,
        totalContent: 2,
        roi: 3.2,
      },
    },
  ])

  const [currentCampaign, setCurrentCampaign] = useState({
    title: "智能手机新品推广",
    budget: 3000,
    platforms: ["微博", "抖音"],
    contentType: "短视频",
    interests: ["数码科技"],
  })

  const [paymentData, setPaymentData] = useState({
    selectedCreators: [] as string[],
    totalCost: 0,
    campaign: null as any,
  })

  const [selectedCampaignForTracking, setSelectedCampaignForTracking] = useState<any>(null)

  const renderHeader = () => (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <h1 className="text-xl font-semibold">广告投流平台</h1>
            <nav className="hidden md:flex space-x-6">
              <button
                onClick={() => setCurrentPage("dashboard")}
                className={`${currentPage === "dashboard" ? "text-blue-600 font-medium" : "text-gray-600 hover:text-gray-900"}`}
              >
                主页
              </button>
              <button
                onClick={() => setCurrentPage("create-campaign")}
                className={`${currentPage === "create-campaign" ? "text-blue-600 font-medium" : "text-gray-600 hover:text-gray-900"}`}
              >
                创建投放
              </button>
              <button
                onClick={() => setCurrentPage("campaigns")}
                className={`${currentPage === "campaigns" ? "text-blue-600 font-medium" : "text-gray-600 hover:text-gray-900"}`}
              >
                我的活动
              </button>
              <button
                onClick={() => setCurrentPage("tracking")}
                className={`${currentPage === "tracking" ? "text-blue-600 font-medium" : "text-gray-600 hover:text-gray-900"}`}
              >
                数据分析
              </button>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="text-xs">
              Monad L1
            </Badge>
            <ConnectButton />
          </div>
        </div>
      </div>
    </header>
  )

  if (currentPage === "create-campaign") {
    return (
      <div className="min-h-screen bg-gray-50">
        {renderHeader()}
        <CreateCampaignPage
          onBack={() => setCurrentPage("dashboard")}
          onMatchingComplete={(campaignData) => {
            setCurrentCampaign(campaignData)
            setCurrentPage("matching-results")
          }}
        />
      </div>
    )
  }

  if (currentPage === "campaigns") {
    return (
      <div className="min-h-screen bg-gray-50">
        {renderHeader()}
        <CampaignsPage
          campaigns={campaigns}
          onViewTracking={(campaign) => {
            setSelectedCampaignForTracking(campaign)
            setCurrentPage("tracking")
          }}
        />
      </div>
    )
  }

  if (currentPage === "matching-results") {
    return (
      <div className="min-h-screen bg-gray-50">
        {renderHeader()}
        <MatchingResultsPage
          campaign={currentCampaign}
          onBack={() => setCurrentPage("dashboard")}
          onProceedToPayment={(selectedCreators, totalCost) => {
            setPaymentData({
              selectedCreators,
              totalCost,
              campaign: currentCampaign,
            })
            setCurrentPage("payment")
          }}
        />
      </div>
    )
  }

  if (currentPage === "payment") {
    return (
      <div className="min-h-screen bg-gray-50">
        {renderHeader()}
        <PaymentPage
          paymentData={paymentData}
          onBack={() => setCurrentPage("matching-results")}
          onPaymentComplete={() => {
            const newCampaign = {
              id: `cmp_${Date.now()}`,
              title: paymentData.campaign.title,
              status: "executing" as const,
              budget: Math.round(paymentData.totalCost * 1.15),
              creators: paymentData.selectedCreators.length,
              createdAt: new Date().toISOString().split("T")[0],
              performance: {
                totalViews: 0,
                totalEngagement: 0,
                avgEngagementRate: 0,
                completedContent: 0,
                totalContent: paymentData.selectedCreators.length,
              },
            }
            setCampaigns((prev) => [newCampaign, ...prev])
            setCurrentPage("dashboard")
          }}
        />
      </div>
    )
  }

  if (currentPage === "tracking") {
    return (
      <div className="min-h-screen bg-gray-50">
        {renderHeader()}
        <CampaignTrackingPage campaign={selectedCampaignForTracking} onBack={() => setCurrentPage("campaigns")} />
      </div>
    )
  }

  // Dashboard main page
  return (
    <div className="min-h-screen bg-gray-50">
      {renderHeader()}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">广告主控制台</h2>
          <p className="text-gray-600">管理您的广告投放活动和数据分析</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">活跃活动</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {campaigns.filter((c) => c.status === "executing").length}
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">总投入</p>
                  <p className="text-2xl font-bold text-gray-900">¥{campaigns.reduce((sum, c) => sum + c.budget, 0)}</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">合作博主</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {campaigns.reduce((sum, c) => sum + c.creators, 0)}
                  </p>
                </div>
                <Users className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">平均ROI</p>
                  <p className="text-2xl font-bold text-gray-900">3.2x</p>
                </div>
                <BarChart3 className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Campaigns */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>最新活动</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setCurrentPage("campaigns")}>
                  查看全部
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {campaigns.slice(0, 3).map((campaign) => (
                  <div key={campaign.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{campaign.title}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge
                          variant={
                            campaign.status === "executing"
                              ? "default"
                              : campaign.status === "matching"
                                ? "secondary"
                                : "outline"
                          }
                          className="text-xs"
                        >
                          {campaign.status === "executing"
                            ? "执行中"
                            : campaign.status === "matching"
                              ? "匹配中"
                              : "已完成"}
                        </Badge>
                        <span className="text-xs text-gray-500">¥{campaign.budget}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>快速操作</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button onClick={() => setCurrentPage("create-campaign")} className="w-full justify-start">
                <Target className="w-4 h-4 mr-2" />
                创建新的投放活动
              </Button>
              <Button variant="outline" onClick={() => setCurrentPage("tracking")} className="w-full justify-start">
                <BarChart3 className="w-4 h-4 mr-2" />
                查看数据分析
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Users className="w-4 h-4 mr-2" />
                浏览博主库
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Wallet className="w-4 h-4 mr-2" />
                财务管理
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
