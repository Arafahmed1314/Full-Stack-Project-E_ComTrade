# EtRaDe API Documentation

## 🎯 Overview

Complete API documentation for EtRaDe e-commerce platform. This document helps frontend developers understand which APIs to use and when.

## ✨ Latest Updates (Phase 4)

**🆕 Wishlist System** - Complete wishlist functionality:

- **Add to Wishlist**: Save products for later purchase
- **Wishlist Management**: View, remove items, clear wishlist
- **User-specific**: Each user has their own personal wishlist
- **Duplicate Prevention**: Can't add same product twice

**🆕 Review & Rating System** - Product review functionality:

- **Star Rating**: 1-5 star rating system with validation
- **Written Reviews**: Detailed product feedback with 500 character limit
- **Review Statistics**: Average ratings, rating breakdown, total reviews
- **Review Management**: Add, edit, delete your own reviews
- **Helpful Votes**: Community-driven review helpfulness scoring
- **Advanced Sorting**: Sort by newest, oldest, highest/lowest rated, most helpful
- **Pagination Support**: Efficient loading of large review sets

**🔄 Previous Updates (Phase 3)**:

- **Order Management System**: Complete order flow implementation
- **Simplified Shipping**: Single address field (city name) + phone number
- **Updated Cart APIs**: Simplified response formats

---

## 🔐 Authentication APIs

### Base URL: `/api/auth`

#### 1. **User Registration**

```http
POST /api/auth/register
```

**Purpose**: Register new users (both manual and Google users)

**Request Body**:

```json
// Manual Registration
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "registrationType": "manual"
}

// Google Registration
{
  "name": "John Doe",
  "email": "john@gmail.com",
  "googleId": "google_user_id_here",
  "avatar": "https://google-avatar-url.com",
  "registrationType": "google"
}
```

**Response**:

```json
{
  "message": "User registered successfully",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "emailVerified": false,
    "registrationType": "manual"
  }
}
```

**When to Use**:

- User clicks "Sign Up" button
- After Google OAuth successful callback

---

#### 2. **User Login**

```http
POST /api/auth/login
```

**Purpose**: Authenticate existing users

**Request Body**:

```json
// Manual Login
{
  "email": "john@example.com",
  "password": "password123",
  "loginType": "manual"
}

// Google Login
{
  "email": "john@gmail.com",
  "googleId": "google_user_id_here",
  "loginType": "google"
}
```

**Response**:

```json
{
  "message": "User logged in successfully",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "emailVerified": true,
    "avatar": "avatar_url",
    "lastLogin": "2025-01-07T10:30:00.000Z",
    "registrationType": "manual"
  }
}
```

**When to Use**:

- User clicks "Login" button
- After Google OAuth callback for existing users

---

#### 3. **Verify Token (Auto-login)**

```http
GET /api/auth/verify-token
```

**Purpose**: Check if stored token is still valid for automatic login

**Headers Required**:

```http
Authorization: Bearer jwt_token_here
```

_OR automatic via HTTP-only cookies_

**Response**:

```json
{
  "message": "Token is valid",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "emailVerified": true,
    "avatar": "avatar_url",
    "lastLogin": "2025-01-07T10:30:00.000Z",
    "registrationType": "manual"
  }
}
```

**When to Use**:

- App startup/page refresh
- Check authentication status
- Before accessing protected routes

---

## 🛍️ Product APIs

### Base URL: `/api`

#### 1. **Get All Products (with filtering)**

```http
GET /api/products
```

**Purpose**: Fetch products with optional filtering, searching, and pagination

**Query Parameters** (all optional):

```http
GET /api/products?category=electronics&minPrice=100&maxPrice=500&search=phone&sort=price&order=asc&page=1&limit=10
```

| Parameter  | Type   | Description                 | Example                             |
| ---------- | ------ | --------------------------- | ----------------------------------- |
| `category` | string | Filter by category          | `electronics`                       |
| `minPrice` | number | Minimum price filter        | `100`                               |
| `maxPrice` | number | Maximum price filter        | `500`                               |
| `search`   | string | Search in title/description | `phone`                             |
| `sort`     | string | Sort field                  | `price`, `rating.rate`, `createdAt` |
| `order`    | string | Sort order                  | `asc`, `desc`                       |
| `page`     | number | Page number                 | `1`                                 |
| `limit`    | number | Items per page              | `10`                                |

**Response**:

```json
{
  "products": [
    {
      "_id": "product_id",
      "title": "iPhone 15",
      "price": 999,
      "description": "Latest iPhone...",
      "category": "electronics",
      "images": [
        "https://example.com/iphone1.jpg",
        "https://example.com/iphone2.jpg"
      ],
      "rating": {
        "rate": 4.5,
        "count": 150
      }
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalProducts": 50,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

**When to Use**:

- Product listing page
- Category browsing
- Search results
- Price filtering
- Product pagination

**Frontend Examples**:

```javascript
// All products
fetch("/api/products");

// Electronics only
fetch("/api/products?category=electronics");

// Price range filter
fetch("/api/products?minPrice=100&maxPrice=500");

// Search products
fetch("/api/products?search=phone");

