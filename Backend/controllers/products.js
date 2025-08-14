import Product from "../models/products.js";
const getProducts = async (req, res) => {
    try {
        // Extract query parameters
        const {
            category,
            minPrice,
            maxPrice,
            search,
            sort = 'createdAt',
            order = 'desc',
            page = 1,
            limit = 10
        } = req.query;

        // Build filter object
        let filter = {};

        // Category filtering (your priority)
        if (category) {
            filter.category = { $regex: category, $options: 'i' }; // Case insensitive
        }

        // Price range filtering
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = Number(minPrice);
            if (maxPrice) filter.price.$lte = Number(maxPrice);
        }

        // Search in title and description
        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        // Build sort object
        const sortObj = {};
        sortObj[sort] = order === 'asc' ? 1 : -1;

        // Calculate pagination
        const skip = (Number(page) - 1) * Number(limit);

        // Execute query with filtering, sorting, and pagination
        const products = await Product.find(filter)
            .sort(sortObj)
            .skip(skip)
            .limit(Number(limit));

        // Get total count for pagination info
        const totalProducts = await Product.countDocuments(filter);
        const totalPages = Math.ceil(totalProducts / Number(limit));

        // Send response with pagination info
        res.json({
            products,
            pagination: {
                currentPage: Number(page),
                totalPages,
                totalProducts,
                hasNextPage: Number(page) < totalPages,
                hasPrevPage: Number(page) > 1
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error: error.message });
    }
}
const getProductById = async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
}
const getCategories = async (req, res) => {
    const categories = await Product.distinct("category");
    res.json(categories);
}

export { getProducts, getProductById, getCategories };