// Updated product list
const productList = {
  "NA1": { itemCode: "49101", name: "FISH CAKE (L)", packingSize: "20'S" },
  "NA2": { itemCode: "49102", name: "FISH CAKE (M)", packingSize: "20'S" },
  "NA3": { itemCode: "49104", name: "FISH CAKE (L) - IMPROVED", packingSize: "20'S" },
  "NA4": { itemCode: "49105", name: "GOLDBAR FRIED FISH CAKE", packingSize: "20'S" },
  "NA5": { itemCode: "49108", name: "SLICED FISH CAKE", packingSize: "1KG" },
  "NA6": { itemCode: "49110", name: "ROUND FISH CAKE", packingSize: "30'S" },
  "NA7": { itemCode: "49113", name: "ABALONE FISH CAKE", packingSize: "20'S" },
  "NA8": { itemCode: "49114", name: "WHITE FISH CAKE - ABALONE", packingSize: "30'S" },
  "NA9": { itemCode: "49115", name: "FRIED LARGE FISH CAKE", packingSize: "20'S" },
  "NA10": { itemCode: "49117", name: "FISH CAKE (L) - BLACK", packingSize: "20'S" },
  "NA11": { itemCode: "49120", name: "SAI DOU FISH CAKE (L)", packingSize: "10'S" },
  "NA12": { itemCode: "49121", name: "SAI DOU FISH CAKE (S)", packingSize: "10'S" },
  "NA13": { itemCode: "49123", name: "HANDMADE VEGETABLE FISHCAKE", packingSize: "10'S" },
  "NA14": { itemCode: "49129", name: "FRIED LARGE FISH CAKE", packingSize: "10'S" },
  "NA15": { itemCode: "49130", name: "FISH CAKE (S)", packingSize: "20'S" },
  "NA16": { itemCode: "49133", name: "SAI DOU FRIED FISH BALL", packingSize: "30'S" },
  "8887151402554": { itemCode: "49201", name: "COOKED FISH BALL (L)", packingSize: "1KG" },
  "NA17": { itemCode: "49305", name: "COOKED FISH BALL (L)", packingSize: "400G" },
  "NA18": { itemCode: "49311", name: "COOKED FISH BALL (M)", packingSize: "1KG" },
  "8887151403407": { itemCode: "49315", name: "COOKED FISH BALL (M)", packingSize: "400G" },
  "8887151403056": { itemCode: "49321", name: "COOKED FISH BALL (S)", packingSize: "1KG" },
  "NA19": { itemCode: "49332", name: "COOKED FISH BALL", packingSize: "200G" },
  "NA20": { itemCode: "49333", name: "FISH BALL", packingSize: "50'S" },
  "NA21": { itemCode: "49700", name: "FRIED FISH CAKE (M)", packingSize: "30'S" },
  "NA22": { itemCode: "49702", name: "GOLDBAR FRIED FISH CAKE", packingSize: "30'S" },
  "NA23": { itemCode: "49707", name: "FRIED FISH BALL", packingSize: "50'S" },
  "NA24": { itemCode: "49139", name: "FISH CAKE (M) - IMPROVED", packingSize: "20'S" },
  "NA25": { itemCode: "40366", name: "FISH BALL (TEOCHEW)", packingSize: "25'S" },
  "NA26": { itemCode: "40381", name: "FISH CAKE (L)", packingSize: "25'S" },
  "NA27": { itemCode: "49334", name: "FRIED FISH BALL", packingSize: "50'S" },
  "NA28": { itemCode: "49335", name: "PREMIUM FRIED FISH BALL 10M", packingSize: "10'S" },
  "8887151402035": { itemCode: "40361", name: "FRIED FISH BALL", packingSize: "1KG" },
  "8887151402554": { itemCode: "40401", name: "WHITE FISH CAKE", packingSize: "5'S" },
  "8887151402608": { itemCode: "40402", name: "FISH CAKE (L)", packingSize: "5'S" },
  "8887151402103": { itemCode: "40202", name: "ROUND FISH CAKE", packingSize: "5'S" },
  "8887151402059": { itemCode: "40204", name: "FRIED LARGE FISH CAKE", packingSize: "3'S" },
  "8887151402615": { itemCode: "40206", name: "SAI DOU FISH CAKE (S)", packingSize: "5'S" },
  "8887151402509": { itemCode: "40313", name: "COOKED FISH BALL (M)", packingSize: "20'S" },
  "8887151502605": { itemCode: "85004", name: "PC FRIED FISH CAKE (L)", packingSize: "3'S" },
  "8887151502636": { itemCode: "85005", name: "PC VEGETABLE FISH CAKE", packingSize: "3'S" },
  "8887151502650": { itemCode: "85007", name: "PC WHITE FISH CAKE", packingSize: "5'S" },
  "NA29": { itemCode: "45041", name: "FISH BALL", packingSize: "30'S" }
};

