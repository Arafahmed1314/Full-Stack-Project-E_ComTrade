import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Grid3X3,
  Star,
  Sparkles,
  Zap,
  TrendingUp,
} from "lucide-react";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Enhanced hero images with better product photos
  const heroImages = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&h=800&fit=crop&q=80",
      alt: "Premium Fashion Collection",
      category: "Fashion",
      title: "Premium Fashion",
      subtitle: "Discover trending styles",
      discount: "30% OFF",
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=1200&h=800&fit=crop&q=80",
      alt: "Latest Electronics",
      category: "Electronics",
      title: "Smart Electronics",
      subtitle: "Latest technology",
      discount: "25% OFF",
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&h=800&fit=crop&q=80",
      alt: "Luxury Jewelry",
      category: "Jewelry",
      title: "Luxury Jewelry",
      subtitle: "Timeless elegance",
      discount: "40% OFF",
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=1200&h=800&fit=crop&q=80",
      alt: "Designer Accessories",
      category: "Accessories",
      title: "Designer Accessories",
      subtitle: "Complete your look",
      discount: "35% OFF",
    },
  ];

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [heroImages.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="w-full pb-12  bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900  lg:flex lg:items-center">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}

        {/* Gradient orbs */}
        <motion.div
          className="absolute top-20 -left-40 w-80 h-80 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 -right-40 w-80 h-80 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </div>

      {/* Main Background Carousel */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1, rotateY: 45 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.9, rotateY: -45 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${heroImages[currentSlide].url})`,
              }}
            >
              {/* Enhanced overlay with gradient mesh */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-purple-900/50 to-black/70"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Enhanced Content */}
      <div className="relative z-10 w-full h-full flex items-center py-8 lg:py-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-screen lg:min-h-0">
            {/* Main Text Content */}
            <div
              className="lg:col-span-7 text-white space-y-4 lg:space-y-5 flex flex-col justify-center"
              style={{ minHeight: "auto" }}
            >
              {/* Discount Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-red-500 px-4 py-2 rounded-full text-sm font-bold"
              >
                <Sparkles className="w-4 h-4" />
                <span>
                  Limited Time: {heroImages[currentSlide].discount} on{" "}
                  {heroImages[currentSlide].category}
                </span>
                <Zap className="w-4 h-4" />
              </motion.div>

              {/* Main Headline with Enhanced Typography */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-3 lg:space-y-4"
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight">
                  <motion.span
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{ duration: 5, repeat: Infinity }}
                    className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent bg-300% inline-block"
                    style={{ backgroundSize: "300% 300%" }}
                  >
                    Discover
                  </motion.span>
                  <br />
                  <span className="text-white">Your Perfect</span>
                  <br />
                  <motion.span
                    animate={{
                      scale: [1, 1.05, 1],
                      textShadow: [
                        "0 0 20px rgba(147, 197, 253, 0.5)",
                        "0 0 40px rgba(147, 197, 253, 0.8)",
                        "0 0 20px rgba(147, 197, 253, 0.5)",
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent"
                  >
                    Style
                  </motion.span>
                </h1>
              </motion.div>

              {/* Enhanced Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 max-w-2xl leading-relaxed font-light"
              >
                Explore our{" "}
                <span className="text-blue-400 font-semibold">
                  curated collection
                </span>{" "}
                of premium products across fashion, electronics, jewelry, and
                more. Find exactly what you're looking for at{" "}
                <span className="text-green-400 font-semibold">
                  unbeatable prices
                </span>
                .
              </motion.p>

              {/* Enhanced CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 lg:gap-6 pt-3 lg:pt-4"
              >
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.5)",
                    backgroundColor: "#1d4ed8",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-2xl font-bold text-base sm:text-lg flex items-center justify-center space-x-2 lg:space-x-3 transition-all duration-300 overflow-hidden"
                >
                  <motion.div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10">Shop Now</span>
                  <ArrowRight className="relative z-10 w-5 h-5 lg:w-6 lg:h-6 group-hover:translate-x-2 transition-transform duration-300" />
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute -top-1 -right-1 w-2 h-2 lg:w-3 lg:h-3 bg-yellow-400 rounded-full opacity-75"
                  />
                </motion.button>

                <motion.button
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(255,255,255,0.2)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-2xl font-bold text-base sm:text-lg flex items-center justify-center space-x-2 lg:space-x-3 transition-all duration-300"
                >
                  <Grid3X3 className="w-5 h-5 lg:w-6 lg:h-6" />
                  <span>Browse Categories</span>
                  <motion.div
                    animate={{ y: [0, -2, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full"
                  />
                </motion.button>
              </motion.div>

              {/* Enhanced Stats with Animation - Improved Visibility */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                className="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8 pt-6 lg:pt-2"
              >
                <motion.div
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="text-center group cursor-pointer bg-white/5 backdrop-blur-sm rounded-2xl p-3 sm:p-4 border border-white/10 hover:border-blue-400/30 transition-all duration-300"
                >
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-1 lg:mb-2"
                  >
                    10K+
                  </motion.div>
                  <div className="text-sm sm:text-base text-white font-semibold mb-1">
                    Premium Products
                  </div>
                  <div className="flex justify-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="text-center group cursor-pointer bg-white/5 backdrop-blur-sm rounded-2xl p-3 sm:p-4 border border-white/10 hover:border-green-400/30 transition-all duration-300"
                >
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-1 lg:mb-2"
                  >
                    50K+
                  </motion.div>
                  <div className="text-sm sm:text-base text-white font-semibold mb-1">
                    Happy Customers
                  </div>
                  <div className="flex justify-center items-center mt-1 space-x-1">
                    <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                    <span className="text-xs sm:text-sm text-green-400 font-medium">
                      98% Satisfaction
                    </span>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="text-center group cursor-pointer bg-white/5 backdrop-blur-sm rounded-2xl p-3 sm:p-4 border border-white/10 hover:border-purple-400/30 transition-all duration-300"
                >
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-1 lg:mb-2"
                  >
                    4.9
                  </motion.div>
                  <div className="text-sm sm:text-base text-white font-semibold mb-1">
                    Average Rating
                  </div>
                  <div className="flex justify-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Enhanced Right Side - 3D Product Showcase */}
            <div className="lg:col-span-5 flex justify-center items-center mt-8 lg:mt-0">
              <motion.div
                initial={{ opacity: 0, x: 50, rotateY: 45 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="relative w-full max-w-sm lg:max-w-none flex items-center justify-center"
              >
                {/* Main Product Card */}
                <motion.div
                  animate={{
                    y: [0, -20, 0],
                    rotateY: [0, 5, 0, -5, 0],
                  }}
                  transition={{
                    y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                    rotateY: {
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }}
                  className="w-full h-80 sm:h-96 lg:w-80 lg:h-96 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-4 lg:p-6 relative overflow-hidden shadow-2xl mx-auto"
                >
                  {/* Glowing border effect */}
                  <motion.div
                    animate={{
                      background: [
                        "linear-gradient(45deg, #3b82f6, #8b5cf6)",
                        "linear-gradient(45deg, #8b5cf6, #ef4444)",
                        "linear-gradient(45deg, #ef4444, #f59e0b)",
                        "linear-gradient(45deg, #f59e0b, #3b82f6)",
                      ],
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute inset-0 rounded-3xl opacity-20 blur-sm"
                  />

                  {/* Card Content */}
                  <div className="relative z-10 h-full flex flex-col justify-between">
                    <div>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 20,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4"
                      >
                        <Sparkles className="w-8 h-8 text-white" />
                      </motion.div>

                      <h3 className="text-xl lg:text-2xl font-bold text-white mb-2">
                        {heroImages[currentSlide].title}
                      </h3>
                      <p className="text-gray-300 mb-3 lg:mb-4 text-sm lg:text-base">
                        {heroImages[currentSlide].subtitle}
                      </p>

                      {/* Mini product preview */}
                      <div className="w-full h-24 lg:h-32 bg-white/10 rounded-xl mb-3 lg:mb-4 overflow-hidden">
                        <motion.img
                          key={currentSlide}
                          initial={{ scale: 1.2, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.8 }}
                          src={heroImages[currentSlide].url}
                          alt={heroImages[currentSlide].alt}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2.5 lg:py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 text-sm lg:text-base"
                    >
                      <span>Explore Collection</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>

                {/* Floating Elements */}
                <motion.div
                  animate={{
                    rotate: 360,
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                    scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                  }}
                  className="absolute -top-8 -right-8 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-80 blur-xl"
                />

                <motion.div
                  animate={{
                    rotate: -360,
                    scale: [1.2, 1, 1.2],
                  }}
                  transition={{
                    rotate: { duration: 12, repeat: Infinity, ease: "linear" },
                    scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                  }}
                  className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full opacity-70 blur-lg"
                />

                {/* Sparkle effects */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-white rounded-full"
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                    style={{
                      left: `${20 + Math.random() * 60}%`,
                      top: `${20 + Math.random() * 60}%`,
                    }}
                  />
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Slide Indicators */}
      <div className="absolute bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {heroImages.map((image, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className={`relative transition-all duration-300 ${
              index === currentSlide
                ? "w-12 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                : "w-4 h-4 bg-white/50 hover:bg-white/80 rounded-full"
            }`}
          >
            {index === currentSlide && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Enhanced Floating Category Card */}
      <motion.div
        initial={{ opacity: 0, y: 50, x: 50 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-20 right-8 hidden xl:block z-20"
      >
        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 text-white min-w-[200px] shadow-2xl"
        >
          <div className="flex items-center space-x-3 mb-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center"
            >
              <Sparkles className="w-4 h-4 text-white" />
            </motion.div>
            <div className="text-sm font-medium opacity-80">
              Featured Category
            </div>
          </div>
          <div className="text-xl font-bold mb-1">
            {heroImages[currentSlide].category}
          </div>
          <div className="text-green-400 font-semibold text-sm">
            {heroImages[currentSlide].discount}
          </div>
          <motion.div
            animate={{ width: ["0%", "100%"] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-3"
          />
        </motion.div>
      </motion.div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-8 z-20 hidden lg:block"
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="flex flex-col items-center text-white/80 space-y-3 cursor-pointer"
        >
          <div className="text-sm font-medium">Scroll to explore</div>
          <motion.div className="relative">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="w-1 h-3 bg-white/60 rounded-full mt-2"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Performance Indicators */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 2 }}
        className="absolute top-32 left-8 z-20 hidden lg:block"
      >
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 text-white">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <span className="text-sm font-semibold">Live Stats</span>
          </div>
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-2xl font-bold text-green-400"
          >
            +{Math.floor(Math.random() * 100) + 200}
          </motion.div>
          <div className="text-xs text-gray-300">Sales today</div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
