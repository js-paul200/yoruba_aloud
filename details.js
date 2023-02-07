// FUNCTION TO CREATE SUBCATEGORY
function subCategory(event) {
  event.preventDefault();
  const theId = localStorage.getItem("upId");

  const subcatToken = localStorage.getItem("adminlogin");
  const thecatToken = JSON.parse(subcatToken);
  const catsubToken = thecatToken.token;

  const subcatname = document.getElementById("subcategoryname").value;
  const subcatImage = document.getElementById("subcategoryimg").files[0];

  if (subcatname === "" || subcatImage === "") {
    Swal.fire({
      icon: "info",
      text: "All fields are required!",
      confirmButtonColor: "#2D85DE",
    });
  } else {
    const spinRoll = document.querySelector(".rol-spin");
    spinRoll.style.display = "inline-block";

    const subcatHeaders = new Headers();
    subcatHeaders.append("Authorization", `Bearer ${catsubToken}`);

    const formData = new FormData();
    formData.append("name", subcatname);
    formData.append("image", subcatImage);
    formData.append("category_id", theId);

    const dashReq = {
      method: "POST",
      headers: subcatHeaders,
      body: formData,
    };
    const url =
      "https://pluralcodesandbox.com/yorubalearning/api/admin/create_subcategory";
    fetch(url, dashReq)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);

        if (result.status === "success") {
          Swal.fire({
            icon: "success",
            text: "Subcategory Created Successfully",
            confirmButtonColor: "#2D85DE",
          });
          setTimeout(() => {
            location.reload();
          }, 3000);
        } else {
          Swal.fire({
            icon: "info",
            text: "Unsuccessful!",
            confirmButtonColor: "#2D85DE",
          });
        }
      })
      .catch((error) => console.log("error", error));
  }
}
// XXXFUNCTION TO CREATE SUBCATEGORY

// function to get subcategory list
function getSublist() {
  const params = new URLSearchParams(window.location.search);
  let getId = params.get("id");

  const getSublist = document.querySelector(".subCatList");
  const getlistitems = localStorage.getItem("adminlogin");
  const tokens = JSON.parse(getlistitems);
  const getlist = tokens.token;

  const subcatHeaders = new Headers();
  subcatHeaders.append("Authorization", `Bearer ${getlist}`);

  const dashReq = {
    method: "GET",
    headers: subcatHeaders,
  };

  let data = [];

  const url = `http://pluralcodesandbox.com/yorubalearning/api/admin/category_details/${getId}`;

  fetch(url, dashReq)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      result.map((item) => {
        data += `
          <div class="col-sm-12 col-md-12 col-lg-6">
              <div class="search-card2">
              <a href="details.html?id=${item.id}&name=${item.name}"><img src=${item.image} alt="image" /></a>
              <p>${item.name}</p>
              <div class="text-right">
                  <button class="update-button2" onclick="updatesubcat(${item.id})">Update</button>
              </div>
              </div>
          </div>    
          `;
        getSublist.innerHTML = data;
        console.log(data);
      });
    })
    .catch((error) => console.log("error", error));
}
getSublist();

// function to update a subcategory
function UpdateSubCategory(event) {
  event.preventDefault();

  const catsubname = document.getElementById("updatesubcatname").value;
  const catsubimage = document.getElementById("updatesubcatimage").files[0];

  const theId = localStorage.getItem("id");

  if (catsubname === "") {
    Swal.fire({
      icon: "info",
      text: "All fields are required",
      confirmButtonColor: "#2D85DE",
    });
  } else {
    const sroll = document.querySelector(".subroll");
    sroll.style.display = "inline-block";
  }

  const subcatToken = localStorage.getItem("adminlogin");
  const subToken = JSON.parse(subcatToken);
  const updatesubToken = subToken.token;

  const updatesubcatHeader = new Headers();
  updatesubcatHeader.append("Authorization", `Bearer ${updatesubToken}`);

  const updatesubData = new FormData();
  updatesubData.append("name", catsubname);
  updatesubData.append("image", catsubimage);
  updatesubData.append("subcategory_id", theId);

  const dashReq = {
    method: "POST",
    headers: updatesubcatHeader,
    body: updatesubData,
  };
  const url =
    "https://pluralcodesandbox.com/yorubalearning/api/admin/update_subcategory";

  fetch(url, dashReq)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      if (result.status === "success") {
        Swal.fire({
          icon: "success",
          text: "Subcategory Updated Successfully",
          confirmButtonColor: "#2D85DE",
        });
        setTimeout(() => {
          location.reload();
        }, 3000);
      } else {
        Swal.fire({
          icon: "info",
          text: "Update Unsuccessful!",
          confirmButtonColor: "#2D85DE",
        });
      }
    })
    .catch((error) => console.log("error", error));
}

