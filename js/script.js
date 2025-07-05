document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const response = document.getElementById("form-response");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      response.style.color = "red";
      response.textContent = "Please fill in all fields.";
      return;
    }

    // Replace with your Google Apps Script Web App URL
    const scriptURL = "https://script.google.com/macros/s/AKfycbxkZc24RtQLPWV9OjRK4uIKFKI9TN8zq2gBL25weUX0Hs-BV5famENjN2UEr4IkaHxQ/exec";

    fetch(scriptURL, {
      method: 'POST',
      body: JSON.stringify({ name, email, message }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (res.ok) {
        response.style.color = "green";
        response.textContent = `Thank you, ${name}! Your message was sent.`;
        form.reset();
      } else {
        throw new Error("Network response was not OK.");
      }
    })
    .catch(error => {
      console.error("Error!", error.message);
      response.style.color = "red";
      response.textContent = "Something went wrong. Please try again later.";
    });

    setTimeout(() => {
      response.textContent = "";
    }, 5000);
  });
});
