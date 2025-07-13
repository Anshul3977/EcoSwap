// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { ArrowLeft, Minus, Plus, AlertCircle, CheckCircle, ShoppingCart, Leaf } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { useNavigate } from 'react-router-dom';
// import { useToast } from '@/hooks/use-toast';

// interface CartItem {
//   id: string;
//   name: string;
//   price: number;
//   quantity: number;
//   image: string;
//   ecoAlternative?: {
//     name: string;
//     price: number;
//     image: string;
//     co2Saved: number;
//     plasticReduced: number;
//     benefits: string[];
//   };
//   isEcoSwapped?: boolean;
// }

// const initialCartItems: CartItem[] = [
//   {
//     id: '1',
//     name: 'Plastic Shopping Bags (50 pack)',
//     price: 2.97,
//     quantity: 1,
//     image: '/placeholder.svg',
//     ecoAlternative: {
//       name: 'Great Value Reusable Shopping Bags (5 pack)',
//       price: 7.98,
//       image: '/placeholder.svg',
//       co2Saved: 5.2,
//       plasticReduced: 0.8,
//       benefits: ['Reusable up to 2,500 times', 'Machine washable', 'Holds 40+ lbs']
//     }
//   },
//   {
//     id: '2',
//     name: 'Great Value Water Bottles (24 pack)',
//     price: 3.98,
//     quantity: 1,
//     image: '/placeholder.svg',
//     ecoAlternative: {
//       name: 'Simple Modern Water Bottle with Filter',
//       price: 24.99,
//       image: '/placeholder.svg',
//       co2Saved: 12.8,
//       plasticReduced: 2.4,
//       benefits: ['Filters 300 bottles worth', 'BPA-free', 'Lifetime warranty']
//     }
//   },
//   {
//     id: '3',
//     name: 'Bounty Paper Towels (6 roll pack)',
//     price: 8.74,
//     quantity: 1,
//     image: '/placeholder.svg',
//     ecoAlternative: {
//       name: 'Bamboo Reusable Paper Towels (12 pack)',
//       price: 16.99,
//       image: '/placeholder.svg',
//       co2Saved: 8.5,
//       plasticReduced: 0.2,
//       benefits: ['Washable & reusable', '100% bamboo fiber', 'Replaces 60 rolls']
//     }
//   },
//   {
//     id: '4',
//     name: 'Plastic Straws (100 count)',
//     price: 1.24,
//     quantity: 1,
//     image: '/placeholder.svg',
//     ecoAlternative: {
//       name: 'Stainless Steel Straws Set (8 pack)',
//       price: 9.99,
//       image: '/placeholder.svg',
//       co2Saved: 3.2,
//       plasticReduced: 0.5,
//       benefits: ['Dishwasher safe', 'Includes cleaning brush', 'Lifetime use']
//     }
//   }
// ];

// export default function WalmartCart() {
//   const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
//   const [expandedItem, setExpandedItem] = useState<string | null>(null);
//   const navigate = useNavigate();
//   const { toast } = useToast();

//   const updateQuantity = (id: string, newQuantity: number) => {
//     if (newQuantity < 1) return;
//     setCartItems(items =>
//       items.map(item =>
//         item.id === id ? { ...item, quantity: newQuantity } : item
//       )
//     );
//   };

//   const swapToEco = (id: string) => {
//     setCartItems(items =>
//       items.map(item =>
//         item.id === id ? { ...item, isEcoSwapped: true } : item
//       )
//     );
    
//     toast({
//       title: "Great choice! 🌱",
//       description: "You're helping save the planet!",
//       duration: 3000,
//     });
//   };

//   const toggleExpanded = (id: string) => {
//     setExpandedItem(expandedItem === id ? null : id);
//   };

//   const getTotalPrice = () => {
//     return cartItems.reduce((total, item) => {
//       const price = item.isEcoSwapped && item.ecoAlternative 
//         ? item.ecoAlternative.price 
//         : item.price;
//       return total + (price * item.quantity);
//     }, 0);
//   };

//   const getTotalEnvironmentalImpact = () => {
//     return cartItems.reduce((totals, item) => {
//       if (item.isEcoSwapped && item.ecoAlternative) {
//         totals.co2Saved += item.ecoAlternative.co2Saved * item.quantity;
//         totals.plasticReduced += item.ecoAlternative.plasticReduced * item.quantity;
//       }
//       return totals;
//     }, { co2Saved: 0, plasticReduced: 0 });
//   };

