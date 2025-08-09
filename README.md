# Blog Admin Dashboard

A responsive admin dashboard for managing and analyzing blog content with advanced filtering, sorting, editing capabilities, and data visualization.

## Features

### 📊 Dashboard
- **Article Management Table**
  - Display articles with metadata (Title, Author, Date, Views, Likes, Comments)
  - Advanced filtering by author and date range
  - Multi-column sorting (views, likes, comments)
  - Pagination with customizable page sizes
  - Case-insensitive title search

### 📈 Performance Analytics
- Interactive data visualization using Recharts
  - Line/Bar chart showing article performance trends
  - Time period toggles (Daily/Monthly views)
  - Dynamic updates based on table filters

### ✏️ Content Editing
- Modal-based article editor
  - Edit Title, Content, and Status fields
  - Form validation for required fields
  - Success/error notifications
  - Mock API integration

## 🚀 Tech Stack

**Frontend:**
- React 18 with TypeScript
- Vite build tool
- Tailwind CSS for styling
- shadcn/ui for accessible components
- Recharts for data visualization
- Date-fns for date handling

**State Management:**
- React Context API
- Custom hooks for data fetching
