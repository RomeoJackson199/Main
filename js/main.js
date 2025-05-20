document.addEventListener('DOMContentLoaded', () => {
    // Part 1: Populate products.html
    if (window.location.pathname.endsWith('products.html') || window.location.pathname.includes('/products.html')) { // Added includes for flexibility
        const productGrid = document.getElementById('product-grid');

        if (productGrid) {
            // Clear any existing placeholder items
            // The h2 "All Our Flavors" should remain, so we only remove child elements that are product items.
            // A simple way is to remove all div children if they are product-item, or just clear all children if h2 is static.
            // For now, let's assume product items are direct children and we can clear all and re-add h2 if it was dynamic.
            // Or, more robustly, select and remove only .product-item elements if they exist.

            // Clear previous product items, but keep the title if it's part of the grid
            const existingItems = productGrid.querySelectorAll('.product-item');
            existingItems.forEach(item => item.remove());
            
            // Check if products array is available
            if (typeof products !== 'undefined' && Array.isArray(products)) {
                products.forEach(product => {
                    const productItemDiv = document.createElement('div');
                    productItemDiv.className = 'product-item';

                    productItemDiv.innerHTML = `
                        <img src="${product.image}" alt="${product.name}">
                        <h2>${product.name}</h2>
                        <p class="price">$${product.price.toFixed(2)}</p>
                        <a href="product_detail.html?id=${product.id}" class="button-style">View Details</a>
                    `;
                    productGrid.appendChild(productItemDiv);
                });
            } else {
                console.error('Products array is not loaded or not available.');
                productGrid.innerHTML += '<p>Could not load products at this time. Please try again later.</p>';
            }
        } else {
            console.error('Product grid element not found on products.html.');
        }
    }

    // Part 3 (for product_detail.html - will be implemented in a later step)
    // if (window.location.pathname.endsWith('product_detail.html') || window.location.pathname.includes('/product_detail.html')) {
    //     // Logic for product_detail.html will go here
    // }
});
