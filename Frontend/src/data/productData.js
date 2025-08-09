// Product data for Story Mode Shopping
export const sampleProducts = [
    {
        id: 1,
        name: "Artisan Coffee Machine Pro",
        brand: "BrewMaster",
        price: 599.99,
        originalPrice: 799.99,
        rating: 4.8,
        reviews: 2847,
        category: "Kitchen Appliances",
        inStock: true,
        fastDelivery: true,
        features: [
            {
                icon: "Coffee",
                label: "15 Bar Pressure",
                description: "Professional espresso extraction for café-quality coffee at home"
            },
            {
                icon: "Thermometer",
                label: "Temperature Control",
                description: "Precise 90-96°C brewing temperature for optimal flavor extraction"
            },
            {
                icon: "Timer",
                label: "Auto Timer",
                description: "Programmable brew scheduling - wake up to fresh coffee"
            },
            {
                icon: "Droplets",
                label: "Dual Boiler",
                description: "Steam milk and brew simultaneously for perfect lattes"
            }
        ],
        specs: {
            dimensions: "14.2 x 11.8 x 16.5 inches",
            weight: "22.5 lbs",
            power: "1450W",
            capacity: "67 oz water tank",
            warranty: "2 years"
        },
        stories: {
            lifestyle: {
                title: "Morning Ritual Perfection",
                subtitle: "Where great coffee meets exceptional design",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                mood: "warm morning light filtering through a modern kitchen"
            },
            action: {
                title: "The Art of Brewing",
                subtitle: "Watch perfection unfold",
                background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                mood: "dynamic coffee brewing action with steam and rich aromas"
            },
            features: {
                title: "Crafted for Excellence",
                subtitle: "Every detail matters",
                background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                mood: "clean product showcase highlighting premium materials"
            },
            happiness: {
                title: "Your Daily Joy",
                subtitle: "Life tastes better",
                background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
                mood: "happy lifestyle moment with satisfied customers"
            }
        },
        testimonials: [
            {
                name: "Sarah Johnson",
                avatar: "S",
                rating: 5,
                comment: "This machine has completely transformed my morning routine. The coffee tastes like it's from a premium café, and the convenience is unmatched!",
                verified: true,
                date: "2 weeks ago"
            },
            {
                name: "Mike Chen",
                avatar: "M",
                rating: 5,
                comment: "As a coffee enthusiast, I'm incredibly impressed with the build quality and flavor. Worth every penny!",
                verified: true,
                date: "1 month ago"
            }
        ],
        tags: ["Premium", "Smart Home", "Energy Efficient", "Easy Clean", "Quiet Operation"]
    },
    {
        id: 2,
        name: "Wireless Gaming Headset Elite",
        brand: "AudioTech",
        price: 299.99,
        originalPrice: 399.99,
        rating: 4.7,
        reviews: 1523,
        category: "Gaming Accessories",
        inStock: true,
        fastDelivery: true,
        features: [
            {
                icon: "Headphones",
                label: "7.1 Surround Sound",
                description: "Immersive spatial audio for competitive gaming advantage"
            },
            {
                icon: "Mic",
                label: "Noise Cancelling Mic",
                description: "Crystal clear communication with advanced noise filtering"
            },
            {
                icon: "Battery",
                label: "30-Hour Battery",
                description: "Marathon gaming sessions without interruption"
            },
            {
                icon: "Wireless",
                label: "Ultra-Low Latency",
                description: "2.4GHz wireless with < 20ms latency for real-time gaming"
            }
        ],
        stories: {
            lifestyle: {
                title: "Gaming Immersion",
                subtitle: "Enter new worlds with every sound",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                mood: "dynamic gaming setup with RGB lighting"
            },
            action: {
                title: "Competitive Edge",
                subtitle: "Hear every footstep, every reload",
                background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                mood: "intense gaming action with surround sound visualization"
            },
            features: {
                title: "Engineered for Victory",
                subtitle: "Professional-grade audio technology",
                background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                mood: "technical showcase of drivers and components"
            },
            happiness: {
                title: "Victory Sounds Sweet",
                subtitle: "Level up your gaming experience",
                background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
                mood: "satisfied gamer celebrating victory"
            }
        }
    }
];

export const getProductById = (id) => {
    return sampleProducts.find(product => product.id === id);
};

export const getFeaturedProduct = () => {
    return sampleProducts[0]; // Coffee machine as featured product
};
