import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { MapPin, DollarSign, Star, Users, Calendar, Search, Filter, Home, CheckCircle, AlertTriangle, Heart, HeartOff } from 'lucide-react';
import { useSavedListings } from '@/contexts/SavedListingsContext';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import ContactHostModal from '@/components/ContactHostModal';

interface Listing {
  id: string;
  title: string;
  price: number;
  location: string;
  availability: string;
  description: string;
  hostName: string;
  hostRating: number;
  propertyType: string;
  amenities: string[];
  reportCount: number;
  verifiedHost: boolean;
  images: string[];
  createdAt: string;
}

// Mock data
const mockListings: Listing[] = [
  {
    id: '1',
    title: 'Modern 2BR Apartment Near Campus',
    price: 1800,
    location: 'Boston, MA',
    availability: 'Available Now',
    description: 'Beautiful 2-bedroom apartment with modern amenities, close to public transport and universities.',
    hostName: 'Sarah Johnson',
    hostRating: 4.8,
    propertyType: 'Apartment',
    amenities: ['WiFi', 'Laundry', 'Parking', 'Pet Friendly'],
    reportCount: 0,
    verifiedHost: true,
    images: ['/placeholder.svg'],
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    title: 'Shared Student Housing',
    price: 900,
    location: 'New York, NY',
    availability: 'Available Feb 1',
    description: 'Affordable shared housing perfect for students. All utilities included.',
    hostName: 'Mike Chen',
    hostRating: 4.5,
    propertyType: 'Shared Housing',
    amenities: ['WiFi', 'Utilities Included', 'Study Area'],
    reportCount: 1,
    verifiedHost: true,
    images: ['/placeholder.svg'],
    createdAt: '2024-01-10'
  },
  {
    id: '3',
    title: 'Luxury Studio Downtown',
    price: 2200,
    location: 'San Francisco, CA',
    availability: 'Available Now',
    description: 'Premium studio apartment in the heart of downtown with stunning city views.',
    hostName: 'Jennifer Davis',
    hostRating: 4.9,
    propertyType: 'Studio',
    amenities: ['WiFi', 'Gym', 'Concierge', 'City View'],
    reportCount: 0,
    verifiedHost: true,
    images: ['/placeholder.svg'],
    createdAt: '2024-01-20'
  },
  {
    id: '4',
    title: 'Cozy Room in Family Home',
    price: 750,
    location: 'Austin, TX',
    availability: 'Available Mar 1',
    description: 'Comfortable room in a welcoming family home. Great for international students.',
    hostName: 'Robert Wilson',
    hostRating: 4.2,
    propertyType: 'Room',
    amenities: ['WiFi', 'Kitchen Access', 'Family Friendly'],
    reportCount: 2,
    verifiedHost: false,
    images: ['/placeholder.svg'],
    createdAt: '2024-01-05'
  }
];

