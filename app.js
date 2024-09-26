// Updated product list
const productList = {
  "": { itemCode: "49101", name: "FISH CAKE (L)", packingSize: "20'S" },
  "": { itemCode: "49102", name: "FISH CAKE (M)", packingSize: "20'S" },
  "": { itemCode: "49104", name: "FISH CAKE (L) - IMPROVED", packingSize: "20'S" },
  "": { itemCode: "49105", name: "GOLDBAR FRIED FISH CAKE", packingSize: "20'S" },
  "": { itemCode: "49108", name: "SLICED FISH CAKE", packingSize: "1KG" },
  "": { itemCode: "49110", name: "ROUND FISH CAKE", packingSize: "30'S" },
  "": { itemCode: "49113", name: "ABALONE FISH CAKE", packingSize: "20'S" },
  "": { itemCode: "49114", name: "WHITE FISH CAKE - ABALONE", packingSize: "30'S" },
  "": { itemCode: "49115", name: "FRIED LARGE FISH CAKE", packingSize: "20'S" },
  "": { itemCode: "49117", name: "FISH CAKE (L) - BLACK", packingSize: "20'S" },
  "": { itemCode: "49120", name: "SAI DOU FISH CAKE (L)", packingSize: "10'S" },
  "": { itemCode: "49121", name: "SAI DOU FISH CAKE (S)", packingSize: "10'S/pkt" },
  "": { itemCode: "49123", name: "HANDMADE VEGETABLE FISHCAKE", packingSize: "10'S" },
  "": { itemCode: "49129", name: "FRIED LARGE FISH CAKE", packingSize: "10'S" },
  "": { itemCode: "49130", name: "FISH CAKE (S)", packingSize: "20'S" },
  "": { itemCode: "49133", name: "SAI DOU FRIED FISH BALL", packingSize: "30'S" },
  "8887151402554": { itemCode: "49201", name: "COOKED FISH BALL (L)", packingSize: "1KG" },
  "": { itemCode: "49305", name: "COOKED FISH BALL (L)", packingSize: "400G" },
  "": { itemCode: "49311", name: "COOKED FISH BALL (M)", packingSize: "1KG/pkt" },
  "8887151403407": { itemCode: "49315", name: "COOKED FISH BALL (M)", packingSize: "400G" },
  "8887151403056": { itemCode: "49321", name: "COOKED FISH BALL (S)", packingSize: "1KG" },
  "": { itemCode: "49332", name: "COOKED FISH BALL", packingSize: "200G" },
  "": { itemCode: "49333", name: "FISH BALL", packingSize: "50'S" },
  "": { itemCode: "49700", name: "FRIED FISH CAKE (M)", packingSize: "30'S" },
  "": { itemCode: "49702", name: "GOLDBAR FRIED FISH CAKE", packingSize: "30'S" },
  "": { itemCode: "49707", name: "FRIED FISH BALL", packingSize: "50'S" },
  "": { itemCode: "49139", name: "FISH CAKE (M) - IMPROVED", packingSize: "20'S" },
  "": { itemCode: "40366", name: "FISH BALL (TEOCHEW)", packingSize: "25'S" },
  "": { itemCode: "40381", name: "FISH CAKE (L)", packingSize: "25'S" },
  "": { itemCode: "49334", name: "FRIED FISH BALL", packingSize: "50PCS" },
  "": { itemCode: "49335", name: "PREMIUM FRIED FISH BALL 10M", packingSize: "10'S" },
  "8887151402035": { itemCode: "40361", name: "FRIED FISH BALL", packingSize: "1KG" },
  "8887151402554": { itemCode: "40401", name: "WHITE FISH CAKE", packingSize: "5'S" },
  "8887151402608": { itemCode: "40402", name: "FISH CAKE (L)", packingSize: "5'S" },
  "8887151402103": { itemCode: "40202", name: "ROUND FISH CAKE", packingSize: "5/tray" },
  "8887151402059": { itemCode: "40204", name: "FRIED LARGE FISH CAKE", packingSize: "3/tray" },
  "8887151402615": { itemCode: "40206", name: "SAI DOU FISH CAKE (S)", packingSize: "5/tray" },
  "8887151402509": { itemCode: "40313", name: "COOKED FISH BALL (M)", packingSize: "20/bag" },
  "8887151502605": { itemCode: "85004", name: "PC FRIED FISH CAKE (L)", packingSize: "3/tray" },
  "8887151502636": { itemCode: "85005", name: "PC VEGETABLE FISH CAKE", packingSize: "3/tray" },
  "8887151502650": { itemCode: "85007", name: "PC WHITE FISH CAKE", packingSize: "5/tray" },
  "": { itemCode: "45041", name: "FISH BALL", packingSize: "30PCS" }
};

