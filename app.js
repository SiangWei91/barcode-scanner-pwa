const scriptUrl = 'https://script.google.com/macros/s/AKfycbxtkp0U6W1YL9ixCfFERGAkgVNnhatwhGoBkLSWBfg0BhtvFlru6tz2Lc8IpZTIQHLPzA/exec';
let productList = {};
let barcodeBuffer = '';
let barcodeTimeout;

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

function processBarcode(barcode) {
    console.log('Processing barcode:', barcode);
    console.log('Current product list:', productList);
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

function handleBarcodeInput(event) {
    clearTimeout(barcodeTimeout);
    
    // Ignore common control keys
    if (['Shift', 'Control', 'Alt', 'Meta', 'CapsLock', 'Tab'].includes(event.key)) {
        return;
    }
    
    if (event.key === 'Enter') {
        if (barcodeBuffer) {
            processBarcode(barcodeBuffer);
            barcodeBuffer = '';
        }
    } else {
        barcodeBuffer += event.key;
    }
    
    // Set a timeout to process the barcode if no new input for 50ms
    barcodeTimeout = setTimeout(() => {
        if (barcodeBuffer) {
            processBarcode(barcodeBuffer);
            barcodeBuffer = '';
        }
    }, 50);
}

async function refreshApp() {
    console.log('Refreshing app...');
    try {
        await loadProductList();
        alert('Product list updated successfully. Please scan again.');
    } catch (error) {
        console.error('Error refreshing product list:', error);
        alert('Error refreshing product list. Please check your connection and try again.');
    }
}

async function initApp() {
    await loadProductList();
    document.addEventListener('keydown', handleBarcodeInput);
}

// Call initApp when the page loads
window.addEventListener('load', initApp);
