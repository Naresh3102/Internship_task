const form = document.querySelector("form");
const emailField = form.querySelector(".email-field");
const emailInput = emailField.querySelector(".email");
const nameField = form.querySelector(".name-field");
const nameInput = nameField.querySelector(".name");

// Email Validation
function checkEmail() {
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!emailInput.value.match(emailPattern)) {
    emailField.classList.add("invalid");
    console.log("Please enter a valid email");
    return;
  }
  emailField.classList.remove("invalid");
}

// Name validation
function checkName() {
  if (!nameInput.value) {
    nameField.classList.add("invalid");
    console.log("Please enter a valid name");
    return;
  }
  nameField.classList.remove("invalid");
}

// Calling Function on Form Submit
form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkEmail();
  checkName();
});
