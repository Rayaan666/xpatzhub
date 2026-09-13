// Replace placeholder performance metrics with verified XPATZHUB data before production launch.
export const performanceMetrics = [
  { id: 'search', category: 'Search Visibility', value: '+120%', caption: 'increase in organic traffic' },
  { id: 'traffic', category: 'Website Traffic', value: '2.5X', caption: 'more qualified visitors' },
  { id: 'leads', category: 'Qualified Leads', value: '+180%', caption: 'increase in leads' },
  { id: 'paid', category: 'Paid Campaign Performance', value: '3.4X', caption: 'average ROAS' },
  { id: 'social', category: 'Social Engagement', value: '+250%', caption: 'increase in engagement' },
  { id: 'conversion', category: 'Conversion Growth', value: '+90%', caption: 'increase in conversions' },
];
export const dashboardMetrics = [
  { label: 'Total Users', value: '245K', change: '+42%' },
  { label: 'Conversions', value: '3.8K', change: '+63%' },
  { label: 'Conversion Rate', value: '4.2%', change: '+1.8%' },
];
// Set true only after both metric sets have been checked against approved source data.
export const performanceDataVerified = false;
// Add only verified clients: { name: 'Client name', src: '/assets/clients/logo.svg' }.
export const clientLogos = [];
export const clientPlaceholders = Array.from({ length: 6 }, (_, i) => `CLIENT ${String(i + 1).padStart(2, '0')}`);
