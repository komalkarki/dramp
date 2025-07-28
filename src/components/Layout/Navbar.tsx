import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Menu, X, Home, FileText, Search, BarChart3, Shield, Heart, Info, Mail } from 'lucide-react';
import { useSavedListings } from '@/contexts/SavedListingsContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { savedListings } = useSavedListings();

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Browse Listings', href: '/browse', icon: Search },
    { name: 'Report Discrimination', href: '/report', icon: FileText },
    { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
    { name: 'About', href: '/about', icon: Info },
    { name: 'Contact', href: '/contact', icon: Mail },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 animate-scale-in">
              <div className="bg-gradient-hero p-2 rounded-lg shadow-soft">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-foreground">DRAMP</span>
                <p className="text-xs text-muted-foreground -mt-1">Fair Housing Platform</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center space-x-2 ${
                    isActive(item.href)
                      ? 'bg-primary text-primary-foreground shadow-soft'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            
            <Link 
              to="/saved" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center space-x-2 relative ${
                isActive('/saved')
                  ? 'bg-primary text-primary-foreground shadow-soft'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
              }`}
            >
              <Heart className="h-4 w-4" />
              <span>Saved</span>
              {savedListings.length > 0 && (
                <Badge variant="accent" className="text-xs ml-1 min-w-[20px] h-5 flex items-center justify-center">
                  {savedListings.length}
                </Badge>
              )}
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login">
              <Button variant="outline" size="sm">
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button size="sm" className="bg-gradient-accent hover:opacity-90">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden animate-fade-in">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-border mt-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      isActive(item.href)
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              
              <Link
                to="/saved"
                className={`flex items-center justify-between px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive('/saved')
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center space-x-3">
                  <Heart className="h-5 w-5" />
                  <span>Saved Listings</span>
                </div>
                {savedListings.length > 0 && (
                  <Badge variant="accent" className="text-xs">
                    {savedListings.length}
                  </Badge>
                )}
              </Link>
              
              <div className="pt-4 space-y-2">
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setIsOpen(false)}>
                  <Button size="sm" className="w-full bg-gradient-accent hover:opacity-90">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;