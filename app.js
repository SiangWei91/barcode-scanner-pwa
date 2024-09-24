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
    console.log('Processing barcode:', barcode);
    console.log('Current product list:', productList);
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

async function loadProductList() {
    try {
        const timestamp = new Date().getTime();
        const response = await fetch(`/barcode-scanner-pwa/productList.json?t=${timestamp}`, {
            cache: 'no-store'
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const text = await response.text();
        console.log('Raw JSON:', text);
        
        const data = JSON.parse(text);
        localStorage.setItem('productList', JSON.stringify(data));
        console.log('Loaded product list:', data);
        return data;
    } catch (error) {
        console.error('Error loading product list:', error);
        alert('Error loading product list. Check the console for details.');
        return null;
    }
}

async function initApp() {
    productList = await loadProductList();
    if (!productList) {
        console.error('Failed to load product list');
        alert('Failed to load product list. Please refresh the page.');
    }
}

async function refreshApp() {
    console.log('Refreshing app...');
    productList = await loadProductList();
    if (productList) {
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
