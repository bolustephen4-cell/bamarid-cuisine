document.getElementById("contactForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  if (name === "" || email === "" || message === "") {
    alert("Please fill in all fields before sending.");
    return;
  }

  alert("Thanks " + name + "! We'll get back to you soon.");
});
document.getElementById("reviewForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const reviewerName = document.getElementById("reviewerName").value;
  const reviewText = document.getElementById("reviewText").value;

  if (reviewerName === "" || reviewText === "") {
    alert("Please fill in your name and review.");
    return;
  }

  const newReview = document.createElement("div");
  newReview.className = "review";
  newReview.innerHTML = "<p>\"" + reviewText + "\" - " + reviewerName + "</p>";

  document.getElementById("reviewForm").before(newReview);
saveReview(reviewerName, reviewText);

document.getElementById("reviewerName").value = "";
document.getElementById("reviewText").value = "";
});function saveReview(name, text) {
  let reviews = JSON.parse(localStorage.getItem("bamaridReviews")) || [];
  reviews.push({ name: name, text: text });
  localStorage.setItem("bamaridReviews", JSON.stringify(reviews));
}

function loadReviews() {
  let reviews = JSON.parse(localStorage.getItem("bamaridReviews")) || [];
  reviews.forEach(function(review) {
    const newReview = document.createElement("div");
    newReview.className = "review";
    newReview.innerHTML = "<p>\"" + review.text + "\" - " + review.name + "</p>";
    document.getElementById("reviewForm").before(newReview);
  });
}

loadReviews();
document.getElementById("placeOrderBtn").addEventListener("click", function() {
  const prices = {
    rice: 3000,
    beans: 2500,
    garri: 1500,
    palmoil: 4000,
    smokedfish: 5000,
    goatmeat: 6000,
    vegetables: 2000
  };

  let total = 0;
  let orderSummary = "";

  for (const item in prices) {
    const qty = parseInt(document.getElementById("qty-" + item).value) || 0;
    if (qty > 0) {
      const itemTotal = qty * prices[item];
      total += itemTotal;
      orderSummary += item + ": " + qty + " x ₦" + prices[item] + " = ₦" + itemTotal + "\n";
    }
  }

  if (total === 0) {
    alert("Please select at least one item to order.");
    return;
  }

  const whatsappMessage = "Hello BAMARID CUISINE, I'd like to place an order:%0A" + encodeURIComponent(orderSummary) + "%0ATotal: ₦" + total;
const whatsappNumber = "2348139106112";
window.open("https://wa.me/" + whatsappNumber + "?text=" + whatsappMessage, "_blank");
});
