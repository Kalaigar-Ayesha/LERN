
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Search, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { apiClient } from '@/utils/api';

const RequestItem = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    urgency: '',
    address: ''
  });

  const [loading, setLoading] = useState(false);

  const categories = [
    'Tools & Equipment',
    'Books & Media',
    'Electronics',
    'Furniture',
    'Clothing',
    'Sports & Recreation',
    'Baby & Kids',
    'Kitchen & Appliances',
    'Garden & Outdoor',
    'Musical Instruments',
    'Art & Crafts',
    'Other'
  ];

  const urgencyLevels = [
    { value: 'Low', label: 'Low - I can wait', description: 'No rush, whenever available' },
    { value: 'Medium', label: 'Medium - This week', description: 'Would like it within a week' },
    { value: 'High', label: 'High - ASAP', description: 'Need it as soon as possible' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await apiClient.createRequest(formData);

      toast({
        title: "Request Created Successfully! 🎉",
        description: "We'll notify you when we find matching items nearby.",
      });

      // Reset form
      setFormData({
        title: '',
        description: '',
        category: '',
        urgency: '',
        address: ''
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-white">
      <div className="container mx-auto px-4 py-6 lg:py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6 lg:mb-8">
            <Link to="/dashboard" className="inline-flex items-center text-gray-600 hover:text-green-600 transition-colors mb-4 lg:mb-6 text-sm lg:text-base">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-4">
                <Search className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Request an Item</h1>
                <p className="text-gray-600 text-sm lg:text-base">Let your community know what you need</p>
              </div>
            </div>
          </div>

          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg lg:text-xl">What are you looking for?</CardTitle>
              <CardDescription className="text-sm lg:text-base">
                Describe what you need and we'll help you find it in your community
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm lg:text-base">Request Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g., Need a ladder for weekend project, Looking for camping gear"
                    required
                    className="text-sm lg:text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm lg:text-base">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Provide more details about what you need, when you need it, and how you plan to use it"
                    rows={4}
                    required
                    className="text-sm lg:text-base resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm lg:text-base">Category</Label>
                    <Select onValueChange={(value) => handleSelectChange('category', value)} required>
                      <SelectTrigger className="text-sm lg:text-base">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm lg:text-base">Urgency Level</Label>
                    <Select onValueChange={(value) => handleSelectChange('urgency', value)} required>
                      <SelectTrigger className="text-sm lg:text-base">
                        <SelectValue placeholder="How urgent?" />
                      </SelectTrigger>
                      <SelectContent>
                        {urgencyLevels.map((level) => (
                          <SelectItem key={level.value} value={level.value}>
                            <div className="flex flex-col">
                              <span className="font-medium">{level.label}</span>
                              <span className="text-xs text-gray-500">{level.description}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="text-sm lg:text-base">Your Location</Label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 absolute left-3 top-3.5 text-gray-400" />
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Street, City, State, ZIP"
                      required
                      className="pl-10 text-sm lg:text-base"
                    />
                  </div>
                  <p className="text-xs lg:text-sm text-gray-500">
                    We'll search for items within 5km of this location
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 lg:p-6">
                  <h3 className="font-semibold text-blue-900 mb-2 text-sm lg:text-base">💡 Pro Tips for Better Matches</h3>
                  <ul className="text-xs lg:text-sm text-blue-800 space-y-1">
                    <li>• Be specific about what you need and when</li>
                    <li>• Mention if you're willing to pick up or need delivery</li>
                    <li>• Include your availability for pickup/return</li>
                    <li>• Be clear about how long you need the item</li>
                  </ul>
                </div>

                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-sm lg:text-base py-2 lg:py-3"
                >
                  {loading ? 'Creating Request...' : 'Create Request'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RequestItem;
