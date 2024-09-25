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
  const barcodeInput = document.getElementById('barcodeInput');
  const scannedValue = document.getElementById('scannedValue');
  const productName = document.getElementById('productName');

  document.addEventListener('keydown', function(event) {
    if (event.keyCode === KEY_LSCAN || event.keyCode === KEY_HSCAN || event.keyCode === KEY_RSCAN) {
      event.preventDefault();
      console.log('Scanner button pressed');
      barcodeInput.value = '';
      scannedValue.textContent = '';
      productName.textContent = '';
      barcodeInput.focus();
    } else if (event.key === 'Enter') {
      const barcode = barcodeInput.value;
      scannedValue.textContent = barcode;
      productName.textContent = productList[barcode] || 'Product not found';
    }
  });
}

window.addEventListener('load', initScanner);
