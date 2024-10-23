// Updated product list
const productList = [
  { barcode: "40401", itemCode: "40401", name: "大鱼香 FISH NGOH HIANG (L)", packingSize: "20's" },
  { barcode: "40402", itemCode: "40402", name: "小鱼香 FISH NGOH HIANG (S)", packingSize: "50's" },
  { barcode: "40410", itemCode: "40410", name: "大鸡香 CHICKEN NGOH HIANG", packingSize: "20's" },
  { barcode: "40412", itemCode: "40412", name: "鸡粒 CHICKEN NGOH HIANG BALL", packingSize: "50's" },
  { barcode: "40430", itemCode: "40430", name: "炸云吞 FRIED WANTON", packingSize: "50's" },
  { barcode: "40440", itemCode: "40440", name: "扁香 FLAT NGOH HIANG", packingSize: "10's" },
  { barcode: "40501", itemCode: "40501", name: "大鱼香 FISH NGOH HIANG (L)", packingSize: "3's" },
  { barcode: "40502", itemCode: "40502", name: "小鱼香 FISH NGOH HIANG (S)", packingSize: "8's" },
  { barcode: "40510", itemCode: "40510", name: "大五香 NGOH HIANG (L)", packingSize: "3's" },
  { barcode: "40512", itemCode: "40512", name: "五香粒 NGOH HIANG BALL", packingSize: "8's" },
  { barcode: "40520", itemCode: "40520", name: "炸云吞 FRIED WANTON", packingSize: "8s" },
  { barcode: "85008", itemCode: "85008", name: "PC大鱼香 PC FISH NGOH HIANG (L)", packingSize: "3's" },
  { barcode: "85009", itemCode: "85009", name: "PC小鱼香 PC FISH NGOH HIANG (S)", packingSize: "8's" },
  { barcode: "40423", itemCode: "40423", name: "大鸡香 NGOH HIANG (L)", packingSize: "10s" },
  { barcode: "40340", itemCode: "40340", name: "VP 蟹味丸 VP FLAVOURED CRAB BALL", packingSize: "170g" },
  { barcode: "40341", itemCode: "40341", name: "VP 大鸡香 VP CHICKEN NGOH HIANG (L)", packingSize: "230g" },
  { barcode: "40346", itemCode: "40346", name: "VP鱼豆腐 FISH TOFU", packingSize: "160g" },
  { barcode: "40347", itemCode: "40347", name: "VP扁香 FLAT NGOH HIANG", packingSize: "190g" },
  { barcode: "40345", itemCode: "40345", name: "VP海鲜粒 SEAFOOD BALL", packingSize: "200g" },
  { barcode: "40348", itemCode: "40348", name: "VP鸡香粒 CHICKEN NGOH HIANG BALL", packingSize: "200g" },
  { barcode: "40349", itemCode: "40349", name: "VP小鱼香 VP FISH NGOH HIANG (S)", packingSize: "200g" },
  { barcode: "40343", itemCode: "40343", name: "VP香菇丸 MUSHROOM BALL", packingSize: "120g" },
  { barcode: "70002", itemCode: "70002", name: "黄金豆香片 TASTY BITES SOY FISH PILLOW", packingSize: "150g" },
  { barcode: "40356", itemCode: "40356", name: "VP大饼 FISH CAKE L", packingSize: "185g" },
  { barcode: "40357", itemCode: "40357", name: "VP小西刀 SAI DOU FISH CAKE (S)", packingSize: "210g" },
  { barcode: "40358", itemCode: "40358", name: "VP正西刀小果 SAI DOU PILLOW FISH CAKE (S)", packingSize: "230g" },
  { barcode: "40359", itemCode: "40359", name: "VP炸鱼丸 FRIED FISH BALL", packingSize: "270g" },
  { barcode: "40339", itemCode: "40339", name: "VP切果片 VP SLICED FISH CAKE", packingSize: "200g" },
  { barcode: "40337", itemCode: "40337", name: "VP蟹味柳 VP KANIMI CHUNK", packingSize: "80g" },
  { barcode: "40338", itemCode: "40338", name: "VP墨鱼丸 VP CUTTLEFISH BALL", packingSize: "190g" },
  { barcode: "40342", itemCode: "40342", name: "VP皇帝蟹丸 VP KING CRAB BALL", packingSize: "190g" }
];

