// GET THE MODAL
var modal = document.getElementById("myModal");

// GET THE BUTTON THAT OPENS THE MODAL
var btnM = document.getElementById("myBtn");

// GET THE SPAN ELEMENT THAT CLOSES THE MODAL
var span = document.getElementsByClassName("close")[0];

// WHEN THE X CARRING SPAN IS CLICKED
span.onclick = function () {
  modal.style.display = "none";
};

// WHEN THE USER CLICK ANYWHERE OUTSIDE THE POPUP
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// FUNCTION FOR DASHBOARD POPULATION
function getDashApi() {
  const mySpin = document.querySelector(".pagemodal");
  mySpin.style.display = "block";
  const getToken = localStorage.getItem("adminlogin");
  const tokenItem = JSON.parse(getToken);
  const token = tokenItem.token;

  const tokAuth = new Headers();
  tokAuth.append("Authorization", `Bearer ${token}`);

  const dashReq = {
    method: "GET",
    headers: tokAuth,
  };

  const url =
    "https://pluralcodesandbox.com/yorubalearning/api/admin/admin_dashboardapi";

  fetch(url, dashReq)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      const category = document.querySelector(".category");
      const learn = document.querySelector(".learn");
      const total = document.querySelector(".total");
      const quiz = document.querySelector(".quiz");
      const students = document.querySelector(".students");
      const getAdmin = document.getElementById("adminId");
      category.innerHTML = `${result.total_number_of_categories}`;
      learn.innerHTML = `${result.total_number_of_learningmaterial}`;
      total.innerHTML = `${result.total_number_of_subcategories}`;
      quiz.innerHTML = `${result.total_number_of_quize}`;
      students.innerHTML = `${result.total_number_of_students}`;
      getAdmin.innerHTML = `${result.admin_email}`;

      mySpin.style.display = "none";
      // styling of fonts
      category.style.fontSize = "30px";
      learn.style.fontSize = "30px";
      total.style.fontSize = "30px";
      quiz.style.fontSize = "30px";
      students.style.fontSize = "30px";
    })
    .catch((error) => console.log("error", error));
}
getDashApi();
// X FUNCTION FOR DASHBOARD POPULATION

// FUNCTION TO GET TOP 3 STUDENTS
function getTopThree() {
  const getToken = localStorage.getItem("adminlogin");
  const tokenItem = JSON.parse(getToken);
  const token = tokenItem.token;

  const tokHuth = new Headers();
  tokHuth.append("Authorization", `Bearer ${token}`);

  const dashReq = {
    method: "GET",
    headers: tokHuth,
  };

  let data = [];

  const url =
    "https://pluralcodesandbox.com/yorubalearning/api/admin/top_three_students";
  fetch(url, dashReq)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      const topThree = document.querySelector(".allstudent");
      if (result.length === 0) {
        topThree.innerHTML = "No record found";
      } else {
        result.map((item) => {
          data += `
                <div class="card-details" style="box-shadow:rgba(0, 0, 0, 0.35) 0px 5px 15px;padding: 25px;margin:auto;margin-top:18px;border-radius:16px;width:99%">
                    <p><span style="color:#2d85de;" class="title">Name</span>: <span class="details">${item.name}</span></p>
                    <p><span style="color:#2d85de;" class="title">Email</span>: <span class="details">${item.email}</span></p>
                    <p><span style="color:#2d85de;" class="title">Phone</span>: <span class="details">${item.phone_number}</span></p>
                    <p><span style="color:#2d85de;" class="title">Position</span>: <span class="details">${item.position}</span></p>
                    <p><span style="color:#2d85de;" class="title">Score</span>: <span class="details">${item.total_score}</span></p>
                </div>
                `;
        });
      }
      topThree.innerHTML = data;
    })
    .catch((error) => console.log("error", error));
}
getTopThree();
// X FUNCTION TO GET TOP 3 STUDENTS

// FUNCTIONS TO GET ALL STUDENTS
function getAllStudents() {
  const getToken = localStorage.getItem("adminlogin");
  const tokenItem = JSON.parse(getToken);
  const token = tokenItem.token;

  const tokButh = new Headers();
  tokButh.append("Authorization", `Bearer ${token}`);

  const dashReq = {
    method: "GET",
    headers: tokButh,
  };

  let data = [];

  const url =
    "https://pluralcodesandbox.com/yorubalearning/api/admin/get_all_students";

  fetch(url, dashReq)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      const AllStudents = document.querySelector(".tablecontent");
      if (result.lenght === 0) {
        AllStudents.innerHTML = "No record found";
      } else {
        result.map((item) => {
          data += `
                    <tr>
                       <td>${item.name}</td>
                       <td>${item.email}</td>
                       <td>${item.phone_number}</td>
                       <td>${item.position}</td>
                       <td>${item.total_score}</td>
                    </tr>
                `;
        });
      }
      AllStudents.innerHTML = data;
    })
    .catch((error) => console.log("error", error));
}
// getAllStudents();
// x FUNCTIONS TO GET ALL STUDENTS

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
function changeimage() {
  let change = document.querySelector(".hide-me");
  change.style.display = "block";

  let flex = document.querySelector(".show-me");
  flex.style.display = "none";
}
//FUNCTION FOR CLOSE UPDATE BY CLICKING ANYWHERE ON THE WINDOW
window.onclick = function outsideClick(e) {
  const pop = document.querySelector(".updateform");
  if (e.target == pop) {
    pop.style.display = "none";
  }
};
//FUNCTION FOR CLOSE UPDATE BY CLICKING ANYWHERE ON THE WINDOW

// FUNCTION FOR UPDATE CATEGORY
function UpdateCategory(event) {
  event.preventDefault();
  const getSpin = document.querySelector(".spin");
  getSpin.style.display = "inline-block";

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
// FUNCTION FOR DELETE CATEGORY

// *******************************************//
