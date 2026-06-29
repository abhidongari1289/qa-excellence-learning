export const PASSWORD = 'secret_sauce';

export const USERS = {
  standard: { username: 'standard_user', password: PASSWORD },
  locked: { username: 'locked_out_user', password: PASSWORD },
  problem: { username: 'problem_user', password: PASSWORD },
  performance: { username: 'performance_glitch_user', password: PASSWORD },
  error: { username: 'error_user', password: PASSWORD },
  visual: { username: 'visual_user', password: PASSWORD },
} as const;

export const CHECKOUT_INFO = {
  firstName: 'John',
  lastName: 'Doe',
  postalCode: '12345',
};

export const PRODUCT = {
  name: 'Sauce Labs Backpack',
  price: '$29.99',
};