//   const environmentalImpact = getTotalEnvironmentalImpact();

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50">
//       {/* Header */}
//       <motion.header 
//         className="bg-white shadow-sm border-b-4 border-[#0071ce]"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//       >
//         <div className="max-w-7xl mx-auto px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               <Button 
//                 variant="outline" 
//                 onClick={() => navigate('/')}
//                 className="flex items-center space-x-2"
//               >
//                 <ArrowLeft className="w-4 h-4" />
//                 <span>Back to EcoSwap</span>
//               </Button>
//               <div className="h-6 w-px bg-gray-300" />
//               <h1 className="text-2xl font-bold text-[#0071ce]">Walmart x EcoSwap</h1>
//             </div>
//             <div className="flex items-center space-x-2">
//               <ShoppingCart className="w-6 h-6 text-[#0071ce]" />
//               <span className="text-lg font-semibold">Smart Cart Demo</span>
//             </div>
//           </div>
//         </div>
//       </motion.header>

//       <div className="max-w-4xl mx-auto px-6 py-8">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2 }}
//         >
//           <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
//             Your Shopping Cart
//           </h2>

//           {/* Cart Items */}
//           <div className="space-y-4 mb-8">
//             {cartItems.map((item) => (
//               <motion.div
//                 key={item.id}
//                 layout
//                 className="bg-white rounded-lg shadow-md overflow-hidden"
//               >
//                 <Card>
//                   <CardContent className="p-6">
//                     <div className="flex items-start space-x-4">
//                       {/* Product Image */}
//                       <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
//                         <ShoppingCart className="w-8 h-8 text-gray-400" />
//                       </div>

//                       {/* Product Info */}
//                       <div className="flex-1">
//                         <div className="flex items-start justify-between">
//                           <div>
//                             <h3 className="font-semibold text-gray-900">
//                               {item.isEcoSwapped && item.ecoAlternative 
//                                 ? item.ecoAlternative.name 
//                                 : item.name}
//                             </h3>
//                             <p className="text-lg font-bold text-[#0071ce]">
//                               ${(item.isEcoSwapped && item.ecoAlternative 
//                                 ? item.ecoAlternative.price 
//                                 : item.price).toFixed(2)}
//                             </p>
//                           </div>

//                           {/* Eco Badge */}
//                           {!item.isEcoSwapped && item.ecoAlternative && (
//                             <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
//                               <AlertCircle className="w-3 h-3 mr-1" />
//                               Eco Alternative Available!
//                             </Badge>
//                           )}

//                           {item.isEcoSwapped && (
//                             <Badge className="bg-green-500 text-white">
//                               <CheckCircle className="w-3 h-3 mr-1" />
//                               Eco Choice!
//                             </Badge>
//                           )}
//                         </div>

//                         {/* Quantity Controls */}
//                         <div className="flex items-center space-x-3 mt-3">
//                           <Button
//                             variant="outline"
//                             size="sm"
//                             onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                           >
//                             <Minus className="w-3 h-3" />
//                           </Button>
//                           <span className="font-semibold">{item.quantity}</span>
//                           <Button
//                             variant="outline"
//                             size="sm"
//                             onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                           >
//                             <Plus className="w-3 h-3" />
//                           </Button>
//                         </div>

//                         {/* Eco Alternative Button */}
//                         {!item.isEcoSwapped && item.ecoAlternative && (
//                           <div className="mt-4 space-y-2">
//                             <Button
//                               variant="outline"
//                               className="border-green-500 text-green-700 hover:bg-green-50"
//                               onClick={() => toggleExpanded(item.id)}
//                             >
//                               View Eco Alternative
//                             </Button>

