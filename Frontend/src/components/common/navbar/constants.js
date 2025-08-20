import {
    Home,
    Package,
    Grid3X3,
    Info,
    Mail,
} from "lucide-react";

// Categories will be fetched dynamically from the API
export const categories = [];

export const navigationItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Products", href: "/products", icon: Package },
    { name: "Categories", href: "/products", icon: Grid3X3, hasDropdown: true },
    { name: "About", href: "/about", icon: Info },
    { name: "Contact", href: "/contact", icon: Mail },
];

// Mock data - you can move this to a proper state management later
export const mockData = {
    cartCount: 3,
    wishlistCount: 5,
};
