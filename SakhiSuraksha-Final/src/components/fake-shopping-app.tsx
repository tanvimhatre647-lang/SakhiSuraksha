import React, { useState, useMemo } from 'react';
import { Search, ShoppingCart, Heart, Star, Filter, Grid, Menu, User, Bell, ArrowLeft } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

interface FakeShoppingAppProps {
  onExitPanic: () => void;
}

export function FakeShoppingApp({ onExitPanic }: FakeShoppingAppProps) {
  const [selectedCategory, setSelectedCategory] = useState('Women');
  const [cartCount, setCartCount] = useState(3);

  const categories = useMemo(() => [
    { name: 'Women', emoji: '👗', active: true },
    { name: 'Men', emoji: '👔', active: false },
    { name: 'Kids', emoji: '👶', active: false },
    { name: 'Shoes', emoji: '👠', active: false },
    { name: 'Accessories', emoji: '👜', active: false },
    { name: 'Sale', emoji: '🏷️', active: false, highlight: true }
  ], []);

  const products = useMemo(() => [
    { 
      id: 1, 
      name: 'Floral Summer Dress', 
      price: '₹2,499', 
      originalPrice: '₹3,299',
      rating: 4.5, 
      reviews: 128,
      image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400',
      discount: '24% OFF',
      badge: 'Trending'
    },
    { 
      id: 2, 
      name: 'Casual Denim Jacket', 
      price: '₹3,999', 
      originalPrice: '₹4,999',
      rating: 4.2, 
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400',
      discount: '20% OFF',
      badge: 'New'
    },
    { 
      id: 3, 
      name: 'Elegant Evening Gown', 
      price: '₹5,999', 
      originalPrice: '₹7,999',
      rating: 4.8, 
      reviews: 203,
      image: 'https://images.unsplash.com/photo-1566479179817-4daa4ad5b8f5?w=400',
      discount: '25% OFF',
      badge: 'Premium'
    },
    { 
      id: 4, 
      name: 'Comfortable Sneakers', 
      price: '₹4,299', 
      originalPrice: '₹5,499',
      rating: 4.4, 
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400',
      discount: '22% OFF',
      badge: 'Best Seller'
    }
  ], []);

  const handleAddToCart = (productId: number) => {
    setCartCount(prev => prev + 1);
  };

  const getBadgeVariant = useMemo(() => (badge: string) => {
    switch(badge) {
      case 'Trending': return 'default';
      case 'New': return 'secondary';
      case 'Premium': return 'destructive';
      case 'Best Seller': return 'outline';
      default: return 'secondary';
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-md">
        <div className="p-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center justify-between w-full sm:w-auto gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">SS</span>
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  StyleStore
                </h1>
              </div>
              
              {/* Mobile Action Buttons */}
              <div className="flex sm:hidden gap-1">
                <Button size="sm" variant="ghost" className="relative p-2 h-8 w-8">
                  <Bell className="w-4 h-4" />
                  <Badge className="absolute -top-1 -right-1 w-4 h-4 p-0 bg-red-500 text-[10px]">2</Badge>
                </Button>
                <Button size="sm" variant="ghost" className="relative p-2 h-8 w-8">
                  <Heart className="w-4 h-4" />
                  <Badge className="absolute -top-1 -right-1 w-4 h-4 p-0 bg-pink-500 text-[10px]">5</Badge>
                </Button>
                <Button size="sm" variant="ghost" className="relative p-2 h-8 w-8">
                  <ShoppingCart className="w-4 h-4" />
                  <Badge className="absolute -top-1 -right-1 w-4 h-4 p-0 bg-purple-500 text-[10px]">{cartCount}</Badge>
                </Button>
                <Button size="sm" variant="ghost" className="p-2 h-8 w-8">
                  <User className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="w-full sm:flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input 
                placeholder="Search for fashion, beauty, lifestyle..." 
                className="pl-10 bg-gray-50 border-0 rounded-full w-full"
              />
            </div>
            
            {/* Desktop Action Buttons */}
            <div className="hidden sm:flex gap-2">
              <Button size="sm" variant="ghost" className="relative">
                <Bell className="w-4 h-4" />
                <Badge className="absolute -top-1 -right-1 w-4 h-4 p-0 bg-red-500 text-xs">2</Badge>
              </Button>
              <Button size="sm" variant="ghost" className="relative">
                <Heart className="w-4 h-4" />
                <Badge className="absolute -top-1 -right-1 w-4 h-4 p-0 bg-pink-500 text-xs">5</Badge>
              </Button>
              <Button size="sm" variant="ghost" className="relative">
                <ShoppingCart className="w-4 h-4" />
                <Badge className="absolute -top-1 -right-1 w-4 h-4 p-0 bg-purple-500 text-xs">{cartCount}</Badge>
              </Button>
              <Button size="sm" variant="ghost">
                <User className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
 
        {/* Enhanced Navigation */}
        <div className="border-t bg-gradient-to-r from-pink-50 to-purple-50 p-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex gap-3 overflow-x-auto pb-1 select-none">
              {categories.map((category) => (
                <button 
                  key={category.name} 
                  onClick={() => setSelectedCategory(category.name)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                    selectedCategory === category.name 
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg' 
                      : category.highlight 
                        ? 'bg-gradient-to-r from-orange-400 to-red-500 text-white shadow-md'
                        : 'bg-white text-gray-600 hover:text-gray-800 shadow-sm hover:shadow-md'
                  }`}
                >
                  <span>{category.emoji}</span>
                  <span className="font-medium">{category.name}</span>
                </button>
              ))}
            </div>
            <div className="flex gap-2 justify-end sm:justify-start">
              <Button size="sm" variant="outline" className="rounded-full">
                <Filter className="w-3 h-3 mr-1" />
                Filter
              </Button>
              <Button size="sm" variant="outline" className="rounded-full">
                <Grid className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>
 
      {/* Promotional Banner */}
      <div className="mx-4 mt-4 p-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-xl text-white shadow-lg">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="font-bold text-lg">🎉 Mega Sale Alert!</h3>
            <p className="text-pink-100 text-sm">Up to 70% off on trending fashion • Free shipping above ₹1999</p>
          </div>
          <Button size="sm" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100 shrink-0">
            Shop Now
          </Button>
        </div>
      </div>
 
      {/* Products Grid */}
      <div className="p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Trending in {selectedCategory}</h2>
            <p className="text-gray-600 text-sm">{products.length} items • Updated 2 hours ago</p>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
              Fast Delivery
            </Badge>
            <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
              Easy Returns
            </Badge>
          </div>
        </div>
 
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <div className="aspect-square bg-gray-100">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <Badge 
                  variant={getBadgeVariant(product.badge)} 
                  className="absolute top-2 left-2"
                >
                  {product.badge}
                </Badge>
                <Badge 
                  className="absolute top-2 right-2 bg-red-500 text-white"
                >
                  {product.discount}
                </Badge>
              </div>
              <div className="p-3">
                <h3 className="font-semibold mb-2 text-sm sm:text-base line-clamp-1">{product.name}</h3>
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs text-gray-600">{product.rating} ({product.reviews})</span>
                </div>
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <p className="font-bold text-purple-600 text-sm sm:text-base">{product.price}</p>
                    <p className="text-[10px] sm:text-xs text-gray-500 line-through">{product.originalPrice}</p>
                  </div>
                  <Button 
                    size="sm" 
                    className="bg-purple-600 hover:bg-purple-700 h-8 px-3"
                    onClick={() => handleAddToCart(product.id)}
                  >
                    Add
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4">
        <div className="flex justify-around items-center max-w-md mx-auto">
          <Button variant="ghost" size="sm" className="flex-col gap-1">
            <div className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-purple-600 rounded-full" />
            </div>
            <span className="text-xs">Home</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-col gap-1">
            <Search className="w-4 h-4" />
            <span className="text-xs">Search</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-col gap-1 relative">
            <ShoppingCart className="w-4 h-4" />
            <Badge className="absolute -top-1 -right-1 w-4 h-4 p-0 bg-purple-500 text-xs">{cartCount}</Badge>
            <span className="text-xs">Cart</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-col gap-1">
            <User className="w-4 h-4" />
            <span className="text-xs">Profile</span>
          </Button>
        </div>
      </div>

      {/* Hidden exit button for testing - positioned in a pattern sequence */}
      <div className="fixed bottom-20 left-4">
        <div className="grid grid-cols-2 gap-1">
          <button 
            className="w-2 h-2 bg-gray-200 rounded-full opacity-30"
            onClick={onExitPanic}
          />
          <button 
            className="w-2 h-2 bg-gray-200 rounded-full opacity-30"
            onClick={onExitPanic}
          />
          <button 
            className="w-2 h-2 bg-gray-200 rounded-full opacity-30"
            onClick={onExitPanic}
          />
          <button 
            className="w-2 h-2 bg-red-400 rounded-full opacity-30 hover:opacity-100 transition-opacity"
            onClick={onExitPanic}
            title="Exit panic mode (hidden pattern)"
          />
        </div>
      </div>
    </div>
  );
}