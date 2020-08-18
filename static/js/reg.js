// For registration purpose
const regform = document.querySelector(".ks-reg-form");
const regusername = document.querySelector(".rusername");
const regemail = document.querySelector(".remail");
const regpassword = document.querySelector(".rpassword");
const regpassword2 = document.querySelector(".rpassword1");
const regname = document.querySelector(".rfullname");
const regsubmit = document.querySelector(".ks-reg-form input[type=submit]");
const subparent = regsubmit.parentElement;
var flaguser = 0;
var flagname = 0;
var flagemail = 0;
var flagpassword = 0;
var flagpassword2 = 0;

document.addEventListener("keyup", () => {
  if (flagemail && flagname && flagpassword && flagpassword2 && flaguser) {
    regsubmit.disabled = false;
    subparent.classList.remove("submit-ks-disabled");
  } else {
    regsubmit.disabled = true;
    subparent.classList.add("submit-ks-disabled");
  }
});

regform.addEventListener("submit", () => {
  formflag = 0;
});
regname.addEventListener("keyup", () => {
  const nameValue = regname.value.trim();
  if (nameValue.length >= 6) {
    flagname = 1;
    setSuccessFor(regname);
  } else {
    flagname = 0;
    setErrorFor(regname, "* Name should be atleast of length 6");
  }
});
regusername.addEventListener("keyup", () => {
  checkUser();
});

regemail.addEventListener("keyup", () => {
  const emailValue = regemail.value.trim();
  if (!isEmail(emailValue)) {
    flagemail = 0;
    setErrorFor(regemail, " * Incorrect email ");
  } else {
    flagemail = 1;
    setSuccessFor(regemail);
  }
});

regpassword.addEventListener("keyup", () => {
  const passwordValue = regpassword.value.trim();
  if (!ispassword(passwordValue)) {
    flagpassword = 0;
    setErrorFor(
      regpassword,
      "* Password should contain atleast one capital letter,digit,small letter and no spaces with atleast 8 characters"
    );
  } else {
    flagpassword = 1;
    setSuccessFor(regpassword);
  }
});

regpassword2.addEventListener("keyup", () => {
  const password2Value = regpassword2.value.trim();
  const passwordValue = regpassword.value.trim();
  if (passwordValue !== password2Value) {
    flagpassword2 = 0;
    setErrorFor(regpassword2, "* Passwords does not match");
  } else {
    flagpassword2 = 1;
    setSuccessFor(regpassword2);
  }
});
function checkUserdata() {
  //   console.log($("input[name=csrfmiddlewaretoken]").val());
  $.ajax({
    type: "POST",
    url: "/accounts/checkUser/",
    data: {
      user: regusername.value,
      csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").prop("value"),
    },
    dataType: "json",
    success: function (data) {
      if (data.is_success) {
        flaguser = 1;
        setSuccessFor(regusername);
      } else {
        flaguser = 0;
        setErrorFor(regusername, "*Username is unavailable");
      }
    },
  });
}
function checkUser() {
  setSuccessFor(regusername);
  if (isUsername(regusername.value)) {
    checkUserdata();
    // flaguser = 1;
    // setSuccessFor(regusername);
  } else {
    flaguser = 0;
    setErrorFor(
      regusername,
      "* username should contain atleast one Capital letter,alpha numeric,special character with no spaces and atleast 8 character length"
    );
  }
}
function setErrorFor(input, message) {
  const division = input.parentElement;
  const errorElement = division.nextElementSibling;
  const icon = input.nextElementSibling.children[0];
  errorElement.innerText = message;
  division.className = "ks-reg-input ks-reg-form-error";
  icon.classList.add("fa-error");
  icon.classList.remove("fa-success");
}

function setSuccessFor(input) {
  const division = input.parentElement;
  const errorElement = division.nextElementSibling;
  const icon = input.nextElementSibling.children[0];
  errorElement.innerText = "";
  division.className = "ks-reg-input ks-reg-form-success";
  icon.classList.add("fa-success");
  icon.classList.remove("fa-error");
}

function isEmail(email) {
  re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
function isUsername(username) {
  re = /^((?=.*\d)(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,})$/;
  return re.test(username);
}
function ispassword(password) {
  re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{8,}$/;
  return re.test(password);
}

// end of registration