// function to display subcategory form(popup-modal)
function updatesubcat(newId) {
  localStorage.setItem("id", newId);
  const subcatform = document.querySelector(".updatesubcatform");
  subcatform.style.display = "block";

  const dToken = localStorage.getItem("adminlogin");
  const mysubtoken = JSON.parse(dToken);
  const theToken = mysubtoken.token;

  let fifth = localStorage.getItem("id");

  const subheaderItem = new Headers();
  subheaderItem.append("Authorization", `Bearer ${theToken}`);

  const dashReq = {
    method: "GET",
    headers: subheaderItem,
  };
  const url = `https://pluralcodesandbox.com/yorubalearning/api/admin/update_subcategory=${fifth}`;

  fetch(url, dashReq)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
    })
    .catch((error) => console.log("error", error));
}

// function to close subcategory form modal
function cutmodal() {
  const cut = document.querySelector(".updatesubcatform");
  cut.style.display = "none";
}
// function to close subcategory form modal outside
window.onclick = function outsideClick(e) {
  const form = document.querySelector(".updatesubcatform");
  if (e.target == form) {
    form.style.display = "none";
  }
};

// function to update admin-profile
function updateprofile(event) {
  event.preventDefault();
  const profname = document.getElementById("updatename").value;
  const profemail = document.getElementById("updatename").value;

  if (profname === "" || profemail === "") {
    Swal.fire({
      icon: "info",
      text: "All fields are required!",
      confirmButtonColor: "#2D85DE",
    });
  } else {
    const profspin = document.querySelector(".adspin");
    profspin.style.display = "inline-block";

    const first = localStorage.getItem("adminlogin");
    const second = JSON.parse(first);
    const third = second.token;

    const profheader = new Headers();
    profheader.append("Authorization", `Bearer ${third}`);

    const profiledata = new FormData();
    profiledata.append("name", profname);
    profiledata.append("email", profemail);

    const dashReq = {
      method: "POST",
      headers: profheader,
      body: profiledata,
    };
    const url =
      "https://pluralcodesandbox.com/yorubalearning/api/admin/admin_update_profile";
    fetch(url, dashReq)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status === "success") {
          Swal.fire({
            icon: "success",
            text: `${result.message}`,
            confirmButtonColor: "#2D85DE",
          });
        }

        setTimeout(() => {
          window.location.href = "index.html";
        }, 4000);
      })
      .catch((error) => console.log("error", error));
  }
}

// function to update password
function updatepassword(event) {
  event.preventDefault();

  const updateemail = document.getElementById("updateemailladd").value;
  const newpass = document.getElementById("updatePassadd").value;
  const confirm = document.getElementById("confirmPass").value;

  if (updateemail === "" || newpass === "" || confirm === "") {
    Swal.fire({
      icon: "info",
      text: "All fields are required!",
      confirmButtonColor: "#2D85DE",
    });
  }

  if (confirm !== newpass) {
    Swal.fire({
      icon: "warning",
      text: "Passwords does not match!",
      confirmButtonColor: "#2D85DE",
    });
  } else {
    const fanspin = document.querySelector(".spinpass");
    fanspin.style.display = "inline-block";

    const plot1 = localStorage.getItem("adminlogin");
    const plot2 = JSON.parse(plot1);
    const plot3 = plot2.token;

    const passhead = new Headers();
    passhead.append("Authorization", `Bearer ${plot3}`);

    const passitem = new FormData();
    passitem.append("email", updateemail);
    passitem.append("password", newpass);
    passitem.append("password_confirmation", confirm);

    const dashReq = {
      method: "POST",
      headers: passhead,
      body: passitem,
    };
    const url =
      "https://pluralcodesandbox.com/yorubalearning/api/admin/admin_update_password";

    fetch(url, dashReq)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status === "success") {
          Swal.fire({
            icon: "success",
            text: `${result.message}`,
            confirmButtonColor: "#2D85DE",
          });
        }
        setTimeout(() => {
          window.location.href = "index.html";
        }, 3000);
      })
      .catch((error) => console.log("error", error));
  }
}
// function to display learning material modal
function displaylearnmodal() {
  const learnform = document.querySelector(".learningmodal");
  learnform.style.display = "block";
}
// function to close learning material modal
function closemode() {
  const close = document.querySelector(".learningmodal");
  close.style.display = "none";
}
