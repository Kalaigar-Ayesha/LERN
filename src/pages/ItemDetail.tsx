
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, MapPin, Calendar, Star, MessageCircle, Heart, Share2, Flag } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const ItemDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [isFavorited, setIsFavorited] = useState(false);

  // Mock data - replace with real API call
  const item = {
    id: '1',
    title: 'Professional Power Drill Set',
    description: 'Complete power drill set with multiple bits and attachments. Perfect for home improvement projects. Includes carrying case, battery charger, and instruction manual. Very well maintained and recently serviced.',
    category: 'Tools & Equipment',
    condition: 'Excellent',
    type: 'lend',
    owner: {
      name: 'Mike Johnson',
      avatar: '',
      initials: 'MJ',
      trustScore: 4.9,
      totalExchanges: 47,
      location: 'Downtown SF',
      memberSince: 'Jan 2024'
    },
    images: [
      'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=500',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500'
    ],
    availability: {
      startDate: '2024-01-15',
      endDate: '2024-02-15',
      flexible: true
    },
    location: {
      address: 'Mission District, San Francisco, CA',
      distance: '0.3 km away'
    },
    status: 'available',
    postedDate: '3 days ago',
    views: 24,
    favorites: 8
  };

  const ownerReviews = [
    {
      id: 1,
      reviewer: 'Sarah Chen',
      rating: 5,
      comment: 'Very reliable and friendly! Items are always in great condition.',
      date: '1 week ago'
    },
    {
      id: 2,
      reviewer: 'Emma Wilson',
      rating: 5,
      comment: 'Great communication and flexible with timing. Highly recommend!',
      date: '2 weeks ago'
    }
  ];

  const handleContactOwner = () => {
    toast({
      title: "Message Sent!",
      description: "Your message has been sent to Mike. They'll respond soon.",
    });
  };

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    toast({
      title: isFavorited ? "Removed from favorites" : "Added to favorites",
      description: isFavorited ? "Item removed from your favorites" : "Item saved to your favorites",
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link Copied!",
      description: "Item link copied to clipboard",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-white">
      <div className="container mx-auto px-4 py-6 lg:py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6 lg:mb-8">
            <Link to="/dashboard" className="inline-flex items-center text-gray-600 hover:text-green-600 transition-colors mb-4 lg:mb-6 text-sm lg:text-base">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Image Section */}
            <div className="space-y-4">
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm overflow-hidden">
                <div className="aspect-square bg-gray-100">
                  <img 
                    src={item.images[0]} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </Card>
              {item.images.length > 1 && (
                <div className="grid grid-cols-3 gap-2">
                  {item.images.slice(1).map((image, index) => (
                    <div key={index} className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                      <img 
                        src={image} 
                        alt={`${item.title} ${index + 2}`}
                        className="w-full h-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Item Details Section */}
            <div className="space-y-6">
              {/* Main Info */}
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary">{item.category}</Badge>
                        <Badge variant={item.type === 'lend' ? 'default' : 'secondary'}>
                          {item.type === 'lend' ? 'For Lending' : 'For Donation'}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl lg:text-2xl mb-2">{item.title}</CardTitle>
                      <div className="flex items-center text-sm text-gray-600 space-x-4 mb-4">
                        <span className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {item.location.distance}
                        </span>
                        <span>Condition: <span className="font-medium">{item.condition}</span></span>
                        <span>Posted {item.postedDate}</span>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleFavorite}
                        className={isFavorited ? 'text-red-600 border-red-200' : ''}
                      >
                        <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
                      </Button>
                      <Button variant="outline" size="sm" onClick={handleShare}>
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-6 text-sm lg:text-base">{item.description}</p>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2 text-sm lg:text-base">Availability</h4>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>
                          Available from {new Date(item.availability.startDate).toLocaleDateString()} 
                          {item.availability.endDate && ` until ${new Date(item.availability.endDate).toLocaleDateString()}`}
                        </span>
                      </div>
                      {item.availability.flexible && (
                        <p className="text-sm text-green-600 mt-1">✓ Flexible with timing</p>
                      )}
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2 text-sm lg:text-base">Location</h4>
                      <p className="text-sm text-gray-600">{item.location.address}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Owner Info */}
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Item Owner</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4 mb-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={item.owner.avatar} />
                      <AvatarFallback className="bg-gradient-to-br from-green-400 to-blue-500 text-white">
                        {item.owner.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold text-base lg:text-lg">{item.owner.name}</h3>
                      <div className="flex items-center space-x-3 text-sm text-gray-600">
                        <span className="flex items-center">
                          <Star className="w-4 h-4 mr-1 text-yellow-500" />
                          {item.owner.trustScore}
                        </span>
                        <span>{item.owner.totalExchanges} exchanges</span>
                        <span>{item.owner.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button 
                      onClick={handleContactOwner}
                      className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Contact Owner
                    </Button>
                    
                    <div className="flex space-x-2">
                      <Button variant="outline" className="flex-1" asChild>
                        <Link to={`/profile/${item.owner.name}`}>View Profile</Link>
                      </Button>
                      <Button variant="outline" size="sm">
                        <Flag className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Owner Reviews */}
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Owner Reviews</CardTitle>
                  <CardDescription>
                    What others say about {item.owner.name}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {ownerReviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-medium text-sm">{review.reviewer}</p>
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${
                                  i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 mb-1">{review.comment}</p>
                        <p className="text-xs text-gray-500">{review.date}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
