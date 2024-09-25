// PDA Scanner button key codes
const KEY_LSCAN = 622;
const KEY_HSCAN = 621;
const KEY_RSCAN = 623;

// Product list
const productList = {
  "8887151402608": "SAI DOU FISH CAKE (L)",
  "8887151301109": "IMITATION SURIMI SCALLOP",
  "8887151201102": "SEAFOOD STICK",
  "8887151502117": "YONG TAU FOO",
  "8887151402059": "FRIED LARGE FISH CAKE",
  "8887151402103": "FRIED ROUND FISH CAKE (L)",
  "8887151706034": "CHICKEN NGOH HIANG",
  "8887151403100": "COOKED FISH BALL",
  "8887151202109": "IMITATION CRAB BALL",
  "8887151705044": "FLAT NGOH HIANG"
};

function initScanner() {
  const scannedValue = document.getElementById('scannedValue');
  const productName = document.getElementById('productName');

  // Simulate scanner input (replace this with actual scanner input method)
  function simulateScannerInput(barcode) {
    sessionStorage.setItem('lastBarcode', barcode);
    updateProductDisplay();
  }

  function updateProductDisplay() {
    const barcode = sessionStorage.getItem('lastBarcode');
    if (barcode) {
      scannedValue.textContent = barcode;
      const product = productList[barcode];
      if (product) {
        productName.textContent = product;
      } else {
        productName.textContent = 'Product not found';
      }
    } else {
      scannedValue.textContent = '';
      productName.textContent = '';
    }
  }

  document.addEventListener('keydown', function(event) {
    if (event.keyCode === KEY_LSCAN || event.keyCode === KEY_HSCAN || event.keyCode === KEY_RSCAN) {
      event.preventDefault();
      console.log('Scanner button pressed');
      // Here you would typically trigger your scanner to read a barcode
      // For this example, we'll simulate a scan with a random product
      const randomBarcode = Object.keys(productList)[Math.floor(Math.random() * Object.keys(productList).length)];
      simulateScannerInput(randomBarcode);
    }
  });

  // Check for last scanned barcode in session storage on page load
  updateProductDisplay();
}

function submitBarcode() {
  const lastBarcode = sessionStorage.getItem('lastBarcode');
  console.log('Submitting barcode:', lastBarcode);
  alert('Barcode submitted to Google Sheet');
}

function refreshApp() {
  sessionStorage.removeItem('lastBarcode');
  document.getElementById('scannedValue').textContent = '';
  document.getElementById('productName').textContent = '';
  console.log('App refreshed');
}

window.addEventListener('load', initScanner);
