import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, CheckCircle, Star, Users, MapPin, Search, TrendingUp, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import safeHousingImage from '@/assets/safe-housing.jpg';
import italyCityscape from '@/assets/italy-cityscape.jpg';

const SafeListings = () => {
  const verificationFeatures = [
    {
      icon: Shield,
      title: 'Host Background Verification',
      description: 'Comprehensive background checks and identity verification for all hosts'
    },
    {
      icon: CheckCircle,
      title: 'AI-Powered Bias Detection',
      description: 'Advanced algorithms scan listings for discriminatory language and practices'
    },
    {
      icon: Star,
      title: 'Tenant Rating System',
      description: 'Verified reviews from previous tenants ensure transparency and accountability'
    },
    {
      icon: Users,
      title: 'Community Safety Reports',
      description: 'Real-time safety reports from our community of verified users'
    }
  ];

  const safetyStats = [
    { label: 'Verified Safe Listings', value: '15,692', icon: Shield, color: 'bg-success' },
    { label: 'Hosts Screened', value: '8,234', icon: Users, color: 'bg-primary' },
    { label: 'Safety Rating', value: '98.7%', icon: Award, color: 'bg-accent' },
    { label: 'Reports Prevented', value: '2,847', icon: TrendingUp, color: 'bg-warning' }
  ];

  const italianCities = [
    { name: 'Milan', listings: 2847, safetyScore: 98.5 },
    { name: 'Rome', listings: 3126, safetyScore: 97.8 },
    { name: 'Bologna', listings: 1534, safetyScore: 99.2 },
    { name: 'Florence', listings: 1823, safetyScore: 98.9 },
    { name: 'Naples', listings: 1267, safetyScore: 96.4 },
    { name: 'Turin', listings: 1098, safetyScore: 98.1 },
    { name: 'Venice', listings: 847, safetyScore: 97.6 },
    { name: 'Padua', listings: 623, safetyScore: 99.1 }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-cover bg-center" style={{ backgroundImage: `url(${safeHousingImage})` }}>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="container mx-auto text-center relative">
          <Badge variant="accent" className="mb-6">Verified Safe Housing</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Explore Safe Listings in Italy
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Browse thousands of verified, discrimination-free rental listings across Italian cities. 
            Every listing is screened for safety and fair housing practices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/browse">
              <Button size="lg" variant="accent">
                <Search className="mr-2 h-5 w-5" />
                Browse All Listings
              </Button>
            </Link>
            <Link to="/register">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Safety Stats */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Safety by the Numbers</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive verification process ensures every listing meets the highest safety standards.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {safetyStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={stat.label} className="shadow-soft text-center animate-fade-in">
                  <CardContent className="pt-6">
                    <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-2xl md:text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Verification Features */}
      <section className="py-16 px-4 bg-secondary/20">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">How We Keep You Safe</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our multi-layered verification process ensures every listing meets strict safety and fairness standards.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {verificationFeatures.map((feature, index) => (
              <Card key={feature.title} className="shadow-soft hover:shadow-lg transition-shadow animate-scale-in">
                <CardHeader className="text-center">
                  <div className="bg-gradient-hero w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Italian Cities */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Safe Housing Across Italy</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find verified listings in major Italian cities with high safety ratings and comprehensive verification.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {italianCities.map((city, index) => (
              <Card key={city.name} className="shadow-soft hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{city.name}</CardTitle>
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Verified Listings</span>
                      <Badge variant="outline">{city.listings.toLocaleString()}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Safety Score</span>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-warning fill-warning" />
                        <span className="font-medium">{city.safetyScore}%</span>
                      </div>
                    </div>
                    <Link to={`/browse?city=${encodeURIComponent(city.name)}`} className="block">
                      <Button className="w-full mt-3" size="sm">
                        View Listings
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 px-4 bg-cover bg-center" style={{ backgroundImage: `url(${italyCityscape})` }}>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="container mx-auto text-center relative">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Find Safe Housing?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of renters who trust DRAMP for safe, verified, and discrimination-free housing across Italy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/browse">
              <Button size="lg" variant="accent">
                Start Searching Now
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                Learn More About Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SafeListings;