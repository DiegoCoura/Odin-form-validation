const APP = {
  init() {
    APP.addListeners();
  },
  addListeners() {
    const form = document.mainForm;
    const firstName = document.getElementById("first_name");
    const lastName = document.getElementById("last_name");
    const email = document.getElementById("user_email");
    const cell = document.getElementById("cell");
    const password = document.getElementById("user_password");
    const confirmPassword = document.getElementById("confirm_password");

    cell.addEventListener("input", APP.testPhone);
    cell.addEventListener("change", APP.isPhoneCompleted);

    //after changing the whole value
    firstName.addEventListener("change", APP.testName);
    lastName.addEventListener("change", APP.testName);
    email.addEventListener("change", APP.testEmail);

    password.addEventListener("input", APP.testPassword);
    confirmPassword.addEventListener("input", APP.matchPasswords);

    //invalid trigger
    firstName.addEventListener("invalid", APP.fail);
    lastName.addEventListener("invalid", APP.fail);
    email.addEventListener("invalid", APP.fail);
    cell.addEventListener("invalid", APP.fail);
    password.addEventListener("invalid", APP.fail);
    confirmPassword.addEventListener("invalid", APP.fail);


    form.addEventListener("submit", APP.validate);
  },
  validate(e) {
    e.preventDefault();
    let form = e.target;       

    let isFormValid = form.checkValidity();
    if(isFormValid){
      form.submit();
    }

  },
  testName(e) {
    const name = e.target;
    name.setCustomValidity("");
    const nameValue = e.target.value;
    if (!APP.hasOnlyLetters(nameValue)) {
      name.setCustomValidity("Must contain only letters");
      name.checkValidity();
    } else if (nameValue === "") {
      name.setCustomValidity("Empty field");
      name.checkValidity();
    } else {
      APP.resetErrorMessage(name);
    }
  },
  testEmail(e) {
    let email = e.target;
    email.setCustomValidity(""); //clear old message
    //built-in test for error based on type, pattern, and other attrs
    let currently = email.checkValidity();
    if (currently) {
      const emReg = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi);
      if (emReg.test(email.value) === false) {
        email.setCustomValidity("NOT a valid email address");
        currently = email.checkValidity();
        // email.reportValidity(); //show the custom message, trigger the invalid event
      } else {
        APP.resetErrorMessage(email);
      }
    }
  },
  isPhoneCompleted(e) {
    let phone = e.target;

    let removeLetters = phone.value.replace(/\D/g, "").substring(0, 11);

    let phoneArray = removeLetters.split("");

    if (phoneArray.length < 11) {
      phone.setCustomValidity("uncompleted number");
      phone.checkValidity();
    }
  },
  testPhone(e) {
    let phone = e.target;

    phone.setCustomValidity("");

    let removeLetters = phone.value.replace(/\D/g, "").substring(0, 11);

    let phoneArray = removeLetters.split("");

    let formattedPhone = "";

    if (phoneArray.length > 0) {
      formattedPhone += `(${phoneArray.slice(0, 2).join("")})`;
    }

    if (phoneArray.length > 2) {
      formattedPhone += ` ${phoneArray.slice(2, 7).join("")}`;
    }

    if (phoneArray.length > 7) {
      formattedPhone += `-${phoneArray.slice(7, 11).join("")}`;
    }

    if (phoneArray.length === 11) {
      phone.setCustomValidity("");
      phone.checkValidity();
      APP.resetErrorMessage(phone);
    }

    phone.value = formattedPhone;
  },

  testPassword(e) {
    let passwordElement = e.target;
    let formattedPassword = passwordElement.value.replace(/\s/g, "");
    passwordElement.value = formattedPassword;
    if(formattedPassword.length === 0){
      passwordElement.setCustomValidity("Empty password field")
      passwordElement.checkValidity();
    } else if(formattedPassword.length < 8){
      passwordElement.setCustomValidity("Must be at least 8 characters")
      passwordElement.checkValidity();
    } else {
      passwordElement.setCustomValidity("")
      passwordElement.checkValidity();
      APP.resetErrorMessage(passwordElement)
    }
  },
  matchPasswords(e) {
    const currentPasswordValue = document.querySelector("#user_password").value;
    let confirmPasswordElement = e.target;
    let matchingPassword = e.target.value;
    
    if(matchingPassword === currentPasswordValue){
      confirmPasswordElement.setCustomValidity("")
      confirmPasswordElement.checkValidity();
      APP.resetErrorMessage(confirmPasswordElement)
    } else {
      confirmPasswordElement.setCustomValidity("Passwords don't match")
      confirmPasswordElement.checkValidity();
    }
  },
  fail(e) {
    let field = e.target;
    // the invalid event fired

    // standard display change for any element
    const span = field.parentElement.querySelector(".errMessage");

    switch (field.id) {
      case "first_name":
        span.innerText = field.value
          ? "Must contain only letters"
          : "Type your first name";
        break;

      case "last_name":
        span.innerText = field.value
          ? "Must contain only letters"
          : "Type your last name";
        break;

      case "user_email":
        span.innerText = field.value
          ? "Invalid email address"
          : "Type your email address";
        break;

      case "cell":
        span.innerText = field.value
          ? "Uncompleted phone number"
          : "Type your phone number";
        break;

      case "user_password":
        span.innerText = field.value
          ? "Must have at least 8 characters"
          : "Insert a password";
        break;

      case "confirm_password":
        span.innerText = field.value
          ? "Passwords don't match"
          : "Confirm your password";
        break;
    }
  },
  hasOnlyLetters(str) {
    return /^[a-zA-Z]+$/.test(str);
  },
  resetErrorMessage(element) {
    const span = element.parentElement.querySelector(".errMessage");
    span.innerText = "";
  },
};

document.addEventListener("DOMContentLoaded", APP.init);
