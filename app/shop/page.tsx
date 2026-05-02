"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Shield, Snowflake, HelpCircle, Zap, User, Coins, ShoppingCart, Check } from "lucide-react";
import { StarBackground } from "../component/StarBackground";
import { GlowCard } from "../component/GlowCard";

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const shopItems = [
  { id: "shield", name: "Shield", description: "Boss Fight protection", price: 50, icon: <Shield className="w-8 h-8 text-blue-400" /> },
  { id: "time_freezer", name: "Time Freezer", description: "Pause timer for 10s", price: 75, icon: <Snowflake className="w-8 h-8 text-cyan-400" /> },
  { id: "hint_scroll", name: "Hint Scroll", description: "Eliminate wrong options", price: 40, icon: <HelpCircle className="w-8 h-8 text-yellow-400" /> },
  { id: "xp_booster", name: "XP Booster", description: "Double XP for next quiz", price: 100, icon: <Zap className="w-8 h-8 text-purple-400" /> },
  { id: "skin_fire_mage", name: "Fire Mage", description: "Rare Avatar Skin", price: 200, icon: <User className="w-8 h-8 text-orange-500" /> },
  { id: "skin_shadow_knight", name: "Shadow Knight", description: "Rare Avatar Skin", price: 200, icon: <User className="w-8 h-8 text-gray-400" /> },
];

export default function ShopPage() {
  const [userCoins, setUserCoins] = useState(150);
  const [ownedItems, setOwnedItems] = useState<string[]>([]);

  const handleBuy = async (item: typeof shopItems[0]) => {
    if (userCoins >= item.price && !ownedItems.includes(item.id)) {
      try {
        const res = await axios.post(`${API}/api/shop/buy`, {
          userId: "demo-user", // Replace with auth context later
          itemId: item.id,
          price: item.price
        });
        setUserCoins(res.data.remainingCoins);
        setOwnedItems(prev => [...prev, item.id]);
      } catch (err) {
        alert("Purchase failed. Check if you have enough coins in the database!");
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  return (
    <div className="min-h-screen bg-[#0a0015] text-white font-sans selection:bg-[#7c3aed] selection:text-white pb-20 relative">
      <StarBackground />
      
      <div className="max-w-5xl mx-auto px-6 pt-10">
        
        {/* PAGE HEADER */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 relative z-10 flex flex-col items-center"
        >
          <h1 className="text-4xl md:text-5xl font-black text-white mb-3 flex items-center justify-center gap-3">
            <ShoppingCart className="w-10 h-10 text-[#7c3aed]" /> Item Shop
          </h1>
          <p className="text-white/60 text-lg mb-6">Spend your hard-earned coins on power-ups and skins!</p>
          
          <div className="flex items-center gap-2 bg-linear-to-r from-yellow-500/20 to-yellow-600/20 px-6 py-2 rounded-full border border-yellow-500/30 shadow-[0_0_15px_rgba(234,179,8,0.2)]">
            <Coins className="text-yellow-400 w-6 h-6" />
            <span className="font-bold text-xl text-yellow-400">{userCoins} Coins</span>
          </div>
        </motion.div>

        {/* SHOP GRID */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10"
        >
          {shopItems.map((item) => {
            const isOwned = ownedItems.includes(item.id);
            const canAfford = userCoins >= item.price;
            
            return (
              <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }} key={item.id}>
                <GlowCard className="p-6 flex flex-col items-center text-center h-full">
                  <div className="w-16 h-16 rounded-2xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] flex items-center justify-center mb-4 shadow-inner">
                    {item.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-1">{item.name}</h3>
                  <p className="text-sm text-white/50 mb-6 flex-1">{item.description}</p>
                  
                  {isOwned ? (
                    <div className="w-full py-3 rounded-xl bg-[#14b8a6]/20 text-[#14b8a6] font-bold flex items-center justify-center gap-2 border border-[#14b8a6]/30">
                      <Check className="w-5 h-5" /> Owned
                    </div>
                  ) : (
                    <button onClick={() => handleBuy(item)} disabled={!canAfford} className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${canAfford ? 'bg-linear-to-br from-[#7c3aed] to-[#4f46e5] text-white shadow-[0_0_15px_rgba(124,58,237,0.4)] hover:scale-[1.02] active:scale-95' : 'bg-red-500/20 text-red-400 border border-red-500/30 cursor-not-allowed'}`}>
                      <Coins className={`w-4 h-4 ${canAfford ? 'text-yellow-300' : 'text-red-400'}`} /> 
                      {item.price} {canAfford ? 'Buy' : 'Not Enough'}
                    </button>
                  )}
                </GlowCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
