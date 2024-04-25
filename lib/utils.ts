export function formatPriceKR(price: number) {
  return price.toLocaleString();
}

export function formatDate(date: Date) {
  return date.toISOString().split('T')[0];
}
