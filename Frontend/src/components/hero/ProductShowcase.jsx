import { ArrowRight, Sparkles } from "lucide-react";
const ProductShowcase = ({ currentSlide, heroImages }) => {
  return (
    <div className="lg:col-span-5 flex justify-center items-center mt-8 lg:mt-0">
      <div className="relative w-full max-w-sm lg:max-w-none flex items-center justify-center">
        {/* Main Product Card */}
        <div className="w-full h-80 sm:h-96 lg:w-80 lg:h-96 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-4 lg:p-6 relative overflow-hidden shadow-2xl mx-auto hover:scale-105 transition-transform duration-300">
          {/* Glowing border effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl opacity-20 blur-sm" />

          {/* Card Content */}
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-xl lg:text-2xl font-bold text-white mb-2">
                {heroImages[currentSlide].title}
              </h3>
              <p className="text-gray-300 mb-3 lg:mb-4 text-sm lg:text-base">
                {heroImages[currentSlide].subtitle}
              </p>

              {/* Mini product preview */}
              <div className="w-full h-24 lg:h-32 bg-white/10 rounded-xl mb-3 lg:mb-4 overflow-hidden">
                <img
                  src={heroImages[currentSlide].url}
                  alt={heroImages[currentSlide].alt}
                  className="w-full h-full object-cover transition-all duration-500"
                />
              </div>
            </div>

            <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2.5 lg:py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 text-sm lg:text-base hover:scale-105 transition-transform duration-300">
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Simplified Floating Elements */}
        <div className="absolute -top-8 -right-8 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-80 blur-xl" />
        <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full opacity-70 blur-lg" />
      </div>
    </div>
  );
};

export default ProductShowcase;
