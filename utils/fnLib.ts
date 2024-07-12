export function formatPrice(price: number) {
  return price.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}
export function maskNumber(number: number) {
  const numberString = number.toString();
  const lastThreeDigits = numberString.slice(-3);
  const maskedDigits = numberString.slice(0, -3).replace(/\d/g, "*");
  return `${maskedDigits}${lastThreeDigits}`;
}
