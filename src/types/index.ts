
export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  location: {
    type: 'Point';
    coordinates: [number, number]; // [longitude, latitude]
  };
  bio?: string;
  trustScore: number;
  totalExchanges: number;
  itemsShared: number;
  itemsBorrowed: number;
  profileImage?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Item {
  _id: string;
  title: string;
  description: string;
  category: string;
  condition: 'New' | 'Like New' | 'Good' | 'Fair' | 'Poor';
  type: 'lend' | 'donate';
  owner: User;
  images: string[];
  availability: {
    startDate: Date;
    endDate?: Date;
    flexible: boolean;
  };
  location: {
    type: 'Point';
    coordinates: [number, number];
  };
  status: 'available' | 'borrowed' | 'unavailable';
  createdAt: Date;
  updatedAt: Date;
}

export interface Request {
  _id: string;
  title: string;
  description: string;
  category: string;
  urgency: 'Low' | 'Medium' | 'High';
  requester: User;
  location: {
    type: 'Point';
    coordinates: [number, number];
  };
  matches: string[]; // Item IDs
  status: 'open' | 'fulfilled' | 'closed';
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  _id: string;
  sender: string;
  recipient: string;
  content: string;
  itemId?: string;
  requestId?: string;
  read: boolean;
  createdAt: Date;
}

export interface Review {
  _id: string;
  reviewer: string;
  reviewee: string;
  rating: number;
  comment: string;
  itemId?: string;
  requestId?: string;
  createdAt: Date;
}
