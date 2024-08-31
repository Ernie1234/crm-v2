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

export function calculatePercentageChange(prices: number[]): number {
  // Check if the array has at least two elements
  if (prices.length < 2) {
    return 0; // Return 0 if the array has less than two elements
  }

  const [oldPrice, newPrice] = prices;

  // Calculate the percentage change
  const percentageChange = ((newPrice - oldPrice) / oldPrice) * 100;

  // Format the result to 1 decimal point
  return Math.round(percentageChange * 10) / 10;
}

export function getUIDFromAddress(
  address: string,
  uidPrefix: string = "UID"
): string {
  const uidIndex = address.indexOf(uidPrefix);
  if (uidIndex === -1) {
    return "";
  }
  return address.slice(uidIndex + uidPrefix.length);
}
export const getFormattedPriceChange = (prices: number[]) => {
  if (prices.length === 0) {
    return "0";
  } else if (prices.length === 1) {
    return `${prices[0].toFixed(2)} +0.00%`;
  }
  const calculatePercentage = (prices: number[]) => {
    if (prices.length < 2) return null;

    const [oldPrice, newPrice] = prices;
    const percentageChange = ((newPrice - oldPrice) / oldPrice) * 100;

    return {
      secondToLastPrice: oldPrice.toFixed(2),
      percentageChange: percentageChange.toFixed(2),
    };
  };

  const result = calculatePercentage(prices);

  if (result) {
    const { secondToLastPrice, percentageChange } = result;

    const formattedPercentage =
      Number(percentageChange) >= 0
        ? `+${percentageChange}%`
        : `${percentageChange}%`;

    return `${secondToLastPrice} ${formattedPercentage}`;
  }

  return "Not enough data to calculate.";
};
