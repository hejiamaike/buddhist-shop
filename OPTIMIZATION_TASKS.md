# 佛教商城优化任务清单

## 给Claude Code的指令

请按照以下优先级执行佛教商城的优化工作。

---

## 🔴 优先级P0（立即执行，今天完成）

### 1. 替换占位图片为实拍图

**任务详情：**
当前产品使用Unsplash占位图（如`https://images.unsplash.com/...`），缺乏真实感和品牌一致性。

**执行步骤：**

#### 步骤1.1：创建产品实拍计划
创建文件：`/Users/myairbook/.openclaw/workspace/buddhist-shop/docs/product-photoshoot-plan.md`

内容：
```markdown
# 产品实拍计划

## 拍摄准备

### 拍摄清单
- [ ] 准备禅意拍摄背景（书桌、香炉、经书、莲花装饰）
- [ ] 准备佛堂场景（供奉台、佛像、酥油灯、净水杯）
- [ ] 准备生活场景（茶具、禅修服、焚香）
- [ ] 确保光线自然（侧面窗光、柔光）
- [ ] 准备拍摄道具（产品、布景、装饰品）

### 拍摄安排
**修持法具（5个产品）**：
1. 小叶紫檀手串 - 禅修场景
2. 星月菩提手串 - 打坐场景
3. 白玉菩提手串 - 读书场景
4. 凤眼菩提手串 - 经行场景
5. 铜金刚铃 - 共修场景

**供养庄严（5个产品）**：
1. 铜镀金释迦牟尼佛像 - 佛堂场景
2. 铜镀金文殊菩萨像 - 供奉场景
3. 铜镀金药师佛像 - 佛堂场景
4. 琉璃莲花酥油灯 - 佛前场景
5. 水晶供碗套装 - 供奉场景

**法音经典（5个产品）**：
1. 心经书法卷轴 - 书房场景
2. 金刚经手抄本套装 - 书房场景
3. 楞严经全文套装 - 书房场景
4. 尼泊尔颂钵 - 静心场景
5. 藏式转经筒 - 修行场景

**随身护佑（6个产品）**：
1. 纯银六字真言嘎乌盒 - 佩戴展示
2. 朱砂无事牌 - 佩戴展示
3. 和田玉观音吊坠 - 佩戴展示
4. 和田玉貔貅吊坠 - 佩戴展示
5. 925纯银平安扣 - 佩戴展示
6. 黑曜石本命佛 - 佩戴展示

**禅意生活（8个产品）**：
1. 粗陶枯山水茶具 - 茶室场景
2. 铸铁壶煮水壶 - 煮茶场景
3. 竹制茶道六君子 - 品茶场景
4. 纯棉麻居士服 - 禅修场景
5. 禅修服套装 - 禅修场景
6. 古法沉香香膏 - 静心场景
7. 线香卧香炉 - 焚香场景
8. 无火香薰套装 - 空间净化场景

### 图片规格
- 格式：WebP（优先），PNG备选
- 尺寸：1200×800px（横屏），800×1200px（竖屏）
- 质量：85%以上，文件大小控制在500KB以内
- 命名：{product_id}_01.webp

### 上传到CDN
上传图片到项目公共资源目录，优化加载速度。
```

---

#### 步骤1.2：创建第一批产品实拍图（5个核心产品）

**目标产品**（按重要性排序）：
1. 如法棋（传世珍藏）
2. 小叶紫檀手串（流量主品）
3. 铜镀金释迦牟尼佛像（供养主打）
4. 尼泊尔颂钵（法音核心）
5. 纯棉麻居士服（禅意生活）

**每个产品创建2-3张图**：
- 主图：产品特写
- 场景图：禅意场景
- 细节图：工艺、纹理、包装

**图片文件路径**：`public/images/products/{category}/{product_id}/`

---

#### 步骤1.3：更新产品数据源

修改文件：`src/app/products/page.tsx`