// Combined filters
fetch("/api/products?category=electronics&minPrice=200&search=phone&page=1");
```

---

#### 2. **Get Single Product**

```http
GET /api/products/:id
```

**Purpose**: Get detailed information about a specific product

**URL Parameters**:

- `id` - Product ID

**Response**:

```json
{
  "_id": "product_id",
  "title": "iPhone 15",
  "price": 999,
  "description": "Detailed product description...",
  "category": "electronics",
  "images": [
    "https://example.com/iphone1.jpg",
    "https://example.com/iphone2.jpg",
    "https://example.com/iphone3.jpg"
  ],
  "rating": {
    "rate": 4.5,
    "count": 150
  }
}
```

**When to Use**:

- Product detail page
- When user clicks on a product
- Add to cart functionality

**Frontend Example**:

```javascript
// Get product details
fetch(`/api/products/${productId}`);
```

---

#### 3. **Get Categories**

```http
GET /api/categories
```

**Purpose**: Get list of all available product categories

**Response**:

```json
["electronics", "clothing", "books", "home & garden", "sports"]
```

**When to Use**:

- Category navigation menu
- Filter dropdown
- Category-based browsing

**Frontend Example**:

```javascript
// Get all categories
fetch("/api/categories")
  .then((res) => res.json())
  .then((categories) => {
    // Use for navigation menu or filters
  });
```

---

## �️ Admin APIs

### Base URL: `/api/admin`

🔒 **All routes require admin authentication**

#### 1. **Create Product**

```http
POST /api/admin/products
```

**Purpose**: Create a new product (admin only)

**Headers Required**:

```http
Authorization: Bearer jwt_token_here
Content-Type: application/json
```

**Request Body**:

```json
{
  "title": "iPhone 15 Pro",
  "description": "Latest iPhone with advanced features",
  "price": 999,
  "category": "electronics",
  "imageUrl": [
    "https://example.com/iphone1.jpg",
    "https://example.com/iphone2.jpg"
  ],
  "rating": {
    "rate": 4.5,
    "count": 100
  }
}
```

**Response**:

```json
{
  "message": "Product created successfully",
  "product": {
    "_id": "product_id",
    "id": 1,
    "title": "iPhone 15 Pro",
    "description": "Latest iPhone with advanced features",
    "price": 999,
    "category": "electronics",
    "images": [
      "https://example.com/iphone1.jpg",
      "https://example.com/iphone2.jpg"
    ],
    "rating": {
      "rate": 4.5,
      "count": 100
    }
  }
}
```

**Frontend Example**:

```javascript
const createProduct = async (productData) => {
  try {
    const response = await fetch("/api/admin/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
      credentials: "include",
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      throw new Error("Failed to create product");
    }

    const data = await response.json();
    console.log("Product created:", data.product);
    return data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

// Usage
const newProduct = {
  title: "iPhone 15 Pro",
  description: "Latest iPhone",
  price: 999,
  category: "electronics",
  imageUrl: ["image1.jpg", "image2.jpg"],
  rating: { rate: 4.5, count: 100 },
};

createProduct(newProduct);
```

**When to Use**:

- Admin dashboard product creation
- Bulk product import
- Adding new inventory

---

#### 2. **Update Product**

```http
PUT /api/admin/products/:id
```

**Purpose**: Update an existing product (admin only)

**Headers Required**:

```http
Authorization: Bearer jwt_token_here
Content-Type: application/json
```

**URL Parameters**:

- `id` - Product ID (MongoDB ObjectId)

**Request Body** (all fields optional):

```json
{
  "title": "iPhone 15 Pro Max",
  "price": 1099,
  "imageUrl": [
    "https://example.com/new-image1.jpg",
    "https://example.com/new-image2.jpg",
    "https://example.com/new-image3.jpg"
  ],
  "rating": {
    "rate": 4.7,
    "count": 150
  }
}
```

**Response**:

```json
{
  "message": "Product updated successfully",
  "product": {
    "_id": "product_id",
    "title": "iPhone 15 Pro Max",
    "price": 1099,
    "images": [
      "https://example.com/new-image1.jpg",
      "https://example.com/new-image2.jpg",
      "https://example.com/new-image3.jpg"
    ],
    "rating": {
      "rate": 4.7,
      "count": 150
    }
  }
}
```

**Frontend Example**:

```javascript
const updateProduct = async (productId, updates) => {
  try {
    const response = await fetch(`/api/admin/products/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
      credentials: "include",
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      throw new Error("Failed to update product");
    }

    const data = await response.json();
    console.log("Product updated:", data.product);
    return data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

// Usage - Update only specific fields
const updates = {
  price: 899,
  imageUrl: ["new-image1.jpg", "new-image2.jpg"],
};

updateProduct("product_id_here", updates);
```

**When to Use**:

- Edit product details
- Update product images
- Change pricing
- Update ratings/reviews

---

#### 3. **Delete Product**

```http
DELETE /api/admin/products/:id
```

**Purpose**: Delete a product (admin only)

**Headers Required**:

```http
Authorization: Bearer jwt_token_here
```

**URL Parameters**:

- `id` - Product ID (MongoDB ObjectId)

**Response**:

```json
{
  "message": "Product deleted successfully",
  "deletedProduct": {
    "id": "product_id",
    "title": "iPhone 15 Pro"
  }
}
```

**Frontend Example**:

```javascript
const deleteProduct = async (productId) => {
  try {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmed) return;

    const response = await fetch(`/api/admin/products/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to delete product");
    }

    const data = await response.json();
    console.log("Product deleted:", data.deletedProduct);
    return data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

// Usage
deleteProduct("product_id_here");
```

**When to Use**:

- Remove discontinued products
- Delete duplicate entries
- Remove inappropriate content

---

#### 4. **Get All Products (Admin View)**

```http
GET /api/admin/products
```

**Purpose**: Get all products with admin privileges (simplified view)

**Headers Required**:

```http
Authorization: Bearer jwt_token_here
```

**Response**:

```json
{
  "message": "Products retrieved successfully",
  "totalProducts": 25,
  "products": [
    {
      "_id": "product_id",
      "id": 1,
      "title": "iPhone 15",
      "price": 999,
      "category": "electronics",
      "images": ["image1.jpg"],
      "rating": { "rate": 4.5, "count": 100 }
    }
  ]
}
```

**Frontend Example**:

```javascript
const getAdminProducts = async () => {
  try {
    const response = await fetch("/api/admin/products", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch admin products");
    }

    const data = await response.json();
    console.log(`Total products: ${data.totalProducts}`);
    return data.products;
  } catch (error) {
    console.error("Error fetching admin products:", error);
    throw error;
  }
};

// Usage in React component
const AdminDashboard = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const adminProducts = await getAdminProducts();
        setProducts(adminProducts);
      } catch (error) {
        alert("Failed to load products");
      }
    };

    loadProducts();
  }, []);

  return (
    <div>
      <h2>Admin Dashboard - {products.length} Products</h2>
      {/* Render products */}
    </div>
  );
};
```

**When to Use**:

- Admin dashboard overview
- Product management interface
- Inventory monitoring

---

### 🔐 Admin Authentication Check

**Frontend Admin Guard Component**:

```javascript
const AdminRoute = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const response = await fetch("/api/auth/verify-token", {
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          // Check if user is admin
          if (data.user.email === "admin@gmail.com") {
            setIsAdmin(true);
          }
        }
      } catch (error) {
        console.error("Admin check failed:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAdmin();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (!isAdmin) {
    return <div>Access Denied - Admin Only</div>;
  }

  return children;
};

