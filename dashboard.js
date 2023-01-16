// GET THE MODAL
var modal = document.getElementById("myModal");

// GET THE BUTTON THAT OPENS THE MODAL
var btnM = document.getElementById("myBtn");

// GET THE SPAN ELEMENT THAT CLOSES THE MODAL
var span = document.getElementsByClassName("close")[0];

// WHEN CLICKED
btnM.onclick = function () {
  modal.style.display = "block";
};

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

// function to get all students
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
getAllStudents();
// get all students functions ends here