**更改内容：**
1. 将`FALLBACK_PRODUCTS`中的图片URL替换为本地路径
2. 添加`imagePath`字段指向实拍图
3. 添加`hasRealImage`字段标识是否为实拍

**示例代码：**
```typescript
const REAL_PRODUCTS: Product[] = FALLBACK_PRODUCTS.map(p => ({
  ...p,
  imagePath: `/images/products/${p.category_id}/${p.id}_01.webp`,
  hasRealImage: true,
  specifications: p.specifications || {}
}))
```

---

### 2. 补充产品规格详情

**任务详情：**
当前产品规格不够详细，影响用户购买决策。

**执行步骤：**

#### 步骤2.1：创建产品规格数据文件

创建文件：`/Users/myairbook/.openclaw/workspace/buddhist-shop/docs/product-specs.json`

内容：
```json
{
  "xiaoye-zitan": {
    "specs": {
      "length": "20mm",
      "beadSize": "12mm",
      "weight": "35g",
      "beadCount": "108",
      "materialOrigin": "印度迈索尔",
      "craftsmanship": "手工正月",
      "density": "油密度高（1.1-1.2 g/cm³）",
      "patina": "自然氧化包浆",
      "scent": "自然檀香"
    },
    "careInstructions": {
      "wear": "日常佩戴可盘玩，避免接触水汗和化学品",
      "storage": "阴凉干燥处存放，避免阳光直射",
      "cleaning": "软布轻擦，不可用化学清洁剂"
    }
  },
  "xingyue-beads": {
    "specs": {
      "length": "9mm",
      "beadSize": "108",
      "weight": "45g",
      "materialOrigin": "尼泊尔高密",
      "craftsmanship": "手工正月",
      "density": "高密度正月",
      "pattern": "星点密布，月华环绕",
      "texture": "油润"
    }
  }
}
```

---

#### 步骤2.2：在产品详情页展示规格

修改文件：`src/app/product/[slug]/page.tsx`

**添加规格展示组件：**
```typescript
interface ProductSpecs {
  label: string
  value: string
  icon?: string
}

const specsDisplay = [
  { label: '长度', value: product.specifications?.length },
  { label: '珠子', value: product.specifications?.beadSize },
  { label: '重量', value: product.specifications?.weight },
  { label: '产地', value: product.specifications?.materialOrigin },
  { label: '工艺', value: product.specifications?.craftsmanship }
]

return (
  <div className="product-specs-section">
    <h3>产品规格</h3>
    <div className="specs-grid">
      {specsDisplay.map(spec => (
        <div key={spec.label} className="spec-item">
          <span className="spec-label">{spec.label}:</span>
          <span className="spec-value">{spec.value}</span>
        </div>
      ))}
    </div>
  </div>
)
```

---

### 3. 验证和优化数据库连接

**任务详情：**
当前代码中有Supabase配置，但未验证实际连接状态。

**执行步骤：**

#### 步骤3.1：创建数据库连接测试文件

创建文件：`src/lib/supabase-test.ts`

内容：
```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

console.log('Supabase URL:', supabaseUrl)
console.log('Supabase Key:', supabaseKey ? '已设置' : '未设置')

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Supabase配置缺失')
  process.exit(1)
}

export const supabase = createClient(supabaseUrl, supabaseKey)

export async function testConnection() {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('count', { count: 'exact', head: true })
      .single()

    if (error) {
      console.error('❌ 数据库连接失败:', error)
      return { success: false, error: error.message }
    }

    console.log('✅ 数据库连接成功')
    console.log('产品总数:', data?.count || 0)
    return { success: true, count: data?.count || 0 }
  } catch (err) {
    console.error('❌ 连接测试异常:', err)
    return { success: false, error: String(err) }
  }
}
```

---

#### 步骤3.2：创建数据库Schema文件

创建文件：`docs/database-schema.sql`

