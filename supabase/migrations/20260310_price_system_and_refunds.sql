-- =====================================================
-- 如法阁数据库架构优化 - 价格体系与促销功能扩展
-- =====================================================

-- 1.产品价格体系扩展 - 添加原价和精选标记
-- =====================================================

-- 检查并添加原价字段
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'products' AND column_name = 'original_price'
    ) THEN
        ALTER TABLE products ADD COLUMN original_price numeric;
    END IF;
END $$;

-- 检查并添加精选/首页推荐字段
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'products' AND column_name = 'is_featured'
    ) THEN
        ALTER TABLE products ADD COLUMN is_featured boolean DEFAULT false;
    END IF;
END $$;

-- 2. 优惠券表（基础实现）
-- =====================================================
CREATE TABLE IF NOT EXISTS coupons (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    code text UNIQUE NOT NULL,
    type text NOT NULL CHECK (type IN ('percent', 'fixed')),
    value numeric NOT NULL,
    min_amount numeric DEFAULT 0,
    usage_limit int,
    used_count int DEFAULT 0,
    expires_at timestamptz,
    active boolean DEFAULT true,
    created_at timestamptz DEFAULT now()
);

-- RLS: 优惠券表策略
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;

-- 管理员可读写优惠券
CREATE POLICY "Admin full access to coupons" ON coupons
    FOR ALL
    TO authenticated
    USING (
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
    );

-- 3. 退款流程数据模型
-- =====================================================
CREATE TABLE IF NOT EXISTS refunds (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id uuid NOT NULL REFERENCES orders(id),
    reason text NOT NULL,
    amount numeric NOT NULL,
    status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'completed')),
    stripe_refund_id text,
    admin_note text,
    created_at timestamptz DEFAULT now(),
    resolved_at timestamptz
);

-- RLS: 退款表策略
ALTER TABLE refunds ENABLE ROW LEVEL SECURITY;

-- 用户只能查看自己的退款申请
CREATE POLICY "Users can view own refunds" ON refunds
    FOR SELECT
    TO authenticated
    USING (
        order_id IN (SELECT id FROM orders WHERE user_id = auth.uid())
    );

-- 管理员可管理所有退款
CREATE POLICY "Admin full access to refunds" ON refunds
    FOR ALL
    TO authenticated
    USING (
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
    );

-- 4. 游客订单安全隔离 - guest_token
-- =====================================================
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'orders' AND column_name = 'guest_token'
    ) THEN
        ALTER TABLE orders ADD COLUMN guest_token uuid DEFAULT gen_random_uuid();
    END IF;
END $$;

-- 5. 订单商品快照与定制字段
-- =====================================================

-- 检查并添加定制字段到 order_items
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'order_items' AND column_name = 'custom_note'
    ) THEN
        ALTER TABLE order_items ADD COLUMN custom_note text;
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'order_items' AND column_name = 'product_image_url'
    ) THEN
        ALTER TABLE order_items ADD COLUMN product_image_url text;
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'order_items' AND column_name = 'product_sku'
    ) THEN
        ALTER TABLE order_items ADD COLUMN product_sku text;
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'order_items' AND column_name = 'product_attrs'
    ) THEN
        ALTER TABLE order_items ADD COLUMN product_attrs jsonb;
    END IF;
END $$;

-- 6. 产品定制化支持
-- =====================================================

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'products' AND column_name = 'customizable'
    ) THEN
        ALTER TABLE products ADD COLUMN customizable boolean DEFAULT false;
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'products' AND column_name = 'custom_prompt_zh'
    ) THEN
        ALTER TABLE products ADD COLUMN custom_prompt_zh text;
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'products' AND column_name = 'custom_prompt_en'
    ) THEN
        ALTER TABLE products ADD COLUMN custom_prompt_en text;
    END IF;
END $$;

-- 7. 创建索引优化查询性能
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_products_is_featured ON products(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_products_original_price ON products(original_price) WHERE original_price IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_coupons_code ON coupons(code) WHERE active = true;
CREATE INDEX IF NOT EXISTS idx_refunds_order_id ON refunds(order_id);
CREATE INDEX IF NOT EXISTS idx_orders_guest_token ON orders(guest_token) WHERE guest_token IS NOT NULL;

-- =====================================================
-- 注释说明
-- =====================================================

COMMENT ON COLUMN products.original_price IS '划线原价，用于显示折扣';
COMMENT ON COLUMN products.is_featured IS '精选/首页推荐标记';
COMMENT ON COLUMN products.customizable IS '是否支持定制（如刻字、祈福心愿）';
COMMENT ON COLUMN products.custom_prompt_zh IS '定制提示中文';
COMMENT ON COLUMN products.custom_prompt_en IS '定制提示英文';
COMMENT ON COLUMN orders.guest_token IS '游客订单安全令牌';
COMMENT ON COLUMN order_items.custom_note IS '买家定制内容（祈福心愿/刻字）';
COMMENT ON COLUMN order_items.product_image_url IS '商品图快照（防下架后历史订单无图）';