function initScanner() {
  const barcodeInput = document.getElementById('barcodeInput');
  const stockCheckBy = document.getElementById('stockCheckBy');
  const productTable = document.getElementById('productTable');

  // Populate the table with product data
  const tbody = productTable.getElementsByTagName('tbody')[0];
  productList.forEach(product => {
    const row = tbody.insertRow();
    row.innerHTML = `
      <td>${product.name}</td>
      <td>${product.packingSize}</td>
      <td><input type="number" min="0" data-barcode="${product.barcode}"></td>
    `;
  });

  // Add focus event listeners to all quantity inputs
  const quantityInputs = document.querySelectorAll('input[type="number"]');
  quantityInputs.forEach(input => {
    input.addEventListener('focus', function() {
      setTimeout(() => {
        barcodeInput.focus();
        console.log('Auto-returned focus to barcode input');
      }, 3000);
    });
  });

  function handleBarcodeScan(barcode) {
    console.log('Scanned barcode:', barcode);
    const product = productList.find(p => p.barcode === barcode);
    if (product) {
      console.log('Found product:', product);
      const quantityInput = document.querySelector(`input[data-barcode="${barcode}"]`);
      if (quantityInput) {
        quantityInput.focus();
        quantityInput.select();
        console.log('Focused on quantity input');
      }
    } else {
      showToast('Product not found');
      barcodeInput.focus();
    }
    barcodeInput.value = ''; // Clear the input for the next scan
  }

  // Listen for the 'input' event on the barcode input field
  barcodeInput.addEventListener('input', function() {
    const barcode = this.value.trim();
    if (barcode) {
      handleBarcodeScan(barcode);
    }
  });

  // Prevent the dropdown from interfering with scanning
  stockCheckBy.addEventListener('focus', function() {
    barcodeInput.blur(); // Remove focus from barcode input when dropdown is focused
  });

  stockCheckBy.addEventListener('blur', function() {
    // Small delay to allow for dropdown selection before refocusing
    setTimeout(() => barcodeInput.focus(), 100);
  });

  // Add click event listener to the table to refocus on barcode input
  productTable.addEventListener('click', function(event) {
    if (event.target.tagName !== 'INPUT') {
      barcodeInput.focus();
    }
  });

  // Ensure barcode input is focused when the page loads
  barcodeInput.focus();
}

function submitQuantities(sheetName) {
  const quantities = [];
  const inputs = document.querySelectorAll('input[type="number"]');
  const currentDate = formatDate(new Date());
  const currentTime = formatTime(new Date());
  const stockCheckBy = document.getElementById('stockCheckBy').value;
  
  if (!stockCheckBy) {
    showToast('Please select who is performing the stock check');
    return;
  }
  
  inputs.forEach(input => {
    const barcode = input.getAttribute('data-barcode');
    const quantity = input.value.trim();
    if (quantity !== '') {
      const product = productList.find(p => p.barcode === barcode);
      if (product) {
        quantities.push({
          Date: currentDate,
          Time: currentTime,
          ItemCode: product.itemCode,
          Product: product.name,
          PackingSize: product.packingSize,
          Quantity: parseInt(quantity, 10),
          StockCheckBy: stockCheckBy
        });
      }
    }
  });
  
  if (quantities.length > 0) {
    showLoadingOverlay();
    sendToGoogleScript(quantities, sheetName);
  } else {
    showToast('No quantities entered');
  }
}

function refreshApp() {
  const barcodeInput = document.getElementById('barcodeInput');
  barcodeInput.value = '';
  const inputs = document.querySelectorAll('input[type="number"]');
  inputs.forEach(input => {
    input.value = '';
  });
  document.getElementById('stockCheckBy').value = ''; // Reset the dropdown
  console.log('App refreshed');
  barcodeInput.focus(); // Refocus on the barcode input after refresh
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

function sendToGoogleScript(data, sheetName) {
  const url = 'https://script.google.com/macros/s/AKfycbxtkp0U6W1YL9ixCfFERGAkgVNnhatwhGoBkLSWBfg0BhtvFlru6tz2Lc8IpZTIQHLPzA/exec';
  
  const payload = {
    data: data,
    sheetName: sheetName
  };

  fetch(url, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload)
  })
  .then(() => {
    hideLoadingOverlay();
    showToast('成功保存 Data submitted successfully!');
    refreshApp();
  })
  .catch(error => {
    console.error('Error:', error);
    hideLoadingOverlay();
    showToast('保存失误 Error submitting data. Please try again.');
  });
}

// Update the date and time every second
setInterval(updateDateTimeDisplay, 1000);

window.addEventListener('load', () => {
  initScanner();
  updateDateTimeDisplay();
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/barcode-scanner-pwa/service-worker.js').then(reg => {
    reg.update();
  });
}

function checkForUpdates() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistration().then(reg => {
      if (reg) reg.update();
    });
  }
}

document.addEventListener('visibilitychange', () => {
  if (!document.hidden) {
    checkForUpdates();
  }
});
