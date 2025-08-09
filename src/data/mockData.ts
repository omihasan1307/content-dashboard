import { Article, ChartData } from '@/types/article';

export const mockArticles: Article[] = [
  {
    id: '1',
    title: 'Getting Started with React Server Components',
    content: 'Server Components are a new feature in React that allows you to write components that render on the server...',
    author: 'Sarah Chen',
    publishedDate: '2024-01-15',
    views: 12450,
    likes: 89,
    comments: 23,
    status: 'Published',
    category: 'React',
    tags: ['react', 'server-components', 'nextjs']
  },
  {
    id: '2',
    title: 'Advanced TypeScript Patterns for React Developers',
    content: 'Learn advanced TypeScript patterns that will make your React applications more type-safe and maintainable...',
    author: 'Mike Johnson',
    publishedDate: '2024-01-12',
    views: 8765,
    likes: 124,
    comments: 45,
    status: 'Published',
    category: 'TypeScript',
    tags: ['typescript', 'react', 'patterns']
  },
  {
    id: '3',
    title: 'Building Scalable Design Systems with Tailwind CSS',
    content: 'This comprehensive guide covers how to build and maintain scalable design systems using Tailwind CSS...',
    author: 'Emma Rodriguez',
    publishedDate: '2024-01-08',
    views: 15230,
    likes: 156,
    comments: 67,
    status: 'Published',
    category: 'Design',
    tags: ['tailwind', 'design-system', 'css']
  },
  {
    id: '4',
    title: 'Modern Authentication Patterns in Web Apps',
    content: 'Explore modern authentication patterns including OAuth, JWT, and session management...',
    author: 'David Kim',
    publishedDate: '2024-01-05',
    views: 9834,
    likes: 98,
    comments: 34,
    status: 'Draft',
    category: 'Security',
    tags: ['auth', 'security', 'oauth']
  },
  {
    id: '5',
    title: 'Optimizing React Performance: A Complete Guide',
    content: 'Learn how to identify and fix performance bottlenecks in your React applications...',
    author: 'Sarah Chen',
    publishedDate: '2024-01-03',
    views: 18976,
    likes: 234,
    comments: 89,
    status: 'Published',
    category: 'Performance',
    tags: ['react', 'performance', 'optimization']
  },
  {
    id: '6',
    title: 'Mastering CSS Grid and Flexbox Layouts',
    content: 'A deep dive into modern CSS layout techniques using Grid and Flexbox...',
    author: 'Alex Turner',
    publishedDate: '2024-01-01',
    views: 7432,
    likes: 76,
    comments: 19,
    status: 'Published',
    category: 'CSS',
    tags: ['css', 'grid', 'flexbox', 'layout']
  },
  {
    id: '7',
    title: 'State Management in Large React Applications',
    content: 'Compare different state management solutions for large-scale React applications...',
    author: 'Lisa Wang',
    publishedDate: '2023-12-28',
    views: 11567,
    likes: 143,
    comments: 52,
    status: 'Published',
    category: 'React',
    tags: ['react', 'state-management', 'redux', 'zustand']
  },
  {
    id: '8',
    title: 'Introduction to Web Accessibility Best Practices',
    content: 'Learn how to make your web applications accessible to users with disabilities...',
    author: 'Carlos Martinez',
    publishedDate: '2023-12-25',
    views: 6789,
    likes: 87,
    comments: 28,
    status: 'Draft',
    category: 'Accessibility',
    tags: ['a11y', 'accessibility', 'web-standards']
  },
  {
    id: '9',
    title: 'Building RESTful APIs with Node.js and Express',
    content: 'Step-by-step guide to building robust RESTful APIs using Node.js and Express...',
    author: 'Mike Johnson',
    publishedDate: '2023-12-22',
    views: 13245,
    likes: 167,
    comments: 73,
    status: 'Published',
    category: 'Backend',
    tags: ['nodejs', 'express', 'api', 'rest']
  },
  {
    id: '10',
    title: 'Progressive Web Apps: The Future of Mobile Web',
    content: 'Discover how Progressive Web Apps can provide native-like experiences on the web...',
    author: 'Emma Rodriguez',
    publishedDate: '2023-12-20',
    views: 9876,
    likes: 112,
    comments: 41,
    status: 'Published',
    category: 'Mobile',
    tags: ['pwa', 'mobile', 'web-app', 'service-worker']
  }
];

export const mockChartData: ChartData[] = [
  { date: '2024-01-01', views: 1200, likes: 45, comments: 12 },
  { date: '2024-01-02', views: 1350, likes: 52, comments: 18 },
  { date: '2024-01-03', views: 1100, likes: 38, comments: 9 },
  { date: '2024-01-04', views: 1480, likes: 67, comments: 23 },
  { date: '2024-01-05', views: 1620, likes: 73, comments: 31 },
  { date: '2024-01-06', views: 1390, likes: 59, comments: 19 },
  { date: '2024-01-07', views: 1750, likes: 81, comments: 27 },
  { date: '2024-01-08', views: 1890, likes: 94, comments: 35 },
  { date: '2024-01-09', views: 1675, likes: 76, comments: 22 },
  { date: '2024-01-10', views: 1820, likes: 89, comments: 29 },
  { date: '2024-01-11', views: 1950, likes: 98, comments: 41 },
  { date: '2024-01-12', views: 2100, likes: 112, comments: 48 },
  { date: '2024-01-13', views: 1980, likes: 103, comments: 37 },
  { date: '2024-01-14', views: 2250, likes: 125, comments: 52 },
  { date: '2024-01-15', views: 2400, likes: 142, comments: 61 }
];

export const authors = [
  'Sarah Chen',
  'Mike Johnson', 
  'Emma Rodriguez',
  'David Kim',
  'Alex Turner',
  'Lisa Wang',
  'Carlos Martinez'
];

export const categories = [
  'React',
  'TypeScript', 
  'Design',
  'Security',
  'Performance',
  'CSS',
  'Accessibility',
  'Backend',
  'Mobile'
];