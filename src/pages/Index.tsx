import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { 
  BarChart3, 
  Users, 
  FileText, 
  TrendingUp, 
  ArrowRight,
  Shield,
  Zap,
  Globe,
  LogIn
} from 'lucide-react';

export function Index() {
  const { isAuthenticated } = useAuth();
  
  const features = [
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Comprehensive insights into your content performance with real-time data visualization."
    },
    {
      icon: Users,
      title: "User Management",
      description: "Manage team members, assign roles, and control access permissions efficiently."
    },
    {
      icon: FileText,
      title: "Content Management",
      description: "Create, edit, and organize your content with our intuitive editing interface."
    },
    {
      icon: TrendingUp,
      title: "Performance Tracking",
      description: "Monitor engagement metrics, track growth, and optimize your content strategy."
    },
    {
      icon: Shield,
      title: "Security First",
      description: "Enterprise-grade security with role-based access control and data protection."
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized performance ensures your dashboard loads quickly and runs smoothly."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              New Dashboard Experience
            </Badge>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Content Management
            <br />
            Made Simple
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Powerful admin dashboard for managing articles, tracking performance, 
            and analyzing user engagement with beautiful charts and filters.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isAuthenticated ? (
              <Button asChild size="lg" className="button-primary">
                <Link to="/dashboard">
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            ) : (
              <>
                <Button asChild size="lg" className="button-primary">
                  <Link to="/login">
                    Sign In
                    <LogIn className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                
                <Button variant="outline" size="lg">
                  <Globe className="mr-2 h-4 w-4" />
                  View Demo
                </Button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built with modern technologies and best practices to deliver 
              an exceptional content management experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="card-elevated hover:shadow-elegant transition-all duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="card-elevated p-8 border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl mb-4">
                Ready to Get Started?
              </CardTitle>
              <CardDescription className="text-lg">
                Join thousands of content creators who trust our platform 
                to manage and analyze their content performance.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!isAuthenticated && (
                <Button asChild size="lg" className="button-primary">
                  <Link to="/login">
                    Start Your Journey
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

export default Index;