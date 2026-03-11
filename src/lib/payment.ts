// 支付配置
// 使用说明：将以下配置添加到 .env.local

/*
# Stripe 配置（信用卡支付）
# 1. 访问 https://dashboard.stripe.com/register 注册账号
# 2. 获取 API Keys: Developers → API keys
# 3. 获取 Publishable Key 和 Secret Key

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_SECRET_KEY=sk_test_xxx

# Coinbase Commerce 配置（加密货币支付）
# 1. 访问 https://commerce.coinbase.com 注册账号
# 2. 获取 API Key

COINBASE_COMMERCE_KEY=xxx

# 微信支付配置
# 需要商户号和API密钥

WECHAT_APP_ID=xxx
WECHAT_MCH_ID=xxx
WECHAT_API_KEY=xxx

# 支付宝配置
# 需要商家账号和密钥

ALIPAY_APP_ID=xxx
ALIPAY_PRIVATE_KEY=xxx
ALIPAY_PUBLIC_KEY=xxx
*/

// Stripe 支付组件示例
'use client';

import { loadStripe } from '@stripe/stripe-js';

// TODO: 实现 stripe checkout session 创建
// 详细文档: https://stripe.com/docs/payments/checkout

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export async function handleStripePayment(amount: number, currency: string = 'cny') {
  const stripe = await stripePromise;
  if (!stripe) return;

  // TODO: 实现 checkout session 创建
  console.log('Stripe payment:', { amount, currency });

  // 跳转到 Stripe Checkout
  // const { error } = await stripe.redirectToCheckout({ sessionId });
  // if (error) {
  //   console.error('Stripe error:', error);
  // }
}

// Coinbase Commerce 支付
export async function handleCoinbasePayment(amount: number, currency: string = 'USD') {
  // 创建 Charge
  const response = await fetch('https://api.commerce.coinbase.com/charges', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CC-Api-Key': process.env.COINBASE_COMMERCE_KEY!,
    },
    body: JSON.stringify({
      name: '佛教文化产品',
      description: '购买佛教文化产品',
      pricing_type: 'fixed_price',
      local_price: {
        amount: amount.toString(),
        currency: currency,
      },
    }),
  });

  const data = await response.json();
  return data.data.hosted_url;
}

export default {};
