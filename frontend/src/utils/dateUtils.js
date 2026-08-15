/**
 * Formats an ISO date string into Vietnamese relative time ago (e.g. "Vừa xong", "5 phút trước", "2 giờ trước", "3 ngày trước")
 * @param {string | Date} dateInput
 * @returns {string}
 */
export function formatTimeAgo(dateInput) {
  if (!dateInput) return "Vừa xong";

  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return "Vừa xong";

  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  // If timestamp is slightly in the future due to clock drift, handle gracefully
  if (diffInSeconds < 60) {
    return "Vừa xong";
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} phút trước`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} giờ trước`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} ngày trước`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} tháng trước`;
  }

  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears} năm trước`;
}
