import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, AlertTriangle, Shield, Users, MapPin, Calendar, FileText } from 'lucide-react';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';

// Mock data for charts
const monthlyReports = [
  { month: 'Jan', reports: 45, resolved: 38 },
  { month: 'Feb', reports: 52, resolved: 41 },
  { month: 'Mar', reports: 38, resolved: 35 },
  { month: 'Apr', reports: 61, resolved: 48 },
  { month: 'May', reports: 55, resolved: 52 },
  { month: 'Jun', reports: 67, resolved: 58 }
];

const discriminationTypes = [
  { name: 'Race/Ethnicity', value: 35, color: '#8b5cf6' },
  { name: 'National Origin', value: 28, color: '#06b6d4' },
  { name: 'Religion', value: 15, color: '#10b981' },
  { name: 'Gender', value: 12, color: '#f59e0b' },
  { name: 'Other', value: 10, color: '#ef4444' }
];

const locationData = [
  { city: 'New York', reports: 125, risk: 'high' },
  { city: 'Los Angeles', reports: 89, risk: 'medium' },
  { city: 'Chicago', reports: 76, risk: 'medium' },
  { city: 'Boston', reports: 45, risk: 'low' },
  { city: 'San Francisco', reports: 38, risk: 'low' }
];

const Dashboard = () => {
  const totalReports = 1247;
  const totalListings = 8934;
  const totalUsers = 15672;
  const resolutionRate = 78;

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'destructive';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'secondary';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Fair Housing Analytics</h1>
          <p className="text-muted-foreground">
            Real-time insights into housing discrimination patterns and platform activity.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalReports.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1 text-success" />
                  +12% from last month
                </span>
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Verified Listings</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalListings.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1 text-success" />
                  +8% from last month
                </span>
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalUsers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1 text-success" />
                  +15% from last month
                </span>
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resolution Rate</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{resolutionRate}%</div>
              <Progress value={resolutionRate} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">
                <span className="flex items-center">
                  <TrendingDown className="h-3 w-3 mr-1 text-destructive" />
                  -3% from last month
                </span>
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Monthly Reports Trend */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Monthly Reports & Resolutions</CardTitle>
              <CardDescription>
                Tracking discrimination reports and resolution progress over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyReports}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="reports" fill="hsl(var(--primary))" name="Reports" />
                    <Bar dataKey="resolved" fill="hsl(var(--success))" name="Resolved" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Discrimination Types */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Discrimination Categories</CardTitle>
              <CardDescription>
                Distribution of reported discrimination types
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={discriminationTypes}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {discriminationTypes.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* High-Risk Locations */}
        <Card className="shadow-soft mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-5 w-5" />
              <span>High-Risk Locations</span>
            </CardTitle>
            <CardDescription>
              Cities with the highest concentration of discrimination reports
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {locationData.map((location, index) => (
                <div key={location.city} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl font-bold text-muted-foreground">
                      #{index + 1}
                    </div>
                    <div>
                      <h4 className="font-medium">{location.city}</h4>
                      <p className="text-sm text-muted-foreground">
                        {location.reports} reports this year
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge variant={getRiskColor(location.risk) as any}>
                      {location.risk.charAt(0).toUpperCase() + location.risk.slice(1)} Risk
                    </Badge>
                    <div className="w-32">
                      <Progress 
                        value={(location.reports / 150) * 100} 
                        className="h-2"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Recent Activity</span>
            </CardTitle>
            <CardDescription>
              Latest reports and system updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-4 p-4 border border-border rounded-lg">
                <div className="bg-destructive/10 p-2 rounded-full">
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">New discrimination report filed</h4>
                  <p className="text-sm text-muted-foreground">
                    Race-based discrimination reported in Boston, MA apartment complex
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                </div>
                <Badge variant="destructive">High Priority</Badge>
              </div>

              <div className="flex items-start space-x-4 p-4 border border-border rounded-lg">
                <div className="bg-success/10 p-2 rounded-full">
                  <Shield className="h-4 w-4 text-success" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">Listing verified as safe</h4>
                  <p className="text-sm text-muted-foreground">
                    New York apartment complex passed verification checks
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">4 hours ago</p>
                </div>
                <Badge variant="success">Verified</Badge>
              </div>

              <div className="flex items-start space-x-4 p-4 border border-border rounded-lg">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">New user milestone reached</h4>
                  <p className="text-sm text-muted-foreground">
                    Platform now has over 15,000 registered users
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">6 hours ago</p>
                </div>
                <Badge variant="outline">Milestone</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default Dashboard;