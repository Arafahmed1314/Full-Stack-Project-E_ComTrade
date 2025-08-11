import React, { useEffect, useState } from "react";
import commentsData from "../../data/comment.json";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const variants = {
  enter: { opacity: 0, x: 100 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 },
};

const ReviewSection = () => {
  const [index, setIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const comments = commentsData;

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % comments.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + comments.length) % comments.length);
  };

  const goToSlide = (slideIndex) => {
    setIndex(slideIndex);
  };

  useEffect(() => {
    if (!isAutoPlay) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % comments.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [comments.length, isAutoPlay]);

  return (
    <section className="w-full pb-12 px-4 bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          >
            What Our Users Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Real feedback from our happy customers who love shopping with us
          </motion.p>
        </div>

        {/* Reviews Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            onMouseEnter={() => setIsAutoPlay(false)}
            onMouseLeave={() => setIsAutoPlay(true)}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg hover:shadow-xl rounded-full p-3 md:p-4 transition-all duration-300 hover:scale-110 group"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-600 group-hover:text-blue-600 transition-colors" />
          </button>

          <button
            onClick={nextSlide}
            onMouseEnter={() => setIsAutoPlay(false)}
            onMouseLeave={() => setIsAutoPlay(true)}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg hover:shadow-xl rounded-full p-3 md:p-4 transition-all duration-300 hover:scale-110 group"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-gray-600 group-hover:text-blue-600 transition-colors" />
          </button>

          {/* Review Card */}
          <div className="relative min-h-[300px] md:min-h-[350px] flex items-center justify-center px-12 md:px-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={comments[index].id}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.7, ease: "easeInOut" }}
                className="absolute w-full"
                onMouseEnter={() => setIsAutoPlay(false)}
                onMouseLeave={() => setIsAutoPlay(true)}
              >
                <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 p-6 md:p-8 mx-auto max-w-2xl relative">
                  {/* Quote Icon */}
                  <Quote className="absolute top-4 right-4 w-8 h-8 text-blue-200" />

                  {/* User Avatar */}
                  <div className="flex flex-col items-center mb-6">
                    <div className="relative">
                      <img
                        src={comments[index].avatar}
                        alt={comments[index].user}
                        className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-4 border-blue-100 shadow-lg"
                      />
                      <div className="absolute -bottom-2 -right-2 bg-blue-500 rounded-full p-2">
                        <Star className="w-4 h-4 text-white fill-current" />
                      </div>
                    </div>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex justify-center mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-6 h-6 mx-1 transition-colors duration-300 ${
                          i < comments[index].rating
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Comment Text */}
                  <p className="text-lg md:text-xl italic text-gray-700 text-center mb-6 leading-relaxed">
                    "{comments[index].comment}"
                  </p>

                  {/* User Name */}
                  <div className="text-center">
                    <span className="font-bold text-xl text-gray-800">
                      {comments[index].user}
                    </span>
                    <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-2 rounded"></div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center mt-8 space-x-2">
            {comments.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  i === index
                    ? "bg-blue-500 scale-125"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