内容：
```sql
-- 产品表
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  name_en TEXT,
  slug TEXT UNIQUE NOT NULL,
  price INTEGER NOT NULL,
  original_price INTEGER,
  stock INTEGER DEFAULT 0,
  images TEXT[],
  description TEXT,
  description_long TEXT,
  category_id TEXT NOT NULL,
  subcategory TEXT,
  material TEXT,
  use_case TEXT,
  tags TEXT[],
  specifications JSONB,
  has_real_image BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  status TEXT DEFAULT 'active'
);

-- 用户表
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 订单表
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  items JSONB NOT NULL,
  total_price INTEGER NOT NULL,
  status TEXT DEFAULT 'pending',
  shipping_address TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 评价表
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  product_id UUID REFERENCES products(id),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  content TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_price ON products(price);
```

---

#### 步骤3.3：测试数据库连接

在终端执行：
```bash
cd /Users/myairbook/.openclaw/workspace/buddhist-shop
npm run dev
```

在浏览器访问：`http://localhost:3000/api/test-connection`

**预期结果：**
- ✅ 成功：显示产品总数
- ❌ 失败：显示错误信息

---

## 🟡 优先级P1（本周完成）

### 4. 实现用户评价系统

**任务详情：**
添加真实用户评价功能，建立信任度。

**执行步骤：**

#### 步骤4.1：创建评价组件

创建文件：`src/components/Reviews.tsx`

内容：
```typescript
'use client'

import { useState, useEffect } from 'react'
import { Star, MessageCircle } from 'lucide-react'
import { useReviews, Review } from '@/hooks/useReviews'

interface ReviewsProps {
  productId: string
}

export default function Reviews({ productId }: ReviewsProps) {
  const { reviews, loading, addReview } = useReviews(productId)
  const [newReview, setNewReview] = useState('')
  const [rating, setRating] = useState(5)
  const [showForm, setShowForm] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newReview.trim()) return

    await addReview(productId, {
      content: newReview,
      rating
    })

    setNewReview('')
    setShowForm(false)
  }

  return (
    <div className="reviews-section">
      <div className="reviews-header">
        <h3>用户评价 ({reviews.length})</h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-write-review"
        >
          写评价
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="review-form">
          <div className="rating-input">
            <label>评分：</label>
            <div className="stars">
              {[1, 2, 3, 4, 5].map(star => (
                <Star
                  key={star}
                  className={`star ${rating >= star ? 'filled' : ''}`}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
          </div>
          <textarea
            value={newReview}
            onChange={e => setNewReview(e.target.value)}
            placeholder="分享您的使用体验..."
            rows={3}
          />
          <button type="submit" className="btn-submit">提交评价</button>
        </form>
      )}

      <div className="reviews-list">
        {loading ? (
          <div className="loading">加载中...</div>
        ) : reviews.length === 0 ? (
          <div className="no-reviews">
            <MessageCircle className="no-reviews-icon" />
            <p>暂无评价，成为第一个评价的用户吧！</p>
          </div>
        ) : (
          reviews.map(review => (
            <div key={review.id} className="review-card">
              <div className="review-header">
                <div className="user-info">
                  <span className="user-avatar">{review.user_name?.[0] || '同修'}</span>
                </div>
                <div className="review-rating">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star
                      key={star}
                      className={`star ${review.rating >= star ? 'filled' : ''}`}
                      size={14}
                    />
                  ))}
                </div>
              </div>
              <p className="review-content">{review.content}</p>
              <p className="review-date">{new Date(review.created_at).toLocaleDateString()}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
```

---

#### 步骤4.2：创建评价Hook

创建文件：`src/hooks/useReviews.ts`

