import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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

interface SavedListingsContextType {
  savedListings: Listing[];
  addToSaved: (listing: Listing) => void;
  removeFromSaved: (listingId: string) => void;
  isListingSaved: (listingId: string) => boolean;
}

const SavedListingsContext = createContext<SavedListingsContextType | undefined>(undefined);

export const useSavedListings = () => {
  const context = useContext(SavedListingsContext);
  if (!context) {
    throw new Error('useSavedListings must be used within a SavedListingsProvider');
  }
  return context;
};

interface SavedListingsProviderProps {
  children: ReactNode;
}

export const SavedListingsProvider = ({ children }: SavedListingsProviderProps) => {
  const [savedListings, setSavedListings] = useState<Listing[]>([]);

  // Load saved listings from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('savedListings');
    if (saved) {
      setSavedListings(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage whenever savedListings changes
  useEffect(() => {
    localStorage.setItem('savedListings', JSON.stringify(savedListings));
  }, [savedListings]);

  const addToSaved = (listing: Listing) => {
    setSavedListings(prev => {
      if (prev.some(saved => saved.id === listing.id)) {
        return prev; // Already saved
      }
      return [...prev, listing];
    });
  };

  const removeFromSaved = (listingId: string) => {
    setSavedListings(prev => prev.filter(listing => listing.id !== listingId));
  };

  const isListingSaved = (listingId: string) => {
    return savedListings.some(listing => listing.id === listingId);
  };

  return (
    <SavedListingsContext.Provider
      value={{
        savedListings,
        addToSaved,
        removeFromSaved,
        isListingSaved
      }}
    >
      {children}
    </SavedListingsContext.Provider>
  );
};