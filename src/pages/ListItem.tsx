
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Package, Upload, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { apiClient } from '@/utils/api';

const ListItem = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    condition: '',
    type: 'lend',
    images: [],
    availabilityStart: '',
    availabilityEnd: '',
    flexible: false,
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

  const conditions = ['New', 'Like New', 'Good', 'Fair', 'Poor'];

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
      await apiClient.createItem({
        ...formData,
        availability: {
          startDate: formData.availabilityStart,
          endDate: formData.availabilityEnd || null,
          flexible: formData.flexible
        }
      });

      toast({
        title: "Item Listed Successfully! 🎉",
        description: "Your item is now available for the community.",
      });

      // Reset form
      setFormData({
        title: '',
        description: '',
        category: '',
        condition: '',
        type: 'lend',
        images: [],
        availabilityStart: '',
        availabilityEnd: '',
        flexible: false,
        address: ''
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to list item. Please try again.",
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
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center mr-4">
                <Package className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Share an Item</h1>
                <p className="text-gray-600 text-sm lg:text-base">Help your community by sharing something you don't need</p>
              </div>
            </div>
          </div>

          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg lg:text-xl">Item Details</CardTitle>
              <CardDescription className="text-sm lg:text-base">
                Provide details about the item you want to share
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm lg:text-base">Item Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g., Power Drill, Gardening Books, Baby Stroller"
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
                    placeholder="Describe the item, its features, and any special instructions"
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
                    <Label className="text-sm lg:text-base">Condition</Label>
                    <Select onValueChange={(value) => handleSelectChange('condition', value)} required>
                      <SelectTrigger className="text-sm lg:text-base">
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        {conditions.map((condition) => (
                          <SelectItem key={condition} value={condition}>{condition}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-sm lg:text-base">Sharing Type</Label>
                  <RadioGroup 
                    value={formData.type} 
                    onValueChange={(value) => handleSelectChange('type', value)}
                    className="flex flex-col sm:flex-row gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="lend" id="lend" />
                      <Label htmlFor="lend" className="text-sm lg:text-base">Lend (I want it back)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="donate" id="donate" />
                      <Label htmlFor="donate" className="text-sm lg:text-base">Donate (They can keep it)</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-4">
                  <Label className="text-sm lg:text-base">Availability</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="availabilityStart" className="text-xs lg:text-sm text-gray-600">Available from</Label>
                      <Input
                        id="availabilityStart"
                        name="availabilityStart"
                        type="date"
                        value={formData.availabilityStart}
                        onChange={handleInputChange}
                        required
                        className="text-sm lg:text-base"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="availabilityEnd" className="text-xs lg:text-sm text-gray-600">Available until (optional)</Label>
                      <Input
                        id="availabilityEnd"
                        name="availabilityEnd"
                        type="date"
                        value={formData.availabilityEnd}
                        onChange={handleInputChange}
                        className="text-sm lg:text-base"
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="flexible" 
                      checked={formData.flexible}
                      onCheckedChange={(checked) => handleSelectChange('flexible', checked.toString())}
                    />
                    <Label htmlFor="flexible" className="text-sm lg:text-base text-gray-600">
                      I'm flexible with timing
                    </Label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="text-sm lg:text-base">Pickup Location</Label>
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
                    This helps us match you with nearby community members
                  </p>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm lg:text-base">Photos (Optional)</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 lg:p-6 text-center">
                    <Upload className="w-8 h-8 lg:w-10 lg:h-10 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm lg:text-base text-gray-600 mb-2">Upload photos of your item</p>
                    <Button type="button" variant="outline" size="sm" className="text-xs lg:text-sm">
                      Choose Files
                    </Button>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-sm lg:text-base py-2 lg:py-3"
                >
                  {loading ? 'Listing Item...' : 'List Item'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ListItem;
