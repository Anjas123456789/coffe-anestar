document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      { id: 1, name: "Espresso", img: "1.jpg", price: 20000 },
      { id: 2, name: "Cappuccino", img: "2.jpeg", price: 25000 },
      { id: 3, name: "Ice Coffee", img: "3.jpg", price: 30000 },
      { id: 4, name: "Galao", img: "4.jpeg", price: 35000 },
      { id: 5, name: "Latte", img: "5.jpeg", price: 30000 },
      { id: 6, name: "Mochalatte", img: "6.jpeg", price: 35000 },
    ],
  }));

  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      const cartItem = this.items.find((item) => item.id === newItem.id);
      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        this.items = this.items.map((item) => {
          if (item.id !== newItem.id) {
            return item;
          } else {
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;
          }
        });
      }
    },
    remove(id) {
      const cartItem = this.items.find((item) => item.id === id);
      if (cartItem.quantity > 1) {
        this.items = this.items.map((item) => {
          if (item.id !== id) {
            return item;
          } else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        });
      } else if (cartItem.quantity === 1) {
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    },
  });
});

// Form validation
const checkoutButton = document.querySelector(".checkout-button");
checkoutButton.disabled = true;

const form = document.querySelector("#checkoutForm");
form.addEventListener("keyup", function () {
  let isFormFilled = true;
  for (let i = 0; i < form.elements.length; i++) {
    if (form.elements[i].value.length === 0) {
      isFormFilled = false;
      break;
    }
  }
  checkoutButton.disabled = !isFormFilled;
  checkoutButton.classList.toggle("disabled", !isFormFilled);
});

// Kirim data ketika tombol checkout diklik
checkoutButton.addEventListener("click", function (e) {
  e.preventDefault();

  const cartData = Alpine.store("cart").items.map((item) => ({
    id: item.id,
    name: item.name,
    quantity: item.quantity,
    total: item.total,
  }));

  const customerData = {
    name: form.elements["name"].value,
    email: form.elements["email"].value,
    phone: form.elements["phone"].value,
    items: JSON.stringify(cartData),
    total: Alpine.store("cart").total,
  };

  // Simpan data di localStorage untuk checkout.html
  localStorage.setItem("checkoutData", JSON.stringify(customerData));
  window.location.href = "checkout.html"; // Redirect ke checkout.html
});

// Fungsi format pesan WhatsApp
const formatMessage = (obj) => {
  return `Data Customer
    Nama: ${obj.name}
    Email: ${obj.email}
    No HP: ${obj.phone}
Data pesanan
    ${JSON.parse(obj.items)
      .map(
        (item) => `${item.name} (${item.quantity} x ${rupiah(item.total)}) \n`
      )
      .join("")}
TOTAL: ${rupiah(obj.total)}
Terima Kasih`;
};

// Konversi rupiah
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};
