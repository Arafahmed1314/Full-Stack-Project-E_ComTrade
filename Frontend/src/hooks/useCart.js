import axios from 'axios';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { setLoading, setError, setCartData, clearCart } from '../../redux/cartSlice';

const API_BASE_URL = 'http://localhost:5000/api';

// Configure axios to always send cookies
axios.defaults.withCredentials = true;

const useCart = (dispatch) => {
    // Get user from Redux instead of cookies
    const user = useSelector((state) => state.user.user);

    // Get cart data
    const fetchCart = useCallback(async () => {
        dispatch(setLoading(true));

        try {
            if (!user) {
                dispatch(setCartData({ items: [], totalItems: 0, totalPrice: 0 }));
                return;
            }

            const response = await axios.get(`${API_BASE_URL}/cart`);
            dispatch(setCartData(response.data));
        } catch (err) {
            dispatch(setError(err.response?.data?.message || 'Failed to fetch cart'));
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch, user]);

    // Add item to cart
    const addToCart = useCallback(async (productId, quantity = 1) => {
        dispatch(setLoading(true));

        try {
            console.log('useCart addToCart:', { productId, quantity, userExists: !!user });

            if (!user) {
                toast.error('Please login to add items to cart');
                throw new Error('Please login to add items to cart');
            }

            const response = await axios.post(`${API_BASE_URL}/cart/add`, {
                productId,
                quantity
            });

            console.log('Add to cart response:', response.data);

            // Refresh cart after adding
            await fetchCart();
            toast.success('Item added to cart successfully!');
            return true;
        } catch (err) {
            console.error('Add to cart error:', err.response?.data || err.message);
            const errorMessage = err.response?.data?.message || 'Failed to add item to cart';
            toast.error(errorMessage);
            dispatch(setError(errorMessage));
            return false;
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch, user, fetchCart]);

    // Update item quantity
    const updateQuantity = useCallback(async (itemId, quantity) => {
        dispatch(setLoading(true));

        try {
            if (!user) {
                toast.error('Please login to update cart');
                throw new Error('Please login to update cart');
            }

            await axios.put(`${API_BASE_URL}/cart/item/${itemId}`, {
                quantity
            });

            // Refresh cart after updating
            await fetchCart();
            toast.success('Cart updated successfully!');
            return true;
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Failed to update item';
            toast.error(errorMessage);
            dispatch(setError(errorMessage));
            return false;
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch, user, fetchCart]);

    // Remove item from cart
    const removeFromCart = useCallback(async (itemId) => {
        dispatch(setLoading(true));

        try {
            if (!user) {
                toast.error('Please login to remove items');
                throw new Error('Please login to remove items');
            }

            await axios.delete(`${API_BASE_URL}/cart/item/${itemId}`);

            // Refresh cart after removing
            await fetchCart();
            toast.success('Item removed from cart');
            return true;
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Failed to remove item';
            toast.error(errorMessage);
            dispatch(setError(errorMessage));
            return false;
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch, user, fetchCart]);

    // Clear entire cart
    const clearAllCart = useCallback(async () => {
        dispatch(setLoading(true));

        try {
            if (!user) {
                toast.error('Please login to clear cart');
                throw new Error('Please login to clear cart');
            }

            await axios.delete(`${API_BASE_URL}/cart`);

            dispatch(clearCart());
            toast.success('Cart cleared successfully!');
            return true;
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Failed to clear cart';
            toast.error(errorMessage);
            dispatch(setError(errorMessage));
            return false;
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch, user]);

    // Get cart summary (for navbar)
    const getCartSummary = useCallback(async () => {
        try {
            if (!user) return { totalItems: 0, totalPrice: 0 };

            const response = await axios.get(`${API_BASE_URL}/cart/summary`);
            return response.data;
        } catch (err) {
            console.error('Failed to get cart summary:', err);
            return { totalItems: 0, totalPrice: 0 };
        }
    }, [user]);

    return {
        fetchCart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearAllCart,
        getCartSummary
    };
};

export default useCart;
