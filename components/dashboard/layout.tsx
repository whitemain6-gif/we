import { Sidebar } from './sidebar';
import { Header } from './header';
import { GlobalFooter } from './global-footer';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar - fixed on desktop, overlay on mobile */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden md:ml-0">
        {/* Header */}
        <Header />

        {/* Page content */}
        <main className="flex-1 overflow-y-scroll bg-background flex flex-col relative">
          <div className="flex-1 mx-auto px-4 w-full sm:px-6 lg:px-8 py-8 max-w-7xl animate-page-in">
            {children}
          </div>
          <GlobalFooter />
        </main>
      </div>
    </div>
  );
}
