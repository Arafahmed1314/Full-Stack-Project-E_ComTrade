import React from "react";
import { ChevronRight, Home } from "lucide-react";
import { Link } from "react-router-dom";

const ProductBreadcrumb = ({ product }) => {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    {
      label: product?.category || "Category",
      href: `/products?category=${product?.category?.toLowerCase()}`,
    },
    { label: product?.name || "Product", href: null, current: true },
  ];

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
      {breadcrumbs.map((breadcrumb, index) => (
        <React.Fragment key={index}>
          {index > 0 && <ChevronRight className="w-4 h-4 text-gray-400" />}
          {breadcrumb.current ? (
            <span className="text-gray-900 font-medium">
              {breadcrumb.label}
            </span>
          ) : (
            <Link
              to={breadcrumb.href}
              className="hover:text-blue-600 transition-colors flex items-center"
            >
              {index === 0 && <Home className="w-4 h-4 mr-1" />}
              {breadcrumb.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default ProductBreadcrumb;