function initScanner() {
  const barcodeInput = document.getElementById('barcodeInput');
  const productTable = document.getElementById('productTable').getElementsByTagName('tbody')[0];
  let scanTimeout;
  let isScanning = true;

  // Populate the table with product data
  let index = 0;
  for (const [barcode, product] of Object.entries(productList)) {
    const row = productTable.insertRow();
    const dataBarcode = barcode || `no-barcode-${index}`;
    row.innerHTML = `
      <td>${product.name}</td>
      <td class="packing-size">${product.packingSize}</td>
      <td><input type="number" min="0" data-barcode="${dataBarcode}"></td>
    `;
    index++;
  }

  function updateProduct() {
    const barcode = barcodeInput.value.trim();
    if (barcode) {
      const product = Object.entries(productList).find(([key, value]) => key === barcode || value.itemCode === barcode);
      if (product) {
        const [key, value] = product;
        const dataBarcode = key || `no-barcode-${Object.keys(productList).indexOf(key)}`;
        const quantityInput = document.querySelector(`input[data-barcode="${dataBarcode}"]`);
        if (quantityInput) {
          quantityInput.focus();
          quantityInput.select();
          isScanning = false;
        }
      } else {
        alert('Product not found');
      }
      // Clear the input after processing
      barcodeInput.value = '';
    }
    focusOnBarcodeInput();
  }

  function focusOnBarcodeInput() {
    isScanning = true;
    barcodeInput.focus();
  }

  // Monitor input changes
  barcodeInput.addEventListener('input', function() {
    clearTimeout(scanTimeout);
    scanTimeout = setTimeout(updateProduct, 100); // Delay of 100ms
  });

  // Handle focus events
  document.addEventListener('focus', function(event) {
    if (event.target.type === 'number') {
      isScanning = false;
    } else if (event.target === barcodeInput) {
      isScanning = true;
    }
  }, true);

  // Handle click events
  document.addEventListener('click', function(event) {
    if (event.target === barcodeInput) {
      focusOnBarcodeInput();
    } else if (event.target.type === 'number') {
      isScanning = false;
    } else {
      focusOnBarcodeInput();
    }
  }, true);

  // Continuously check and set focus to barcode input when in scanning mode
  setInterval(() => {
    if (isScanning && document.activeElement !== barcodeInput) {
      barcodeInput.focus();
    }
  }, 100);

  // Initially focus on barcode input
  focusOnBarcodeInput();
}

function submitQuantities() {
  const quantities = {};
  const inputs = document.querySelectorAll('input[type="number"]');
  inputs.forEach(input => {
    const barcode = input.getAttribute('data-barcode');
    const quantity = input.value.trim();
    if (quantity !== '') {
      quantities[barcode] = parseInt(quantity, 10);
    }
  });
  console.log('Submitting quantities:', quantities);
  alert('Quantities submitted');
  focusOnBarcodeInput();
}

function refreshApp() {
  const barcodeInput = document.getElementById('barcodeInput');
  barcodeInput.value = '';
  const inputs = document.querySelectorAll('input[type="number"]');
  inputs.forEach(input => {
    input.value = '';
  });
  console.log('App refreshed');
  focusOnBarcodeInput();
}

function focusOnBarcodeInput() {
  const barcodeInput = document.getElementById('barcodeInput');
  barcodeInput.focus();
}

function formatDate(date) {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function updateDateDisplay() {
  const dateDisplay = document.getElementById('currentDate');
  if (dateDisplay) {
    dateDisplay.textContent = formatDate(new Date());
  }
}

window.addEventListener('load', () => {
  initScanner();
  updateDateDisplay();
});
