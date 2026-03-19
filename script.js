window.dataLayer = window.dataLayer || [];

const productData = {
  item_id: "mh001",
  item_name: "Motorhome Aurora",
  item_category: "Motorhome",
  price: 650,
  quantity: 1,
  owner_id: "prop001",
  owner_name: "Carlos Mendes",
  location: "Curitiba",
  capacity: 4
};

function pushToDataLayer(payload) {
  window.dataLayer.push(payload);
  console.log("dataLayer push:", payload);
}

function pushPageInfo() {
  const pagePath = window.location.pathname;
  const pageTitle = document.title;

  pushToDataLayer({
    event: "page_info",
    page_title: pageTitle,
    page_path: pagePath
  });
}

function pushViewItem() {
  pushToDataLayer({
    event: "view_item",
    ecommerce: {
      currency: "BRL",
      value: productData.price,
      items: [productData]
    }
  });
}

function pushAddToCart() {
  pushToDataLayer({
    event: "add_to_cart",
    ecommerce: {
      currency: "BRL",
      value: productData.price,
      items: [productData]
    }
  });
}

function pushBeginCheckout() {
  pushToDataLayer({
    event: "begin_checkout",
    ecommerce: {
      currency: "BRL",
      value: productData.price,
      items: [productData]
    }
  });
}

function generateTransactionId() {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const random = Math.floor(Math.random() * 10000);
  return `T${yyyy}${mm}${dd}-${random}`;
}

function pushPurchase() {
  pushToDataLayer({
    event: "purchase",
    ecommerce: {
      transaction_id: generateTransactionId(),
      currency: "BRL",
      value: productData.price,
      items: [productData]
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  pushPageInfo();

  const currentPage = document.body.dataset.page;

  if (currentPage === "veiculo") {
    pushViewItem();

    const addToCartBtn = document.getElementById("addToCartBtn");
    const beginCheckoutBtn = document.getElementById("beginCheckoutBtn");

    if (addToCartBtn) {
      addToCartBtn.addEventListener("click", function () {
        pushAddToCart();
        alert("Evento add_to_cart disparado. Veja no console e no Preview do GTM.");
      });
    }

    if (beginCheckoutBtn) {
      beginCheckoutBtn.addEventListener("click", function () {
        pushBeginCheckout();
      });
    }
  }

  if (currentPage === "checkout") {
    const purchaseBtn = document.getElementById("purchaseBtn");
    const purchaseMessage = document.getElementById("purchaseMessage");

    if (purchaseBtn) {
      purchaseBtn.addEventListener("click", function () {
        pushPurchase();

        if (purchaseMessage) {
          purchaseMessage.classList.remove("hidden");
        }
      });
    }
  }
});