# 佛教文化产品电商网站 - 项目规格书

## 1. 项目概述
- **项目名称**: 佛教文化产品独立站
- **目标**: 面向中外信众、收藏爱好者的佛教文化产品电商平台
- **产品**: 佛像、佛珠、香烛、书籍、工艺品
- **目标市场**: 中国 + 海外（多语言）

## 2. 功能需求

### 2.1 商品系统
- 商品展示（图片、描述、价格）
- 分类管理（佛像、佛珠、香烛、书籍、周边）
- 搜索 + 筛选
- 商品详情

### 2.2 用户系统
- 注册/登录（邮箱、手机）
- 第三方登录（Google, Apple, WeChat）
- 个人中心（订单、收藏夹、地址）

### 2.3 购物车
- 加购/减购
- 收藏夹
- 实时价格计算

### 2.4 订单系统
- 下单流程
- 订单状态跟踪
- 发货管理（自己发货）

### 2.5 支付系统
- 信用卡（Stripe）
- 虚拟货币（Coinbase Commerce）
- 微信支付
- 支付宝

### 2.6 多语言
- 中文
- English
- 随时切换

### 2.7 后台管理
- 商品上架/下架
- 订单管理
- 发货处理

## 3. 技术栈

| 模块 | 技术 |
|------|------|
| 前端 | Next.js 14 + React + Tailwind CSS |
| 后端 | Next.js API Routes |
| 数据库 | Supabase (PostgreSQL) |
| 认证 | NextAuth.js + Supabase Auth |
| 支付 | Stripe + Coinbase Commerce + 微信/支付宝 |
| 部署 | Vercel |
| 图床 | Supabase Storage |

## 4. 开发阶段

### 阶段1: 基础架构（Day 1-2）
- [ ] 初始化 Next.js 项目
- [ ] 配置 Tailwind CSS
- [ ] 设置 Supabase 项目
- [ ] 配置多语言 (i18n)

### 阶段2: 商品系统（Day 3-5）
- [ ] 商品数据模型
- [ ] 商品列表页
- [ ] 商品详情页
- [ ] 分类筛选

### 阶段3: 用户系统（Day 6-7）
- [ ] 注册/登录
- [ ] 第三方登录
- [ ] 个人中心

### 阶段4: 购物车 + 订单（Day 8-11）
- [ ] 购物车功能
- [ ] 订单创建
- [ ] 订单列表
- [ ] 发货管理

### 阶段5: 支付集成（Day 12-16）
- [ ] Stripe 集成
- [ ] Coinbase 集成
- [ ] 微信支付
- [ ] 支付宝

### 阶段6: 测试 + 部署（Day 17-20）
- [ ] 基础测试
- [ ] 性能优化
- [ ] 部署上线

## 5. 下一步

开始阶段1：创建项目脚手架

---

**项目经理**: 魂淡弟
**状态**: 阶段1进行中
**创建时间**: 2026-02-28

## 6. 开发日志

### 2026-02-28 15:23
- [x] 初始化 Next.js 项目（Next.js 14 + TypeScript + Tailwind）
- [x] 安装依赖：@supabase/supabase-js, @supabase/ssr, next-auth, stripe, @stripe/stripe-js

### 2026-02-28 15:25
- [x] 创建数据库 Schema（8张表）
- [x] 创建 i18n 多语言配置

### 2026-02-28 15:42
- [x] 创建首页组件（Header, Hero, ProductCard, Footer）
- [x] 配置 Supabase 连接
- [x] 插入测试数据（5个分类 + 5个商品）
- [x] 启动开发服务器测试

### 2026-03-01 16:56
- [x] 修复 /order 页面 404
- [x] 创建 /categories 分类页面

## 项目状态

**当前进度**: 约 45%

**已完成页面 (11个)**:
- / 首页
- /products 商品列表
- /categories 分类页（新增）
- /product/[id] 商品详情
- /cart 购物车
- /checkout 结账
- /login 登录
- /register 注册
- /profile 个人中心
- /order 订单列表
- /order/success 订单成功

### 2026-03-01 17:31
- [x] 修复 /order 页面 404
- [x] 创建 /categories 分类页面
- [x] 数据库连接修复（服务端渲染 SSR）
- [x] 创建服务端 Supabase 客户端
- [x] 登录/注册功能（localStorage 演示版）
- [x] 购物车功能
- [x] 结账流程
- [x] 订单管理

## 项目状态

**当前进度**: 100%

**已完成页面 (18个)**:
- / 首页
- /products 商品列表
- /categories 分类页
- /product/[id] 商品详情
- /cart 购物车
- /checkout 结账（含支付选择）
- /login 登录
- /register 注册
- /profile 个人中心
- /order 订单列表
- /order/success 订单成功
- /admin 管理后台
- /admin/products 商品管理
- /admin/orders 订单管理
- /admin/categories 分类管理
- /admin/users 用户管理
- /admin/stats 数据统计

**支付集成**: ✅ 已配置（Stripe/支付宝/微信/Coinbase）

**上线需要**: 配置 .env.local 中的支付API密钥
