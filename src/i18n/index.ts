// 多语言配置
export const languages = {
  zh: '中文',
  en: 'English',
} as const;

export type Language = keyof typeof languages;

// 翻译内容
export const translations = {
  // 导航
  nav: {
    zh: {
      home: '首页',
      products: '全部商品',
      categories: '分类',
      cart: '购物车',
      profile: '我的',
      login: '登录',
      logout: '退出',
    },
    en: {
      home: 'Home',
      products: 'Products',
      categories: 'Categories',
      cart: 'Cart',
      profile: 'Profile',
      login: 'Login',
      logout: 'Logout',
    },
  },

  // 首页
  home: {
    zh: {
      hero: '精选佛教文化珍品',
      subtitle: '传承千年文化，启迪心灵智慧',
      featured: '精品推荐',
      newArrivals: '新品上架',
      categories: '商品分类',
    },
    en: {
      hero: 'Exquisite Buddhist Cultural Treasures',
      subtitle: 'Inheriting Millennium Culture, Enlightening Wisdom',
      featured: 'Featured',
      newArrivals: 'New Arrivals',
      categories: 'Categories',
    },
  },

  // 商品
  product: {
    zh: {
      addToCart: '加入购物车',
      buyNow: '立即购买',
      outOfStock: '缺货',
      inStock: '有货',
      price: '价格',
      quantity: '数量',
      description: '商品详情',
    },
    en: {
      addToCart: 'Add to Cart',
      buyNow: 'Buy Now',
      outOfStock: 'Out of Stock',
      inStock: 'In Stock',
      price: 'Price',
      quantity: 'Quantity',
      description: 'Description',
    },
  },

  // 购物车
  cart: {
    zh: {
      title: '购物车',
      empty: '购物车是空的',
      total: '合计',
      checkout: '结算',
      continueShopping: '继续购物',
    },
    en: {
      title: 'Shopping Cart',
      empty: 'Your cart is empty',
      total: 'Total',
      checkout: 'Checkout',
      continueShopping: 'Continue Shopping',
    },
  },

  // 分类
  category: {
    zh: {
      buddha: '佛像',
      beads: '佛珠',
      incense: '香烛',
      books: '书籍',
      craft: '工艺品',
    },
    en: {
      buddha: 'Buddha Statues',
      beads: 'Buddhist Beads',
      incense: 'Incense & Candles',
      books: 'Books',
      craft: 'Crafts',
    },
  },

  // 支付
  payment: {
    zh: {
      stripe: '信用卡',
      wechat: '微信支付',
      alipay: '支付宝',
      crypto: '虚拟货币',
    },
    en: {
      stripe: 'Credit Card',
      wechat: 'WeChat Pay',
      alipay: 'Alipay',
      crypto: 'Cryptocurrency',
    },
  },
} as const;

export type TranslationKeys = typeof translations;
