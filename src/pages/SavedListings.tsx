import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useSavedListings } from '@/contexts/SavedListingsContext';
import { MapPin, DollarSign, Star, Calendar, Heart, Trash2, MessageSquare, BookmarkCheck } from 'lucide-react';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import ContactHostModal from '@/components/ContactHostModal';

const SavedListings = () => {
  const { savedListings, removeFromSaved } = useSavedListings();
  const [selectedListing, setSelectedListing] = useState<any>(null);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [contactListing, setContactListing] = useState<any>(null);

  const getRiskBadge = (reportCount: number) => {
    if (reportCount === 0) {
      return <Badge variant="success" className="flex items-center space-x-1">
        <BookmarkCheck className="h-3 w-3" />
        <span>Verified Safe</span>
      </Badge>;
    } else if (reportCount <= 2) {
      return <Badge variant="warning" className="flex items-center space-x-1">
        <span>{reportCount} Report{reportCount > 1 ? 's' : ''}</span>
      </Badge>;
    } else {
      return <Badge variant="destructive" className="flex items-center space-x-1">
        <span>High Risk ({reportCount} Reports)</span>
      </Badge>;
    }
  };

  const handleContactHost = (listing: any) => {
    setContactListing(listing);
    setContactModalOpen(true);
  };

  if (savedListings.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-foreground mb-2">No Saved Listings</h1>
              <p className="text-muted-foreground">
                You haven't saved any listings yet. Browse our listings and save the ones you're interested in!
              </p>
            </div>
            
            <Button asChild>
              <a href="/browse">Browse Listings</a>
            </Button>
          </div>
        </div>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center space-x-2">
            <Heart className="h-8 w-8 text-primary" />
            <span>Saved Listings</span>
          </h1>
          <p className="text-muted-foreground">
            You have {savedListings.length} saved listing{savedListings.length !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {savedListings.map((listing) => (
            <Card key={listing.id} className="shadow-soft hover:shadow-lg transition-shadow animate-fade-in">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="outline">{listing.propertyType}</Badge>
                  <div className="flex space-x-1">
                    {getRiskBadge(listing.reportCount)}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFromSaved(listing.id)}
                      className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
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
                
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleContactHost(listing)}
                    className="flex items-center space-x-1"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>Contact</span>
                  </Button>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        size="sm" 
                        onClick={() => setSelectedListing(listing)}
                        variant="default"
                      >
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
                              <h4 className="font-medium mb-2">Amenities</h4>
                              <div className="flex flex-wrap gap-2">
                                {selectedListing.amenities.map((amenity: string) => (
                                  <Badge key={amenity} variant="outline">{amenity}</Badge>
                                ))}
                              </div>
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
                                onClick={() => removeFromSaved(selectedListing.id)}
                              >
                                Remove from Saved
                              </Button>
                            </div>
                          </div>
                        </>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
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

export default SavedListings;