
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, User, Star, Package, Heart, Camera, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'Alex',
    lastName: 'Thompson',
    email: 'alex.thompson@email.com',
    address: '123 Main St, San Francisco, CA 94102',
    bio: 'Love sharing resources with my community and helping neighbors. Passionate about sustainability and reducing waste.'
  });

  // Mock data for user stats
  const userStats = {
    trustScore: 4.8,
    totalExchanges: 23,
    itemsShared: 15,
    itemsBorrowed: 8,
    memberSince: 'March 2024'
  };

  // Mock data for recent activity
  const recentActivity = [
    {
      id: 1,
      type: 'shared',
      item: 'Power Drill Set',
      user: 'Mike Johnson',
      date: '2 days ago',
      status: 'completed'
    },
    {
      id: 2,
      type: 'borrowed',
      item: 'Gardening Books',
      user: 'Sarah Chen',
      date: '1 week ago',
      status: 'returned'
    },
    {
      id: 3,
      type: 'donated',
      item: 'Baby Clothes',
      user: 'Emma Wilson',
      date: '2 weeks ago',
      status: 'completed'
    }
  ];

  // Mock data for reviews
  const reviews = [
    {
      id: 1,
      reviewer: 'Mike Johnson',
      rating: 5,
      comment: 'Very reliable and friendly! The item was exactly as described.',
      date: '3 days ago',
      item: 'Power Drill Set'
    },
    {
      id: 2,
      reviewer: 'Sarah Chen',
      rating: 5,
      comment: 'Great communication and very helpful. Highly recommend!',
      date: '1 week ago',
      item: 'Gardening Books'
    },
    {
      id: 3,
      reviewer: 'Emma Wilson',
      rating: 4,
      comment: 'Easy pickup and very generous donation. Thank you!',
      date: '2 weeks ago',
      item: 'Baby Clothes'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = () => {
    // Save profile logic here
    setEditMode(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-white">
      <div className="container mx-auto px-4 py-6 lg:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 lg:mb-8">
            <Link to="/dashboard" className="inline-flex items-center text-gray-600 hover:text-green-600 transition-colors mb-4 lg:mb-6 text-sm lg:text-base">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-4">
                <User className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Profile</h1>
                <p className="text-gray-600 text-sm lg:text-base">Manage your account and view your community impact</p>
              </div>
            </div>
          </div>

          {/* Profile Header */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm mb-6">
            <CardContent className="p-6 lg:p-8">
              <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
                <div className="relative">
                  <Avatar className="w-20 h-20 lg:w-24 lg:h-24">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-gradient-to-br from-green-400 to-blue-500 text-white text-xl lg:text-2xl">
                      AT
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="sm"
                    className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0 bg-white border-2 border-gray-200 hover:bg-gray-50"
                  >
                    <Camera className="w-4 h-4 text-gray-600" />
                  </Button>
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h2 className="text-xl lg:text-2xl font-bold text-gray-900">
                    {profileData.firstName} {profileData.lastName}
                  </h2>
                  <div className="flex items-center justify-center sm:justify-start mt-2 mb-3">
                    <MapPin className="w-4 h-4 text-gray-500 mr-1" />
                    <p className="text-gray-600 text-sm lg:text-base">{profileData.address.split(',')[1]}, {profileData.address.split(',')[2]}</p>
                  </div>
                  <div className="flex items-center justify-center sm:justify-start space-x-4 lg:space-x-6">
                    <div className="text-center">
                      <div className="flex items-center justify-center">
                        <Star className="w-4 h-4 text-yellow-500 mr-1" />
                        <span className="font-bold text-lg">{userStats.trustScore}</span>
                      </div>
                      <p className="text-xs text-gray-600">Trust Score</p>
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-lg">{userStats.totalExchanges}</p>
                      <p className="text-xs text-gray-600">Exchanges</p>
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-lg">{userStats.itemsShared}</p>
                      <p className="text-xs text-gray-600">Items Shared</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-600">Member since</p>
                      <p className="font-medium text-sm">{userStats.memberSince}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm">
              <TabsTrigger value="profile" className="text-sm lg:text-base">Profile Info</TabsTrigger>
              <TabsTrigger value="activity" className="text-sm lg:text-base">Activity</TabsTrigger>
              <TabsTrigger value="reviews" className="text-sm lg:text-base">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="mt-6">
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg lg:text-xl">Personal Information</CardTitle>
                      <CardDescription className="text-sm lg:text-base">
                        Keep your profile up to date for better community connections
                      </CardDescription>
                    </div>
                    <Button
                      variant={editMode ? "outline" : "default"}
                      onClick={() => editMode ? setEditMode(false) : setEditMode(true)}
                      className="text-sm"
                    >
                      {editMode ? 'Cancel' : 'Edit Profile'}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 lg:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-sm lg:text-base">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={profileData.firstName}
                        onChange={handleInputChange}
                        disabled={!editMode}
                        className="text-sm lg:text-base"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-sm lg:text-base">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={profileData.lastName}
                        onChange={handleInputChange}
                        disabled={!editMode}
                        className="text-sm lg:text-base"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm lg:text-base">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={profileData.email}
                      onChange={handleInputChange}
                      disabled={!editMode}
                      className="text-sm lg:text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-sm lg:text-base">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      value={profileData.address}
                      onChange={handleInputChange}
                      disabled={!editMode}
                      className="text-sm lg:text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio" className="text-sm lg:text-base">Bio</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      value={profileData.bio}
                      onChange={handleInputChange}
                      disabled={!editMode}
                      rows={4}
                      className="text-sm lg:text-base resize-none"
                    />
                  </div>

                  {editMode && (
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button onClick={handleSaveProfile} className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
                        Save Changes
                      </Button>
                      <Button variant="outline" onClick={() => setEditMode(false)}>
                        Cancel
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity" className="mt-6">
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg lg:text-xl">Recent Activity</CardTitle>
                  <CardDescription className="text-sm lg:text-base">
                    Your recent sharing and borrowing activities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            activity.type === 'shared' ? 'bg-green-100' :
                            activity.type === 'borrowed' ? 'bg-blue-100' : 'bg-purple-100'
                          }`}>
                            {activity.type === 'shared' && <Package className="w-5 h-5 text-green-600" />}
                            {activity.type === 'borrowed' && <Heart className="w-5 h-5 text-blue-600" />}
                            {activity.type === 'donated' && <Heart className="w-5 h-5 text-purple-600" />}
                          </div>
                          <div>
                            <p className="font-medium text-sm lg:text-base">
                              {activity.type === 'shared' && 'Shared'} 
                              {activity.type === 'borrowed' && 'Borrowed'} 
                              {activity.type === 'donated' && 'Donated'} 
                              {' '}{activity.item}
                            </p>
                            <p className="text-sm text-gray-600">
                              {activity.type === 'shared' ? 'to' : 'from'} {activity.user}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant={activity.status === 'completed' ? 'default' : 'secondary'} className="text-xs">
                            {activity.status}
                          </Badge>
                          <p className="text-xs text-gray-500 mt-1">{activity.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg lg:text-xl">Community Reviews</CardTitle>
                  <CardDescription className="text-sm lg:text-base">
                    What your neighbors say about you
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <Avatar className="w-10 h-10">
                              <AvatarFallback className="bg-gradient-to-br from-green-400 to-blue-500 text-white text-sm">
                                {review.reviewer.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-sm lg:text-base">{review.reviewer}</p>
                              <p className="text-xs text-gray-600">{review.item}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center space-x-1 mb-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <p className="text-xs text-gray-500">{review.date}</p>
                          </div>
                        </div>
                        <p className="text-sm lg:text-base text-gray-700">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
