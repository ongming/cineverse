// utils/revenueUtils.js
// Shared helper functions for financial calculations and currency formatting

/**
 * Calculates Return on Investment (ROI) percentage.
 * Formula: ((Revenue - Budget) / Budget) * 100
 * @param {number} budget - Production budget in USD
 * @param {number} revenue - Global gross revenue in USD
 * @returns {number} Rounded ROI percentage (can be positive or negative)
 */
export const calculateROI = (budget, revenue) => {
  if (!budget || budget === 0 || !revenue) return 0;
  return Math.round(((revenue - budget) / budget) * 100);
};

/**
 * Formats a numeric USD amount into short readable currency (Millions / Billions).
 * Example: 2920000000 -> "$2.92B", 711000000 -> "$711M"
 * @param {number} amount
 * @returns {string} Formatted short currency string
 */
export const formatUSD = (amount) => {
  if (!amount) return "$0M";
  if (amount >= 1000000000) {
    return `$${(amount / 1000000000).toFixed(2)}B`;
  }
  return `$${(amount / 1000000).toFixed(0)}M`;
};

/**
 * Formats a numeric USD amount into exact currency string with comma separators.
 * Example: 190000000 -> "$190,000,000"
 * @param {number} amount
 * @returns {string} Formatted exact currency string
 */
export const formatUSDExact = (amount) => {
  if (!amount) return "$0";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatReleaseDate = (dateStr) => {
  if (!dateStr) return null;
  const parts = dateStr.split("-");
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
  return dateStr;
};
// Format YYYY-MM-DD to DD/MM/YYYY
// Handle custom date selection from CustomDatePicker component
export const handleSelectCustomDate = (
  dateFormatted,
  setCustomDate,
  setSelectedDateIndex,
) => {
  if (dateFormatted) {
    setCustomDate(dateFormatted);
    setSelectedDateIndex("CUSTOM");
  } else {
    setCustomDate("");
    setSelectedDateIndex("ALL");
  }
};
