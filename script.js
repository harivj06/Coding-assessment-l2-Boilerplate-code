/* script.js */

function changeImage(image) {
    document.getElementById('main-image').src = image;
}

function addToCart() {
    const productTitle = document.getElementById('product-title').textContent;
    const productPrice = document.getElementById('product-price').textContent;
    const productQuantity = document.getElementById('quantity-selector').value;
    const message = `Added ${productQuantity} of ${productTitle} at ${productPrice} to cart.`;
    document.getElementById('add-to-cart-message').textContent = message;
}
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('https://cdn.shopify.com/s/files/1/0534/5685/0790/files/singleProduct.json');
        const product = await response.json();
        document.getElementById('product-title').textContent = product.title;
        document.getElementById('product-vendor').textContent = product.vendor;
        document.getElementById('product-price').textContent = `$${product.price}`;
        document.getElementById('compare-price').textContent = `$${product.compare_at_price}`;
        document.getElementById('percentage-off').textContent = `${Math.round((1 - product.price / product.compare_at_price) * 100)}% off`;
        document.getElementById('main-image').src = product.images[0];
        document.getElementById('description').textContent = product.description;

    
        const thumbnailsContainer = document.querySelector('.thumbnails');
        product.images.forEach((image, index) => {
            if (index > 0) {
                const img = document.createElement('img');
                img.src = image;
                img.alt = `Thumbnail ${index}`;
                img.onclick = () => changeImage(image);
                thumbnailsContainer.appendChild(img);
            }
        });

        
        const colorSelector = document.getElementById('color-selector');
        product.options.colors.forEach(color => {
            const option = document.createElement('option');
            option.value = color;
            option.textContent = color;
            colorSelector.appendChild(option);
        });

        const sizeSelector = document.getElementById('size-selector');
        product.options.sizes.forEach(size => {
            const option = document.createElement('option');
            option.value = size;
            option.textContent = size;
            sizeSelector.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching product data:', error);
    }
});
