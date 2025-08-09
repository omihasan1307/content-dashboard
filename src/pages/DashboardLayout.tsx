// components/layouts/DashboardLayout.jsx
import { DashboardProvider } from "@/contexts/DashboardContext";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <DashboardProvider>
      <div className="min-h-screen bg-dashboard-bg flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <Header />

          {/* Page Content */}
          <main className="flex-1 p-6 space-y-6">
            <Outlet /> {/* This is where child pages will render */}
          </main>
        </div>
      </div>
    </DashboardProvider>
  );
}
