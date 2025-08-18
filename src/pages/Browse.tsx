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
import modern2brApartment from '@/assets/modern-2br-apartment.jpg';
import studentSharedHousing from '@/assets/student-shared-housing.jpg';
import luxuryStudioFlorence from '@/assets/luxury-studio-florence.jpg';
import cozyFamilyRoom from '@/assets/cozy-family-room.jpg';
import modernLoftNaples from '@/assets/modern-loft-naples.jpg';
import elegantVeniceRoom from '@/assets/elegant-venice-room.jpg';
import studentApartmentTurin from '@/assets/student-apartment-turin.jpg';
import sharedVillaPool from '@/assets/shared-villa-pool.jpg';
import luxuryPenthouseMilan from '@/assets/luxury-penthouse-milan.jpg';
import italyCityscape from '@/assets/italy-cityscape.jpg';

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
    title: 'Modern 2BR Apartment Near Bocconi University',
    price: 1500,
    location: 'Milan, Italy',
    availability: 'Available Now',
    description: 'Beautiful 2-bedroom apartment with modern amenities, close to public transport and universities.',
    hostName: 'Marco Rossi',
    hostRating: 4.8,
    propertyType: 'Apartment',
    amenities: ['WiFi', 'Laundry', 'Parking', 'Pet Friendly'],
    reportCount: 0,
    verifiedHost: true,
    images: [modern2brApartment],
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    title: 'Shared Student Housing',
    price: 650,
    location: 'Bologna, Italy',
    availability: 'Available Feb 1',
    description: 'Affordable shared housing perfect for students. All utilities included.',
    hostName: 'Giulia Ferrari',
    hostRating: 4.5,
    propertyType: 'Shared Housing',
    amenities: ['WiFi', 'Utilities Included', 'Study Area'],
    reportCount: 1,
    verifiedHost: true,
    images: [studentSharedHousing],
    createdAt: '2024-01-10'
  },
  {
    id: '3',
    title: 'Luxury Studio in Historic Center',
    price: 1800,
    location: 'Florence, Italy',
    availability: 'Available Now',
    description: 'Premium studio apartment in the heart of historic Florence with stunning city views.',
    hostName: 'Alessandro Conti',
    hostRating: 4.9,
    propertyType: 'Studio',
    amenities: ['WiFi', 'Gym', 'Concierge', 'Historic View'],
    reportCount: 0,
    verifiedHost: true,
    images: [luxuryStudioFlorence],
    createdAt: '2024-01-20'
  },
  {
    id: '4',
    title: 'Cozy Room in Family Home',
    price: 550,
    location: 'Rome, Italy',
    availability: 'Available Mar 1',
    description: 'Comfortable room in a welcoming family home. Great for international students.',
    hostName: 'Maria Bianchi',
    hostRating: 4.2,
    propertyType: 'Room',
    amenities: ['WiFi', 'Kitchen Access', 'Family Friendly'],
    reportCount: 2,
    verifiedHost: false,
    images: [cozyFamilyRoom],
    createdAt: '2024-01-05'
  },
  {
    id: '5',
    title: 'Modern Loft near University',
    price: 1200,
    location: 'Naples, Italy',
    availability: 'Available Now',
    description: 'Stylish loft apartment perfect for students, close to University of Naples.',
    hostName: 'Luca Romano',
    hostRating: 4.6,
    propertyType: 'Apartment',
    amenities: ['WiFi', 'Air Conditioning', 'Balcony', 'Study Space'],
    reportCount: 0,
    verifiedHost: true,
    images: [modernLoftNaples],
    createdAt: '2024-01-18'
  },
  {
    id: '6',
    title: 'Elegant Room in Historic Palazzo',
    price: 900,
    location: 'Venice, Italy',
    availability: 'Available Feb 15',
    description: 'Beautiful room in a restored historic palazzo with canal views.',
    hostName: 'Francesca Venezia',
    hostRating: 4.7,
    propertyType: 'Room',
    amenities: ['WiFi', 'Historic Building', 'Canal View', 'Shared Kitchen'],
    reportCount: 0,
    verifiedHost: true,
    images: [elegantVeniceRoom],
    createdAt: '2024-01-12'
  },
  {
    id: '7',
    title: 'Student Apartment near Politecnico',
    price: 1100,
    location: 'Turin, Italy',
    availability: 'Available Mar 1',
    description: 'Perfect for engineering students, walking distance to Politecnico di Torino.',
    hostName: 'Andrea Molinari',
    hostRating: 4.4,
    propertyType: 'Apartment',
    amenities: ['WiFi', 'Study Room', 'Bike Storage', 'Garden'],
    reportCount: 0,
    verifiedHost: true,
    images: [studentApartmentTurin],
    createdAt: '2024-01-08'
  },
  {
    id: '8',
    title: 'Shared Villa with Pool',
    price: 800,
    location: 'Padua, Italy',
    availability: 'Available Now',
    description: 'Share a beautiful villa with pool, perfect for international students.',
    hostName: 'Elena Grassi',
    hostRating: 4.3,
    propertyType: 'Shared Housing',
    amenities: ['WiFi', 'Pool', 'Garden', 'Parking', 'BBQ Area'],
    reportCount: 1,
    verifiedHost: true,
    images: [sharedVillaPool],
    createdAt: '2024-01-14'
  },
  {
    id: '9',
    title: 'Penthouse with Terrace',
    price: 2500,
    location: 'Milan, Italy',
    availability: 'Available Apr 1',
    description: 'Luxury penthouse with private terrace overlooking the city skyline.',
    hostName: 'Stefano Milano',
    hostRating: 4.9,
    propertyType: 'Apartment',
    amenities: ['WiFi', 'Terrace', 'City View', 'Elevator', 'Premium Location'],
    reportCount: 0,
    verifiedHost: true,
    images: [luxuryPenthouseMilan],
    createdAt: '2024-01-22'
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
      
      {/* Hero Section with Background */}
      <div className="relative h-64 bg-cover bg-center" style={{ backgroundImage: `url(${italyCityscape})` }}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-4xl font-bold mb-2">Browse Verified Listings</h1>
            <p className="text-xl text-white/90">
              Find transparent, discrimination-free housing with verified host ratings and safety reports.
            </p>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">

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
            <Card key={listing.id} className="shadow-soft hover:shadow-lg transition-shadow animate-fade-in overflow-hidden">
              {/* Listing Image */}
              <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${listing.images[0]})` }}></div>
              
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