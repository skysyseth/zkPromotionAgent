"use client"

import { useState } from "react"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Shield,
  Users,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Settings,
  Eye,
  Calendar,
  Globe,
  Copy,
  Loader2,
  Plus,
  Edit,
  BarChart3,
} from "lucide-react"

const mockOrders = [
  {
    id: "ord_001",
    title: "智能手机新品推广",
    advertiser: "科技品牌A",
    status: "pending",
    price: 800,
    deadline: "2025-01-20",
    platforms: ["微博", "抖音"],
    contentType: "短视频",
    requirements: "需要展示产品外观和核心功能，时长3-5分钟",
  },
  {
    id: "ord_002",
    title: "数码配件测评",
    advertiser: "配件厂商B",
    status: "in-progress",
    price: 650,
    deadline: "2025-01-18",
    platforms: ["小红书"],
    contentType: "图文",
    requirements: "详细测评充电器性能，包含实测数据",
  },
  {
    id: "ord_003",
    title: "游戏手机体验",
    advertiser: "游戏手机C",
    status: "completed",
    price: 1200,
    deadline: "2025-01-10",
    platforms: ["微博", "抖音"],
    contentType: "短视频",
    requirements: "重点展示游戏性能和散热效果",
  },
]

const mockEarnings = [
  { month: "2024-12", amount: 4500, orders: 6 },
  { month: "2024-11", amount: 3800, orders: 5 },
  { month: "2024-10", amount: 5200, orders: 7 },
  { month: "2024-09", amount: 2900, orders: 4 },
]

