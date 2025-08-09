import { DashboardProvider } from '@/contexts/DashboardContext';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { Header } from '@/components/dashboard/Header';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { PerformanceChart } from '@/components/dashboard/PerformanceChart';
import { TableFilters } from '@/components/dashboard/TableFilters';
import { ArticlesTable } from '@/components/dashboard/ArticlesTable';
import { Pagination } from '@/components/dashboard/Pagination';

export default function Dashboard() {
  return (
    <DashboardProvider>
      <div className="min-h-screen bg-dashboard-bg flex">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <Header />
          
          {/* Main Content Area */}
          <main className="flex-1 p-6 space-y-6">
            {/* Stats Cards */}
            <div>
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
                <p className="text-muted-foreground">
                  Monitor and manage your content performance
                </p>
              </div>
              <StatsCards />
            </div>

            {/* Performance Chart */}
            <PerformanceChart />

            {/* Articles Management */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-foreground">Articles</h2>
                  <p className="text-sm text-muted-foreground">
                    Manage your published and draft articles
                  </p>
                </div>
              </div>

              {/* Filters */}
              <TableFilters />

              {/* Articles Table */}
              <ArticlesTable />

              {/* Pagination */}
              <Pagination />
            </div>
          </main>
        </div>
      </div>
    </DashboardProvider>
  );
}