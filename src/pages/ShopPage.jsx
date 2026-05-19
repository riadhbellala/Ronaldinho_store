import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';

export default function ShopPage() {
  const { addToCart } = useCart();
  const [filter, setFilter] = useState('All');
  
  // Track selected sizes independently for each product in the grid
  const [selectedSizes, setSelectedSizes] = useState({});

  const brands = ['All', 'Adidas', 'Nike', 'Puma'];

  const filteredProducts = filter === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.brand === filter);

  const handleSizeSelect = (productId, size) => {
    setSelectedSizes(prev => ({ ...prev, [productId]: size }));
  };

  const handleAddToCart = (product) => {
    const size = selectedSizes[product.id];
    if (!size) {
      alert("Please select a size first.");
      return;
    }
    
    addToCart({
      id: product.id,
      name: `${product.brand} ${product.name}`,
      price: product.price,
      image: product.image
    }, size);
  };

  return (
    <main className="w-full bg-matte-black pt-[72px] min-h-screen pb-32">
      
      {/* ════ HERO ════ */}
      <section className="px-6 sm:px-10 py-16 md:py-24 border-b border-neutral-900">
        <h1 className="font-display font-black uppercase text-white tracking-tighter"
            style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}>
          The Collection
        </h1>
        <p className="font-sans text-neutral-400 max-w-xl mt-4 leading-relaxed">
          The complete archive. Premium streetwear footwear engineered for the concrete. 
          Every piece is verified original.
        </p>
      </section>

      {/* ════ FILTERS ════ */}
      <div className="sticky top-[72px] z-30 bg-matte-black/90 backdrop-blur-md border-b border-neutral-900 px-6 sm:px-10 py-4 flex gap-4 overflow-x-auto no-scrollbar">
        {brands.map(brand => (
          <button
            key={brand}
            onClick={() => setFilter(brand)}
            className={`whitespace-nowrap font-sans text-xs uppercase tracking-[0.15em] px-6 py-2.5 rounded-full transition-all duration-300 ${
              filter === brand 
                ? 'bg-white text-black font-bold' 
                : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-600'
            }`}
          >
            {brand}
          </button>
        ))}
      </div>

      {/* ════ PRODUCT GRID ════ */}
      <section className="px-6 sm:px-10 py-16">
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16"
        >
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={product.id}
                className="group flex flex-col"
              >
                {/* Image Container */}
                <Link to={`/product/${product.id}`} className="relative w-full aspect-square bg-neutral-900/40 rounded-2xl p-8 mb-6 flex items-center justify-center overflow-hidden border border-neutral-800/50 group-hover:border-neutral-700 transition-colors cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                  
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-[85%] object-contain z-20 drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)] group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-700 ease-out"
                  />
                  
                  {/* Hover Quick Add Size Selector */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-30 flex flex-col gap-3">
                    <p className="font-sans text-[10px] text-white uppercase tracking-widest text-center">Select Size</p>
                    <div className="flex flex-wrap justify-center gap-1.5" onClick={(e) => e.preventDefault()}>
                      {product.sizes.map(size => {
                        const isSelected = selectedSizes[product.id] === size;
                        return (
                          <button
                            key={size}
                            onClick={() => handleSizeSelect(product.id, size)}
                            className={`w-9 h-9 rounded-full font-mono text-[11px] transition-all ${
                              isSelected 
                                ? 'bg-brand-yellow text-black font-bold' 
                                : 'bg-black/80 text-white hover:bg-white hover:text-black'
                            }`}
                          >
                            {size}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </Link>

                {/* Info */}
                <div className="flex flex-col gap-2 flex-grow">
                  <div className="flex justify-between items-start gap-4">
                    <Link to={`/product/${product.id}`} className="hover:opacity-80 transition-opacity">
                      <p className="font-sans text-[10px] text-brand-yellow uppercase tracking-[0.2em] mb-1">
                        {product.brand}
                      </p>
                      <h3 className="font-display font-black uppercase text-xl text-white tracking-tight leading-none">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="font-display font-bold text-white text-lg whitespace-nowrap">
                      {product.price.toLocaleString()} DA
                    </p>
                  </div>
                  
                  <p className="font-sans text-xs text-neutral-500 line-clamp-2 mt-2">
                    {product.description}
                  </p>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => handleAddToCart(product)}
                  className="mt-6 w-full flex items-center justify-center gap-2 bg-neutral-900 border border-neutral-800 text-white font-sans text-xs font-bold uppercase tracking-widest py-4 rounded-xl hover:bg-white hover:text-black hover:border-white transition-all duration-300"
                >
                  <ShoppingBag size={14} /> Add to Cart
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>
    </main>
  );
}