内容：
```typescript
'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface Review {
  id: string
  user_id: string
  user_name: string
  product_id: string
  rating: number
  content: string
  created_at: string
}

interface UseReviewsReturn {
  reviews: Review[]
  loading: boolean
  addReview: (productId: string, review: Omit<Review, 'id' | 'created_at'>) => Promise<void>
}

export function useReviews(productId: string): UseReviewsReturn {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchReviews() {
      setLoading(true)
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('product_id', productId)
        .order('created_at', { ascending: false })
        .limit(20)

      if (error) {
        console.error('Failed to fetch reviews:', error)
        setLoading(false)
        return
      }

      setReviews(data || [])
      setLoading(false)
    }

    fetchReviews()
  }, [productId])

  const addReview = async (productId: string, reviewData: Omit<Review, 'id' | 'created_at'>) => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      alert('请先登录')
      return
    }

    const { error } = await supabase
      .from('reviews')
      .insert({
        user_id: user.id,
        user_name: user.user_metadata?.name || '同修',
        product_id: productId,
        ...reviewData
      })

    if (error) {
      alert('提交失败，请重试')
    }
  }

  return { reviews, loading, addReview }
}
```

---

#### 步骤4.3：在产品详情页集成评价组件

修改文件：`src/app/product/[slug]/page.tsx`

添加：
```typescript
import Reviews from '@/components/Reviews'

// 在产品详情页的最后添加
<Reviews productId={product.id} />
```

---

### 5. 产品对比功能

**任务详情：**
用户可以方便对比多个产品，帮助购买决策。

**执行步骤：**

#### 步骤5.1：创建产品对比组件

创建文件：`src/components/ProductComparison.tsx`

内容：
```typescript
'use client'

import { useState, useEffect } from 'react'
import { useProducts } from '@/hooks/useProducts'
import { X, Check } from 'lucide-react'

interface ComparisonProps {
  productIds: string[]
}

export default function ProductComparison({ productIds }: ComparisonProps) {
  const { products } = useProducts()
  const [comparisonProducts, setComparisonProducts] = useState<Product[]>([])
  const [closedProductIds, setClosedProductIds] = useState<string[]>([])

  useEffect(() => {
    if (productIds && productIds.length > 0) {
      const selected = products.filter(p => productIds.includes(p.id))
      setComparisonProducts(selected)
    }
  }, [productIds, products])

  const allSpecs = comparisonProducts.length > 0
    ? Object.keys(comparisonProducts[0]?.specifications || {})
    : []

  return (
    <div className="comparison-modal">
      <div className="comparison-header">
        <h3>产品对比 ({comparisonProducts.length})</h3>
        <button onClick={() => setClosedProductIds([])} className="btn-close">
          <X size={16} />
        </button>
      </div>

      <div className="comparison-table">
        <table>
          <thead>
            <tr>
              <th>规格</th>
              {comparisonProducts.map(p => (
                <th key={p.id}>{p.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allSpecs.map(spec => (
              <tr key={spec}>
                <td className="spec-name">{spec}</td>
                {comparisonProducts.map(p => (
                  <td key={p.id}>
                    {p.specifications?.[spec] || '-'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {comparisonProducts.length < 2 && (
        <div className="comparison-tip">
          <p>提示：点击产品卡片上的"加入对比"按钮，最多对比4个产品</p>
        </div>
      )}
    </div>
  )
}
```

---

#### 步骤5.2：在产品卡片添加"加入对比"按钮

修改文件：`src/app/products/page.tsx`

在每个产品卡片添加：
```typescript
const addToComparison = (productId: string) => {
  const current = comparisonProducts || []
  if (current.includes(productId)) {
    // 移除
    setComparisonProducts(current.filter(id => id !== productId))
  } else if (current.length < 4) {
    // 添加
    setComparisonProducts([...current, productId])
  } else {
    alert('最多只能对比4个产品')
  }
}

// 在EnhancedProductCard中添加对比按钮
<button onClick={() => addToComparison(product.id)} className="btn-compare">
  <Check size={16} />
  对比
</button>
```

---

### 6. 智能推荐系统

**任务详情：**
基于用户浏览和购买历史，提供个性化推荐。

**执行步骤：**

#### 步骤6.1：创建推荐Hook

创建文件：`src/hooks/useRecommendations.ts`

