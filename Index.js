// Function for toggle password viewer
const togglePassword = document.querySelector("#togglePassword");
const password = document.querySelector("#password");

togglePassword.addEventListener("click", function (e) {
  // toggle the type attribute
  const type =
    password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);
  // toggle the eye slash icon
  this.classList.toggle("fa-eye-slash");
});

//**********************************************//
//function for signing in
function signIn(event) {
  event.preventDefault();
  const getSpin = document.getElementById("spin");
  getSpin.style.display = "inline-block";

  const getEmail = document.getElementById("email").value;
  const getPassword = document.getElementById("password").value;

  if (getEmail === "" || getPassword === "") {
    Swal.fire({
      icon: "info",
      text: "All fields are required",
      confirmButtonColor: "#2d85de",
    });
    getSpin.style.display = "none";
  } else {
    const logData = new FormData();
    logData.append("email", getEmail);
    logData.append("password", getPassword);

    const logReg = {
      method: "POST",
      body: logData,
    };
    const url = "https://codesandbox.com.ng/yorubalearning/api/admin_login";

    fetch(url, logReg)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        localStorage.setItem("adminlogin", JSON.stringify(result));
        const myDetails = localStorage.getItem("adminlogin");
        const theDetails = JSON.parse(myDetails);
        if (theDetails.hasOwnProperty("email")) {
          window.location.href = "dashboard.html";
        } else {
          Swal.fire({
            icon: "info",
            text: "Unsuccessful",
            confirmButtonColor: "#2d85de",
          });
          getSpin.style.display = "none";
        }
      })
      .catch((error) => console.log("error", error));
  }
}
//**********************************************//
//**********************************************//
//function for signing up
function signUp(event) {
  event.preventDefault();
  // calling the spinner on the button
  const getSpin = document.getElementById("spin");
  getSpin.style.display = "inline-block";

  const getName = document.getElementById("name").value;
  const getEmail = document.getElementById("email").value;
  const getPassword = document.getElementById("password").value;
  const getConfirmPassword = document.getElementById("confirmPassword").value;

  if (
    getName === "" ||
    getEmail === "" ||
    getPassword === "" ||
    getConfirmPassword === ""
  ) {
    Swal.fire({
      icon: "warning",
      text: "All fields are required",
      confirmButtonColor: "#2d85de",
    });
    getSpin.style.display = "none";
  } else if (getConfirmPassword !== getPassword) {
    Swal.fire({
      icon: "warning",
      text: "Password is incorrect",
      confirmButtonColor: "#2d85de",
    });
  } else if (getpassword.length > 6) {
    Swal.fire({
      icon: "info",
      text: "Password should not be more than 6 characters",
      confirmButtonColor: "#2d85de",
    });
  } else {
    const regData = new FormData();
    regData.append("name", getName);
    regData.append("email", getEmail);
    regData.append("password", getPassword);
    regData.append("password_confirmation", getConfirmPassword);

    const regRequest = {
      method: "POST",
      body: regData,
    };

    const url = "https://codesandbox.com.ng/yorubalearning/api/register_admin";

    fetch(url, regRequest)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status === "success") {
          Swal.fire({
            icon: "success",
            text: `${result.message}`,
            confirmButtonColor: "#2d85de",
          });
          setTimeout(() => {
            window.location.href = "Index.html";
          }, 3000);
        } else {
          Swal.fire({
            icon: "info",
            text: "Unsuccessful",
            confirmButtonColor: "#2d85de",
          });
          getSpin.style.display = "none";
        }
      })
      .catch((error) => console.log("error", error));
  }
}
//**********************************************//
