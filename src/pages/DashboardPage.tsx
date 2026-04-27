import {
  Users, AlertTriangle, Activity, Calendar, BedDouble, UserCheck,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { NotificationBanner } from '@/components/common/NotificationBanner';
import { dashboardKpis } from '@/data/mockAnalytics';
import { mockPatients } from '@/data/mockPatients';
import { formatNumber, getInitials } from '@/utils/formatters';
import { formatRelativeTime } from '@/utils/date';
import { useAuthStore } from '@/features/auth';

const kpiConfig = [
  {
    label: 'Total Patients',
    value: dashboardKpis.totalPatients,
    icon: Users,
    color: 'bg-primary-100 text-primary-600 dark:bg-primary-900/40 dark:text-primary-300',
    change: '+12.5%',
  },
  {
    label: 'Critical Cases',
    value: dashboardKpis.criticalCases,
    icon: AlertTriangle,
    color: 'bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-300',
    change: '-3.2%',
  },
  {
    label: 'Active Patients',
    value: dashboardKpis.activePatients,
    icon: Activity,
    color: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-300',
    change: '+5.8%',
  },
  {
    label: 'Appointments Today',
    value: dashboardKpis.appointmentsToday,
    icon: Calendar,
    color: 'bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-300',
    change: '+8.1%',
  },
  {
    label: 'Beds Occupied',
    value: `${dashboardKpis.bedsOccupied}/${dashboardKpis.bedsTotal}`,
    icon: BedDouble,
    color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-300',
    change: '65% util',
  },
  {
    label: 'Recovered (Month)',
    value: dashboardKpis.recoveredThisMonth,
    icon: UserCheck,
    color: 'bg-cyan-100 text-cyan-600 dark:bg-cyan-900/40 dark:text-cyan-300',
    change: '+18.4%',
  },
];

const DashboardPage = () => {
  const user = useAuthStore((s) => s.user);
  const recentPatients = mockPatients.slice(0, 5);

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  })();

  return (
    <div className="space-y-6 animate-fade-in">
      <NotificationBanner />

      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 sm:text-3xl">
          {greeting}, {user?.email?.split('@')[0] ?? 'Doctor'} 👋
        </h1>
        <p className="mt-1 text-slate-600 dark:text-slate-400">
          Here's what's happening at your hospital today.
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {kpiConfig.map(({ label, value, icon: Icon, color, change }) => (
          <Card key={label}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    {label}
                  </p>
                  <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-slate-100">
                    {typeof value === 'number' ? formatNumber(value) : value}
                  </p>
                  <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400">
                    {change} vs last month
                  </p>
                </div>
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${color}`}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Patients */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Patients</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-slate-100 dark:divide-slate-700">
            {recentPatients.map((p) => (
              <div key={p.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                {p.avatarUrl ? (
                  <img
                    src={p.avatarUrl}
                    alt={p.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-sm font-semibold text-primary-700 dark:bg-primary-900/30 dark:text-primary-300">
                    {getInitials(p.name)}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-slate-900 dark:text-slate-100">
                    {p.name}
                  </p>
                  <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                    {p.condition} · {p.doctor}
                  </p>
                </div>
                <div className="hidden text-right sm:block">
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {formatRelativeTime(p.lastVisit)}
                  </p>
                </div>
                <Badge
                  variant={
                    p.status === 'critical'
                      ? 'danger'
                      : p.status === 'recovered'
                      ? 'success'
                      : p.status === 'admitted'
                      ? 'warning'
                      : 'info'
                  }
                  className="capitalize"
                >
                  {p.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;