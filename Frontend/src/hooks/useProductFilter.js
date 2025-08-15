import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setProducts, setLoading } from '../../redux/productSlice';

export const useProductFilter = () => {
    const dispatch = useDispatch();

    const [filters, setFilters] = useState({
        category: '',
        minPrice: '',
        maxPrice: '',
        search: '',
        sort: 'createdAt',
        order: 'desc',
        page: 1,
        limit: 1000 // Get all products for client-side pagination
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Function to fetch products from backend with current filters
    const fetchFilteredProducts = useCallback(async (filterParams) => {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        setIsLoading(true);
        setError(null);

        try {
            // Build query string from filter parameters
            const queryParams = new URLSearchParams();

            Object.entries(filterParams || filters).forEach(([key, value]) => {
                if (value !== '' && value !== null && value !== undefined) {
                    queryParams.append(key, value);
                }
            });

            const response = await fetch(`${apiUrl}/api/products?${queryParams.toString()}`);

            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }

            const data = await response.json();

            // Update Redux store with filtered products
            dispatch(setProducts(data));
            dispatch(setLoading(false));

        } catch (err) {
            console.error('Error fetching filtered products:', err);
            setError(err.message);
            dispatch(setLoading(false));
        } finally {
            setIsLoading(false);
        }
    }, [dispatch, filters]);

    // Function to update filters and fetch new data
    const updateFilters = useCallback((newFilters) => {
        const updatedFilters = { ...filters, ...newFilters, page: 1 }; // Reset to page 1 when filters change
        setFilters(updatedFilters);
        fetchFilteredProducts(updatedFilters);
    }, [filters, fetchFilteredProducts]);

    // Function to clear all filters
    const clearFilters = useCallback(() => {
        const defaultFilters = {
            category: '',
            minPrice: '',
            maxPrice: '',
            search: '',
            sort: 'createdAt',
            order: 'desc',
            page: 1,
            limit: 1000
        };
        setFilters(defaultFilters);
        fetchFilteredProducts(defaultFilters);
    }, [fetchFilteredProducts]);

    // Function to update sort
    const updateSort = useCallback((sort, order = 'desc') => {
        updateFilters({ sort, order });
    }, [updateFilters]);

    // Function to update search
    const updateSearch = useCallback((search) => {
        updateFilters({ search });
    }, [updateFilters]);

    // Don't auto-fetch on mount - let App.jsx handle initial load
    // Products are loaded in App.jsx with fetchProductFromApi

    return {
        filters,
        isLoading,
        error,
        updateFilters,
        clearFilters,
        updateSort,
        updateSearch,
        refetch: fetchFilteredProducts
    };
};
