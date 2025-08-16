"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  DollarSign,
  Target,
  Sparkles,
  Filter,
  SortDesc,
  CheckCircle,
  Copy,
  ExternalLink,
  Minus,
  CreditCard,
  Clock,
  Loader2,
  Users,
  TrendingUp,
  Eye,
  BarChart3,
  Shield,
  AlertCircle,
} from "lucide-react"

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

export function CreateCampaignPage({
  onBack,
  onMatchingComplete,
}: {
  onBack: () => void
  onMatchingComplete: (campaignData: any) => void
}) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    targetAudience: {
      region: "",
      gender: "",
      ageRange: "",
      interests: [] as string[],
    },
    platforms: [] as string[],
    contentType: "",
    budget: [1000],
    timeline: {
      start: "",
      end: "",
    },
    requirements: "",
    brandGuidelines: "",
  })

  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 4

  const handleSubmit = () => {
    const campaignData = {
      title: formData.title || "智能手机新品推广",
      budget: formData.budget[0],
      platforms: formData.platforms,
      contentType: formData.contentType,
      interests: formData.targetAudience.interests,
    }

    setTimeout(() => {
      onMatchingComplete(campaignData)
    }, 1500)

    alert("投放需求创建成功！正在进行 AI 智能匹配...")
  }

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {Array.from({ length: totalSteps }, (_, i) => (
        <div key={i} className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              i + 1 <= currentStep ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
            }`}
          >
            {i + 1}
          </div>
          {i < totalSteps - 1 && (
            <div className={`w-16 h-1 mx-2 ${i + 1 < currentStep ? "bg-blue-600" : "bg-gray-200"}`} />
          )}
        </div>
      ))}
    </div>
  )

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          返回主页
        </Button>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">创建投放活动</h2>
        <p className="text-gray-600">设置您的广告投放需求，AI 将为您匹配最合适的博主</p>
      </div>

      {renderStepIndicator()}

      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              基本信息
            </CardTitle>
            <CardDescription>设置您的投放活动基本信息</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">活动标题</Label>
                <Input
                  id="title"
                  placeholder="例如：智能手机新品推广"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="contentType">内容类型</Label>
                <Select
                  value={formData.contentType}
                  onValueChange={(value) => setFormData({ ...formData, contentType: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="选择内容类型" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="短视频">短视频</SelectItem>
                    <SelectItem value="图文">图文</SelectItem>
                    <SelectItem value="直播">直播</SelectItem>
                    <SelectItem value="测评">测评</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="description">活动描述</Label>
              <Textarea
                id="description"
                placeholder="详细描述您的产品和推广目标..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>

            <div>
              <Label>投放平台</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                {["微博", "抖音", "小红书", "Twitter"].map((platform) => (
                  <div key={platform} className="flex items-center space-x-2">
                    <Checkbox
                      id={platform}
                      checked={formData.platforms.includes(platform)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFormData({
                            ...formData,
                            platforms: [...formData.platforms, platform],
                          })
                        } else {
                          setFormData({
                            ...formData,
                            platforms: formData.platforms.filter((p) => p !== platform),
                          })
                        }
                      }}
                    />
                    <Label htmlFor={platform}>{platform}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <Button onClick={() => setCurrentStep(2)}>下一步</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>目标受众</CardTitle>
            <CardDescription>定义您的目标用户群体</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>地区</Label>
                <Select
                  value={formData.targetAudience.region}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      targetAudience: { ...formData.targetAudience, region: value },
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="选择地区" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="全国">全国</SelectItem>
                    <SelectItem value="一线城市">一线城市</SelectItem>
                    <SelectItem value="二三线城市">二三线城市</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>性别</Label>
                <Select
                  value={formData.targetAudience.gender}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      targetAudience: { ...formData.targetAudience, gender: value },
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="选择性别" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="不限">不限</SelectItem>
                    <SelectItem value="男性">男性</SelectItem>
                    <SelectItem value="女性">女性</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>年龄段</Label>
                <Select
                  value={formData.targetAudience.ageRange}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      targetAudience: { ...formData.targetAudience, ageRange: value },
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="选择年龄段" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="18-25">18-25岁</SelectItem>
                    <SelectItem value="26-35">26-35岁</SelectItem>
                    <SelectItem value="36-45">36-45岁</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>兴趣标签</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                {["数码科技", "时尚美妆", "生活方式", "游戏娱乐", "健康运动", "美食旅行", "教育学习", "商务职场"].map(
                  (interest) => (
                    <div key={interest} className="flex items-center space-x-2">
                      <Checkbox
                        id={interest}
                        checked={formData.targetAudience.interests.includes(interest)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setFormData({
                              ...formData,
                              targetAudience: {
                                ...formData.targetAudience,
                                interests: [...formData.targetAudience.interests, interest],
                              },
                            })
                          } else {
                            setFormData({
                              ...formData,
                              targetAudience: {
                                ...formData.targetAudience,
                                interests: formData.targetAudience.interests.filter((i) => i !== interest),
                              },
                            })
                          }
                        }}
                      />
                      <Label htmlFor={interest} className="text-sm">
                        {interest}
                      </Label>
                    </div>
                  ),
                )}
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(1)}>
                上一步
              </Button>
              <Button onClick={() => setCurrentStep(3)}>下一步</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {currentStep === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>预算设置</CardTitle>
            <CardDescription>设置您的投放预算和时间安排</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label>总预算: ¥{formData.budget[0]}</Label>
              <Slider
                value={formData.budget}
                onValueChange={(value) => setFormData({ ...formData, budget: value })}
                max={10000}
                min={500}
                step={100}
                className="mt-2"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>¥500</span>
                <span>¥10,000</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate">开始时间</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.timeline.start}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      timeline: { ...formData.timeline, start: e.target.value },
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="endDate">结束时间</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.timeline.end}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      timeline: { ...formData.timeline, end: e.target.value },
                    })
                  }
                />
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(2)}>
                上一步
              </Button>
              <Button onClick={() => setCurrentStep(4)}>下一步</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {currentStep === 4 && (
        <Card>
          <CardHeader>
            <CardTitle>内容要求</CardTitle>
            <CardDescription>详细说明您的内容制作要求</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="requirements">内容要求</Label>
              <Textarea
                id="requirements"
                placeholder="请详细描述您对内容的具体要求，如：产品展示重点、拍摄风格、时长要求等..."
                value={formData.requirements}
                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="brandGuidelines">品牌规范</Label>
              <Textarea
                id="brandGuidelines"
                placeholder="品牌色彩、Logo使用、禁用词汇等品牌规范说明..."
                value={formData.brandGuidelines}
                onChange={(e) => setFormData({ ...formData, brandGuidelines: e.target.value })}
                rows={3}
              />
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">AI 智能匹配</h4>
              <p className="text-sm text-blue-800">
                基于您的需求，我们的 AI 系统将自动匹配最符合条件的博主，
                考虑因素包括：受众匹配度、内容质量、历史表现、价格合理性等。
              </p>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(3)}>
                上一步
              </Button>
              <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">
                <Sparkles className="w-4 h-4 mr-2" />
                开始 AI 匹配
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </main>
  )
}

export function MatchingResultsPage({
  campaign,
  onBack,
  onProceedToPayment,
}: {
  campaign: any
  onBack: () => void
  onProceedToPayment: (selectedCreators: string[], totalCost: number) => void
}) {
  const [selectedCreators, setSelectedCreators] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("match")
  const [filterBy, setFilterBy] = useState("all")
  const [showComparison, setShowComparison] = useState(false)

  const filteredAndSortedCreators = mockCreators
    .filter((creator) => {
      if (filterBy === "verified") return creator.zkTLSVerified
      if (filterBy === "unverified") return !creator.zkTLSVerified
      return true
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "match":
          return b.matchScore - a.matchScore
        case "price":
          return a.price - b.price
        case "followers":
          return Math.max(...Object.values(b.followers)) - Math.max(...Object.values(a.followers))
        case "rating":
          return b.rating - a.rating
        default:
          return 0
      }
    })

  const toggleCreatorSelection = (creatorId: string) => {
    setSelectedCreators((prev) =>
      prev.includes(creatorId) ? prev.filter((id) => id !== creatorId) : [...prev, creatorId],
    )
  }

  const totalCost = selectedCreators.reduce((sum, creatorId) => {
    const creator = mockCreators.find((c) => c.id === creatorId)
    return sum + (creator?.price || 0)
  }, 0)

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          返回主页
        </Button>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">AI 匹配结果</h2>
            <p className="text-gray-600">为您找到 {filteredAndSortedCreators.length} 位匹配的博主</p>
          </div>
          <Button onClick={() => setShowComparison(!showComparison)} variant="outline" className="hidden md:flex">
            {showComparison ? "隐藏对比" : "显示对比"}
          </Button>
        </div>
      </div>

      {/* Campaign Summary */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <h3 className="font-semibold">{campaign.title}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                  <span>预算: ¥{campaign.budget}</span>
                  <span>平台: {campaign.platforms?.join(", ")}</span>
                  <span>类型: {campaign.contentType}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">已选择 {selectedCreators.length} 位博主</p>
              <p className="font-semibold">总费用: ¥{totalCost}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters and Sort */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <Select value={filterBy} onValueChange={setFilterBy}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部</SelectItem>
              <SelectItem value="verified">已验证</SelectItem>
              <SelectItem value="unverified">未验证</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <SortDesc className="w-4 h-4 text-gray-500" />
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="match">匹配度</SelectItem>
              <SelectItem value="price">价格</SelectItem>
              <SelectItem value="followers">粉丝数</SelectItem>
              <SelectItem value="rating">评分</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Creator Cards */}
      <div className="grid gap-6 mb-8">
        {filteredAndSortedCreators.map((creator) => (
          <Card
            key={creator.id}
            className={`transition-all ${
              selectedCreators.includes(creator.id) ? "ring-2 ring-blue-500 bg-blue-50" : "hover:shadow-md"
            }`}
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={creator.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{creator.name.slice(0, 2)}</AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold">{creator.name}</h3>
                    <span className="text-gray-500">{creator.handle}</span>
                    {creator.zkTLSVerified && (
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        已验证
                      </Badge>
                    )}
                    <Badge variant="outline" className="text-blue-600">
                      匹配度 {Math.round(creator.matchScore * 100)}%
                    </Badge>
                  </div>

                  <p className="text-gray-600 text-sm mb-3">{creator.bio}</p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-500">平台粉丝</p>
                      {Object.entries(creator.followers).map(([platform, count]) => (
                        <p key={platform} className="text-sm">
                          {platform}: {(count as number).toLocaleString()}
                        </p>
                      ))}
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">评分</p>
                      <p className="text-sm font-medium">⭐ {creator.rating}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">响应时间</p>
                      <p className="text-sm">{creator.responseTime}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">报价</p>
                      <p className="text-lg font-bold text-green-600">¥{creator.price}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    {creator.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        查看作品
                      </Button>
                      <Button variant="outline" size="sm">
                        查看详情
                      </Button>
                    </div>

                    <Button
                      onClick={() => toggleCreatorSelection(creator.id)}
                      variant={selectedCreators.includes(creator.id) ? "default" : "outline"}
                      size="sm"
                    >
                      {selectedCreators.includes(creator.id) ? (
                        <>
                          <Minus className="w-4 h-4 mr-1" />
                          取消选择
                        </>
                      ) : (
                        "选择合作"
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Action Bar */}
      {selectedCreators.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div>
              <p className="font-medium">已选择 {selectedCreators.length} 位博主</p>
              <p className="text-sm text-gray-600">预计总费用: ¥{totalCost}</p>
            </div>
            <Button onClick={() => onProceedToPayment(selectedCreators, totalCost)} size="lg">
              <CreditCard className="w-4 h-4 mr-2" />
              确认并支付
            </Button>
          </div>
        </div>
      )}
    </main>
  )
}

export function PaymentPage({
  paymentData,
  onBack,
  onPaymentComplete,
}: {
  paymentData: any
  onBack: () => void
  onPaymentComplete: () => void
}) {
  const [paymentStep, setPaymentStep] = useState<"review" | "authorize" | "processing" | "success" | "failed">("review")
  const [selectedToken, setSelectedToken] = useState("USDC")
  const [authorizationData, setAuthorizationData] = useState({
    nonce: "",
    validAfter: "",
    validBefore: "",
    signature: "",
  })
  const [transactionHash, setTransactionHash] = useState("")
  const [progress, setProgress] = useState(0)

  const selectedCreators = paymentData.selectedCreators
    .map((id: string) => mockCreators.find((c) => c.id === id))
    .filter(Boolean)

  const subtotal = paymentData.totalCost
  const platformFee = Math.round(subtotal * 0.15)
  const gasFee = Math.round(subtotal * 0.05)
  const total = subtotal + platformFee + gasFee

  const handleAuthorizePayment = async () => {
    setPaymentStep("authorize")

    setTimeout(() => {
      const mockAuthData = {
        nonce: `0x${Math.random().toString(16).substr(2, 8)}`,
        validAfter: Math.floor(Date.now() / 1000).toString(),
        validBefore: (Math.floor(Date.now() / 1000) + 3600).toString(),
        signature: `0x${Math.random().toString(16).substr(2, 128)}`,
      }
      setAuthorizationData(mockAuthData)
      setPaymentStep("processing")

      let currentProgress = 0
      const progressInterval = setInterval(() => {
        currentProgress += Math.random() * 20
        setProgress(Math.min(currentProgress, 95))

        if (currentProgress >= 95) {
          clearInterval(progressInterval)
          setTimeout(() => {
            setProgress(100)
            setTransactionHash(`0x${Math.random().toString(16).substr(2, 64)}`)
            setPaymentStep("success")
          }, 1000)
        }
      }, 500)
    }, 2000)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  if (paymentStep === "success") {
    return (
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-green-900">支付成功！</CardTitle>
            <CardDescription>您的投放活动已成功创建并开始执行</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-medium text-green-900 mb-2">交易详情</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-green-700">交易哈希:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs">
                      {transactionHash.slice(0, 10)}...{transactionHash.slice(-8)}
                    </span>
                    <Button variant="ghost" size="sm" onClick={() => copyToClipboard(transactionHash)}>
                      <Copy className="w-3 h-3" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">支付金额:</span>
                  <span className="font-medium">¥{total}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">支付方式:</span>
                  <span className="font-medium">EIP-3009 ({selectedToken})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Gas费用:</span>
                  <span className="font-medium">¥0 (无Gas)</span>
                </div>
              </div>
            </div>

            <div className="text-center space-y-4">
              <p className="text-sm text-gray-600">
                博主将在24小时内收到通知并开始制作内容。您可以在活动管理页面跟踪进度。
              </p>
              <div className="flex gap-3 justify-center">
                <Button variant="outline" onClick={onBack}>
                  返回匹配结果
                </Button>
                <Button onClick={onPaymentComplete}>查看活动详情</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    )
  }

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          返回匹配结果
        </Button>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">确认支付</h2>
        <p className="text-gray-600">使用 EIP-3009 标准进行无Gas费支付</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Order Summary */}
        <Card>
          <CardHeader>
            <CardTitle>订单详情</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">选中的博主 ({selectedCreators.length})</h4>
              <div className="space-y-2">
                {selectedCreators.map((creator: any) => (
                  <div key={creator.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={creator.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{creator.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{creator.name}</span>
                    </div>
                    <span className="text-sm font-medium">¥{creator.price}</span>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>博主费用小计</span>
                <span>¥{subtotal}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>平台服务费 (15%)</span>
                <span>¥{platformFee}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Gas费用</span>
                <span className="text-green-600">¥0 (EIP-3009)</span>
              </div>
              <Separator />
              <div className="flex justify-between font-medium">
                <span>总计</span>
                <span>¥{total}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card>
          <CardHeader>
            <CardTitle>支付方式</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {paymentStep === "review" && (
              <>
                <div>
                  <Label>选择代币</Label>
                  <Select value={selectedToken} onValueChange={setSelectedToken}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USDC">USDC</SelectItem>
                      <SelectItem value="USDT">USDT</SelectItem>
                      <SelectItem value="DAI">DAI</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">EIP-3009 无Gas支付</h4>
                  <p className="text-sm text-blue-800">
                    使用 EIP-3009 标准，您无需持有 ETH 支付 Gas 费用。 只需授权转账，平台将代为处理所有链上操作。
                  </p>
                </div>

                <Button onClick={handleAuthorizePayment} className="w-full" size="lg">
                  <CreditCard className="w-4 h-4 mr-2" />
                  授权支付 ¥{total}
                </Button>
              </>
            )}

            {paymentStep === "authorize" && (
              <div className="text-center space-y-4">
                <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-600" />
                <h4 className="font-medium">正在生成授权...</h4>
                <p className="text-sm text-gray-600">请在钱包中确认授权签名</p>
              </div>
            )}

            {paymentStep === "processing" && (
              <div className="space-y-6">
                <div className="text-center">
                  <h4 className="font-medium mb-2">处理支付中...</h4>
                  <p className="text-sm text-gray-600">正在执行链上交易</p>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>交易进度</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-medium text-sm mb-2">授权信息</h5>
                  <div className="space-y-1 text-xs font-mono">
                    <div>Nonce: {authorizationData.nonce}</div>
                    <div>Valid After: {authorizationData.validAfter}</div>
                    <div>Valid Before: {authorizationData.validBefore}</div>
                    <div>Signature: {authorizationData.signature.slice(0, 20)}...</div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

export function CampaignsPage({
  campaigns,
  onViewTracking,
}: {
  campaigns: any[]
  onViewTracking?: (campaign: any) => void
}) {
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      executing: { label: "执行中", variant: "default" as const, color: "bg-green-100 text-green-800" },
      matching: { label: "匹配中", variant: "secondary" as const, color: "bg-yellow-100 text-yellow-800" },
      completed: { label: "已完成", variant: "outline" as const, color: "bg-gray-100 text-gray-800" },
    }
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.completed
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">我的投放活动</h2>
        <p className="text-gray-600">管理您的所有广告投放活动</p>
      </div>

      <div className="grid gap-6">
        {campaigns.map((campaign) => {
          const statusConfig = getStatusBadge(campaign.status)
          return (
            <Card key={campaign.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold">{campaign.title}</h3>
                    <Badge className={statusConfig.color}>{statusConfig.label}</Badge>
                  </div>
                  <div className="text-sm text-gray-500">创建于 {campaign.createdAt}</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">预算:</span>
                    <span className="font-medium">¥{campaign.budget}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">博主数量:</span>
                    <span className="font-medium">{campaign.creators}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">状态:</span>
                    <span className="font-medium">{statusConfig.label}</span>
                  </div>
                </div>

                {campaign.performance && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <p className="text-xs text-gray-500">总观看</p>
                      <p className="font-medium">{campaign.performance.totalViews.toLocaleString()}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500">总互动</p>
                      <p className="font-medium">{campaign.performance.totalEngagement.toLocaleString()}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500">互动率</p>
                      <p className="font-medium">{(campaign.performance.avgEngagementRate * 100).toFixed(1)}%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500">内容进度</p>
                      <p className="font-medium">
                        {campaign.performance.completedContent}/{campaign.performance.totalContent}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    查看详情
                  </Button>
                  {campaign.status === "executing" && onViewTracking && (
                    <Button variant="outline" size="sm" onClick={() => onViewTracking(campaign)}>
                      <BarChart3 className="w-4 h-4 mr-1" />
                      查看数据
                    </Button>
                  )}
                  {campaign.status === "matching" && <Button size="sm">查看匹配结果</Button>}
                  {campaign.status === "completed" && campaign.performance?.roi && (
                    <Badge variant="outline" className="text-green-600">
                      ROI: {campaign.performance.roi}x
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {campaigns.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Target className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">暂无投放活动</h3>
          <p className="text-gray-600 mb-4">创建您的第一个广告投放活动</p>
          <Button>创建投放</Button>
        </div>
      )}
    </main>
  )
}

export function CampaignTrackingPage({ campaign, onBack }: { campaign: any; onBack: () => void }) {
  const [selectedTimeRange, setSelectedTimeRange] = useState("7d")

  // Mock tracking data
  const trackingData = {
    overview: {
      totalViews: 125000,
      totalEngagement: 8500,
      avgEngagementRate: 0.068,
      totalSpent: campaign?.budget || 1500,
      roi: 3.2,
      completedContent: 2,
      totalContent: 3,
    },
    contentDelivery: [
      {
        id: "content_001",
        creator: "科技小王子",
        platform: "微博",
        contentType: "短视频",
        status: "published",
        publishedAt: "2025-01-16 14:30",
        views: 45000,
        engagement: 3200,
        engagementRate: 0.071,
        proofHash: "0x1a2b3c4d5e6f7890abcdef1234567890abcdef12",
        verified: true,
      },
      {
        id: "content_002",
        creator: "数码达人Lisa",
        platform: "小红书",
        contentType: "图文",
        status: "published",
        publishedAt: "2025-01-17 10:15",
        views: 38000,
        engagement: 2800,
        engagementRate: 0.074,
        proofHash: "0x2b3c4d5e6f7890abcdef1234567890abcdef1234",
        verified: true,
      },
      {
        id: "content_003",
        creator: "极客老张",
        platform: "微博",
        contentType: "短视频",
        status: "in-progress",
        expectedAt: "2025-01-19",
        proofHash: null,
        verified: false,
      },
    ],
    platformBreakdown: [
      { platform: "微博", views: 75000, engagement: 5200, engagementRate: 0.069 },
      { platform: "小红书", views: 38000, engagement: 2800, engagementRate: 0.074 },
      { platform: "抖音", views: 12000, engagement: 500, engagementRate: 0.042 },
    ],
  }

  if (!campaign) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">未选择活动</h3>
          <p className="text-gray-600 mb-4">请先选择要查看的活动</p>
          <Button onClick={onBack}>返回活动列表</Button>
        </div>
      </main>
    )
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          返回活动列表
        </Button>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{campaign.title} - 数据追踪</h2>
            <p className="text-gray-600">实时监控活动表现和链上验证</p>
          </div>
          <div className="flex items-center gap-2">
            <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">24小时</SelectItem>
                <SelectItem value="7d">7天</SelectItem>
                <SelectItem value="30d">30天</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">总观看量</p>
                <p className="text-2xl font-bold text-gray-900">{trackingData.overview.totalViews.toLocaleString()}</p>
              </div>
              <Eye className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">总互动量</p>
                <p className="text-2xl font-bold text-gray-900">
                  {trackingData.overview.totalEngagement.toLocaleString()}
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
                <p className="text-sm text-gray-600">平均互动率</p>
                <p className="text-2xl font-bold text-gray-900">
                  {(trackingData.overview.avgEngagementRate * 100).toFixed(1)}%
                </p>
              </div>
              <BarChart3 className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">投入成本</p>
                <p className="text-2xl font-bold text-gray-900">¥{trackingData.overview.totalSpent}</p>
              </div>
              <DollarSign className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">ROI</p>
                <p className="text-2xl font-bold text-green-600">{trackingData.overview.roi}x</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Content Delivery Status */}
        <Card>
          <CardHeader>
            <CardTitle>内容交付状态</CardTitle>
            <CardDescription>
              已完成 {trackingData.overview.completedContent} / {trackingData.overview.totalContent} 个内容
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trackingData.contentDelivery.map((content) => (
                <div key={content.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{content.creator}</h4>
                      <Badge variant="outline" className="text-xs">
                        {content.platform}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {content.contentType}
                      </Badge>
                    </div>
                    <Badge
                      className={
                        content.status === "published"
                          ? "bg-green-100 text-green-800"
                          : content.status === "in-progress"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                      }
                    >
                      {content.status === "published"
                        ? "已发布"
                        : content.status === "in-progress"
                          ? "制作中"
                          : "待开始"}
                    </Badge>
                  </div>

                  {content.status === "published" && (
                    <div className="grid grid-cols-3 gap-4 mb-3 text-sm">
                      <div>
                        <p className="text-gray-500">观看量</p>
                        <p className="font-medium">{content.views?.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">互动量</p>
                        <p className="font-medium">{content.engagement?.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">互动率</p>
                        <p className="font-medium">{((content.engagementRate || 0) * 100).toFixed(1)}%</p>
                      </div>
                    </div>
                  )}

                  {content.status === "in-progress" && (
                    <p className="text-sm text-gray-600 mb-3">预计完成时间: {content.expectedAt}</p>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm">
                      {content.verified ? (
                        <>
                          <Shield className="w-4 h-4 text-green-600" />
                          <span className="text-green-600">链上已验证</span>
                        </>
                      ) : (
                        <>
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-500">待验证</span>
                        </>
                      )}
                    </div>
                    {content.proofHash && (
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-gray-500">
                          {content.proofHash.slice(0, 8)}...{content.proofHash.slice(-6)}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigator.clipboard.writeText(content.proofHash!)}
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="w-3 h-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Platform Performance */}
        <Card>
          <CardHeader>
            <CardTitle>平台表现对比</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trackingData.platformBreakdown.map((platform) => (
                <div key={platform.platform} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">{platform.platform}</h4>
                    <Badge variant="outline">{(platform.engagementRate * 100).toFixed(1)}% 互动率</Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">观看量</p>
                      <p className="font-medium text-lg">{platform.views.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">互动量</p>
                      <p className="font-medium text-lg">{platform.engagement.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>表现评级</span>
                      <span>
                        {platform.engagementRate > 0.07 ? "优秀" : platform.engagementRate > 0.05 ? "良好" : "一般"}
                      </span>
                    </div>
                    <Progress value={platform.engagementRate * 1000} className="h-2" max={100} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* On-chain Verification */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            链上验证记录
          </CardTitle>
          <CardDescription>所有内容发布都有对应的链上凭证，确保数据真实性</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <h4 className="font-medium text-blue-900 mb-2">验证机制说明</h4>
            <p className="text-sm text-blue-800">
              每当博主发布内容时，系统会自动生成包含内容哈希、时间戳、平台信息的链上证明。 这些证明存储在 Monad
              区块链上，任何人都可以验证内容的真实性和发布时间。
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">内容ID</th>
                  <th className="text-left p-2">博主</th>
                  <th className="text-left p-2">平台</th>
                  <th className="text-left p-2">发布时间</th>
                  <th className="text-left p-2">验证哈希</th>
                  <th className="text-left p-2">状态</th>
                  <th className="text-left p-2">操作</th>
                </tr>
              </thead>
              <tbody>
                {trackingData.contentDelivery
                  .filter((content) => content.proofHash)
                  .map((content) => (
                    <tr key={content.id} className="border-b">
                      <td className="p-2 font-mono text-xs">{content.id}</td>
                      <td className="p-2">{content.creator}</td>
                      <td className="p-2">{content.platform}</td>
                      <td className="p-2">{content.publishedAt}</td>
                      <td className="p-2 font-mono text-xs">
                        {content.proofHash!.slice(0, 10)}...{content.proofHash!.slice(-8)}
                      </td>
                      <td className="p-2">
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          已验证
                        </Badge>
                      </td>
                      <td className="p-2">
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigator.clipboard.writeText(content.proofHash!)}
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="w-3 h-3" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
