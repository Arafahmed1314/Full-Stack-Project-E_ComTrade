import { createSlice } from '@reduxjs/toolkit';

// Simple wishlist slice - only for state management
const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: {
        items: [],
        totalItems: 0,
        loading: false,
        error: null,
    },
    reducers: {
        // Set loading state
        setLoading: (state, action) => {
            state.loading = action.payload;
        },

        // Set error message
        setError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },

        // Clear error
        clearError: (state) => {
            state.error = null;
        },

        // Set wishlist data from API
        setWishlistData: (state, action) => {
            state.items = action.payload.items || [];
            state.totalItems = action.payload.totalItems || action.payload.items?.length || 0;
            state.loading = false;
            state.error = null;
        },

        // Clear wishlist
        clearWishlist: (state) => {
            state.items = [];
            state.totalItems = 0;
            state.error = null;
        }
    }
});

// Export actions
export const { setLoading, setError, clearError, setWishlistData, clearWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
