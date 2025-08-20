import { useState, useEffect } from 'react';

const useCategories = () => {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchCategories = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const response = await fetch(`${API_BASE_URL}/api/categories`);

            if (!response.ok) {
                throw new Error('Failed to fetch categories');
            }

            const categories = await response.json();
            setCategories(categories || []);
        } catch (err) {
            setError(err.message);
            console.error('Error fetching categories:', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return { categories, isLoading, error, refetch: fetchCategories };
};

export default useCategories;