//                             {/* Expanded Eco Details */}
//                             {expandedItem === item.id && (
//                               <motion.div
//                                 initial={{ opacity: 0, height: 0 }}
//                                 animate={{ opacity: 1, height: 'auto' }}
//                                 exit={{ opacity: 0, height: 0 }}
//                                 className="bg-green-50 rounded-lg p-4 border border-green-200"
//                               >
//                                 <div className="grid md:grid-cols-2 gap-4">
//                                   <div>
//                                     <h4 className="font-semibold text-green-800 mb-2">
//                                       {item.ecoAlternative.name}
//                                     </h4>
//                                     <p className="text-lg font-bold text-green-700">
//                                       ${item.ecoAlternative.price.toFixed(2)}
//                                     </p>
//                                     <ul className="text-sm text-green-600 mt-2 space-y-1">
//                                       {item.ecoAlternative.benefits.map((benefit, idx) => (
//                                         <li key={idx} className="flex items-center">
//                                           <Leaf className="w-3 h-3 mr-1" />
//                                           {benefit}
//                                         </li>
//                                       ))}
//                                     </ul>
//                                   </div>
//                                   <div>
//                                     <h5 className="font-semibold text-green-800 mb-2">Environmental Impact</h5>
//                                     <div className="space-y-1 text-sm">
//                                       <p>🌍 CO₂ Saved: {item.ecoAlternative.co2Saved} lbs</p>
//                                       <p>♻️ Plastic Reduced: {item.ecoAlternative.plasticReduced} lbs</p>
//                                     </div>
//                                     <Button
//                                       className="mt-3 bg-green-600 hover:bg-green-700 text-white"
//                                       onClick={() => swapToEco(item.id)}
//                                     >
//                                       Switch to Eco Option
//                                     </Button>
//                                   </div>
//                                 </div>
//                               </motion.div>
//                             )}
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             ))}
//           </div>

//           {/* Summary */}
//           <div className="grid md:grid-cols-2 gap-6">
//             {/* Price Summary */}
//             <Card>
//               <CardHeader>
//                 <CardTitle className="text-[#0071ce]">Order Summary</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-2">
//                   <div className="flex justify-between">
//                     <span>Subtotal</span>
//                     <span>${getTotalPrice().toFixed(2)}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>Tax</span>
//                     <span>${(getTotalPrice() * 0.08).toFixed(2)}</span>
//                   </div>
//                   <div className="border-t pt-2 flex justify-between font-bold text-lg">
//                     <span>Total</span>
//                     <span>${(getTotalPrice() * 1.08).toFixed(2)}</span>
//                   </div>
//                 </div>
//                 <Button className="w-full mt-4 bg-[#ffc220] hover:bg-yellow-400 text-black font-bold">
//                   Proceed to Checkout
//                 </Button>
//               </CardContent>
//             </Card>

//             {/* Environmental Impact */}
//             <Card>
//               <CardHeader>
//                 <CardTitle className="text-green-600 flex items-center">
//                   <Leaf className="w-5 h-5 mr-2" />
//                   Your Environmental Impact
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 {environmentalImpact.co2Saved > 0 || environmentalImpact.plasticReduced > 0 ? (
//                   <div className="space-y-3">
//                     <div className="text-center">
//                       <p className="text-2xl font-bold text-green-600">
//                         {environmentalImpact.co2Saved.toFixed(1)} lbs
//                       </p>
//                       <p className="text-sm text-gray-600">CO₂ Saved</p>
//                     </div>
//                     <div className="text-center">
//                       <p className="text-2xl font-bold text-blue-600">
//                         {environmentalImpact.plasticReduced.toFixed(1)} lbs
//                       </p>
//                       <p className="text-sm text-gray-600">Plastic Reduced</p>
//                     </div>
//                     <div className="bg-green-100 rounded-lg p-3 text-center">
//                       <p className="text-sm text-green-800 font-semibold">
//                         🎉 Great job! You're making a difference!
//                       </p>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="text-center text-gray-500">
//                     <p>Switch to eco alternatives to see your environmental impact!</p>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Minus, Plus, AlertCircle, CheckCircle, ShoppingCart, Leaf, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  ecoAlternative?: {
    name: string;
    price: number;
    image: string;
    co2Saved: number;
    plasticReduced: number;
    benefits: string[];
  };
  isEcoSwapped?: boolean;
}

