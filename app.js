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

function loadProductListFromLocalStorage() {
    const storedList = localStorage.getItem('productList');
    if (storedList) {
        productList = JSON.parse(storedList);
        console.log('Loaded product list from localStorage:', productList);
    } else {
        console.log('No product list found in localStorage');
    }
}

function processBarcode() {
    const barcode = document.getElementById('barcodeInput').value;
    console.log('Processing barcode:', barcode);
    console.log('Current product list:', productList);
    loadProductListFromLocalStorage(); // Reload the list every time
    const productName = productList[barcode] || 'Product not found';
    console.log('Found product name:', productName);
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
        const response = await fetch('/barcode-scanner-pwa/productList.json', {
            cache: 'no-store'
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        localStorage.setItem('productList', JSON.stringify(data));
        productList = data;
        console.log('Loaded and stored new product list:', productList);
    } catch (error) {
        console.error('Error loading product list:', error);
        alert('Error loading product list. Check the console for details.');
    }
}

async function initApp() {
    loadProductListFromLocalStorage();
    await loadProductList(); // This will update localStorage
    loadProductListFromLocalStorage(); // Load the updated list into memory
}

async function refreshApp() {
    console.log('Refreshing app...');
    await loadProductList();
    loadProductListFromLocalStorage();
    alert('Product list updated. Please scan again.');
}

// Call initApp when the page loads
window.addEventListener('load', initApp);
