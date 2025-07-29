import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-image.jpg';
import { 
  FileText, 
  Search, 
  BarChart3, 
  Users, 
  Shield, 
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Home as HomeIcon
} from 'lucide-react';

const Index = () => {
  const stats = [
    { label: 'Reports Filed', value: '2,847', icon: FileText, color: 'bg-primary' },
    { label: 'Fair Listings', value: '15,692', icon: HomeIcon, color: 'bg-success' },
    { label: 'Users Protected', value: '8,234', icon: Users, color: 'bg-accent' },
    { label: 'Cases Resolved', value: '1,429', icon: CheckCircle, color: 'bg-warning' },
  ];

  const features = [
    {
      icon: FileText,
      title: 'Report Discrimination',
      description: 'Easily document and report housing discrimination incidents with our secure, confidential platform.',
      href: '/report'
    },
    {
      icon: Search,
      title: 'Browse Fair Listings',
      description: 'Find verified rental listings with transparent host ratings and discrimination-free policies.',
      href: '/browse'
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'View data-driven insights on housing discrimination patterns and trends in your area.',
      href: '/dashboard'
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 bg-black/20"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white animate-slide-up">
              <Badge variant="accent" className="mb-6">
                Fighting Housing Discrimination
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Fair Housing for
                <span className="block text-accent-light">Everyone</span>
              </h1>
              <p className="text-xl mb-8 text-white/90 max-w-lg">
                Report discrimination, find verified fair listings, and access data-driven 
                insights to create equitable housing opportunities for all.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/report">
                  <Button size="lg" variant="accent" className="animate-scale-in">
                    Report Discrimination
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/browse">
                  <Button size="lg" variant="secondary" className="bg-white/20 text-white border-white/30 hover:bg-white hover:text-primary backdrop-blur">
                    Browse Listings
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4 animate-fade-in">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card key={stat.label} 
                    className="p-6 bg-white/95 backdrop-blur border-0 shadow-strong animate-hero-float"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gradient-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Our Mission: Equal Housing Opportunity
            </h2>
            <p className="text-lg text-muted-foreground">
              DRAMP empowers renters, especially international students and marginalized communities, 
              to fight housing discrimination through transparency, community support, and data-driven advocacy.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} 
                  className="p-8 hover:shadow-medium transition-all duration-300 hover:-translate-y-2 animate-scale-in group cursor-pointer"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="bg-gradient-hero w-14 h-14 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground mb-6">{feature.description}</p>
                  <Link to={feature.href}>
                    <Button variant="ghost" className="p-0 h-auto text-primary hover:text-primary-light">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-scale-in">
            <Shield className="h-16 w-16 text-white mx-auto mb-6 animate-hero-float" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of advocates working together to eliminate housing discrimination 
              and create fair opportunities for everyone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" variant="accent">
                  Get Started Today
                  <TrendingUp className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button size="lg" variant="secondary" className="bg-white/20 text-white border-white/30 hover:bg-white hover:text-primary backdrop-blur">
                  View Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;