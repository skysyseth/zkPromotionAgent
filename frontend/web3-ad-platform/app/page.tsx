"use client"

import { useAccount } from "wagmi"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Zap, Shield, TrendingUp } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

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
  {
    id: "c_004",
    name: "小白测评",
    handle: "@xiaobai_review",
    avatar: "/young-reviewer.png",
    platforms: ["抖音", "小红书"],
    followers: { 抖音: 220000, 小红书: 95000 },
    tags: ["数码科技", "新手友好", "性价比"],
    matchScore: 0.82,
    price: 450,
    rating: 4.6,
    responseTime: "1小时内",
    zkTLSVerified: false,
    recentWork: [
      { title: "千元机也能拍大片", views: 32000, engagement: 0.18 },
      { title: "学生党数码装备推荐", views: 28000, engagement: 0.16 },
    ],
    bio: "专注性价比产品推荐，内容通俗易懂",
    completedCampaigns: 18,
    avgDeliveryTime: "2天",
  },
  {
    id: "c_005",
    name: "科技美学",
    handle: "@tech_aesthetic",
    avatar: "/aesthetic-tech-reviewer.png",
    platforms: ["微博", "小红书", "抖音"],
    followers: { 微博: 380000, 小红书: 200000, 抖音: 160000 },
    tags: ["数码科技", "设计美学", "高端产品"],
    matchScore: 0.91,
    price: 950,
    rating: 4.9,
    responseTime: "3小时内",
    zkTLSVerified: true,
    recentWork: [
      { title: "苹果生态全家桶体验", views: 78000, engagement: 0.13 },
      { title: "高颜值数码产品盘点", views: 65000, engagement: 0.14 },
    ],
    bio: "关注产品设计与美学，内容制作精良",
    completedCampaigns: 31,
    avgDeliveryTime: "3天",
  },
  {
    id: "c_006",
    name: "游戏硬件王",
    handle: "@gaming_hardware",
    avatar: "/gaming-hardware-reviewer.png",
    platforms: ["微博", "抖音"],
    followers: { 微博: 195000, 抖音: 240000 },
    tags: ["数码科技", "游戏硬件", "性能测试"],
    matchScore: 0.78,
    price: 720,
    rating: 4.5,
    responseTime: "8小时内",
    zkTLSVerified: true,
    recentWork: [
      { title: "RTX 4090 游戏性能测试", views: 42000, engagement: 0.1 },
      { title: "游戏手机散热对比", views: 35000, engagement: 0.12 },
    ],
    bio: "专注游戏硬件评测，性能测试专业",
    completedCampaigns: 25,
    avgDeliveryTime: "5天",
  },
]



export function HomePage() {
  const { address, isConnected } = useAccount()
  const router = useRouter()

  const selectRole = (role: "advertiser" | "creator") => {
    router.push(`/${role}`)
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">zkPromotionAgent: 基于zkTLS 和 Agent 的 InfoFi 平台</h1>
            <p className="text-xl text-gray-600 mb-8">
              基于 zkTLS 身份验证、AI 智能匹配、EIP-3009 即时结算的去中心化广告平台
            </p>
            <div className="flex justify-center gap-4 mb-8">
              <Badge variant="secondary" className="px-3 py-1">
                <Shield className="w-4 h-4 mr-1" />
                zkTLS 身份验证
              </Badge>
              <Badge variant="secondary" className="px-3 py-1">
                <Zap className="w-4 h-4 mr-1" />
                AI 智能匹配
              </Badge>
              <Badge variant="secondary" className="px-3 py-1">
                <TrendingUp className="w-4 h-4 mr-1" />
                EIP-3009 结算
              </Badge>
            </div>
          </div>

          <div className="flex justify-center">
            <ConnectButton />
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  广告主
                </CardTitle>
                <CardDescription>创建投放需求，AI 匹配优质博主，一键支付结算</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• 智能匹配目标博主</li>
                  <li>• 透明定价与预算控制</li>
                  <li>• 链上凭证可验证</li>
                  <li>• 实时投放效果跟踪</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-green-600" />
                  博主/创作者
                </CardTitle>
                <CardDescription>zkTLS 验证身份，接受订单，即时收款结算</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• zkTLS 零知识身份证明</li>
                  <li>• 自主定价与档期管理</li>
                  <li>• 无需预付 Gas 费用</li>
                  <li>• 链上收款记录透明</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">选择您的角色</h1>
          <p className="text-xl text-gray-600 mb-8">请选择您要使用的功能模块</p>
          <div className="flex justify-center mb-8">
            <ConnectButton />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card
            className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-blue-500"
            onClick={() => selectRole("advertiser")}
          >
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle>广告主</CardTitle>
              <CardDescription>创建投放需求，匹配博主，管理广告活动</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">进入广告主中心</Button>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-green-500"
            onClick={() => selectRole("creator")}
          >
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle>博主/创作者</CardTitle>
              <CardDescription>验证身份，接受订单，管理合作项目</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-transparent" variant="outline">
                进入创作者中心
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default HomePage