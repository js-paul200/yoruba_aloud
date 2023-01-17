// FUNCTIONS TO GET CATEGORIES
function createCategory(event) {
  event.preventDefault();
  const getSpin = document.querySelector(".spin");
  getSpin.style.display = "inline-block";

  const categoryName = document.getElementById("cat_name").value;
  const getImage = document.getElementById("cat_img").files[0];

  if (categoryName === "" || getImage === "") {
    Swal.fire({
      icon: "info",
      text: "All fields are required",
      confirmButtonColor: "#2D85DE",
    });
    getSpin.style.display = "none";
  } else {
    const getToken = localStorage.getItem("adminlogin");
    const token = JSON.parse(getToken);
    const theToken = token.token;

    const catHeader = new Headers();
    catHeader.append("Authorization", `Bearer ${theToken}`);

    const formdata = new FormData();
    formdata.append("name", categoryName);
    formdata.append("image", getImage);

    const dashReq = {
      method: "POST",
      headers: catHeader,
      body: formdata,
    };

    const url =
      "https://pluralcodesandbox.com/yorubalearning/api/admin/create_category";
    fetch(url, dashReq)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status === "success") {
          Swal.fire({
            icon: "success",
            text: "created successfully",
            confirmButtonColor: "#2D85DE",
          });
          setTimeout(() => {
            location.reload();
          }, 3000);
        } else {
          Swal.fire({
            icon: "info",
            text: "Unsuccessful",
            confirmButtonColor: "#2D85DE",
          });
          getSpin.style.display = "none";
        }
      })
      .catch((error) => console.log("error", error));
  }
}

// FUNCTION FOR CATEGORY LIST
function getCatList() {
  const getScrollItem = document.querySelector(".category_done");
  const getToken = localStorage.getItem("adminlogin");
  const token = JSON.parse(getToken);
  const myToken = token.token;

  const listHeaders = new Headers();
  listHeaders.append("Authorization", `Bearer ${myToken}`);

  const listOptions = {
    method: "GET",
    headers: listHeaders,
  };

  let data = [];

  const url =
    "https://pluralcodesandbox.com/yorubalearning/api/admin/category_list";

  fetch(url, listOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      result?.map((item) => {
        data += `
            <div class="search-card">
              <a href="details.html?id=${item.id}&name=${item.name}"><img src=${item.image} alt="image" /></a>
              <div class="button">
              <p>${item.name}</p>
              <div class="text-right">
                <button class="update-button" onclick="upmodal(${item.id})">Update</button>
                <button class="delete-button" onclick="deleteCategory(${item.id})">Delete</button>
              </div>
              </div>
            </div>
            `;
        getScrollItem.innerHTML = data;
      });
    })
    .catch((error) => console.log("error", error));
}

getCatList();
// X FUNCTIONS TO GET CATEGORIES

// FUNCTION FOR UPDATE CATEGORY
function upmodal(updateId) {
  localStorage.setItem("upId", updateId);
  const upform = document.querySelector(".updateform");
  upform.style.display = "block";

  const getToken = localStorage.getItem("adminlogin");
  const token = JSON.parse(getToken);
  const theToken = token.token;

  let third = localStorage.getItem("upId");

  const headerItem = new Headers();
  headerItem.append("Authorization", `Bearer ${theToken}`);

  const dashReq = {
    method: "GET",
    headers: headerItem,
  };

  const url = `http://pluralcodesandbox.com/yorubalearning/api/admin/get_details?category_id=${third}`;
  fetch(url, dashReq)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      const categoryName = document.getElementById("updatename");
      categoryName.setAttribute("value", `${result.name}`);

      const categoryImage = document.getElementById("updateimage");
      categoryImage.setAttribute("value", `${result.image}`);
    })
    .catch((error) => console.log("error", error));

  const popmodal = document.getElementById("updatemodal");
  popmodal.style.display = "block";
}
//X FUNCTION FOR UPDATE CATEGORY

// FUNCTION FOR CLOSING UPDATE CATEGORY
function closeCatModal() {
  let pop = document.querySelector(".updateform");
  pop.style.display = "none";
}
// FUNCTION FOR CLOSING UPDATE CATEGORY

// FUNCTION FOR UPDATE CATEGORY
function UpdateCategory(event) {
  event.preventDefault();

  const categoryImageName = document.getElementById("updatename").value;
  const categoryImage = document.getElementById("updateimage").files[0];

  const catID = localStorage.getItem("upId");

  if (categoryImageName === "") {
    Swal.fire({
      icon: "info",
      text: "All fields are required",
      confirmButtonColor: "#2D85DE",
    });
  } else {
    const spinRoll = document.querySelector(".roller");
    spinRoll.style.display = "inline-block";

    const upToken = localStorage.getItem("adminlogin");
    const getUpToken = JSON.parse(upToken);
    const updateToken = getUpToken.token;

    const updateHeader = new Headers();
    updateHeader.append("Authorization", `Bearer ${updateToken}`);

    const updateData = new FormData();
    updateData.append("name", categoryImageName);
    updateData.append("image", categoryImage);
    updateData.append("category_id", catID);

    const updateRequest = {
      method: "POST",
      headers: updateHeader,
      body: updateData,
    };
    const url =
      "https://pluralcodesandbox.com/yorubalearning/api/admin/update_category";

    fetch(url, updateRequest)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status === "success") {
          location.reload();
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
}
// FUNCTION FOR UPDATE CATEGORY

// // FUNCTION FOR DELETE CATEGORY
// function to delete a category
function deleteCategory(upId) {
  const cutToken = localStorage.getItem("adminlogin");
  const remToken = JSON.parse(cutToken);
  const movToken = remToken.token;

  const cutHeaders = new Headers();
  cutHeaders.append("Authorization", `Bearer ${movToken}`);

  const dashReq = {
    method: "GET",
    headers: cutHeaders,
  };

  const url =
    `https://pluralcodesandbox.com/yorubalearning/api/admin/delete_category/` +
    `${upId}`;

  fetch(url, dashReq)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);

      if (result.status === "success") {
        Swal.fire({
          icon: "success",
          text: "deleted successfully",
          confirmButtonColor: "#2D85DE",
        });
        setTimeout(() => {
          location.reload();
        }, 3000);
      } else {
        Swal.fire({
          icon: "info",
          text: "Deletion Unsuccessful!",
          confirmButtonColor: "#2D85DE",
        });
      }
    })
    .catch((error) => console.log("error", error));
}

// *******************************************//
// function to logout
function logout() {
  console.log("here");
  const lockout = localStorage.clear();
  setTimeout(() => {
    location.href = "./Index.html";
  }, 3000);
}