export function CreatorDashboard({ walletAddress }: { walletAddress: string }) {
  const [currentPage, setCurrentPage] = useState<"dashboard" | "verification" | "orders" | "profile" | "earnings">(
    "dashboard",
  )
  const [zkTLSStatus, setZkTLSStatus] = useState<"unverified" | "verifying" | "verified">("unverified")
  const [verificationStep, setVerificationStep] = useState(1)
  const [profile, setProfile] = useState({
    name: "数码达人Lisa",
    handle: "@digital_lisa",
    bio: "专注数码产品评测，从女性角度分享使用体验",
    platforms: [
      { name: "微博", followers: 280000, verified: true },
      { name: "小红书", followers: 150000, verified: true },
    ],
    tags: ["数码科技", "女性视角", "生活方式"],
    rates: {
      微博: { post: 400, story: 200, video: 600 },
      小红书: { post: 350, story: 180, video: 500 },
      抖音: { post: 500, story: 250, video: 800 },
    },
  })

  const renderHeader = () => (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <h1 className="text-xl font-semibold">创作者中心</h1>
            <nav className="hidden md:flex space-x-6">
              <button
                onClick={() => setCurrentPage("dashboard")}
                className={`${currentPage === "dashboard" ? "text-green-600 font-medium" : "text-gray-600 hover:text-gray-900"}`}
              >
                主页
              </button>
              <button
                onClick={() => setCurrentPage("verification")}
                className={`${currentPage === "verification" ? "text-green-600 font-medium" : "text-gray-600 hover:text-gray-900"}`}
              >
                身份验证
              </button>
              <button
                onClick={() => setCurrentPage("orders")}
                className={`${currentPage === "orders" ? "text-green-600 font-medium" : "text-gray-600 hover:text-gray-900"}`}
              >
                订单管理
              </button>
              <button
                onClick={() => setCurrentPage("profile")}
                className={`${currentPage === "profile" ? "text-green-600 font-medium" : "text-gray-600 hover:text-gray-900"}`}
              >
                个人资料
              </button>
              <button
                onClick={() => setCurrentPage("earnings")}
                className={`${currentPage === "earnings" ? "text-green-600 font-medium" : "text-gray-600 hover:text-gray-900"}`}
              >
                收益统计
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

  if (currentPage === "verification") {
    return (
      <div className="min-h-screen bg-gray-50">
        {renderHeader()}
        <ZkTLSVerificationPage
          status={zkTLSStatus}
          step={verificationStep}
          onStatusChange={setZkTLSStatus}
          onStepChange={setVerificationStep}
          onBack={() => setCurrentPage("dashboard")}
        />
      </div>
    )
  }

  if (currentPage === "orders") {
    return (
      <div className="min-h-screen bg-gray-50">
        {renderHeader()}
        <OrderManagementPage orders={mockOrders} />
      </div>
    )
  }

  if (currentPage === "profile") {
    return (
      <div className="min-h-screen bg-gray-50">
        {renderHeader()}
        <ProfileManagementPage profile={profile} onProfileUpdate={setProfile} />
      </div>
    )
  }

  if (currentPage === "earnings") {
    return (
      <div className="min-h-screen bg-gray-50">
        {renderHeader()}
        <EarningsPage earnings={mockEarnings} />
      </div>
    )
  }

  // Dashboard main page
  return (
    <div className="min-h-screen bg-gray-50">
      {renderHeader()}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">欢迎回来，{profile.name}</h2>
              <p className="text-gray-600">管理您的创作者业务和合作项目</p>
            </div>
            <div className="flex items-center gap-2">
              {zkTLSStatus === "verified" ? (
                <Badge className="bg-green-100 text-green-800">
                  <Shield className="w-3 h-3 mr-1" />
                  已验证
                </Badge>
              ) : (
                <Badge variant="outline" className="text-orange-600 border-orange-200">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  待验证
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Verification Alert */}
        {zkTLSStatus !== "verified" && (
          <Card className="mb-6 border-orange-200 bg-orange-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-orange-600" />
                  <div>
                    <h3 className="font-medium text-orange-900">完成 zkTLS 身份验证</h3>
                    <p className="text-sm text-orange-700">验证您的社交媒体账户以获得更多合作机会</p>
                  </div>
                </div>
                <Button onClick={() => setCurrentPage("verification")} className="bg-orange-600 hover:bg-orange-700">
                  立即验证
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">待处理订单</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {mockOrders.filter((o) => o.status === "pending").length}
                  </p>
                </div>
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">进行中订单</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {mockOrders.filter((o) => o.status === "in-progress").length}
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">本月收益</p>
                  <p className="text-2xl font-bold text-gray-900">¥4,500</p>
                </div>
                <DollarSign className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">总粉丝数</p>
                  <p className="text-2xl font-bold text-gray-900">430K</p>
                </div>
                <Users className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>最新订单</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setCurrentPage("orders")}>
                  查看全部
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockOrders.slice(0, 3).map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{order.title}</h4>
                      <p className="text-xs text-gray-600">{order.advertiser}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge
                          variant={
                            order.status === "pending"
                              ? "secondary"
                              : order.status === "in-progress"
                                ? "default"
                                : "outline"
                          }
                          className="text-xs"
                        >
                          {order.status === "pending" ? "待确认" : order.status === "in-progress" ? "进行中" : "已完成"}
                        </Badge>
                        <span className="text-xs text-gray-500">¥{order.price}</span>
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

          {/* Platform Stats */}
          <Card>
            <CardHeader>
              <CardTitle>平台数据</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {profile.platforms.map((platform) => (
                  <div key={platform.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Globe className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{platform.name}</p>
                        <p className="text-xs text-gray-600">{platform.followers.toLocaleString()} 粉丝</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {platform.verified && <CheckCircle className="w-4 h-4 text-green-600" />}
                      <Button variant="ghost" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

function ZkTLSVerificationPage({
  status,
  step,
  onStatusChange,
  onStepChange,
  onBack,
}: {
  status: "unverified" | "verifying" | "verified"
  step: number
  onStatusChange: (status: "unverified" | "verifying" | "verified") => void
  onStepChange: (step: number) => void
  onBack: () => void
}) {
  const [selectedPlatform, setSelectedPlatform] = useState("")
  const [verificationProgress, setVerificationProgress] = useState(0)

  const startVerification = async () => {
    onStatusChange("verifying")
    onStepChange(2)

    // Simulate verification process
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 15
      setVerificationProgress(Math.min(progress, 95))

      if (progress >= 95) {
        clearInterval(interval)
        setTimeout(() => {
          setVerificationProgress(100)
          onStatusChange("verified")
          onStepChange(3)
        }, 1000)
      }
    }, 500)
  }

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          ← 返回主页
        </Button>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">zkTLS 身份验证</h2>
        <p className="text-gray-600">使用零知识证明技术验证您的社交媒体账户，保护隐私的同时建立信任</p>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center justify-center mb-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                i <= step ? "bg-green-600 text-white" : "bg-gray-200 text-gray-600"
              }`}
            >
              {i < step || status === "verified" ? <CheckCircle className="w-4 h-4" /> : i}
            </div>
            {i < 3 && <div className={`w-16 h-1 mx-2 ${i < step ? "bg-green-600" : "bg-gray-200"}`} />}
          </div>
        ))}
      </div>

      {step === 1 && (
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              选择验证平台
            </CardTitle>
            <CardDescription>
              选择您要验证的社交媒体平台。zkTLS 技术将在不泄露敏感信息的情况下验证您的账户真实性。
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3">
              {["微博", "小红书", "抖音", "Twitter"].map((platform) => (
                <div
                  key={platform}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedPlatform === platform
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedPlatform(platform)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Globe className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">{platform}</h3>
                        <p className="text-sm text-gray-600">验证您的 {platform} 账户</p>
                      </div>
                    </div>
                    <div className="w-4 h-4 border-2 rounded-full border-gray-300">
                      {selectedPlatform === platform && <div className="w-full h-full bg-green-500 rounded-full"></div>}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">什么是 zkTLS？</h4>
              <p className="text-sm text-blue-800">
                zkTLS（零知识传输层安全）是一种隐私保护技术，允许您证明拥有某个账户，
                而无需透露密码、个人信息或其他敏感数据。整个验证过程完全在您的设备上进行。
              </p>
            </div>

            <Button onClick={startVerification} disabled={!selectedPlatform} className="w-full">
              开始验证 {selectedPlatform}
            </Button>
          </CardContent>
        </Card>
      )}

      {step === 2 && status === "verifying" && (
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              正在验证 {selectedPlatform}
            </CardTitle>
            <CardDescription>正在使用 zkTLS 技术验证您的账户，请稍候...</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>验证进度</span>
                <span>{Math.round(verificationProgress)}%</span>
              </div>
              <Progress value={verificationProgress} className="h-2" />
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>建立安全连接</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>生成零知识证明</span>
              </div>
              <div className="flex items-center gap-2">
                {verificationProgress > 70 ? (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                ) : (
                  <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                )}
                <span>验证账户所有权</span>
              </div>
              <div className="flex items-center gap-2">
                {verificationProgress === 100 ? (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                ) : (
                  <div className="w-4 h-4 border-2 border-gray-300 rounded-full" />
                )}
                <span>生成验证凭证</span>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">
                <Shield className="w-4 h-4 inline mr-1" />
                您的隐私受到保护：整个验证过程不会向我们或任何第三方透露您的密码或个人信息。
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 3 && status === "verified" && (
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-green-900">验证成功！</CardTitle>
            <CardDescription>您的 {selectedPlatform} 账户已通过 zkTLS 验证</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-medium text-green-900 mb-2">验证凭证已生成</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-green-700">平台:</span>
                  <span className="font-medium">{selectedPlatform}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">验证时间:</span>
                  <span className="font-medium">{new Date().toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">凭证哈希:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs">0x{Math.random().toString(16).substr(2, 8)}...</span>
                    <Button variant="ghost" size="sm">
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center space-y-4">
              <p className="text-sm text-gray-600">
                现在您可以接收更多高质量的合作邀请，验证徽章将显示在您的个人资料中。
              </p>
              <div className="flex gap-3 justify-center">
                <Button variant="outline" onClick={onBack}>
                  返回主页
                </Button>
                <Button
                  onClick={() => {
                    onStepChange(1)
                    setSelectedPlatform("")
                    setVerificationProgress(0)
                    onStatusChange("unverified")
                  }}
                >
                  验证其他平台
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </main>
  )
}

function OrderManagementPage({ orders }: { orders: any[] }) {
  const [filter, setFilter] = useState("all")

  const filteredOrders = orders.filter((order) => {
    if (filter === "all") return true
    return order.status === filter
  })

  const getStatusBadge = (status: string) => {
    const config = {
      pending: { label: "待确认", color: "bg-yellow-100 text-yellow-800" },
      "in-progress": { label: "进行中", color: "bg-blue-100 text-blue-800" },
      completed: { label: "已完成", color: "bg-green-100 text-green-800" },
    }
    return config[status as keyof typeof config] || config.pending
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">订单管理</h2>
        <p className="text-gray-600">管理您的所有合作订单</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6">
        {[
          { key: "all", label: "全部" },
          { key: "pending", label: "待确认" },
          { key: "in-progress", label: "进行中" },
          { key: "completed", label: "已完成" },
        ].map((tab) => (
          <Button
            key={tab.key}
            variant={filter === tab.key ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(tab.key)}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      <div className="grid gap-6">
        {filteredOrders.map((order) => {
          const statusConfig = getStatusBadge(order.status)
          return (
            <Card key={order.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{order.title}</h3>
                      <Badge className={statusConfig.color}>{statusConfig.label}</Badge>
                    </div>
                    <p className="text-gray-600 mb-2">广告主: {order.advertiser}</p>
                    <p className="text-sm text-gray-500 mb-3">{order.requirements}</p>

                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        <span>¥{order.price}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>截止: {order.deadline}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Globe className="w-4 h-4" />
                        <span>{order.platforms.join(", ")}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {order.status === "pending" && (
                      <>
                        <Button variant="outline" size="sm">
                          拒绝
                        </Button>
                        <Button size="sm">接受</Button>
                      </>
                    )}
                    {order.status === "in-progress" && (
                      <>
                        <Button variant="outline" size="sm">
                          查看详情
                        </Button>
                        <Button size="sm">提交作品</Button>
                      </>
                    )}
                    {order.status === "completed" && (
                      <Button variant="outline" size="sm">
                        查看详情
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">暂无订单</h3>
          <p className="text-gray-600">完成身份验证后将收到更多合作邀请</p>
        </div>
      )}
    </main>
  )
}

function ProfileManagementPage({
  profile,
  onProfileUpdate,
}: {
  profile: any
  onProfileUpdate: (profile: any) => void
}) {
  const [editingRates, setEditingRates] = useState(false)

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">个人资料</h2>
        <p className="text-gray-600">管理您的创作者档案和定价</p>
      </div>

      <div className="grid gap-8">
        {/* Basic Profile */}
        <Card>
          <CardHeader>
            <CardTitle>基本信息</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src="/female-tech-reviewer.png" />
                <AvatarFallback>DL</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">昵称</Label>
                    <Input id="name" value={profile.name} />
                  </div>
                  <div>
                    <Label htmlFor="handle">用户名</Label>
                    <Input id="handle" value={profile.handle} />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="bio">个人简介</Label>
              <Textarea id="bio" value={profile.bio} rows={3} />
            </div>

            <div>
              <Label>专业标签</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {profile.tags.map((tag: string) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
                <Button variant="outline" size="sm">
                  <Plus className="w-3 h-3 mr-1" />
                  添加标签
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Platform Management */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>平台管理</CardTitle>
              <Button variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-1" />
                添加平台
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {profile.platforms.map((platform: any) => (
                <div key={platform.name} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Globe className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">{platform.name}</h4>
                      <p className="text-sm text-gray-600">{platform.followers.toLocaleString()} 粉丝</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {platform.verified && (
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        已验证
                      </Badge>
                    )}
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pricing */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>定价管理</CardTitle>
              <Button variant="outline" size="sm" onClick={() => setEditingRates(!editingRates)}>
                <Edit className="w-4 h-4 mr-1" />
                {editingRates ? "保存" : "编辑"}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {Object.entries(profile.rates).map(([platform, rates]: [string, any]) => (
                <div key={platform}>
                  <h4 className="font-medium mb-3">{platform}</h4>
                  <div className="grid grid-cols-3 gap-4">
                    {Object.entries(rates).map(([type, price]: [string, any]) => (
                      <div key={type}>
                        <Label className="text-sm text-gray-600">
                          {type === "post" ? "图文" : type === "story" ? "动态" : "视频"}
                        </Label>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm">¥</span>
                          <Input value={price} disabled={!editingRates} className="text-sm" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

function EarningsPage({ earnings }: { earnings: any[] }) {
  const totalEarnings = earnings.reduce((sum, month) => sum + month.amount, 0)
  const totalOrders = earnings.reduce((sum, month) => sum + month.orders, 0)

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">收益统计</h2>
        <p className="text-gray-600">查看您的收益数据和趋势</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">总收益</p>
                <p className="text-2xl font-bold text-gray-900">¥{totalEarnings.toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">完成订单</p>
                <p className="text-2xl font-bold text-gray-900">{totalOrders}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">平均单价</p>
                <p className="text-2xl font-bold text-gray-900">¥{Math.round(totalEarnings / totalOrders)}</p>
              </div>
              <BarChart3 className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>月度收益</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {earnings.map((month) => (
              <div key={month.month} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium">{month.month}</h4>
                  <p className="text-sm text-gray-600">{month.orders} 个订单</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">¥{month.amount.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">平均 ¥{Math.round(month.amount / month.orders)}/单</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
