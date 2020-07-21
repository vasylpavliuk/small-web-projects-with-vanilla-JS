const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

// Function to show error message
function showError(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  formControl.className = "form-control error";
  small.innerText = message;
}

// Function to show success message
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

// Function to check required fields
function checkRequired(inputArr) {
  inputArr.map((input) => {
    if (input.value.trim() === "") {
      const message = `${getFieldName(input)} is required`;
      showError(input, message);
    } else {
      showSuccess(input);
    }
  });
}

// Function to check email
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim().toLowerCase())) {
    showSuccess(input);
  } else {
    const message = "Email is not valid";
    showError(input, message);
  }
}

function checkLength(input, min, max) {
  if (input.value.length < min && input.value.trim() !== "") {
    const message = `${getFieldName(input)} is not long enough`;
    showError(input, message);
  } else if (input.value.length > max) {
    const message = `${getFieldName(input)} is too long`;
    showError(input, message);
  }
  console.log("Hello world!");
}

//Function to check if both passwords match
function checkPasswordMatch(input1, input2) {
  if (input1.value.trim() !== "" && input1.value === input2.value) {
    showSuccess(input1);
    showSuccess(input2);
  } else if (input1.value.trim() !== "") {
    const message = "Passwords do not match";
    showError(input1, null);
    showError(input2, message);
  }
}

function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Add event listeners to the form
form.addEventListener("submit", function (event) {
  event.preventDefault();

  checkRequired([username, email, password, password2]);
  checkEmail(email);
  checkPasswordMatch(password, password2);
  checkLength(username, 3, 15);
  checkLength(password, 5, 25);
  checkLength(password2, 5, 25);
});
