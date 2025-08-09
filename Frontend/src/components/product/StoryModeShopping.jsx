import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ChevronDown,
  Play,
  Pause,
  Volume2,
  Star,
  Heart,
  ShoppingCart,
  Coffee,
  Droplets,
  Thermometer,
  Timer,
  Zap,
  Shield,
  Award,
  TrendingUp,
} from "lucide-react";
import { getFeaturedProduct } from "../../data/productData";

const StoryModeShopping = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [currentScene, setCurrentScene] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Get product data
  const product = getFeaturedProduct();

  // Smooth spring animations for scroll-based transforms
  const scene1Opacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const scene2Opacity = useTransform(
    scrollYProgress,
    [0.2, 0.45, 0.65],
    [0, 1, 0]
  );
  const scene3Opacity = useTransform(scrollYProgress, [0.6, 0.85], [0, 1]);
  const scene4Opacity = useTransform(scrollYProgress, [0.8, 1], [0, 1]);

  const productScale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [1, 1.2, 0.8, 1]
  );
  const productY = useTransform(scrollYProgress, [0, 0.5, 1], [0, -50, 0]);
  const productRotate = useTransform(scrollYProgress, [0, 0.5, 1], [12, 0, -5]);

  const bgParallax1 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const bgParallax2 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  // Icon mapping for features
  const iconMap = {
    Coffee: Coffee,
    Thermometer: Thermometer,
    Timer: Timer,
    Droplets: Droplets,
    Zap: Zap,
    Shield: Shield,
  };

  // Track current scene based on scroll
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((progress) => {
      if (progress < 0.25) setCurrentScene(0);
      else if (progress < 0.5) setCurrentScene(1);
      else if (progress < 0.75) setCurrentScene(2);
      else setCurrentScene(3);
    });

    return unsubscribe;
  }, [scrollYProgress]);

  const addToCart = () => {
    // Add to cart logic here
    console.log(`Added ${quantity} ${product.name} to cart`);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden bg-black"
      style={{ height: "400vh" }} // 4x viewport height for scroll story
    >
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Scene Navigation Dots */}
      <div className="fixed top-6 right-6 z-40 flex space-x-2">
        {Object.values(product.stories).map((_, index) => (
          <motion.div
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentScene === index
                ? "bg-white shadow-lg scale-125"
                : "bg-white/30"
            }`}
            whileHover={{ scale: 1.4 }}
          />
        ))}
      </div>

      {/* Floating UI Controls */}
      <div className="fixed top-6 left-6 z-40 flex space-x-3">
        <motion.button
          onClick={() => setIsPlaying(!isPlaying)}
          className="flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-lg rounded-full text-white hover:bg-white/30 transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </motion.button>
        <motion.button
          className="flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-lg rounded-full text-white hover:bg-white/30 transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Volume2 size={20} />
        </motion.button>
      </div>

      {/* Enhanced Product Info Card */}
      <motion.div
        className="fixed bottom-6 left-6 right-6 lg:left-auto lg:w-96 z-40"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-2xl">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">
                {product.name}
              </h3>
              <p className="text-white/70 text-sm">{product.brand}</p>
              <div className="flex items-center space-x-2 mt-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={`${
                        i < Math.floor(product.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-white/30"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-white/70 text-xs">
                  ({product.reviews})
                </span>
              </div>
            </div>
            <motion.button
              onClick={() => setIsLiked(!isLiked)}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Heart
                size={20}
                className={`${
                  isLiked ? "fill-red-500 text-red-500" : "text-white"
                } transition-colors duration-300`}
              />
            </motion.button>
          </div>

          <div className="flex items-baseline space-x-2 mb-4">
            <span className="text-2xl font-bold text-white">
              ${product.price}
            </span>
            <span className="text-lg text-white/50 line-through">
              ${product.originalPrice}
            </span>
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
              Save{" "}
              {Math.round(
                ((product.originalPrice - product.price) /
                  product.originalPrice) *
                  100
              )}
              %
            </span>
          </div>

          {/* Product Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {product.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="bg-white/20 text-white text-xs px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center bg-white/20 rounded-lg overflow-hidden">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 text-white hover:bg-white/20 transition-colors"
              >
                -
              </button>
              <span className="px-4 py-2 text-white bg-white/10">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-2 text-white hover:bg-white/20 transition-colors"
              >
                +
              </button>
            </div>
            <motion.button
              onClick={addToCart}
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ShoppingCart size={20} />
              <span>Add to Cart</span>
            </motion.button>
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/20">
            <div className="flex items-center space-x-1 text-white/70 text-xs">
              <Shield size={14} />
              <span>2-Year Warranty</span>
            </div>
            <div className="flex items-center space-x-1 text-white/70 text-xs">
              <Zap size={14} />
              <span>Fast Delivery</span>
            </div>
            <div className="flex items-center space-x-1 text-white/70 text-xs">
              <Award size={14} />
              <span>Top Rated</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Story Container */}
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        {/* Scene 1: Lifestyle Environment */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            opacity: scene1Opacity,
            background: product.stories.lifestyle.background,
          }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/40"
            style={{ y: bgParallax1 }}
          />

          {/* Environment Pattern */}
          <div className="absolute inset-0 opacity-30">
            <div
              className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"
              style={{
                backgroundImage: `radial-gradient(circle at 30px 30px, rgba(255,255,255,0.05) 2px, transparent 2px)`,
                backgroundSize: "60px 60px",
              }}
            />
          </div>

          <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
            <motion.h1
              className="text-6xl lg:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              {product.stories.lifestyle.title}
            </motion.h1>
            <motion.p
              className="text-xl lg:text-2xl text-white/80 mb-8"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              {product.stories.lifestyle.subtitle}
            </motion.p>
            <motion.div
              className="animate-bounce"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
            >
              <ChevronDown size={32} className="mx-auto text-white/60" />
            </motion.div>
          </div>

          {/* Product in Environment */}
          <motion.div
            className="absolute bottom-20 right-20 w-64 h-64"
            style={{
              scale: productScale,
              y: productY,
              rotate: productRotate,
            }}
          >
            <motion.div
              className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl flex items-center justify-center transition-transform duration-500"
              whileHover={{ rotate: 0, scale: 1.05 }}
            >
              <Coffee size={80} className="text-amber-400" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scene 2: Product in Action */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            opacity: scene2Opacity,
            background: product.stories.action.background,
          }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-tr from-black/30 to-transparent"
            style={{ y: bgParallax2 }}
          />

          <div className="relative z-10 flex items-center justify-between w-full max-w-6xl mx-auto px-6">
            <div className="text-white max-w-xl">
              <motion.h2
                className="text-5xl lg:text-6xl font-bold mb-6"
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 1 }}
              >
                {product.stories.action.title}
              </motion.h2>
              <motion.p
                className="text-xl text-white/80 mb-8"
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 1 }}
              >
                Experience the mesmerizing process of perfect coffee extraction.
                Watch as hot water meets freshly ground beans in a symphony of
                brewing excellence.
              </motion.p>

              {/* Real-time brewing stats */}
              <motion.div
                className="grid grid-cols-2 gap-4"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 1 }}
              >
                <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 border border-white/20">
                  <div className="flex items-center space-x-2 mb-2">
                    <Thermometer size={20} className="text-orange-400" />
                    <span className="text-white font-semibold">
                      Temperature
                    </span>
                  </div>
                  <motion.div
                    className="text-2xl font-bold text-orange-400"
                    animate={isPlaying ? { scale: [1, 1.05, 1] } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    93°C
                  </motion.div>
                </div>
                <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 border border-white/20">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp size={20} className="text-blue-400" />
                    <span className="text-white font-semibold">Pressure</span>
                  </div>
                  <motion.div
                    className="text-2xl font-bold text-blue-400"
                    animate={isPlaying ? { scale: [1, 1.05, 1] } : {}}
                    transition={{ duration: 1.8, repeat: Infinity }}
                  >
                    15 Bar
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Enhanced Animated Coffee Machine */}
            <motion.div
              className="relative w-96 h-96"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 rounded-3xl shadow-2xl overflow-hidden">
                {/* Coffee Machine Body */}
                <div className="absolute top-8 left-8 right-8 bottom-20 bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl border border-gray-600/50" />

                {/* Animated Water Flow */}
                <motion.div
                  className="absolute top-1/3 left-1/2 transform -translate-x-1/2"
                  animate={
                    isPlaying
                      ? {
                          y: [0, 20, 40, 60],
                          opacity: [1, 0.8, 0.6, 0],
                        }
                      : {}
                  }
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    staggerChildren: 0.2,
                  }}
                >
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1 h-8 bg-gradient-to-b from-blue-300 to-amber-600 rounded-full mb-1"
                      animate={
                        isPlaying
                          ? {
                              scaleY: [0, 1, 1, 0],
                              opacity: [0, 1, 1, 0],
                            }
                          : {}
                      }
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.1,
                      }}
                    />
                  ))}
                </motion.div>

                {/* Brewing Chamber */}
                <motion.div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-amber-800 to-amber-900 rounded-lg border border-amber-600"
                  animate={
                    isPlaying
                      ? {
                          scale: [1, 1.05, 1],
                          boxShadow: [
                            "0 0 20px rgba(245, 158, 11, 0.3)",
                            "0 0 30px rgba(245, 158, 11, 0.6)",
                            "0 0 20px rgba(245, 158, 11, 0.3)",
                          ],
                        }
                      : {}
                  }
                  transition={{ duration: 1.5, repeat: Infinity }}
                />

                {/* Steam Effect */}
                <motion.div
                  className="absolute top-4 right-4 space-y-1"
                  animate={
                    isPlaying
                      ? {
                          y: [-5, -15, -5],
                          opacity: [0.3, 0.7, 0.3],
                        }
                      : {}
                  }
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    staggerChildren: 0.2,
                  }}
                >
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 bg-white/40 rounded-full"
                      animate={
                        isPlaying
                          ? {
                              scale: [0.5, 1, 0.5],
                              y: [0, -10, -20],
                              opacity: [0.8, 0.4, 0],
                            }
                          : {}
                      }
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3,
                      }}
                    />
                  ))}
                </motion.div>

                {/* Coffee Cup */}
                <motion.div
                  className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-12 h-16 bg-gradient-to-b from-gray-100 to-gray-300 rounded-b-lg"
                  animate={
                    isPlaying
                      ? {
                          y: [0, -2, 0],
                        }
                      : {}
                  }
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  {/* Coffee Level */}
                  <motion.div
                    className="absolute bottom-1 left-1 right-1 bg-gradient-to-b from-amber-600 to-amber-800 rounded-b-lg"
                    animate={
                      isPlaying
                        ? {
                            height: ["20%", "80%", "80%"],
                          }
                        : {}
                    }
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scene 3: Feature Highlights */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            opacity: scene3Opacity,
            background: product.stories.features.background,
          }}
        >
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
            <motion.h2
              className="text-5xl lg:text-6xl font-bold text-white text-center mb-16"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {product.stories.features.title}
            </motion.h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Enhanced Product Showcase */}
              <motion.div
                className="relative"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.2 }}
              >
                <div className="relative w-full aspect-square bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-2xl overflow-hidden">
                  <div className="absolute inset-8 bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl flex items-center justify-center">
                    <Coffee size={120} className="text-amber-400" />
                  </div>

                  {/* Interactive Feature Callouts */}
                  {product.features.map((feature, index) => {
                    const IconComponent = iconMap[feature.icon] || Coffee;
                    return (
                      <motion.div
                        key={index}
                        className="absolute bg-white/10 backdrop-blur-lg rounded-lg p-3 border border-white/20 cursor-pointer"
                        style={{
                          top: `${20 + index * 18}%`,
                          right: index % 2 === 0 ? "5%" : "auto",
                          left: index % 2 === 1 ? "5%" : "auto",
                        }}
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ delay: index * 0.2, duration: 0.6 }}
                        whileHover={{
                          scale: 1.1,
                          backgroundColor: "rgba(255,255,255,0.2)",
                        }}
                      >
                        <IconComponent size={20} className="text-white mb-1" />
                        <p className="text-white text-xs font-medium">
                          {feature.label}
                        </p>
                      </motion.div>
                    );
                  })}

                  {/* Rotating Highlight Ring */}
                  <motion.div
                    className="absolute inset-4 border-2 border-gradient-to-r from-purple-500 to-pink-500 rounded-2xl"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{
                      background:
                        "conic-gradient(from 0deg, transparent, rgba(168, 85, 247, 0.3), transparent)",
                    }}
                  />
                </div>
              </motion.div>

              {/* Enhanced Features List */}
              <div className="space-y-6">
                {product.features.map((feature, index) => {
                  const IconComponent = iconMap[feature.icon] || Coffee;
                  return (
                    <motion.div
                      key={index}
                      className="flex items-start space-x-4 bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 cursor-pointer"
                      initial={{ x: 100, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.8 }}
                      whileHover={{
                        scale: 1.02,
                        x: 10,
                        backgroundColor: "rgba(255,255,255,0.15)",
                      }}
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <IconComponent size={24} className="text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-lg mb-2">
                          {feature.label}
                        </h3>
                        <p className="text-white/70">{feature.description}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Scene 4: Happy Lifestyle */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            opacity: scene4Opacity,
            background: product.stories.happiness.background,
          }}
        >
          <div className="relative z-10 text-center text-gray-800 max-w-4xl mx-auto px-6">
            <motion.h2
              className="text-6xl lg:text-7xl font-bold mb-6"
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2 }}
            >
              {product.stories.happiness.title}
            </motion.h2>
            <motion.p
              className="text-xl lg:text-2xl text-gray-700 mb-12"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
            >
              Join thousands of coffee lovers who've transformed their mornings
            </motion.p>

            {/* Enhanced Customer Testimonials */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {product.testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/50"
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.6 + index * 0.2, duration: 1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <div className="flex justify-center mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        className="fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 text-sm italic mb-4">
                    "{testimonial.comment}"
                  </p>
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {testimonial.avatar}
                      </span>
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-gray-800 text-sm">
                        {testimonial.name}
                      </p>
                      <p className="text-gray-600 text-xs">
                        {testimonial.verified ? "✓ Verified Buyer" : "Customer"}{" "}
                        • {testimonial.date}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Enhanced Call to Action */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9, duration: 1 }}
            >
              <motion.button
                onClick={addToCart}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <ShoppingCart size={24} />
                <span>Order Now - Free Shipping</span>
              </motion.button>
              <motion.button
                className="bg-white/80 text-gray-800 px-8 py-4 rounded-xl font-semibold text-lg border border-gray-300 hover:bg-white transition-all duration-300 flex items-center space-x-2"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Shield size={24} />
                <span>30-Day Money Back Guarantee</span>
              </motion.button>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              className="flex flex-wrap items-center justify-center space-x-8 mt-8 text-gray-600"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
            >
              <div className="flex items-center space-x-2">
                <Award size={20} />
                <span className="text-sm">Award Winning</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield size={20} />
                <span className="text-sm">2-Year Warranty</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap size={20} />
                <span className="text-sm">Fast Delivery</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star size={20} />
                <span className="text-sm">{product.rating}/5 Rating</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StoryModeShopping;
