const scriptUrl = 'https://script.google.com/macros/s/AKfycbxtkp0U6W1YL9ixCfFERGAkgVNnhatwhGoBkLSWBfg0BhtvFlru6tz2Lc8IpZTIQHLPzA/exec';

let productList = {};

async function submitDataToGoogleSheet(barcodeData, productName) {
    try {
        const response = await fetch(scriptUrl, {
            method: 'POST',
            mode: 'no-cors',
            body: JSON.stringify({
                barcode: barcodeData,
                productName: productName
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        console.log('Data submitted successfully');
        alert('Barcode and product name submitted successfully!');
    } catch (error) {
        console.error('Error submitting data:', error);
        alert('Error submitting data. Please try again.');
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
    const productName = document.getElementById('productName').innerText;
    if (barcode) {
        submitDataToGoogleSheet(barcode, productName);
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
async function loadProductList() {
    try {
        const response = await fetch('/barcode-scanner-pwa/productList.json');
        const text = await response.text(); // Get the raw text first
        console.log('Raw JSON:', text); // Log the raw JSON
        
        try {
            const data = JSON.parse(text);
            localStorage.setItem('productList', JSON.stringify(data));
            return data;
        } catch (parseError) {
            console.error('JSON Parse Error:', parseError);
            console.error('Error position:', parseError.message);
            // Attempt to identify the problematic part of the JSON
            const errorPosition = parseInt(parseError.message.match(/\d+/)[0]);
            console.error('Problematic part:', text.substring(Math.max(0, errorPosition - 20), errorPosition + 20));
            throw parseError;
        }
    } catch (error) {
        console.error('Error loading product list:', error);
        alert('Error loading product list. Check the console for details.');
        return null;
    }
}

// Function to refresh product list and service worker
async function refreshApp() {
    try {
        productList = await loadProductList();
        if (productList) {
            alert('Product list updated successfully!');
        }
    } catch (error) {
        console.error('Error refreshing product list:', error);
        alert('Error refreshing product list. Check the console for details.');
    }

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(function(registrations) {
            for(let registration of registrations) {
                registration.update();
            }
        });
    }
}
