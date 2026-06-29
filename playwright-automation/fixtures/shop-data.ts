export const CATEGORIES = {
  mensOuterwear: { name: "Men's Outerwear", href: '/list/mens_outerwear' },
  ladiesOuterwear: { name: 'Ladies Outerwear', href: '/list/ladies_outerwear' },
  mensTshirts: { name: "Men's T-Shirts", href: '/list/mens_tshirts' },
  ladiesTshirts: { name: "Ladies T-Shirts", href: '/list/ladies_tshirts' },
} as const;

export const PRODUCTS = {
  mensJacket: {
    href: '/detail/mens_outerwear/Men+s+Tech+Shell+Full-Zip',
    name: "Men's Tech Shell Full-Zip",
    expectedPrice: '$50.20',
  },
  ladiesJacket: {
    href: '/detail/ladies_outerwear/Ladies+Lightweight+Slim+Raincoat',
    name: 'Ladies Lightweight Slim Raincoat',
  },
} as const;

export const CHECKOUT_DATA = {
  valid: {
    email: 'testuser@example.com',
    phone: '5551234567',
    address: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    country: 'US',
    ccName: 'John Doe',
    ccNumber: '4111111111111111',
    ccCVV: '123',
    ccExpMonth: '12',
    ccExpYear: '2026',
  },
} as const;
