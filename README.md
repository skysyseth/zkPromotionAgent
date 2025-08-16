# zkPromotionAgent

zkPromotionAgent 是一个基于 **零知识证明 (zk)** 与 **AI 智能体 (Agent)** 的 Web3 广告撮合平台。广告主可以安全地投放广告，博主可以用 zkTLS 验证社交账号的真实性，并通过链上智能合约完成即时结算。

## ✨ Features
- **zk 身份验证**: 使用 zkTLS 证明博主对其 Web2 社交账号的所有权 (微博、Twitter 等)。  
- **AI 智能撮合**: 广告主输入需求，AI Agent 自动匹配最合适的博主。  
- **支付即结算**: 基于 EIP-3009 + x402 协议，无需 KYC、无需 ETH Gas，离线签名即可完成链上支付。  
- **链上凭证**: 广告需求、身份验证、支付结算等全部留存链上，透明可追溯。

## 🏗 Tech Stack
- **Frontend**: React / Next.js + Rainbowkit / MetaMask
- **Identity Layer**: zkTLS SDK + Monad 合约
- **Matching Layer**: AI Agent (LLM + Creator 数据库)
- **Payment Layer**: EIP-3009 (TransferWithAuthorization) + x402
- **Blockchain**: Monad L1 (高吞吐、低延迟、EVM 兼容)

## 📸 Demo Flow
1. 广告主创建投放 Brief（预算、目标、内容形式）。
2. AI Agent 匹配候选博主，展示匹配度 + 报价 + 账号验证凭证。
3. 广告主离线签名授权支付。
4. 平台调用链上合约，完成即时结算。
5. 广告投放执行 & 结果凭证上链。

## 🚀 Roadmap
- [ ] MVP: zkTLS + Monad 身份注册  
- [ ] AI Prompt → 博主匹配 → 链上支付 Demo  
- [ ] 扩展更多社交平台验证 (Twitter, YouTube, Instagram)  
- [ ] 支持按点击/转化率结算 (Oracle)  
- [ ] DAO 治理：广告主与博主社区共治  

## Monad Testnet 合约地址

0x022313DD2EcB4Bb9E72D9bdbf35395Df97eAc903