function initScanner() {
  const barcodeInput = document.getElementById('barcodeInput');
  const productTable = document.getElementById('productTable').getElementsByTagName('tbody')[0];
  let scanTimeout;
  let isScanning = true;

  // Populate the table with product data
  // Populate the table with product data
  for (const [barcode, product] of Object.entries(productList)) {
    const row = productTable.insertRow();
    row.innerHTML = `
      <td>${product.name}</td>
      <td>${product.packingSize}</td>
      <td><input type="number" min="0" data-barcode="${barcode}"></td>
    `;
  }

function updateProduct() {
  const barcode = barcodeInput.value.trim();
  console.log('Scanned barcode:', barcode);
  if (barcode) {
    const product = productList[barcode];
    console.log('Found product:', product);
    if (product) {
      const quantityInput = document.querySelector(`input[data-barcode="${barcode}"]`);
      console.log('Found quantity input:', quantityInput);
      if (quantityInput) {
        quantityInput.focus();
        quantityInput.select();
        isScanning = false;
        console.log('Focused on quantity input');
      }
    } else {
      alert('Product not found');
    }
    barcodeInput.value = '';
  }
}


  function focusOnBarcodeInput() {
    isScanning = true;
    barcodeInput.focus();
  }

  // Monitor input changes
  barcodeInput.addEventListener('input', function() {
    clearTimeout(scanTimeout);
    scanTimeout = setTimeout(updateProduct, 300); // Delay of 100ms
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

function formatTime(date) {
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  return `${hours}:${minutes} ${ampm}`;
}

function updateDateTimeDisplay() {
  const dateDisplay = document.getElementById('currentDate');
  const timeDisplay = document.getElementById('currentTime');
  const now = new Date();
  
  if (dateDisplay) {
    dateDisplay.textContent = formatDate(now);
  }
  
  if (timeDisplay) {
    timeDisplay.textContent = formatTime(now);
  }
}

// Update the date and time every second
setInterval(updateDateTimeDisplay, 1000);

window.addEventListener('load', () => {
  initScanner();
  updateDateTimeDisplay();
});


function showLoadingOverlay() {
  document.getElementById('loadingOverlay').style.display = 'flex';
}

function hideLoadingOverlay() {
  document.getElementById('loadingOverlay').style.display = 'none';
}

function showToast(message) {
  const toast = document.getElementById('toastNotification');
  toast.textContent = message;
  toast.className = 'show';
  setTimeout(() => { toast.className = toast.className.replace('show', ''); }, 3000);
}

function submitQuantities() {
  const quantities = [];
  const inputs = document.querySelectorAll('input[type="number"]');
  const currentDate = formatDate(new Date());
  const currentTime = formatTime(new Date());

  inputs.forEach(input => {
    const barcode = input.getAttribute('data-barcode');
    const quantity = input.value.trim();
    if (quantity !== '') {
      const product = productList[barcode];
      quantities.push({
        Date: currentDate,
        Time: currentTime,
        ItemCode: product.itemCode,
        Product: product.name,
        PackingSize: product.packingSize,
        Quantity: parseInt(quantity, 10)
      });
    }
  });

  if (quantities.length > 0) {
    showLoadingOverlay();
    sendToGoogleScript(quantities);
  } else {
    showToast('No quantities entered');
  }
}

function sendToGoogleScript(data) {
  const url = 'https://script.google.com/macros/s/AKfycbxtkp0U6W1YL9ixCfFERGAkgVNnhatwhGoBkLSWBfg0BhtvFlru6tz2Lc8IpZTIQHLPzA/exec';
  
  fetch(url, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
  .then(() => {
    hideLoadingOverlay();
    showToast('Data submitted successfully!');
    refreshApp();
  })
  .catch(error => {
    console.error('Error:', error);
    hideLoadingOverlay();
    showToast('Error submitting data. Please try again.');
  });
}
