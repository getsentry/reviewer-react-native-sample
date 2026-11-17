import { formatPrice, totalCents } from '../utils/cart';

describe('totalCents', () => {
  it('adds price times quantity', () => {
    expect(
      totalCents([
        { id: 'a', name: 'Apple', priceCents: 150, quantity: 2 },
        { id: 'b', name: 'Bread', priceCents: 320, quantity: 1 },
      ]),
    ).toBe(620);
  });

  it('is zero for an empty cart', () => {
    expect(totalCents([])).toBe(0);
  });
});

describe('formatPrice', () => {
  it('formats cents as dollars', () => {
    expect(formatPrice(620)).toBe('$6.20');
  });
});