const initialCartItems: CartItem[] = [
  {
    id: '1',
    name: 'Plastic Shopping Bags (50 pack)',
    price: 2.97,
    quantity: 1,
    image: '/placeholder.svg',
    ecoAlternative: {
      name: 'Great Value Reusable Shopping Bags (5 pack)',
      price: 7.98,
      image: '/placeholder.svg',
      co2Saved: 5.2,
      plasticReduced: 0.8,
      benefits: ['Reusable up to 2,500 times', 'Machine washable', 'Holds 40+ lbs']
    }
  },
  {
    id: '2',
    name: 'Great Value Water Bottles (24 pack)',
    price: 3.98,
    quantity: 1,
    image: '/placeholder.svg',
    ecoAlternative: {
      name: 'Simple Modern Water Bottle with Filter',
      price: 24.99,
      image: '/placeholder.svg',
      co2Saved: 12.8,
      plasticReduced: 2.4,
      benefits: ['Filters 300 bottles worth', 'BPA-free', 'Lifetime warranty']
    }
  },
  {
    id: '3',
    name: 'Bounty Paper Towels (6 roll pack)',
    price: 8.74,
    quantity: 1,
    image: '/placeholder.svg',
    ecoAlternative: {
      name: 'Bamboo Reusable Paper Towels (12 pack)',
      price: 16.99,
      image: '/placeholder.svg',
      co2Saved: 8.5,
      plasticReduced: 0.2,
      benefits: ['Washable & reusable', '100% bamboo fiber', 'Replaces 60 rolls']
    }
  },
  {
    id: '4',
    name: 'Plastic Straws (100 count)',
    price: 1.24,
    quantity: 1,
    image: '/placeholder.svg',
    ecoAlternative: {
      name: 'Stainless Steel Straws Set (8 pack)',
      price: 9.99,
      image: '/placeholder.svg',
      co2Saved: 3.2,
      plasticReduced: 0.5,
      benefits: ['Dishwasher safe', 'Includes cleaning brush', 'Lifetime use']
    }
  }
];