// Usage
<AdminRoute>
  <AdminDashboard />
</AdminRoute>;
```

### 📋 Complete Admin CRUD Component Example

```javascript
const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  // Load products
  const loadProducts = async () => {
    const adminProducts = await getAdminProducts();
    setProducts(adminProducts);
  };

  // Create product
  const handleCreate = async (productData) => {
    await createProduct(productData);
    loadProducts(); // Refresh list
  };

  // Update product
  const handleUpdate = async (productId, updates) => {
    await updateProduct(productId, updates);
    setEditingProduct(null);
    loadProducts(); // Refresh list
  };

  // Delete product
  const handleDelete = async (productId) => {
    await deleteProduct(productId);
    loadProducts(); // Refresh list
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div>
      <h1>Product Management</h1>

      {/* Create Product Form */}
      <ProductForm onSubmit={handleCreate} />

      {/* Products List */}
      <div>
        {products.map((product) => (
          <div key={product._id}>
            <h3>{product.title}</h3>
            <p>${product.price}</p>
            <button onClick={() => setEditingProduct(product)}>Edit</button>
            <button onClick={() => handleDelete(product._id)}>Delete</button>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingProduct && (
        <ProductEditModal
          product={editingProduct}
          onSave={handleUpdate}
          onClose={() => setEditingProduct(null)}
        />
      )}
    </div>
  );
};
```

---

## �👤 User Profile APIs

### Base URL: `/api/user/profile`

🔒 **All routes require authentication**

#### 1. **Get User Profile**

```http
GET /api/user/profile
```

**Headers Required**:

```http
Authorization: Bearer jwt_token_here
```

**Response**:

```json
{
  "message": "Profile retrieved successfully",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "emailVerified": true,
    "avatar": "avatar_url",
    "lastLogin": "2025-01-07T10:30:00.000Z",
    "registrationType": "manual"
  }
}
```

**When to Use**:

- Profile page
- User settings
- Account information display

---

#### 2. **Update User Profile**

```http
PUT /api/user/profile
```

**Headers Required**:

```http
Authorization: Bearer jwt_token_here
Content-Type: application/json
```

**Request Body**:

```json
{
  "name": "John Smith",
  "avatar": "https://new-avatar-url.com"
}
```

**Response**:

```json
{
  "message": "Profile updated successfully",
  "user": {
    "id": "user_id",
    "name": "John Smith",
    "email": "john@example.com",
    "avatar": "https://new-avatar-url.com"
  }
}
```

**When to Use**:

- Profile edit form
- Avatar upload
- Name change

---

#### 3. **Change Password**

```http
PUT /api/user/profile/change-password
```

**Headers Required**:

```http
Authorization: Bearer jwt_token_here
Content-Type: application/json
```

**Request Body**:

```json
{
  "currentPassword": "oldpassword123",
  "newPassword": "newpassword456"
}
```

**Response**:

```json
{
  "message": "Password changed successfully"
}
```

**When to Use**:

- Change password form
- Security settings
- **Note**: Only for manual registration users (not Google users)

---

## � Cart APIs

### Base URL: `/api/cart`

🔒 **All routes require authentication**

#### 1. **Add Item to Cart**

```http
POST /api/cart/add
```

**Purpose**: Add a product to user's shopping cart

**Headers Required**:

```http
Authorization: Bearer jwt_token_here
Content-Type: application/json
```

**Request Body**:

```json
{
  "productId": "product_object_id_here",
  "quantity": 2
}
```

**Response**:

```json
{
  "message": "Item added to cart successfully",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "product": {
    "id": "product_id",
    "title": "iPhone 15",
    "price": 999,
    "images": ["image1.jpg"],
    "category": "electronics"
  },
  "addedQuantity": 2
}
```

**Frontend Example**:

```javascript
const addToCart = async (productId, quantity = 1) => {
  try {
    const response = await fetch("/api/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
      credentials: "include",
      body: JSON.stringify({ productId, quantity }),
    });

    if (!response.ok) {
      throw new Error("Failed to add to cart");
    }

    const data = await response.json();
    console.log("Added to cart:", data.cart);
    return data;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
};

