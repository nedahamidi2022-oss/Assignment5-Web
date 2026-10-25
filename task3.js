const form = document.getElementById("ticket-form");
form.noValidate = true;

const soldOutDates = ["2026-12-31", "2027-01-01"];
const validPromoCodes = { SAVE10: 10, SAVE20: 20 };

const eventInput = document.getElementById("event");
const dateInput = document.getElementById("date");
const quantityInput = document.getElementById("quantity");
const emailInput = document.getElementById("email");
const promoInput = document.getElementById("promo");

const previewEvent = document.getElementById("preview-event");
const previewDate = document.getElementById("preview-date");
const previewQty = document.getElementById("preview-qty");
const previewTotal = document.getElementById("preview-total");
const errorSummary = document.getElementById("error-summary");

function validateField(field) {
  const errorElement = document.getElementById(`${field.id}-error`);
  let isValid = true;
  let message = "";

  if (field.validity.valueMissing) {
    isValid = false;
    message = "This field is required.";
  } else if (field.id === "date" && soldOutDates.includes(field.value)) {
    isValid = false;
    message = "This date is sold out.";
  } else if (field.id === "quantity" && (field.value < 1 || field.value > 5)) {
    isValid = false;
    message = "Quantity must be between 1 and 5.";
  } else if (field.id === "promo" && field.value !== "" && !validPromoCodes[field.value]) {
    isValid = false;
    message = "Invalid promo code.";
  }

  if (!isValid) {
    field.setAttribute("aria-invalid", "true");
    errorElement.textContent = message;
  } else {
    field.setAttribute("aria-invalid", "false");
    errorElement.textContent = "";
  }

  return isValid;
}

form.addEventListener("input", e => {
  if (e.target.tagName === "INPUT" || e.target.tagName === "SELECT") {
    validateField(e.target);
    updatePreview();
  }
});

form.addEventListener("blur", e => {
  if (e.target.tagName === "INPUT" || e.target.tagName === "SELECT") {
    validateField(e.target);
  }
}, true);

function updatePreview() {
  previewEvent.textContent = eventInput.value;
  previewDate.textContent = dateInput.value;
  previewQty.textContent = quantityInput.value;

  let basePrice = 50 * (Number(quantityInput.value) || 0);
  let discount = validPromoCodes[promoInput.value.trim()] || 0;
  let finalPrice = basePrice - (basePrice * discount) / 100;
  previewTotal.textContent = finalPrice;
}

form.addEventListener("submit", e => {
  e.preventDefault();
  let firstInvalidField = null;
  let errorCount = 0;

  const fields = form.querySelectorAll("input, select");
  fields.forEach(field => {
    if (!validateField(field)) {
      errorCount++;
      if (!firstInvalidField) {
        firstInvalidField = field;
      }
    }
  });

  if (errorCount > 0) {
    errorSummary.textContent = `Total errors: ${errorCount}. Please fix them before submitting.`;
    firstInvalidField.focus();
  } else {
    errorSummary.textContent = "";
    const bookingCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    alert(`Success! Your booking code is: ${bookingCode}`);
    form.reset();
    updatePreview();
  }
});