export default function WalmartCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const swapToEco = (id: string) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, isEcoSwapped: true } : item
      )
    );
    
    toast({
      title: "Great choice! 🌱",
      description: "You're helping save the planet!",
      duration: 3000,
    });
  };

  const toggleExpanded = (id: string) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = item.isEcoSwapped && item.ecoAlternative 
        ? item.ecoAlternative.price 
        : item.price;
      return total + (price * item.quantity);
    }, 0);
  };

  const getTotalEnvironmentalImpact = () => {
    return cartItems.reduce((totals, item) => {
      if (item.isEcoSwapped && item.ecoAlternative) {
        totals.co2Saved += item.ecoAlternative.co2Saved * item.quantity;
        totals.plasticReduced += item.ecoAlternative.plasticReduced * item.quantity;
      }
      return totals;
    }, { co2Saved: 0, plasticReduced: 0 });
  };

  const environmentalImpact = getTotalEnvironmentalImpact();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900">
      {/* Header */}
      <motion.header 
        className="bg-gray-900/80 backdrop-blur-lg border-b border-emerald-500/20 shadow-xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                onClick={() => navigate('/')}
                className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 text-white border-gray-700"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to EcoSwap</span>
              </Button>
              <div className="h-6 w-px bg-gray-700" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">
                Walmart x EcoSwap
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              <ShoppingCart className="w-6 h-6 text-emerald-400" />
              <span className="text-lg font-semibold text-white">Smart Cart Demo</span>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center flex items-center justify-center space-x-2">
            <Sparkles className="w-8 h-8 text-emerald-400" />
            <span>Your Shopping Cart</span>
          </h2>

          {/* Cart Items */}
          <div className="space-y-4 mb-8">
            {cartItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-xl border border-gray-700/50 overflow-hidden"
              >
                <Card className="bg-transparent border-0">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      {/* Product Image */}
                      <div className="w-20 h-20 bg-gray-700 rounded-lg flex items-center justify-center">
                        <ShoppingCart className="w-8 h-8 text-gray-500" />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-white">
                              {item.isEcoSwapped && item.ecoAlternative 
                                ? item.ecoAlternative.name 
                                : item.name}
                            </h3>
                            <p className="text-lg font-bold text-emerald-400">
                              ${(item.isEcoSwapped && item.ecoAlternative 
                                ? item.ecoAlternative.price 
                                : item.price).toFixed(2)}
                            </p>
                          </div>

                          {/* Eco Badge */}
                          {!item.isEcoSwapped && item.ecoAlternative && (
                            <Badge className="bg-emerald-900/50 text-emerald-300 border border-emerald-500/50 hover:bg-emerald-800/50">
                              <AlertCircle className="w-3 h-3 mr-1" />
                              Eco Alternative Available!
                            </Badge>
                          )}

                          {item.isEcoSwapped && (
                            <Badge className="bg-emerald-500 text-white">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Eco Choice!
                            </Badge>
                          )}
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-3 mt-3">
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-gray-700 hover:bg-gray-600 text-white border-gray-600"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="font-semibold text-white">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-gray-700 hover:bg-gray-600 text-white border-gray-600"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>

                        {/* Eco Alternative Button */}
                        {!item.isEcoSwapped && item.ecoAlternative && (
                          <div className="mt-4 space-y-2">
                            <Button
                              variant="outline"
                              className="border-emerald-500 text-emerald-400 hover:bg-emerald-900/50 hover:text-emerald-300"
                              onClick={() => toggleExpanded(item.id)}
                            >
                              View Eco Alternative
                            </Button>

                            {/* Expanded Eco Details */}
                            {expandedItem === item.id && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="bg-emerald-900/30 rounded-lg p-4 border border-emerald-500/30"
                              >
                                <div className="grid md:grid-cols-2 gap-4">
                                  <div>
                                    <h4 className="font-semibold text-emerald-300 mb-2">
                                      {item.ecoAlternative.name}
                                    </h4>
                                    <p className="text-lg font-bold text-emerald-400">
                                      ${item.ecoAlternative.price.toFixed(2)}
                                    </p>
                                    <ul className="text-sm text-emerald-200 mt-2 space-y-1">
                                      {item.ecoAlternative.benefits.map((benefit, idx) => (
                                        <li key={idx} className="flex items-center">
                                          <Leaf className="w-3 h-3 mr-1" />
                                          {benefit}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div>
                                    <h5 className="font-semibold text-emerald-300 mb-2">Environmental Impact</h5>
                                    <div className="space-y-1 text-sm text-emerald-200">
                                      <p>🌍 CO₂ Saved: {item.ecoAlternative.co2Saved} lbs</p>
                                      <p>♻️ Plastic Reduced: {item.ecoAlternative.plasticReduced} lbs</p>
                                    </div>
                                    <Button
                                      className="mt-3 bg-emerald-600 hover:bg-emerald-700 text-white"
                                      onClick={() => swapToEco(item.id)}
                                    >
                                      Switch to Eco Option
                                    </Button>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Summary */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Price Summary */}
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-emerald-400">Order Summary</CardTitle>
                </CardHeader>
              <CardContent>
                <div className="space-y-2 text-gray-300">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-white">${getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span className="text-white">${(getTotalPrice() * 0.08).toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-700 pt-2 flex justify-between font-bold text-lg">
                    <span className="text-white">Total</span>
                    <span className="text-emerald-400">${(getTotalPrice() * 1.08).toFixed(2)}</span>
                  </div>
                </div>
                <Button className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-lg hover:shadow-emerald-500/25 transition-all duration-300">
                  Proceed to Checkout
                </Button>
              </CardContent>
            </Card>

            {/* Environmental Impact */}
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-emerald-400 flex items-center">
                  <Leaf className="w-5 h-5 mr-2" />
                  Your Environmental Impact
                </CardTitle>
              </CardHeader>
              <CardContent>
                {environmentalImpact.co2Saved > 0 || environmentalImpact.plasticReduced > 0 ? (
                  <div className="space-y-3">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-emerald-400">
                        {environmentalImpact.co2Saved.toFixed(1)} lbs
                      </p>
                      <p className="text-sm text-gray-400">CO₂ Saved</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-blue-400">
                        {environmentalImpact.plasticReduced.toFixed(1)} lbs
                      </p>
                      <p className="text-sm text-gray-400">Plastic Reduced</p>
                    </div>
                    <div className="bg-emerald-900/50 rounded-lg p-3 text-center border border-emerald-500/30">
                      <p className="text-sm text-emerald-300 font-semibold flex items-center justify-center space-x-2">
                        <Sparkles className="w-4 h-4" />
                        <span>Great job! You're making a difference!</span>
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-gray-400 py-6">
                    <Leaf className="w-12 h-12 mx-auto mb-3 text-gray-600" />
                    <p>Switch to eco alternatives to see your environmental impact!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Bottom CTA */}
          <motion.div 
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-gray-400 mb-4">
              This demo shows how Walmart can integrate EcoSwap to help customers make sustainable choices
            </p>
            <Button
              variant="outline"
              className="border-emerald-500 text-emerald-400 hover:bg-emerald-900/50"
              onClick={() => navigate('/')}
            >
              Learn More About EcoSwap
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}