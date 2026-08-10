export const formatUSD = (amount) => {
    if (!amount) return "$0M";
    if (amount >= 1000000000) {
      return `$${(amount / 1000000000).toFixed(2)}B`;
    }
    return `$${(amount / 1000000).toFixed(1)}M`;
  };