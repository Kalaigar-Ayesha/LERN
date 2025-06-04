
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, 
  MapPin, 
  Clock, 
  Star, 
  MessageCircle, 
  Heart,
  Package,
  Search,
  Filter,
  Bell,
  User
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("available");

  // Mock data
  const userStats = {
    trustScore: 4.8,
    totalExchanges: 23,
    itemsShared: 15,
    itemsBorrowed: 8
  };

  const availableItems = [
    {
      id: 1,
      title: "Power Drill Set",
      category: "Tools",
      owner: "Mike Johnson",
      distance: "0.3 km",
      condition: "Excellent",
      trustScore: 4.9,
      available: "Today - Sunday"
    },
    {
      id: 2,
      title: "Gardening Books Collection",
      category: "Books",
      owner: "Sarah Chen",
      distance: "0.7 km",
      condition: "Good",
      trustScore: 4.7,
      available: "This week"
    },
    {
      id: 3,
      title: "Baby Carrier",
      category: "Baby & Kids",
      owner: "Emma Wilson",
      distance: "1.2 km",
      condition: "Like New",
      trustScore: 5.0,
      available: "Flexible"
    }
  ];

  const myRequests = [
    {
      id: 1,
      title: "Looking for a Ladder",
      category: "Tools",
      urgency: "Medium",
      posted: "2 hours ago",
      matches: 3
    },
    {
      id: 2,
      title: "Need camping gear for weekend",
      category: "Outdoor",
      urgency: "High",
      posted: "1 day ago",
      matches: 7
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-6 h-6 lg:w-8 lg:h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Package className="w-3 h-3 lg:w-5 lg:h-5 text-white" />
              </div>
              <h1 className="text-lg lg:text-xl font-bold text-gray-900">LREN</h1>
            </Link>
            <div className="flex items-center space-x-2 lg:space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <MessageCircle className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <User className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 lg:py-8">
        {/* Welcome Section */}
        <div className="mb-6 lg:mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Welcome back, Alex! 👋</h1>
          <p className="text-gray-600 text-sm lg:text-base">Your local community has 12 new items available nearby.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs lg:text-sm text-gray-600">Trust Score</p>
                  <p className="text-lg lg:text-2xl font-bold text-gray-900 flex items-center">
                    {userStats.trustScore}
                    <Star className="w-3 h-3 lg:w-4 lg:h-4 text-yellow-500 ml-1" />
                  </p>
                </div>
                <div className="w-8 h-8 lg:w-12 lg:h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                  <Star className="w-4 h-4 lg:w-6 lg:h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs lg:text-sm text-gray-600">Total Exchanges</p>
                  <p className="text-lg lg:text-2xl font-bold text-gray-900">{userStats.totalExchanges}</p>
                </div>
                <div className="w-8 h-8 lg:w-12 lg:h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                  <Heart className="w-4 h-4 lg:w-6 lg:h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs lg:text-sm text-gray-600">Items Shared</p>
                  <p className="text-lg lg:text-2xl font-bold text-gray-900">{userStats.itemsShared}</p>
                </div>
                <div className="w-8 h-8 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                  <Package className="w-4 h-4 lg:w-6 lg:h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs lg:text-sm text-gray-600">Items Borrowed</p>
                  <p className="text-lg lg:text-2xl font-bold text-gray-900">{userStats.itemsBorrowed}</p>
                </div>
                <div className="w-8 h-8 lg:w-12 lg:h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center">
                  <Search className="w-4 h-4 lg:w-6 lg:h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 lg:mb-8">
          <Link to="/list-item">
            <Card className="border-0 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white cursor-pointer transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-4 lg:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold mb-1 text-sm lg:text-base">Share an Item</h3>
                    <p className="text-green-100 text-xs lg:text-sm">Help your neighbors by lending something</p>
                  </div>
                  <Plus className="w-6 h-6 lg:w-8 lg:h-8" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/request-item">
            <Card className="border-0 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white cursor-pointer transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-4 lg:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold mb-1 text-sm lg:text-base">Request an Item</h3>
                    <p className="text-blue-100 text-xs lg:text-sm">Find what you need in your community</p>
                  </div>
                  <Search className="w-6 h-6 lg:w-8 lg:h-8" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 lg:space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <TabsList className="bg-white/80 backdrop-blur-sm w-full sm:w-auto">
              <TabsTrigger value="available" className="text-xs lg:text-sm">Available Nearby</TabsTrigger>
              <TabsTrigger value="requests" className="text-xs lg:text-sm">My Requests</TabsTrigger>
              <TabsTrigger value="messages" className="text-xs lg:text-sm">Messages</TabsTrigger>
            </TabsList>
            <Button variant="outline" size="sm" className="text-xs lg:text-sm">
              <Filter className="w-3 h-3 lg:w-4 lg:h-4 mr-2" />
              Filter
            </Button>
          </div>

          <TabsContent value="available" className="space-y-4">
            <div className="grid gap-4">
              {availableItems.map((item) => (
                <Card key={item.id} className="border-0 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
                  <CardContent className="p-4 lg:p-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                          <h3 className="font-semibold text-base lg:text-lg">{item.title}</h3>
                          <Badge variant="secondary" className="text-xs w-fit">{item.category}</Badge>
                        </div>
                        <div className="flex flex-wrap items-center text-xs lg:text-sm text-gray-600 gap-x-4 gap-y-1">
                          <span className="flex items-center">
                            <User className="w-3 h-3 lg:w-4 lg:h-4 mr-1" />
                            {item.owner}
                          </span>
                          <span className="flex items-center">
                            <MapPin className="w-3 h-3 lg:w-4 lg:h-4 mr-1" />
                            {item.distance}
                          </span>
                          <span className="flex items-center">
                            <Star className="w-3 h-3 lg:w-4 lg:h-4 mr-1 text-yellow-500" />
                            {item.trustScore}
                          </span>
                        </div>
                      </div>
                      <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-xs lg:text-sm w-full sm:w-auto">
                        Contact
                      </Button>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mt-4 text-xs lg:text-sm">
                      <span className="text-gray-600">Condition: <span className="font-medium">{item.condition}</span></span>
                      <span className="flex items-center text-gray-600">
                        <Clock className="w-3 h-3 lg:w-4 lg:h-4 mr-1" />
                        {item.available}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="requests" className="space-y-4">
            <div className="grid gap-4">
              {myRequests.map((request) => (
                <Card key={request.id} className="border-0 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-4 lg:p-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                          <h3 className="font-semibold text-base lg:text-lg">{request.title}</h3>
                          <Badge variant={request.urgency === 'High' ? 'destructive' : 'default'} className="text-xs w-fit">
                            {request.urgency} Priority
                          </Badge>
                        </div>
                        <div className="flex flex-wrap items-center text-xs lg:text-sm text-gray-600 gap-x-4 gap-y-1">
                          <span>{request.category}</span>
                          <span>{request.posted}</span>
                          <span className="flex items-center text-green-600 font-medium">
                            {request.matches} matches found
                          </span>
                        </div>
                      </div>
                      <Button variant="outline" className="text-xs lg:text-sm w-full sm:w-auto">View Matches</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="messages">
            <Card className="border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6 lg:p-8 text-center">
                <MessageCircle className="w-8 h-8 lg:w-12 lg:h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="font-semibold text-base lg:text-lg mb-2">No messages yet</h3>
                <p className="text-gray-600 mb-4 text-sm lg:text-base">Start borrowing or lending to connect with your community</p>
                <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-xs lg:text-sm">
                  Browse Available Items
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
