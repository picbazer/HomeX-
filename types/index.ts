export type PropertyType =
  | 'Apartment'
  | 'House'
  | 'Villa'
  | 'Land'
  | 'Shop'
  | 'Office'
  | 'Room'
  | 'Warehouse'
  | 'Garage/Parking'
  | 'Commercial Property';

export type TransactionType = 'For Sale' | 'For Rent' | 'For Lease';

export type PropertyStatus = 'active' | 'pending' | 'rejected' | 'paused' | 'sold' | 'rented';

export type UserRole = 'USER' | 'AGENT' | 'ADMIN';

export interface Property {
  id: string;
  title: string;
  slug?: string;
  description: string;
  type: PropertyType;
  listingType: TransactionType;
  price: number;
  pricePeriod?: 'month' | 'year' | 'total';
  location: string;
  city: string;
  area: number; // in sq ft
  bedrooms: number;
  bathrooms: number;
  parking: number;
  floor?: string;
  furnished: 'Unfurnished' | 'Semi-Furnished' | 'Fully Furnished';
  amenities: string[];
  images: string[];
  ownerId: string;
  ownerName: string;
  ownerPhone: string;
  ownerEmail?: string;
  agentId?: string;
  verified: boolean;
  status: PropertyStatus;
  createdAt: string;
  updatedAt: string;
  views: number;
  inquiries: number;
  featured?: boolean;
  mapCoordinates?: {
    lat: number;
    lng: number;
    displayX?: number; // percentage on custom visual map (0-100)
    displayY?: number; // percentage on custom visual map (0-100)
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
}

export interface Agent {
  id: string;
  name: string;
  title: string;
  agency: string;
  location: string;
  phone: string;
  email: string;
  avatar: string;
  image?: string;
  rating: number;
  reviewCount: number;
  reviewsCount?: number;
  experienceYears: number;
  activeListings: number;
  listingsCount?: number;
  bio: string;
  verified: boolean;
}

export interface Inquiry {
  id: string;
  propertyId: string;
  propertyTitle: string;
  senderName: string;
  senderEmail: string;
  senderPhone: string;
  message: string;
  createdAt: string;
  status: 'new' | 'read' | 'replied';
}

export interface Report {
  id: string;
  propertyId: string;
  propertyTitle: string;
  reason: 'Incorrect information' | 'Suspicious listing' | 'Duplicate listing' | 'Wrong price' | 'Other';
  details: string;
  reporterEmail?: string;
  createdAt: string;
  status: 'pending' | 'resolved' | 'dismissed';
}

export interface FilterState {
  searchQuery: string;
  listingType: TransactionType | 'All';
  city: string;
  propertyType: PropertyType | 'All';
  minPrice: number;
  maxPrice: number;
  bedrooms: number | 'any';
  bathrooms: number | 'any';
  minArea: number;
  maxArea: number;
  furnished: string;
  parking: boolean;
  verifiedOnly: boolean;
  sortBy: 'newest' | 'price-asc' | 'price-desc' | 'area-asc' | 'area-desc';
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}
