import axios from 'axios';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { setLoading, setError, setWishlistData, clearWishlist } from '../../redux/wishlistSlice';

const API_BASE_URL = 'http://localhost:5000/api';

// Configure axios to always send cookies
axios.defaults.withCredentials = true;

const useWishlist = (dispatch) => {
    // Get user from Redux instead of cookies
    const user = useSelector((state) => state.user.user);

    // Get wishlist data
    const fetchWishlist = useCallback(async () => {
        dispatch(setLoading(true));

        try {
            if (!user) {
                dispatch(setWishlistData({ items: [], totalItems: 0 }));
                return;
            }

            const response = await axios.get(`${API_BASE_URL}/wishlist`);
            dispatch(setWishlistData(response.data));
        } catch (err) {
            dispatch(setError(err.response?.data?.message || 'Failed to fetch wishlist'));
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch, user]);

    // Add item to wishlist
    const addToWishlist = useCallback(async (productId) => {
        dispatch(setLoading(true));

        try {
            console.log('useWishlist addToWishlist:', { productId, userExists: !!user });

            if (!user) {
                toast.error('Please login to add items to wishlist');
                throw new Error('Please login to add items to wishlist');
            }

            const response = await axios.post(`${API_BASE_URL}/wishlist/add`, {
                productId
            });

            console.log('Add to wishlist response:', response.data);

            // Refresh wishlist after adding
            await fetchWishlist();
            toast.success('Item added to wishlist!');
            return true;
        } catch (err) {
            console.error('Add to wishlist error:', err.response?.data || err.message);
            const errorMessage = err.response?.data?.message || 'Failed to add item to wishlist';
            toast.error(errorMessage);
            dispatch(setError(errorMessage));
            return false;
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch, user, fetchWishlist]);

    // Remove item from wishlist
    const removeFromWishlist = useCallback(async (productId) => {
        dispatch(setLoading(true));

        try {
            if (!user) {
                toast.error('Please login to remove items');
                throw new Error('Please login to remove items');
            }

            await axios.delete(`${API_BASE_URL}/wishlist/item/${productId}`);

            // Refresh wishlist after removing
            await fetchWishlist();
            toast.success('Item removed from wishlist');
            return true;
        } catch (err) {
            console.error('Remove from wishlist error:', err.response?.data || err.message);
            const errorMessage = err.response?.data?.message || 'Failed to remove item';
            toast.error(errorMessage);
            dispatch(setError(errorMessage));
            return false;
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch, user, fetchWishlist]);

    // Clear entire wishlist
    const clearAllWishlist = useCallback(async () => {
        dispatch(setLoading(true));

        try {
            if (!user) {
                toast.error('Please login to clear wishlist');
                throw new Error('Please login to clear wishlist');
            }

            await axios.delete(`${API_BASE_URL}/wishlist`);

            dispatch(clearWishlist());
            toast.success('Wishlist cleared successfully!');
            return true;
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Failed to clear wishlist';
            toast.error(errorMessage);
            dispatch(setError(errorMessage));
            return false;
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch, user]);

    return {
        fetchWishlist,
        addToWishlist,
        removeFromWishlist,
        clearAllWishlist
    };
};

export default useWishlist;