内容：
```typescript
'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface UseRecommendationsReturn {
  recommendations: Product[]
  loading: boolean
}

export function useRecommendations(categoryId?: string): UseRecommendationsReturn {
  const [recommendations, setRecommendations] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchRecommendations() {
      setLoading(true)

      // 获取用户浏览历史
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setRecommendations([])
        setLoading(false)
        return
      }

      // 基于分类推荐相似产品
      let query = supabase
        .from('products')
        .select('*')

      if (categoryId) {
        query = query.eq('category_id', categoryId)
      }

      const { data, error } = await query
        .neq('id', getCurrentProductId())
        .order('created_at', { ascending: false })
        .limit(6)

      if (error) {
        console.error('Failed to fetch recommendations:', error)
      }

      setRecommendations(data || [])
      setLoading(false)
    }

    fetchRecommendations()
  }, [categoryId])

  return { recommendations, loading }
}
```

---

#### 步骤6.2：在产品详情页显示推荐

修改文件：`src/app/product/[slug]/page.tsx`

添加：
```typescript
import { useRecommendations } from '@/hooks/useRecommendations'

// 在产品详情页添加
const { recommendations, loading } = useRecommendations(product.category_id)

if (recommendations.length > 0) {
  return (
    <section className="recommendations-section">
      <h3>相关推荐</h3>
      <div className="recommendations-grid">
        {loading ? (
          <div className="loading">加载推荐中...</div>
        ) : (
          recommendations.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </section>
  )
}
```

---

## 🟢 优先级P2（本月完成）

### 7. 性能优化

**任务详情：**
提升页面加载速度和用户体验。

**执行步骤：**

#### 步骤7.1：图片懒加载

创建文件：`src/components/ImageLazyLoad.tsx`

内容：
```typescript
'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

interface LazyImageProps {
  src: string
  alt: string
  className?: string
}

export default function LazyImage({ src, alt, className = '' }: LazyImageProps) {
  const [isInView, setIsInView] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
      { threshold: 0.1 }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={imgRef} className={`lazy-image-wrapper ${className}`}>
      {!isInView ? (
        <div className="image-placeholder">加载中...</div>
      ) : (
        <Image
          src={src}
          alt={alt}
          className="lazy-image"
          loading="lazy"
        />
      )}
    </div>
  )
}
```

---

#### 步骤7.2：代码分割和优化

修改文件：`next.config.ts`

添加：
```typescript
/** @type {import('next').NextConfig} */
const nextConfig: import('next').NextConfig = {
  // ...现有配置

  // 优化配置
  webpack: (config, { isServer }) => {
    return {
      ...config,
      optimization: {
        splitChunks: {
          chunks: 'all',
          minSize: 20000,
          maxSize: 244000,
        }
      }
    }
  },

  // ...其他配置
}
```

---

### 8. SEO优化

**任务详情：**
优化搜索引擎排名和社交媒体分享。

**执行步骤：**

#### 步骤8.1：优化元数据

修改文件：`src/app/products/page.tsx`

添加动态元数据：
```typescript
export async function generateMetadata({ params }: { params: { category?: string } }): Promise<Metadata> {
  const category = params.category
  const categoryInfo = CATEGORIES.find(c => c.slug === category)

  return {
    title: `${categoryInfo?.name} | 如法阁`,
    description: `精选${categoryInfo?.fullDesc}，传承千年智慧`,
    keywords: `${categoryInfo?.name}, 佛教文化, 法器, 如法阁`,
    openGraph: {
      title: `${categoryInfo?.name} | 如法阁`,
      description: categoryInfo?.fullDesc,
      images: [`${process.env.NEXT_PUBLIC_SITE_URL}/og-images/${category}.jpg`],
      type: 'website',
    locale: 'zh_CN',
    siteName: '如法阁'
    }
  }
}
```

---

#### 步骤8.2：创建sitemap

创建文件：`src/app/sitemap.ts`

