const scriptUrl = 'https://script.google.com/macros/s/AKfycbxtkp0U6W1YL9ixCfFERGAkgVNnhatwhGoBkLSWBfg0BhtvFlru6tz2Lc8IpZTIQHLPzA/exec';
let productList = {};

async function submitDataToGoogleSheet(barcodeData, productName) {
    // ... (keep this function as is)
}

function focusInput() {
    document.getElementById('barcodeInput').focus();
}

function processBarcode() {
    const barcode = document.getElementById('barcodeInput').value;
    console.log('Processing barcode:', barcode);
    console.log('Current product list:', productList);
    const productName = productList[barcode] || 'Product not found';
    document.getElementById('scannedValue').innerText = barcode;
    document.getElementById('productName').innerText = productName;
}

function submitBarcode() {
    // ... (keep this function as is)
}

async function loadProductList() {
    try {
        const storedList = localStorage.getItem('productList');
        if (storedList) {
            productList = JSON.parse(storedList);
            console.log('Loaded product list from local storage:', productList);
            return productList;
        }

        const timestamp = new Date().getTime();
        const response = await fetch(`/barcode-scanner-pwa/productList.json?t=${timestamp}`, {
            cache: 'no-store'
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        localStorage.setItem('productList', JSON.stringify(data));
        productList = data;
        console.log('Loaded product list from server:', productList);
        return productList;
    } catch (error) {
        console.error('Error loading product list:', error);
        alert('Error loading product list. Check the console for details.');
        return null;
    }
}

async function initApp() {
    await loadProductList();
    if (Object.keys(productList).length === 0) {
        console.error('Failed to load product list');
        alert('Failed to load product list. Please refresh the page.');
    } else {
        console.log('App initialized with product list:', productList);
    }
}

async function refreshApp() {
    console.log('Refreshing app...');
    await loadProductList();
    if (Object.keys(productList).length > 0) {
        console.log('Product list updated successfully:', productList);
        alert('Product list updated successfully!');
    } else {
        console.error('Failed to update product list');
        alert('Failed to update product list. Please try again.');
    }

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(function(registrations) {
            for(let registration of registrations) {
                registration.update();
            }
        });
    }
}

// Call initApp when the page loads
window.addEventListener('load', initApp);
