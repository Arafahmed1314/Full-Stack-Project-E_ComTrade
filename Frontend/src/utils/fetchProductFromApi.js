import { setProducts, setLoading } from '../../redux/productSlice'
export async function fetchProductFromApi(dispatch) {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    try {
        // Fetch all products by setting a high limit
        const response = await fetch(`${apiUrl}/api/products?limit=1000`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // Store the full response (products + pagination) in Redux
        dispatch(setProducts(data));
        dispatch(setLoading(false));
    } catch (error) {
        console.error('Error fetching products:', error);
        dispatch(setLoading(false));
    }
}
