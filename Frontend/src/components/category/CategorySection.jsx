import EachCategory from "./EachCategory";
import { useSelector } from "react-redux";
import useCategories from "../../hooks/useCategories";

const CategorySection = () => {
  const products = useSelector(
    (state) => state.product?.products?.products || []
  );
  const { categories, isLoading } = useCategories();

  // Get unique categories from products if categories from API are not available
  const availableCategories =
    categories.length > 0
      ? categories
      : [...new Set(products.map((product) => product.category))];

  if (isLoading) {
    return (
      <section className="py-16 bg-gradient-to-br from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="py-16 bg-gradient-to-br from-white to-gray-50"
      id="categories"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="text-center mb-16 animate-fadeInUp"
          style={{ animationDelay: "200ms" }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
        </div>
        <div className="space-y-16">
          {availableCategories.map((category) => (
            <EachCategory
              key={category}
              categoryName={category}
              products={products.filter(
                (product) => product.category === category
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
