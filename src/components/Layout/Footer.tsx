import { Link } from 'react-router-dom';
import { Shield, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Mission */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-hero p-2 rounded-lg shadow-soft">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-foreground">DRAMP</span>
                <p className="text-xs text-muted-foreground -mt-1">Fair Housing Platform</p>
              </div>
            </div>
            <p className="text-muted-foreground max-w-md">
              Fighting housing discrimination through transparency, community reporting, 
              and data-driven advocacy. Every voice matters in creating fair housing for all.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Platform
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/browse" className="text-muted-foreground hover:text-primary transition-colors">
                  Browse Listings
                </Link>
              </li>
              <li>
                <Link to="/report" className="text-muted-foreground hover:text-primary transition-colors">
                  Report Discrimination
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">
                  Analytics Dashboard
                </Link>
              </li>
              <li>
                <Link to="/saved" className="text-muted-foreground hover:text-primary transition-colors">
                  Saved Listings
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © {currentYear} DRAMP. Fighting for fair housing rights.
          </p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <Link to="/privacy" className="text-muted-foreground hover:text-primary text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-muted-foreground hover:text-primary text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;