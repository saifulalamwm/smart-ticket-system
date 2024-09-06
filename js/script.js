let selectedSeats = [];
let totalAmount = 0;
let grandTotal = 0;

// Function to generate seating layout
function generateSeats() {
  const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"];
  const columns = ["1", "2", "3", "4"];
  const seatsDiv = document.getElementById("seats");

  rows.forEach((row) => {
    columns.forEach((column) => {
      const seat = document.createElement("div");
      seat.className = "seat";
      seat.textContent = row + column;
      seat.onclick = () => toggleSeat(seat);
      seatsDiv.appendChild(seat);
    });
  });
}

// Function to toggle seat selection
function toggleSeat(seat) {
  if (selectedSeats.includes(seat.textContent)) {
    selectedSeats = selectedSeats.filter((s) => s !== seat.textContent);
    seat.classList.remove("selected");
  } else {
    if (selectedSeats.length < 4) {
      selectedSeats.push(seat.textContent);
      seat.classList.add("selected");
    } else {
      alert("You cannot book more than 4 seats");
      return;
    }
  }

  updateBilling();
  updateAvailableSeats();
  updateSelectTotSeats();
  updateCouponButton();
}

// Function to update billing section
function updateBilling() {
  const billingBody = document.getElementById("billing-body");
  billingBody.innerHTML = "";
  totalAmount = selectedSeats.length * 500;
  grandTotal = totalAmount;
  selectedSeats.forEach((seat) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${seat}</td><td>Economy</td><td>500 tk</td>`;
    billingBody.appendChild(row);
  });
  document.getElementById("total").textContent = `: ${totalAmount} tk`;
  document.getElementById("final-total").textContent = grandTotal;
}

// Function to update selected seats count
function updateSelectTotSeats() {
  document.getElementById("selectTotSeats").textContent = selectedSeats.length;
}

// Function to update available seats count
function updateAvailableSeats() {
  document.getElementById("available-seats").textContent =
    40 - selectedSeats.length;
}

// Function to update the state of the "Apply Coupon" button
function updateCouponButton() {
  const applyCouponButton = document.getElementById("apply-coupon");
  if (selectedSeats.length === 4) {
    applyCouponButton.disabled = false;
  } else {
    applyCouponButton.disabled = true;
  }
}

// Function apply coupon
function applyCoupon() {
  const couponCode = document.getElementById("coupon-code").value;
  let discount = 0;
  if (couponCode === "New15") {
    discount = totalAmount * 0.15;
  } else if (couponCode === "New20") {
    discount = totalAmount * 0.2;
  }
  grandTotal = totalAmount - discount;
  document.getElementById("final-total").textContent = grandTotal;
}

// confirm booking
function confirmBooking() {
  const form = document.getElementById("customer-form-fields");
  const formData = new FormData(form);
  const name = formData.get("name");
  const phone = formData.get("phone");
  const email = formData.get("email");

  // grandTotal is up-to-date
  if (grandTotal === 0) {
    grandTotal = totalAmount;
  }

  const confirmationMessage = `
    Booking Confirmed!
    Passenger Name: ${name}
    Phone Number: ${phone}
    Email: ${email}
    Total Seats: ${selectedSeats.length}
    Total Amount: ${grandTotal} tk
    Have a nice day!
  `;

  alert(confirmationMessage);
  document.getElementById("confirmation-message").innerHTML =
    confirmationMessage;
  modal.style.display = "block";
}

window.onload = () => {
  generateSeats();
  updateCouponButton();
};
