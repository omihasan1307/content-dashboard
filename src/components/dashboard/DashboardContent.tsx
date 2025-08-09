// pages/Dashboard.jsx
import { StatsCards } from "@/components/dashboard/StatsCards";
import { PerformanceChart } from "@/components/dashboard/PerformanceChart";
import { TableFilters } from "@/components/dashboard/TableFilters";
import { ArticlesTable } from "@/components/dashboard/ArticlesTable";
import { Pagination } from "@/components/dashboard/Pagination";

export default function Dashboard() {
  return (
    <>
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
        <div>
          <h2 className="text-xl font-semibold text-foreground">Articles</h2>
          <p className="text-sm text-muted-foreground">
            Manage your published and draft articles
          </p>
        </div>

        <TableFilters />
        <ArticlesTable />
        <Pagination />
      </div>
    </>
  );
}
