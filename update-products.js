const fs = require('fs');
const path = require('path');

// Read the current products.json file
const productsPath = path.join(__dirname, 'products.json');
const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

// Function to generate 4 image variations for each product
function generateImageVariations(originalImage, productId) {
    // Extract the base URL and file extension
    const baseUrl = originalImage.replace('_t.png', '').replace('.png', '');

    // Create 4 variations by modifying the image URL slightly
    return [
        originalImage, // Keep original as first image
        `${baseUrl}_variant1.png`,
        `${baseUrl}_variant2.png`,
        `${baseUrl}_variant3.png`
    ];
}

// Transform each product
const updatedProducts = products.map(product => {
    // Generate 4 images for each product
    const images = generateImageVariations(product.image, product.id);

    // Return the product with images array instead of single image
    const { image, ...productWithoutImage } = product;
    return {
        ...productWithoutImage,
        images: images
    };
});

// Write the updated products to the file
fs.writeFileSync(productsPath, JSON.stringify(updatedProducts, null, 2));

console.log('✅ Successfully updated products.json with 4 images for each product!');
console.log(`📊 Updated ${updatedProducts.length} products`);
console.log('🖼️  Each product now has 4 image variations');