// Usage
addToCart("product_id_here", 2);
```

**When to Use**:

- "Add to Cart" button click
- Bulk adding items
- Quick add from product listings

---

#### 2. **Get Cart**

```http
GET /api/cart
```

**Purpose**: Retrieve user's current shopping cart with all items

**Headers Required**:

```http
Authorization: Bearer jwt_token_here
```

**Response**:

```json
{
  "message": "Cart retrieved successfully",
  "items": [
    {
      "_id": "item_id",
      "product": {
        "_id": "product_id",
        "title": "iPhone 15",
        "price": 999,
        "images": ["image1.jpg", "image2.jpg"],
        "category": "electronics"
      },
      "quantity": 2,
      "price": 999
    }
  ],
  "totalItems": 2,
  "totalPrice": 1998
}
```

**Empty Cart Response**:

```json
{
  "message": "Cart is empty",
  "items": [],
  "totalItems": 0,
  "totalPrice": 0
}
```

**Frontend Example**:

```javascript
const getCart = async () => {
  try {
    const response = await fetch("/api/cart", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch cart");
    }

    const data = await response.json();
    return data; // Returns { message, items, totalItems, totalPrice }
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
};

// Usage in React
const CartPage = () => {
  const [cartData, setCartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const data = await getCart();
        setCartData(data);
      } catch (error) {
        console.error("Failed to load cart");
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, []);

  if (loading) return <div>Loading cart...</div>;

  return (
    <div>
      <h2>Shopping Cart ({cartData.totalItems} items)</h2>
      <p>Total: ${cartData.totalPrice}</p>
      {cartData.items.map((item) => (
        <div key={item._id}>
          <h3>{item.product.title}</h3>
          <p>Quantity: {item.quantity}</p>
          <p>Price: ${item.price}</p>
        </div>
      ))}
    </div>
  );
};
```

**When to Use**:

- Cart page load
- Cart sidebar display
- Checkout page initialization

---

#### 3. **Update Cart Item Quantity**

```http
PUT /api/cart/item/:itemId
```

**Purpose**: Update quantity of a specific item in cart

**Headers Required**:

```http
Authorization: Bearer jwt_token_here
Content-Type: application/json
```

**URL Parameters**:

- `itemId` - Cart item ID (not product ID)

**Request Body**:

```json
{
  "quantity": 3
}
```

**Response**:

```json
{
  "message": "Item quantity updated"
}
```

**If quantity is 0 (item removed)**:

```json
{
  "message": "Item removed from cart"
}
```

**Frontend Example**:

```javascript
const updateCartItemQuantity = async (itemId, newQuantity) => {
  try {
    const response = await fetch(`/api/cart/item/${itemId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
      credentials: "include",
      body: JSON.stringify({ quantity: newQuantity }),
    });

    if (!response.ok) {
      throw new Error("Failed to update quantity");
    }

    const data = await response.json();
    return data; // Returns { message }
  } catch (error) {
    console.error("Error updating quantity:", error);
    throw error;
  }
};

// Usage - Quantity controls component
const QuantityControls = ({ item, onUpdate }) => {
  const handleIncrease = async () => {
    await updateCartItemQuantity(item._id, item.quantity + 1);
    onUpdate(); // Refresh cart data
  };

  const handleDecrease = async () => {
    if (item.quantity > 1) {
      await updateCartItemQuantity(item._id, item.quantity - 1);
      onUpdate(); // Refresh cart data
    }
  };

  return (
    <div>
      <button onClick={handleDecrease}>-</button>
      <span>{item.quantity}</span>
      <button onClick={handleIncrease}>+</button>
    </div>
  );
};
```

**When to Use**:

- Quantity increment/decrement buttons
- Direct quantity input
- Bulk quantity updates

**Note**: Setting quantity to 0 will remove the item from cart

---

#### 4. **Remove Item from Cart**

```http
DELETE /api/cart/item/:itemId
```

**Purpose**: Remove a specific item from cart completely

**Headers Required**:

```http
Authorization: Bearer jwt_token_here
```

**URL Parameters**:

- `itemId` - Cart item ID (also accepts product ID for flexibility)

**Response**:

```json
{
  "message": "Item removed from cart successfully",
  "removedItem": {
    "productId": "product_id",
    "productTitle": "iPhone 15",
    "quantity": 2,
    "price": 999
  },
  "detectedAs": "cart item ID"
}
```

**Frontend Example**:

```javascript
const removeFromCart = async (itemId) => {
  try {
    const confirmed = window.confirm("Remove this item from cart?");
    if (!confirmed) return;

    const response = await fetch(`/api/cart/item/${itemId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to remove item");
    }

    const data = await response.json();
    return data; // Returns { message, removedItem, detectedAs }
  } catch (error) {
    console.error("Error removing item:", error);
    throw error;
  }
};

// Usage
const CartItem = ({ item, onRemove }) => {
  const handleRemove = async () => {
    await removeFromCart(item._id);
    onRemove(); // Refresh cart data
  };

  return (
    <div>
      <h3>{item.product.title}</h3>
      <p>Quantity: {item.quantity}</p>
      <p>Price: ${item.price}</p>
      <button onClick={handleRemove}>Remove</button>
    </div>
  );
};
```

**When to Use**:

- "Remove" button in cart
- Cleanup invalid items
- Quick item removal

---

#### 5. **Clear Cart**

```http
DELETE /api/cart
```

**Purpose**: Remove all items from cart

**Headers Required**:

```http
Authorization: Bearer jwt_token_here
```

**Response**:

```json
{
  "message": "Cart cleared successfully"
}
```

**Frontend Example**:

```javascript
const clearCart = async () => {
  try {
    const confirmed = window.confirm(
      "Clear entire cart? This cannot be undone."
    );
    if (!confirmed) return;

    const response = await fetch("/api/cart", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to clear cart");
    }

    const data = await response.json();
    return data; // Returns { message }
  } catch (error) {
    console.error("Error clearing cart:", error);
    throw error;
  }
};

// Usage
const ClearCartButton = ({ onClear }) => {
  const handleClear = async () => {
    await clearCart();
    onClear(); // Refresh cart data
  };

  return (
    <button onClick={handleClear} className="clear-cart-btn">
      Clear Cart
    </button>
  );
};
```

**When to Use**:

- "Clear Cart" button
- After successful checkout
- Reset cart functionality

---

#### 6. **Get Cart Summary**

```http
GET /api/cart/summary
```

**Purpose**: Get lightweight cart summary for cart icon/badge

**Headers Required**:

```http
Authorization: Bearer jwt_token_here
```

**Response**:

```json
{
  "totalItems": 5,
  "totalPrice": 2497,
  "itemCount": 3
}
```

**Empty Cart Response**:

```json
{
  "totalItems": 0,
  "totalPrice": 0,
  "itemCount": 0
}
```

**Frontend Example**:

```javascript
const getCartSummary = async () => {
  try {
    const response = await fetch("/api/cart/summary", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch cart summary");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching cart summary:", error);
    return { totalItems: 0, totalPrice: 0, itemCount: 0 };
  }
};

// Usage - Cart icon component
const CartIcon = () => {
  const [summary, setSummary] = useState({ totalItems: 0 });

  useEffect(() => {
    const loadSummary = async () => {
      const cartSummary = await getCartSummary();
      setSummary(cartSummary);
    };

    loadSummary();

    // Refresh every 30 seconds
    const interval = setInterval(loadSummary, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="cart-icon">
      🛒
      {summary.totalItems > 0 && (
        <span className="cart-badge">{summary.totalItems}</span>
      )}
    </div>
  );
};
```

**When to Use**:

- Header cart icon
- Quick cart status check
- Real-time cart updates
- Navigation cart badge

---

### 🔧 Cart State Management

**React Context for Cart**:

```javascript
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);

  // Load cart on app start
  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    setLoading(true);
    try {
      const cartData = await getCart();
      setCart(cartData);
    } catch (error) {
      console.error("Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  const addItemToCart = async (productId, quantity) => {
    try {
      const response = await addToCart(productId, quantity);
      setCart(response.cart);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const updateItemQuantity = async (itemId, quantity) => {
    try {
      const updatedCart = await updateCartItemQuantity(itemId, quantity);
      setCart(updatedCart);
      return updatedCart;
    } catch (error) {
      throw error;
    }
  };

  const removeItem = async (itemId) => {
    try {
      const updatedCart = await removeFromCart(itemId);
      setCart(updatedCart);
      return updatedCart;
    } catch (error) {
      throw error;
    }
  };

  const clearEntireCart = async () => {
    try {
      const clearedCart = await clearCart();
      setCart(clearedCart);
      return clearedCart;
    } catch (error) {
      throw error;
    }
  };

  const value = {
    cart,
    loading,
    addItemToCart,
    updateItemQuantity,
    removeItem,
    clearEntireCart,
    refreshCart: loadCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};
```

**Usage in Components**:

```javascript
const ProductCard = ({ product }) => {
  const { addItemToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      await addItemToCart(product._id, 1);
      alert("Added to cart!");
    } catch (error) {
      alert("Failed to add to cart");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="product-card">
      <h3>{product.title}</h3>
      <p>${product.price}</p>
      <button onClick={handleAddToCart} disabled={isAdding}>
        {isAdding ? "Adding..." : "Add to Cart"}
      </button>
    </div>
  );
};
```

---

## �🔧 Authentication Handling

### Frontend Authentication Flow

#### 1. **Token Storage**

```javascript
// Store token after login/registration
localStorage.setItem("authToken", response.data.token);

// OR let HTTP-only cookies handle it automatically
```

#### 2. **API Requests with Auth**

```javascript
// Option 1: Authorization Header
fetch("/api/user/profile", {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  },
});

// Option 2: Cookies (automatic)
fetch("/api/user/profile", {
  credentials: "include",
});
```

#### 3. **Logout Implementation**

```javascript
const logout = () => {
  // Clear token
  localStorage.removeItem("authToken");

  // Update app state
  setUser(null);
  setIsAuthenticated(false);

  // Redirect
  navigate("/login");
};
```

#### 4. **Auto-login on App Start**

```javascript
useEffect(() => {
  const checkAuth = async () => {
    try {
      const response = await fetch("/api/auth/verify-token", {
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.log("Not authenticated");
    }
  };

  checkAuth();
}, []);
```

---

## 🚀 Frontend Integration Examples

### Product Listing Component

```javascript
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    page: 1
  });

  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.category) params.append('category', filters.category);
    if (filters.minPrice) params.append('minPrice', filters.minPrice);
    if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
    params.append('page', filters.page);

    fetch(`/api/products?${params.toString()}`)
      .then(res => res.json())
      .then(data => setProducts(data.products));
  }, [filters]);

  return (
    // Render products and filters
  );
};
```

### Category Navigation

```javascript
const CategoryNav = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then(setCategories);
  }, []);

  return (
    <nav>
      {categories.map((category) => (
        <Link key={category} to={`/products?category=${category}`}>
          {category}
        </Link>
      ))}
    </nav>
  );
};
```

---

## 📋 Error Handling

### Common Error Responses

```json
// 400 - Bad Request
{
  "message": "Email and password are required"
}