const Browse = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState('all-prices');
  const [propertyType, setPropertyType] = useState('all-types');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [contactListing, setContactListing] = useState<Listing | null>(null);
  const { addToSaved, removeFromSaved, isListingSaved } = useSavedListings();
  const { toast } = useToast();

  const filteredAndSortedListings = useMemo(() => {
    let filtered = mockListings.filter(listing => {
      const matchesSearch = listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           listing.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesPrice = priceRange === 'all-prices' || priceRange === '' || 
                          (priceRange === '0-1000' && listing.price <= 1000) ||
                          (priceRange === '1000-1500' && listing.price > 1000 && listing.price <= 1500) ||
                          (priceRange === '1500-2000' && listing.price > 1500 && listing.price <= 2000) ||
                          (priceRange === '2000+' && listing.price > 2000);
      
      const matchesType = propertyType === 'all-types' || propertyType === '' || listing.propertyType === propertyType;
      
      return matchesSearch && matchesPrice && matchesType;
    });

    // Sort listings
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.hostRating - a.hostRating;
        case 'newest':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

    return filtered;
  }, [searchTerm, priceRange, propertyType, sortBy]);

  const getRiskBadge = (reportCount: number) => {
    if (reportCount === 0) {
      return <Badge variant="success" className="flex items-center space-x-1">
        <CheckCircle className="h-3 w-3" />
        <span>Verified Safe</span>
      </Badge>;
    } else if (reportCount <= 2) {
      return <Badge variant="warning" className="flex items-center space-x-1">
        <AlertTriangle className="h-3 w-3" />
        <span>{reportCount} Report{reportCount > 1 ? 's' : ''}</span>
      </Badge>;
    } else {
      return <Badge variant="destructive" className="flex items-center space-x-1">
        <AlertTriangle className="h-3 w-3" />
        <span>High Risk ({reportCount} Reports)</span>
      </Badge>;
    }
  };

  const handleSaveListing = (listing: Listing) => {
    if (isListingSaved(listing.id)) {
      removeFromSaved(listing.id);
      toast({
        title: "Removed from saved",
        description: "Listing removed from your saved listings.",
      });
    } else {
      addToSaved(listing);
      toast({
        title: "Saved successfully",
        description: "Listing added to your saved listings.",
      });
    }
  };

  const handleContactHost = (listing: Listing) => {
    setContactListing(listing);
    setContactModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Browse Verified Listings</h1>
          <p className="text-muted-foreground">
            Find transparent, discrimination-free housing with verified host ratings and safety reports.
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8 shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="h-5 w-5" />
              <span>Search & Filter</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="lg:col-span-2">
                <Input
                  placeholder="Search by title or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              
              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-prices">All Prices</SelectItem>
                  <SelectItem value="0-1000">$0 - $1,000</SelectItem>
                  <SelectItem value="1000-1500">$1,000 - $1,500</SelectItem>
                  <SelectItem value="1500-2000">$1,500 - $2,000</SelectItem>
                  <SelectItem value="2000+">$2,000+</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={propertyType} onValueChange={setPropertyType}>
                <SelectTrigger>
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-types">All Types</SelectItem>
                  <SelectItem value="Apartment">Apartment</SelectItem>
                  <SelectItem value="Studio">Studio</SelectItem>
                  <SelectItem value="Room">Room</SelectItem>
                  <SelectItem value="Shared Housing">Shared Housing</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Found {filteredAndSortedListings.length} listing{filteredAndSortedListings.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredAndSortedListings.map((listing) => (
            <Card key={listing.id} className="shadow-soft hover:shadow-lg transition-shadow animate-fade-in">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="outline">{listing.propertyType}</Badge>
                  <div className="flex items-center space-x-2">
                    {getRiskBadge(listing.reportCount)}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSaveListing(listing)}
                      className="h-8 w-8 p-0"
                    >
                      {isListingSaved(listing.id) ? (
                        <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                      ) : (
                        <HeartOff className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>
                <CardTitle className="text-lg line-clamp-2">{listing.title}</CardTitle>
                <CardDescription className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>{listing.location}</span>
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-2xl font-bold text-primary">
                    <DollarSign className="h-5 w-5" />
                    <span>{listing.price.toLocaleString()}</span>
                    <span className="text-sm font-normal text-muted-foreground">/month</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-warning fill-warning" />
                    <span className="font-medium">{listing.hostRating}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{listing.availability}</span>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {listing.amenities.slice(0, 3).map((amenity) => (
                    <Badge key={amenity} variant="secondary" className="text-xs">
                      {amenity}
                    </Badge>
                  ))}
                  {listing.amenities.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{listing.amenities.length - 3} more
                    </Badge>
                  )}
                </div>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full" onClick={() => setSelectedListing(listing)}>
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    {selectedListing && (
                      <>
                        <DialogHeader>
                          <DialogTitle className="flex items-center justify-between">
                            <span>{selectedListing.title}</span>
                            {getRiskBadge(selectedListing.reportCount)}
                          </DialogTitle>
                          <DialogDescription className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>{selectedListing.location}</span>
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="space-y-6">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-secondary/50 p-4 rounded-lg">
                              <div className="flex items-center space-x-2 text-primary mb-1">
                                <DollarSign className="h-4 w-4" />
                                <span className="font-medium">Price</span>
                              </div>
                              <p className="text-2xl font-bold">${selectedListing.price.toLocaleString()}/month</p>
                            </div>
                            
                            <div className="bg-secondary/50 p-4 rounded-lg">
                              <div className="flex items-center space-x-2 text-primary mb-1">
                                <Star className="h-4 w-4" />
                                <span className="font-medium">Host Rating</span>
                              </div>
                              <p className="text-2xl font-bold">{selectedListing.hostRating}/5.0</p>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-medium mb-2">Description</h4>
                            <p className="text-muted-foreground">{selectedListing.description}</p>
                          </div>
                          
                          <div>
                            <h4 className="font-medium mb-2">Host Information</h4>
                            <div className="flex items-center space-x-2">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <span>{selectedListing.hostName}</span>
                              {selectedListing.verifiedHost && (
                                <Badge variant="success" className="text-xs">Verified</Badge>
                              )}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-medium mb-2">Amenities</h4>
                            <div className="flex flex-wrap gap-2">
                              {selectedListing.amenities.map((amenity) => (
                                <Badge key={amenity} variant="outline">{amenity}</Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-medium mb-2">Availability</h4>
                            <p className="text-muted-foreground">{selectedListing.availability}</p>
                          </div>
                          
                          <div className="flex space-x-3">
                            <Button 
                              className="flex-1" 
                              onClick={() => handleContactHost(selectedListing)}
                            >
                              Contact Host
                            </Button>
                            <Button 
                              variant="outline" 
                              className="flex-1"
                              onClick={() => handleSaveListing(selectedListing)}
                            >
                              {isListingSaved(selectedListing.id) ? 'Remove from Saved' : 'Save Listing'}
                            </Button>
                          </div>
                        </div>
                      </>
                    )}
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredAndSortedListings.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Home className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No listings found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria or check back later for new listings.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
      
      {contactListing && (
        <ContactHostModal
          isOpen={contactModalOpen}
          onClose={() => setContactModalOpen(false)}
          hostName={contactListing.hostName}
          listingTitle={contactListing.title}
        />
      )}
      
      <Footer />
    </div>
  );
};

export default Browse;