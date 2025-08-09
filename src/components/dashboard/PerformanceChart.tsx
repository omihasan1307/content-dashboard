import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Calendar, BarChart3, TrendingUp } from 'lucide-react';
import { mockChartData } from '@/data/mockData';

type ChartType = 'line' | 'bar';
type TimeRange = 'daily' | 'monthly';

export function PerformanceChart() {
  const [chartType, setChartType] = useState<ChartType>('line');
  const [timeRange, setTimeRange] = useState<TimeRange>('daily');

  const ChartComponent = chartType === 'line' ? LineChart : BarChart;
  const DataComponent = chartType === 'line' ? Line : Bar;

  return (
    <Card className="card-elevated">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-chart-1" />
            Performance Analytics
          </CardTitle>
          
          <div className="flex items-center space-x-2">
            <div className="flex bg-muted rounded-lg p-1">
              <Button
                variant={timeRange === 'daily' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setTimeRange('daily')}
                className="h-8 px-3"
              >
                Daily
              </Button>
              <Button
                variant={timeRange === 'monthly' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setTimeRange('monthly')}
                className="h-8 px-3"
              >
                Monthly
              </Button>
            </div>
            
            <div className="flex bg-muted rounded-lg p-1">
              <Button
                variant={chartType === 'line' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setChartType('line')}
                className="h-8 px-3"
              >
                <TrendingUp className="h-4 w-4" />
              </Button>
              <Button
                variant={chartType === 'bar' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setChartType('bar')}
                className="h-8 px-3"
              >
                <BarChart3 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ChartComponent data={mockChartData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="date" 
                className="text-xs"
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              />
              <YAxis className="text-xs" />
              <Tooltip 
                labelFormatter={(value) => new Date(value).toLocaleDateString()}
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              
              {chartType === 'line' ? (
                <>
                  <Line 
                    type="monotone" 
                    dataKey="views" 
                    stroke="hsl(var(--chart-1))" 
                    strokeWidth={2}
                    dot={{ fill: 'hsl(var(--chart-1))', strokeWidth: 2, r: 4 }}
                    name="Views"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="likes" 
                    stroke="hsl(var(--chart-2))" 
                    strokeWidth={2}
                    dot={{ fill: 'hsl(var(--chart-2))', strokeWidth: 2, r: 4 }}
                    name="Likes"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="comments" 
                    stroke="hsl(var(--chart-3))" 
                    strokeWidth={2}
                    dot={{ fill: 'hsl(var(--chart-3))', strokeWidth: 2, r: 4 }}
                    name="Comments"
                  />
                </>
              ) : (
                <>
                  <Bar dataKey="views" fill="hsl(var(--chart-1))" name="Views" />
                  <Bar dataKey="likes" fill="hsl(var(--chart-2))" name="Likes" />
                  <Bar dataKey="comments" fill="hsl(var(--chart-3))" name="Comments" />
                </>
              )}
            </ChartComponent>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}