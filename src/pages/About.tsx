import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Users, TrendingUp, Award, Heart, Lightbulb, Target, CheckCircle } from 'lucide-react';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';

const About = () => {
  const stats = [
    { label: 'Verified Listings', value: '10K+', icon: Shield },
    { label: 'Protected Users', value: '50K+', icon: Users },
    { label: 'Discrimination Reports Prevented', value: '2.5K+', icon: TrendingUp },
    { label: 'Trusted Hosts', value: '5K+', icon: Award }
  ];

  const values = [
    {
      icon: Shield,
      title: 'Safety First',
      description: 'Every listing is verified and every host is screened to ensure a safe housing experience for all users.'
    },
    {
      icon: Heart,
      title: 'Equal Opportunity',
      description: 'We believe everyone deserves fair access to housing regardless of their background, identity, or circumstances.'
    },
    {
      icon: Lightbulb,
      title: 'Transparency',
      description: 'Clear information, honest reviews, and open reporting help create an informed marketplace.'
    },
    {
      icon: Target,
      title: 'Accountability',
      description: 'Our platform holds hosts accountable for fair practices and provides recourse for discriminatory behavior.'
    }
  ];

  const features = [
    'Comprehensive host background verification',
    'Anonymous discrimination reporting system',
    'AI-powered bias detection in listings',
    'Legal support for discrimination cases',
    'Educational resources for fair housing',
    'Community-driven safety ratings'
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="absolute inset-0 bg-gradient-primary opacity-10"></div>
        <div className="container mx-auto text-center relative">
          <Badge variant="accent" className="mb-4">About DRAMP</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Revolutionizing Fair Housing
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            DRAMP (Discrimination Reporting and Monitoring Platform) is dedicated to creating a 
            transparent, accountable, and discrimination-free housing marketplace for everyone.
          </p>
          <Button size="lg" asChild>
            <a href="/safe-listings">Explore Safe Listings</a>
          </Button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center shadow-soft hover:shadow-lg transition-shadow animate-fade-in">
                <CardContent className="pt-6">
                  <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                  <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 bg-secondary/20">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground mb-8">
              To eliminate housing discrimination by providing a transparent platform where 
              accountability, safety, and equal opportunity are not just ideals, but built-in features 
              that protect every user's right to fair housing.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-primary" />
                    <span>The Problem</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Housing discrimination affects millions, with many cases going unreported due to 
                    lack of proper channels, fear of retaliation, and insufficient evidence collection 
                    systems.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="h-5 w-5 text-primary" />
                    <span>Our Solution</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    A comprehensive platform that combines listing verification, anonymous reporting, 
                    community ratings, and legal support to create a safer housing marketplace.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These core principles guide everything we do and shape how we build our platform.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="shadow-soft hover:shadow-lg transition-shadow animate-fade-in">
                <CardHeader className="text-center">
                  <value.icon className="h-12 w-12 text-primary mx-auto mb-3" />
                  <CardTitle className="text-lg">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-secondary/20">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Platform Features</h2>
              <p className="text-lg text-muted-foreground">
                Advanced tools and systems designed to protect users and promote fair housing practices.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3 p-4 bg-background rounded-lg shadow-soft">
                  <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Join the Movement</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Be part of the solution. Whether you're looking for housing or offering it, 
            help us build a discrimination-free future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <a href="/browse">Find Safe Housing</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="/report">Report Discrimination</a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;