// 401 - Unauthorized
{
  "message": "Invalid credentials"
}

// 404 - Not Found
{
  "message": "Product not found"
}

// 500 - Server Error
{
  "message": "Error fetching products",
  "error": "Database connection failed"
}
```

### Frontend Error Handling

```javascript
const apiCall = async () => {
  try {
    const response = await fetch("/api/products");

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API Error:", error.message);
    // Handle error in UI
  }
};
```

---

## 🔄 API Usage Patterns

### Public APIs (No Authentication)

- ✅ `GET /api/products` - Browse products
- ✅ `GET /api/products/:id` - View product details
- ✅ `GET /api/categories` - Browse categories
- ✅ `POST /api/auth/register` - Create account
- ✅ `POST /api/auth/login` - Login

### Protected APIs (Authentication Required)

- 🔒 `GET /api/auth/verify-token` - Check auth status
- 🔒 `GET /api/user/profile` - View profile
- 🔒 `PUT /api/user/profile` - Update profile
- 🔒 `PUT /api/user/profile/change-password` - Change password
- 🔒 `POST /api/cart/add` - Add to cart
- 🔒 `GET /api/cart` - View cart
- 🔒 `PUT /api/cart/item/:itemId` - Update cart item
- 🔒 `DELETE /api/cart/item/:itemId` - Remove cart item
- 🔒 `DELETE /api/cart` - Clear cart
- 🔒 `GET /api/cart/summary` - Cart summary

## 📦 Order APIs

### Base URL: `/api/orders`

🔒 **All routes require authentication**

#### 1. **Get Order Summary (Before Placing Order)**

```http
POST /api/orders/summary
```

**Purpose**: Calculate order summary for selected cart items before placing order

**Headers Required**:

```http
Authorization: Bearer jwt_token_here
Content-Type: application/json
```

**Request Body**:

```json
{
  "selectedItems": ["cart_item_id_1", "cart_item_id_2"]
}
```

**Response**:

```json
{
  "message": "Order summary calculated successfully",
  "summary": {
    "items": [
      {
        "id": "cart_item_id_1",
        "product": {
          "_id": "product_id",
          "title": "iPhone 15",
          "price": 999,
          "images": ["image1.jpg"],
          "category": "electronics"
        },
        "quantity": 2,
        "price": 999,
        "itemTotal": 1998
      }
    ],
    "totalAmount": 1998,
    "totalItems": 2,
    "itemCount": 1
  }
}
```

**When to Use**:

- Checkout page to show order summary
- Before placing order confirmation

---

#### 2. **Place Order**

```http
POST /api/orders
```

**Purpose**: Place order with selected cart items

**Headers Required**:

```http
Authorization: Bearer jwt_token_here
Content-Type: application/json
```

**Request Body**:

```json
{
  "selectedItems": ["cart_item_id_1", "cart_item_id_2"],
  "shippingAddress": {
    "address": "Dhaka",
    "phone": "+8801234567890"
  },
  "deliveryMethod": "standard"
}
```

**Request Body Fields**:

- `selectedItems` (required): Array of cart item IDs to order
- `shippingAddress` (required):
  - `address` (required): City name
  - `phone` (required): Contact phone number
- `deliveryMethod` (optional): "standard", "express", or "pickup" (defaults to "standard")

**Response**:

```json
{
  "message": "Order placed successfully",
  "order": {
    "id": "order_id",
    "totalAmount": 1998,
    "totalItems": 2,
    "status": "pending",
    "orderDate": "2025-01-07T10:30:00.000Z"
  }
}
```

**Frontend Example**:

```javascript
const placeOrder = async (
  selectedItems,
  shippingAddress,
  deliveryMethod = "standard"
) => {
  try {
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
      credentials: "include",
      body: JSON.stringify({
        selectedItems,
        shippingAddress,
        deliveryMethod,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to place order");
    }

    const data = await response.json();
    return data.order;
  } catch (error) {
    console.error("Error placing order:", error);
    throw error;
  }
};

// Usage
const orderData = {
  selectedItems: ["cart_item_id_1", "cart_item_id_2"],
  shippingAddress: {
    address: "Dhaka",
    phone: "+8801234567890",
  },
  deliveryMethod: "express",
};

placeOrder(
  orderData.selectedItems,
  orderData.shippingAddress,
  orderData.deliveryMethod
);
```

**When to Use**:

- Final checkout confirmation
- Order placement after payment

---

#### 3. **Get User Order History**

```http
GET /api/orders
```

**Purpose**: Retrieve user's order history

**Headers Required**:

```http
Authorization: Bearer jwt_token_here
```

**Response**:

```json
{
  "message": "Orders retrieved successfully",
  "orders": [
    {
      "id": "order_id_1",
      "totalAmount": 1998,
      "totalItems": 2,
      "status": "delivered",
      "orderDate": "2025-01-05T10:30:00.000Z"
    },
    {
      "id": "order_id_2",
      "totalAmount": 599,
      "totalItems": 1,
      "status": "pending",
      "orderDate": "2025-01-07T10:30:00.000Z"
    }
  ]
}
```

**When to Use**:

- Orders page
- Order history display

---

#### 4. **Get Specific Order Details**

```http
GET /api/orders/:orderId
```

**Purpose**: Get detailed information about a specific order

**Headers Required**:

```http
Authorization: Bearer jwt_token_here
```

**URL Parameters**:

- `orderId` - Order ID

**Response**:

```json
{
  "message": "Order details retrieved successfully",
  "order": {
    "_id": "order_id",
    "user": "user_id",
    "items": [
      {
        "product": {
          "_id": "product_id",
          "title": "iPhone 15",
          "category": "electronics"
        },
        "title": "iPhone 15",
        "price": 999,
        "quantity": 2,
        "images": ["image1.jpg"]
      }
    ],
    "totalAmount": 1998,
    "totalItems": 2,
    "shippingAddress": {
      "address": "Dhaka",
      "phone": "+8801234567890"
    },
    "deliveryMethod": "standard",
    "status": "pending",
    "createdAt": "2025-01-07T10:30:00.000Z",
    "updatedAt": "2025-01-07T10:30:00.000Z"
  }
}
```

**When to Use**:

- Order details page
- Order tracking
- Invoice generation

---

## 🤍 Wishlist APIs

### Base URL: `/api/wishlist`

🔒 **All routes require authentication**

#### 1. **Add Item to Wishlist**

```http
POST /api/wishlist/add
```

**Purpose**: Add a product to user's wishlist

**Headers Required**:

```http
Authorization: Bearer jwt_token_here
Content-Type: application/json
```

**Request Body**:

```json
{
  "productId": "product_object_id_here"
}
```

**Response**:

```json
{
  "message": "Item added to wishlist successfully",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "product": {
    "id": "product_id",
    "title": "iPhone 15",
    "price": 999,
    "images": ["image1.jpg"],
    "category": "electronics"
  }
}
```

**When to Use**:

- Heart/wishlist button click on product cards
- Add to wishlist from product detail page

---

#### 2. **Get Wishlist**

```http
GET /api/wishlist
```

**Purpose**: Retrieve user's complete wishlist

**Headers Required**:

```http
Authorization: Bearer jwt_token_here
```

**Response**:

```json
{
  "message": "Wishlist retrieved successfully",
  "items": [
    {
      "_id": "wishlist_item_id",
      "product": {
        "_id": "product_id",
        "title": "iPhone 15",
        "price": 999,
        "images": ["image1.jpg", "image2.jpg"],
        "category": "electronics",
        "rating": {
          "rate": 4.5,
          "count": 150
        }
      },
      "addedAt": "2025-01-07T10:30:00.000Z"
    }
  ],
  "totalItems": 5
}
```

**Empty Wishlist Response**:

```json
{
  "message": "Wishlist is empty",
  "items": [],
  "totalItems": 0
}
```

**When to Use**:

- Wishlist page display
- Wishlist sidebar/dropdown

---

#### 3. **Remove Item from Wishlist**

```http
DELETE /api/wishlist/item/:productId
```

**Purpose**: Remove a specific product from wishlist

**Headers Required**:

```http
Authorization: Bearer jwt_token_here
```

**URL Parameters**:

- `productId` - Product ID to remove

**Response**:

```json
{
  "message": "Item removed from wishlist successfully",
  "removedItem": {
    "productId": "product_id",
    "productTitle": "iPhone 15",
    "productPrice": 999
  }
}
```

**When to Use**:

- Remove button in wishlist
- Toggle wishlist button (remove when already in wishlist)

---

#### 4. **Clear Wishlist**

```http
DELETE /api/wishlist
```

**Purpose**: Remove all items from wishlist

**Headers Required**:

```http
Authorization: Bearer jwt_token_here
```

**Response**:

```json
{
  "message": "Wishlist cleared successfully"
}
```

**When to Use**:

- Clear wishlist button
- Bulk wishlist management

---

## ⭐ Review APIs

### Base URL: `/api/reviews`

🔒 **All routes require authentication**

#### 1. **Add Review**

```http
POST /api/reviews
```

**Purpose**: Add a review and rating for a product

**Headers Required**:

```http
Authorization: Bearer jwt_token_here
Content-Type: application/json
```

**Request Body**:

```json
{
  "productId": "product_object_id_here",
  "rating": 5,
  "comment": "Great product! Highly recommended."
}
```

**Request Body Fields**:

- `productId` (required): Product to review
- `rating` (required): 1-5 star rating
- `comment` (required): Review text (max 500 characters)

**Response**:

```json
{
  "message": "Review added successfully",
  "review": {
    "id": "review_id",
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "avatar": "avatar_url"
    },
    "rating": 5,
    "comment": "Great product! Highly recommended.",
    "helpfulVotes": 0,
    "createdAt": "2025-01-07T10:30:00.000Z"
  }
}
```

**When to Use**:

- Review form submission on product detail page
- After product purchase

---

#### 2. **Get Product Reviews**

```http
GET /api/reviews/product/:productId
```

**Purpose**: Get all reviews for a specific product with statistics

**Headers Required**:

```http
Authorization: Bearer jwt_token_here
```

**URL Parameters**:

- `productId` - Product ID

**Query Parameters** (all optional):

```http
GET /api/reviews/product/123?page=1&limit=10&sort=newest
```

| Parameter | Type   | Description      | Options                                            |
| --------- | ------ | ---------------- | -------------------------------------------------- |
| `page`    | number | Page number      | `1` (default)                                      |
| `limit`   | number | Reviews per page | `10` (default)                                     |
| `sort`    | string | Sort order       | `newest`, `oldest`, `highest`, `lowest`, `helpful` |

**Response**:

```json
{
  "message": "Product reviews retrieved successfully",
  "reviews": [
    {
      "id": "review_id",
      "user": {
        "id": "user_id",
        "name": "John Doe",
        "avatar": "avatar_url"
      },
      "rating": 5,
      "comment": "Great product! Highly recommended.",
      "helpfulVotes": 12,
      "createdAt": "2025-01-07T10:30:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalReviews": 50,
    "hasNextPage": true,
    "hasPrevPage": false
  },
  "statistics": {
    "averageRating": 4.2,
    "totalReviews": 50,
    "ratingBreakdown": {
      "5": 20,
      "4": 15,
      "3": 10,
      "2": 3,
      "1": 2
    }
  }
}
```

**When to Use**:

- Product detail page review section
- Review analytics and statistics

---

#### 3. **Get User Reviews**

```http
GET /api/reviews/user
```

**Purpose**: Get all reviews written by the authenticated user

**Headers Required**:

```http
Authorization: Bearer jwt_token_here
```

**Response**:

```json
{
  "message": "User reviews retrieved successfully",
  "reviews": [
    {
      "id": "review_id",
      "product": {
        "id": "product_id",
        "title": "iPhone 15",
        "images": ["image1.jpg"],
        "price": 999,
        "category": "electronics"
      },
      "rating": 5,
      "comment": "Great product! Highly recommended.",
      "helpfulVotes": 12,
      "createdAt": "2025-01-07T10:30:00.000Z"
    }
  ]
}
```

**When to Use**:

- User profile page
- My reviews section

---

#### 4. **Update Review**

```http
PUT /api/reviews/:reviewId
```

**Purpose**: Update an existing review (only by review owner)

**Headers Required**:

```http
Authorization: Bearer jwt_token_here
Content-Type: application/json
```

**URL Parameters**:

- `reviewId` - Review ID to update

**Request Body**:

```json
{
  "rating": 4,
  "comment": "Updated review text after using product more."
}
```

**Response**:

```json
{
  "message": "Review updated successfully",
  "review": {
    "id": "review_id",
    "rating": 4,
    "comment": "Updated review text after using product more.",
    "updatedAt": "2025-01-07T11:00:00.000Z"
  }
}
```

**When to Use**:

- Edit review button
- Review management interface

---

#### 5. **Delete Review**

```http
DELETE /api/reviews/:reviewId
```

**Purpose**: Delete a review (only by review owner)

**Headers Required**:

```http
Authorization: Bearer jwt_token_here
```

**URL Parameters**:

- `reviewId` - Review ID to delete

**Response**:

```json
{
  "message": "Review deleted successfully",
  "deletedReview": {
    "id": "review_id",
    "productId": "product_id"
  }
}
```

**When to Use**:

- Delete review button
- Review management

---

#### 6. **Mark Review as Helpful**

```http
POST /api/reviews/:reviewId/helpful
```

**Purpose**: Vote a review as helpful (increases helpful vote count)

**Headers Required**:

```http
Authorization: Bearer jwt_token_here
```

**URL Parameters**:

- `reviewId` - Review ID to mark as helpful

**Response**:

```json
{
  "message": "Review marked as helpful",
  "helpfulVotes": 13
}
```

**When to Use**:

- "Helpful" button on reviews
- Community engagement features

---

## 🎯 Quick Reference

| Feature                         | API Endpoint                        | Method | Auth Required |
| ------------------------------- | ----------------------------------- | ------ | ------------- |
| Browse Products                 | `/api/products`                     | GET    | ❌            |
| Product Details                 | `/api/products/:id`                 | GET    | ❌            |
| Categories                      | `/api/categories`                   | GET    | ❌            |
| Register                        | `/api/auth/register`                | POST   | ❌            |
| Login                           | `/api/auth/login`                   | POST   | ❌            |
| Check Auth                      | `/api/auth/verify-token`            | GET    | ✅            |
| Profile                         | `/api/user/profile`                 | GET    | ✅            |
| Update Profile                  | `/api/user/profile`                 | PUT    | ✅            |
| Change Password                 | `/api/user/profile/change-password` | PUT    | ✅            |
| **Cart: Add Item**              | `/api/cart/add`                     | POST   | ✅            |
| **Cart: Get Cart**              | `/api/cart`                         | GET    | ✅            |
| **Cart: Update Quantity**       | `/api/cart/item/:itemId`            | PUT    | ✅            |
| **Cart: Remove Item**           | `/api/cart/item/:itemId`            | DELETE | ✅            |
| **Cart: Clear Cart**            | `/api/cart`                         | DELETE | ✅            |
| **Cart: Get Summary**           | `/api/cart/summary`                 | GET    | ✅            |
| **Order: Get Summary**          | `/api/orders/summary`               | POST   | ✅            |
| **Order: Place Order**          | `/api/orders`                       | POST   | ✅            |
| **Order: Order History**        | `/api/orders`                       | GET    | ✅            |
| **Order: Order Details**        | `/api/orders/:orderId`              | GET    | ✅            |
| **Wishlist: Add Item**          | `/api/wishlist/add`                 | POST   | ✅            |
| **Wishlist: Get Wishlist**      | `/api/wishlist`                     | GET    | ✅            |
| **Wishlist: Remove Item**       | `/api/wishlist/item/:productId`     | DELETE | ✅            |
| **Wishlist: Clear All**         | `/api/wishlist`                     | DELETE | ✅            |
| **Review: Add Review**          | `/api/reviews`                      | POST   | ✅            |
| **Review: Get Product Reviews** | `/api/reviews/product/:productId`   | GET    | ✅            |
| **Review: Get User Reviews**    | `/api/reviews/user`                 | GET    | ✅            |
| **Review: Update Review**       | `/api/reviews/:reviewId`            | PUT    | ✅            |
| **Review: Delete Review**       | `/api/reviews/:reviewId`            | DELETE | ✅            |
| **Review: Mark Helpful**        | `/api/reviews/:reviewId/helpful`    | POST   | ✅            |
| **Admin: Create Product**       | `/api/admin/products`               | POST   | ✅ Admin      |
| **Admin: Update Product**       | `/api/admin/products/:id`           | PUT    | ✅ Admin      |
| **Admin: Delete Product**       | `/api/admin/products/:id`           | DELETE | ✅ Admin      |
| **Admin: Get All Products**     | `/api/admin/products`               | GET    | ✅ Admin      |

---

_This API documentation covers all currently implemented endpoints. For questions or issues, refer to the backend team._
