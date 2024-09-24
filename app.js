let productData = null;

// Function to load the JSON file
async function loadProductData() {
  try {
    const response = await fetch('/storage/downloads/products.json');
    productData = await response.json();
    console.log('Product data loaded successfully');
  } catch (error) {
    console.error('Error loading product data:', error);
  }
}

// Load the product data when the script is first run
loadProductData();

// Function to look up a product by barcode
function getProductByBarcode(barcode) {
  if (!productData) {
    return 'Product data not loaded';
  }
  return productData[barcode] || 'Product not found';
}

function focusInput() {
  document.getElementById('barcodeInput').focus();
}

function processBarcode() {
  const barcodeInput = document.getElementById('barcodeInput');
  const scannedValue = document.getElementById('scannedValue');
  const productNameElement = document.getElementById('productName');
  
  // Update the scanned value
  scannedValue.textContent = barcodeInput.value;
  
  // Look up the product name
  const productName = getProductByBarcode(barcodeInput.value);
  productNameElement.textContent = productName;
  
  // Clear the input field after a short delay
  setTimeout(() => {
    barcodeInput.value = '';
    barcodeInput.focus();
  }, 500);
}

function submitBarcode() {
  const barcode = document.getElementById('scannedValue').textContent;
  const productName = document.getElementById('productName').textContent;
  
  // Call the Google Apps Script web app URL
  const scriptUrl = 'https://script.google.com/macros/s/AKfycbxtkp0U6W1YL9ixCfFERGAkgVNnhatwhGoBkLSWBfg0BhtvFlru6tz2Lc8IpZTIQHLPzA/exec';
  
  // Prepare the data to send
  const data = {
    barcode: barcode,
    productName: productName,
    timestamp: new Date().toISOString()
  };
  
  // Send data to Google Sheet
  fetch(scriptUrl, {
    method: 'POST',
    mode: 'no-cors', // This is important for cross-origin requests
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    body: JSON.stringify(data)
  })
  .then(response => {
    console.log('Success:', response);
    alert('Data submitted successfully!');
  })
  .catch((error) => {
    console.error('Error:', error);
    alert('Error submitting data. Please try again.');
  });
}

// Add event listener for 'Enter' key
document.getElementById('barcodeInput').addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault(); // Prevent form submission
    processBarcode();
  }
});

// Service worker registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/barcode-scanner-pwa/service-worker.js').then(function(registration) {
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}
