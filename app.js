// Google Sheets script URL
const scriptUrl = 'https://script.google.com/macros/s/AKfycbxtkp0U6W1YL9ixCfFERGAkgVNnhatwhGoBkLSWBfg0BhtvFlru6tz2Lc8IpZTIQHLPzA/exec';

// Product list storage
let productList = {};

// PDA Scanner specific variables
let scannedBarcode = '';
let isScanning = false;
let scanTimer;
const SCAN_TIMEOUT = 50; // Adjust based on your scanner's speed

// PDA Scanner button key codes
const KEY_LSCAN = 622;
const KEY_HSCAN = 621;
const KEY_RSCAN = 623;

// Function to submit data to Google Sheet
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

// Function to process scanned barcode
function processBarcode(barcode) {
    console.log('Processing barcode:', barcode);
    console.log('Current product list:', productList);
    const productName = productList[barcode] || 'Product not found';
    console.log('Found product name:', productName);
    document.getElementById('scannedValue').innerText = barcode;
    document.getElementById('productName').innerText = productName;
}

// Function to submit barcode data
function submitBarcode() {
    const barcode = document.getElementById('scannedValue').innerText;
    const productName = document.getElementById('productName').innerText;
    if (barcode) {
        submitDataToGoogleSheet(barcode, productName);
    } else {
        alert('Please scan a barcode first.');
    }
}

// Function to load product list
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

// Function to refresh the app
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

// Function to handle manual barcode input
function handleBarcodeInput() {
    const input = document.getElementById('barcodeInput');
    const barcode = input.value.trim();
    
    if (barcode) {
        processBarcode(barcode);
        input.value = ''; // Clear the input for the next scan
    }
}

// Function to initialize PDA scanner
function initScanner() {
    document.addEventListener('keydown', function(event) {
        // Check if it's a scanner button press
        if (event.keyCode === KEY_LSCAN || event.keyCode === KEY_HSCAN || event.keyCode === KEY_RSCAN) {
            event.preventDefault(); // Prevent default button behavior
            console.log('Scanner button pressed');
            // You might want to add logic here to start listening for barcode input
            return;
        }

        // Handle barcode input
        if (!isScanning) {
            isScanning = true;
            scannedBarcode = '';
        }

        if (event.key !== 'Enter') {
            scannedBarcode += event.key;
        }

        clearTimeout(scanTimer);

        scanTimer = setTimeout(function() {
            if (scannedBarcode) {
                console.log('Scanned barcode:', scannedBarcode);
                processBarcode(scannedBarcode);
                document.getElementById('barcodeInput').value = scannedBarcode;
            }
            isScanning = false;
            scannedBarcode = '';
        }, SCAN_TIMEOUT);
    });
}

// Function to initialize the app
async function initApp() {
    await loadProductList();
    const input = document.getElementById('barcodeInput');
    input.addEventListener('change', handleBarcodeInput);
    input.addEventListener('blur', () => setTimeout(() => input.focus(), 0));
    
    initScanner(); // Initialize the PDA scanner functionality
}

// Call initApp when the page loads
window.addEventListener('load', initApp);
