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
