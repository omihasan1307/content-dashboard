import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Eye, Heart, MessageCircle, TrendingUp } from 'lucide-react';
import { useDashboard } from '@/contexts/DashboardContext';

export function StatsCards() {
  const { state } = useDashboard();
  
  const totalArticles = state.articles.length;
  const publishedArticles = state.articles.filter(a => a.status === 'Published').length;
  const totalViews = state.articles.reduce((sum, article) => sum + article.views, 0);
  const totalLikes = state.articles.reduce((sum, article) => sum + article.likes, 0);
  const totalComments = state.articles.reduce((sum, article) => sum + article.comments, 0);

  const stats = [
    {
      title: 'Total Articles',
      value: totalArticles.toLocaleString(),
      change: '+12%',
      icon: FileText,
      color: 'text-chart-1'
    },
    {
      title: 'Published',
      value: publishedArticles.toLocaleString(),
      change: '+8%',
      icon: TrendingUp,
      color: 'text-chart-2'
    },
    {
      title: 'Total Views',
      value: totalViews.toLocaleString(),
      change: '+23%',
      icon: Eye,
      color: 'text-chart-3'
    },
    {
      title: 'Total Likes',
      value: totalLikes.toLocaleString(),
      change: '+15%',
      icon: Heart,
      color: 'text-chart-4'
    },
    {
      title: 'Total Comments',
      value: totalComments.toLocaleString(),
      change: '+9%',
      icon: MessageCircle,
      color: 'text-chart-5'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      {stats.map((stat) => (
        <Card key={stat.title} className="card-elevated">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">{stat.change}</span> from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}