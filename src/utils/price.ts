export function formatPrice(price: number, currency: 'MAD' | 'EUR', language: 'en' | 'fr'): string {
  if (currency === 'EUR') {
    const converted = price / 10.8;
    return language === 'en'
      ? `€${converted.toFixed(2)}`
      : `${converted.toFixed(2)} €`;
  }
  return language === 'en'
    ? `${price.toFixed(0)} MAD`
    : `${price.toFixed(0)} DH`;
}
