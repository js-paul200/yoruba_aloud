// FUNCTIONS FOR SIGNUP
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
    } else if (getPassword.lenght > 6) {
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
  
      const url =
        "https://pluralcodesandbox.com/yorubalearning/api/register_admin";
  
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
              window.location.href = "index.html";
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
  // X FUNCTIONS FOR SIGNUP