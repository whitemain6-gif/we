import { DashboardLayout } from '@/components/dashboard/layout';

export const metadata = {
  title: 'Dashboard | Corefinity',
  description: 'Cloud hosting control panel',
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
