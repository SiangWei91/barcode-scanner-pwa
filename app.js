const scriptUrl = 'https://script.google.com/macros/s/AKfycbxtkp0U6W1YL9ixCfFERGAkgVNnhatwhGoBkLSWBfg0BhtvFlru6tz2Lc8IpZTIQHLPzA/exec';

let productList = {};

async function submitDataToGoogleSheet(barcodeData) {
    try {
        const response = await fetch(scriptUrl, {
            method: 'POST',
            mode: 'no-cors',
            body: JSON.stringify({
                barcode: barcodeData
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        console.log('Data submitted successfully');
        alert('Barcode submitted successfully!');
    } catch (error) {
        console.error('Error submitting data:', error);
        alert('Error submitting barcode. Please try again.');
    }
}

function focusInput() {
    document.getElementById('barcodeInput').focus();
}

function processBarcode() {
    const barcode = document.getElementById('barcodeInput').value;
    const productName = productList[barcode] || 'Product not found';
    document.getElementById('scannedValue').innerText = barcode;
    document.getElementById('productName').innerText = productName;
}

function submitBarcode() {
    const barcode = document.getElementById('scannedValue').innerText;
    if (barcode) {
        submitDataToGoogleSheet(barcode);
    } else {
        alert('Please scan a barcode first.');
    }
}

// Function to load product list from JSON file
async function loadProductList() {
    try {
        const response = await fetch('/barcode-scanner-pwa/productList.json');
        const data = await response.json();
        localStorage.setItem('productList', JSON.stringify(data));
        return data;
    } catch (error) {
        console.error('Error loading product list:', error);
        return null;
    }
}

// Function to initialize the app
async function initApp() {
    let storedProductList = localStorage.getItem('productList');
    if (!storedProductList) {
        productList = await loadProductList();
    } else {
        productList = JSON.parse(storedProductList);
    }
}

// Call initApp when the page loads
window.addEventListener('load', initApp);

// Function to refresh product list and service worker
async function refreshApp() {
    productList = await loadProductList();
    if (productList) {
        alert('Product list updated successfully!');
    }

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(function(registrations) {
            for(let registration of registrations) {
                registration.update();
            }
        });
    }
}
