/**
 * Helper to format price in Bangladeshi Taka (৳) with South Asian numbering system
 * (e.g. ৳4,25,00,000 or ৳35,000/month)
 */
export function formatBDT(
  amount: number,
  options?: {
    compact?: boolean;
    period?: 'month' | 'year' | 'total';
    showPeriod?: boolean;
  }
): string {
  if (amount === undefined || amount === null || isNaN(amount)) {
    return '৳0';
  }

  const { compact = false, period, showPeriod = true } = options || {};

  let formatted = '';

  if (compact) {
    if (amount >= 10000000) {
      // 1 Crore = 10,000,000
      const crore = amount / 10000000;
      formatted = `৳${crore % 1 === 0 ? crore : crore.toFixed(2)} Cr`;
    } else if (amount >= 100000) {
      // 1 Lakh = 100,000
      const lakh = amount / 100000;
      formatted = `৳${lakh % 1 === 0 ? lakh : lakh.toFixed(2)} Lakh`;
    } else if (amount >= 1000) {
      const k = amount / 1000;
      formatted = `৳${k % 1 === 0 ? k : k.toFixed(1)}K`;
    } else {
      formatted = `৳${amount}`;
    }
  } else {
    // South Asian Comma Separator
    const str = Math.round(amount).toString();
    if (str.length <= 3) {
      formatted = `৳${str}`;
    } else {
      const lastThree = str.substring(str.length - 3);
      const otherNumbers = str.substring(0, str.length - 3);
      const withCommas = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
      formatted = `৳${withCommas},${lastThree}`;
    }
  }

  if (showPeriod && period && period !== 'total') {
    formatted += `/${period}`;
  }

  return formatted;
}

export function formatArea(sqFt: number): string {
  if (!sqFt) return '0 sq ft';
  return `${sqFt.toLocaleString('en-US')} sq ft`;
}

export function truncateText(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}