内容：
```typescript
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.SitemapRoute {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rufage.com'

  // 所有产品URL
  const productUrls = FALLBACK_PRODUCTS.map(product => ({
    url: `${baseUrl}/product/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly'
  }))

  // 分类页面URL
  const categoryUrls = CATEGORIES.map(category => ({
    url: `${baseUrl}/products?category=${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily'
  }))

  return {
    ...productUrls,
    ...categoryUrls
  }
}
```

---

#### 步骤8.3：创建robots.txt

创建文件：`public/robots.txt`

内容：
```
User-agent: *
Allow: /

Sitemap: https://rufage.com/sitemap.xml
```

---

### 9. 支付集成

**任务详情：**
实现完整的线上支付流程。

**执行步骤：**

#### 步骤9.1：创建支付页面

创建文件：`src/app/checkout/page.tsx`

内容：
```typescript
'use client'

import { useState } from 'react'
import { useCart } from '@/contexts/CartProvider'
import { Lock, CreditCard } from 'lucide-react'

export default function CheckoutPage() {
  const { cart, clearCart } = useCart()
  const [step, setStep] = useState(1) // 1: 地址 2: 支付 3: 确认 4: 完成

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    paymentMethod: 'wechat'
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // 创建订单
    const { error } = await supabase
      .from('orders')
      .insert({
        user_id: (await supabase.auth.getUser())?.data?.user?.id,
        items: cart.items,
        total_price: cart.total,
        status: 'pending',
        shipping_address: formData.address
      })

    if (error) {
      alert('订单创建失败')
      return
    }

    clearCart()
    setStep(4)
  }

  return (
    <div className="checkout-page">
      <h1>结算</h1>
      
      {step === 1 && (
        <form onSubmit={handleSubmit} className="checkout-form">
          <h2>配送信息</h2>
          <input
            type="text"
            placeholder="收件人姓名"
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
            required
          />
          <input
            type="tel"
            placeholder="联系电话"
            value={formData.phone}
            onChange={e => setFormData({...formData, phone: e.target.value})}
            required
          />
          <textarea
            placeholder="收货地址"
            value={formData.address}
            onChange={e => setFormData({...formData, address: e.target.value})}
            required
          />
          <button type="submit">下一步</button>
        </form>
      )}

      {step === 2 && (
        <div className="payment-method">
          <h2>选择支付方式</h2>
          <button onClick={() => setFormData({...formData, paymentMethod: 'wechat'})}>
            <WeChatPay size={32} />
            微信支付
          </button>
          <button onClick={() => setFormData({...formData, paymentMethod: 'alipay'})}>
            <Alipay size={32} />
            支付宝
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="order-summary">
          <h2>订单确认</h2>
          <div className="summary-items">
            {cart.items.map(item => (
              <div key={item.id} className="summary-item">
                <span>{item.name}</span>
                <span>¥{item.price}</span>
              </div>
            ))}
          </div>
          <div className="summary-total">
            <span>总计：</span>
            <span>¥{cart.total}</span>
          </div>
          <button onClick={handleSubmit}>确认支付</button>
        </div>
      )}

      {step === 4 && (
        <div className="order-complete">
          <Lock className="success-icon" size={48} />
          <h2>订单提交成功！</h2>
          <p>我们将尽快安排发货，预计3-5个工作日内送达。</p>
          <p>订单号：{orderId}</p>
        </div>
      )}
    </div>
  )
}
```

---

#### 步骤9.2：微信支付集成

创建文件：`src/lib/wechat-pay.ts`

内容：
```typescript
// 微信支付SDK集成（需要微信支付商户号）
// 注意：此为示例代码，实际集成需要申请微信支付商户号

interface WeChatPayParams {
  orderId: string
  amount: number
  description: string
  notifyUrl: string
  returnUrl: string
}

export async function createWeChatOrder(params: WeChatPayParams) {
  // 调用微信支付统一下单API
  const response = await fetch('https://api.mch.weixin.qq.com/pay/unifiedorder', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.WECHAT_PAY_API_KEY}`
    },
    body: JSON.stringify(params)
  })

  const result = await response.json()
  
  if (result.return_code === 'SUCCESS') {
    // 生成支付二维码
    return {
      success: true,
      qrCodeUrl: result.code_url
    }
  } else {
    return {
      success: false,
      error: result.return_msg
    }
  }
}
```

---

#### 步骤9.3：数据分析埋点

创建文件：`src/lib/analytics.ts`

内容：
```typescript
// 用户行为追踪
interface TrackEvent {
  event: string
  properties?: Record<string, any>
}

