
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Heart, Users, Star, ArrowRight, Recycle, HandHeart, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Recycle className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">LREN</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
            <a href="#features" className="text-gray-600 hover:text-green-600 transition-colors text-sm lg:text-base">Features</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-green-600 transition-colors text-sm lg:text-base">How it Works</a>
            <Link to="/login">
              <Button variant="outline" size="sm" className="text-xs lg:text-sm">Login</Button>
            </Link>
            <Link to="/register">
              <Button size="sm" className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-xs lg:text-sm">
                Get Started
              </Button>
            </Link>
          </nav>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge className="mb-4 lg:mb-6 bg-green-100 text-green-700 hover:bg-green-200 text-xs sm:text-sm">
            <Heart className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
            Community-Powered Sharing
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 lg:mb-6 leading-tight">
            Share, Borrow, and
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500 block sm:inline"> Build Community</span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 lg:mb-8 max-w-2xl mx-auto px-4">
            Connect with neighbors to share resources, reduce waste, and strengthen your local community through our smart matching platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <Link to="/register">
              <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 px-6 lg:px-8 text-sm lg:text-base">
                Start Sharing <ArrowRight className="ml-2 w-4 h-4 lg:w-5 lg:h-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="w-full sm:w-auto px-6 lg:px-8 text-sm lg:text-base">
              <MapPin className="mr-2 w-4 h-4 lg:w-5 lg:h-5" />
              Find Your Community
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 lg:py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-3 lg:mb-4">
                <Users className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">5,000+</h3>
              <p className="text-gray-600 text-sm lg:text-base">Active Community Members</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 lg:mb-4">
                <HandHeart className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">15,000+</h3>
              <p className="text-gray-600 text-sm lg:text-base">Items Shared & Borrowed</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3 lg:mb-4">
                <Star className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">4.9/5</h3>
              <p className="text-gray-600 text-sm lg:text-base">Average Trust Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 lg:py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Why Choose LREN?</h2>
            <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Our platform makes community sharing safe, easy, and rewarding for everyone.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            <Card className="hover:shadow-lg transition-shadow duration-300 border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center mb-3 lg:mb-4">
                  <Search className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                </div>
                <CardTitle className="text-lg lg:text-xl">Smart Matching</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-sm lg:text-base">
                  Our AI-powered system matches your requests with nearby available items based on location, urgency, and category.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300 border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center mb-3 lg:mb-4">
                  <MapPin className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                </div>
                <CardTitle className="text-lg lg:text-xl">Hyperlocal Community</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-sm lg:text-base">
                  Connect with neighbors within 5km radius. Build stronger local relationships while sharing resources.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300 border-0 bg-white/80 backdrop-blur-sm md:col-span-2 lg:col-span-1">
              <CardHeader className="pb-4">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center mb-3 lg:mb-4">
                  <Star className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                </div>
                <CardTitle className="text-lg lg:text-xl">Trust & Safety</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-sm lg:text-base">
                  Comprehensive rating system and user verification ensure safe and reliable exchanges within your community.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-12 lg:py-20 px-4 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container mx-auto">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Get started in minutes and join your local sharing community.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 lg:mb-6 text-white text-lg lg:text-xl font-bold">
                1
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-3 lg:mb-4">Join Your Community</h3>
              <p className="text-gray-600 text-sm lg:text-base px-2">
                Sign up and verify your location to connect with neighbors in your area.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 lg:mb-6 text-white text-lg lg:text-xl font-bold">
                2
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-3 lg:mb-4">Share or Request</h3>
              <p className="text-gray-600 text-sm lg:text-base px-2">
                List items you want to share or create requests for things you need.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 lg:mb-6 text-white text-lg lg:text-xl font-bold">
                3
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-3 lg:mb-4">Connect & Exchange</h3>
              <p className="text-gray-600 text-sm lg:text-base px-2">
                Get matched with nearby community members and arrange safe exchanges.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 lg:py-20 px-4 bg-gradient-to-r from-green-500 to-blue-500">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 lg:mb-6 px-4">
            Ready to Build Your Community?
          </h2>
          <p className="text-lg lg:text-xl text-white/90 mb-6 lg:mb-8 max-w-2xl mx-auto px-4">
            Join thousands of neighbors who are already sharing, caring, and building stronger communities together.
          </p>
          <Link to="/register">
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-50 px-6 lg:px-8 text-sm lg:text-base">
              Get Started Today <ArrowRight className="ml-2 w-4 h-4 lg:w-5 lg:h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 lg:py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <Recycle className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold">LREN</h3>
              </div>
              <p className="text-gray-400 text-sm lg:text-base">
                Building stronger communities through local resource sharing.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm lg:text-base">Platform</h4>
              <ul className="space-y-2 text-gray-400 text-sm lg:text-base">
                <li><a href="#" className="hover:text-white transition-colors">How it Works</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Safety</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community Guidelines</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm lg:text-base">Support</h4>
              <ul className="space-y-2 text-gray-400 text-sm lg:text-base">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Report Issue</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm lg:text-base">Legal</h4>
              <ul className="space-y-2 text-gray-400 text-sm lg:text-base">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-6 lg:mt-8 pt-6 lg:pt-8 text-center text-gray-400 text-sm lg:text-base">
            <p>&copy; 2024 LREN. All rights reserved. Built with ❤️ for communities.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