export function trackEvent(event: string, properties?: TrackEvent['properties']) {
  // 发送到分析平台
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', {
      event_name: event,
      ...properties
    })
  }

  console.log('Track:', event, properties)
}

// 预定义事件
export const Events = {
  // 产品相关
  PRODUCT_VIEW: 'product_view',
  ADD_TO_CART: 'add_to_cart',
  REMOVE_FROM_CART: 'remove_from_cart',
  CHECKOUT_INITIATE: 'checkout_initiate',
  ORDER_COMPLETE: 'order_complete',
  
  // 用户行为
  SEARCH: 'search',
  FILTER: 'filter',
  CATEGORY_VIEW: 'category_view',
  
  // 页面行为
  PAGE_VIEW: 'page_view',
  SCROLL_DEPTH: 'scroll_depth'
}
```

---

## 📝 实施检查清单

完成每个步骤后，请勾选：

### P0 任务
- [ ] 步骤1.1：创建产品实拍计划文档
- [ ] 步骤1.2：创建第一批实拍图（5个核心产品）
- [ ] 步骤1.3：更新产品数据源
- [ ] 步骤2.1：创建产品规格数据文件
- [ ] 步骤2.2：在产品详情页展示规格
- [ ] 步骤3.1：创建数据库连接测试文件
- [ ] 步骤3.2：创建数据库Schema文件
- [ ] 步骤3.3：测试数据库连接

### P1 任务
- [ ] 步骤4.1：创建评价组件
- [ ] 步骤4.2：创建评价Hook
- [ ] 步骤4.3：在产品详情页集成评价组件
- [ ] 步骤5.1：创建产品对比组件
- [ ] 步骤5.2：在产品卡片添加"加入对比"按钮
- [ ] 步骤6.1：创建推荐Hook
- [ ] 步骤6.2：在产品详情页显示推荐

### P2 任务
- [ ] 步骤7.1：图片懒加载组件
- [ ] 步骤7.2：代码分割配置
- [ ] 步骤8.1：优化元数据
- [ ] 步骤8.2：创建sitemap
- [ ] 步骤8.3：创建robots.txt

### 支付集成
- [ ] 步骤9.1：创建支付页面
- [ ] 步骤9.2：微信支付集成（需要商户号）
- [ ] 步骤9.3：数据分析埋点

---

## 💡 给Claude Code的建议

### 开发优先级

1. **先完成P0任务**（占位图替换+数据库连接）
2. **然后完成P1任务**（评价系统+产品对比+智能推荐）
3. **最后完成P2任务**（性能优化+SEO+支付）

### 技术注意事项

1. **保持现有代码结构**，不要重写整个文件
2. **增量式开发**，每次只修改必要的部分
3. **测试每个功能**，确保没有破坏现有功能
4. **保持设计一致性**，遵循现有的佛教美学风格

### 沟通机制

- 每完成一个模块，更新此文件并告知进度
- 遇到问题立即在会话中沟通
- 重要决策需要与魂淡哥确认

---

## 📞 开始执行

Claude Code，请按照上述任务清单开始执行优化工作。建议从**P0任务**开始：

1. 首先完成数据库连接验证（步骤3）
2. 然后替换占位图片（步骤1）
3. 接着实现用户评价系统（步骤4）

每完成一个任务，请在此文件末尾添加完成记录。
