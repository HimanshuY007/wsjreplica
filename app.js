// Variable declaration
const navbar = document.querySelector(".container");
const navlist = document.querySelectorAll(".navitem");
const dropdowns = document.querySelectorAll(".dropdown");
const column1 = document.querySelector(".column1");
const column2 = document.querySelector(".column2");
const column3 = document.querySelector(".column3");
const column4 = document.querySelector(".column4");
let source = "google-news";
let apiKey = "65123c4edea14127ae7876cf38e38a6c";
let content1 = "",
  content2 = "",
  content3 = "";
const currentTime = new Date();

// Functions

// 1.Function to render elements on DOM
function Render(element) {
  for (let i = 0; i < 9; i++) {
    let d = new Date(element[i].publishedAt);
    let hours = Math.round((currentTime - d) / (1000 * 60 * 60));
    if (i == 0) {
      let articlemain = `<div class="mainheading">
        <div class="mainimage"><img src="${element[i].urlToImage}" alt="Mainheading"/></div>
        <div class="maintitle">${element[i].title}</div>
        <div class="mainseparator" style="text-align:center; margin:10px 0px;"><img src="Line.svg" alt="noimage"/></div>
        <div class="maincontent">${element[i].content}</div>
        <div class="timecontainer"><span class="material-icons" style="font-size:15px; margin-right:8px">schedule</span><span class="time">${hours}hrs ago</span></div>
      </div>`;
      content2 += articlemain;
    }
    if (i >= 1 && i <= 2) {
      let article = `<div class="articleheading">
      <div class="articletitle">${element[i].title}</div>
      <div class="articlecontent"><img src="${element[i].urlToImage}" alt="articleheading"/>${element[i].content}</div>
      <div class="timecontainer"><span class="material-icons" style="font-size:15px; margin-right:8px">schedule</span><span class="time">${hours}hrs ago</span></div>
    </div>`;
      content2 += article;
    }
    if (i >= 3 && i <= 5) {
      let article = `<div class="articleheading">
      <div class="articletitle">${element[i].title}</div>
      <div class="articlecontent"><img src="${element[i].urlToImage}" alt="articleheading"/>${element[i].content}</div>
      <div class="timecontainer"><span class="material-icons" style="font-size:15px; margin-right:8px">schedule</span><span class="time">${hours}hrs ago</span></div>
    </div>`;
      content1 += article;
    }
    if (i >= 6 && i <= 8) {
      let article = `<div class="shortarticles">
      <div class="shortimage"><img src="${element[i].urlToImage}" alt="articleheading"/></div>
      <div class="shorttitle">${element[i].title}</div>
      <div class="timecontainer"><span class="material-icons" style="font-size:15px; margin-right:8px">schedule</span><span class="time">${hours}hrs ago</span></div>
    </div>`;
      content3 += article;
    }
  }
  column1.innerHTML = content1;
  column2.innerHTML = content2;
  column3.innerHTML = content3;
}

// 2.Fucntion to fetch data from the NEWS API
function Fetch() {
  fetch(
    `https://api.allorigins.win/get?url=${encodeURIComponent(
      `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apiKey}`
    )}`
  )
    .then((res) => res.json())
    .then((data) => Render(JSON.parse(data.contents).articles));
}
// //3.Drawing charts
// function drawChart() {
//   // Create the data table.
//   var data = new google.visualization.DataTable();
//   data.addColumn("string", "Topping");
//   data.addColumn("number", "Slices");
//   data.addRows([
//     ["Mushrooms", 3],
//     ["Onions", 1],
//     ["Olives", 1],
//     ["Zucchini", 1],
//     ["Pepperoni", 2],
//   ]);

//   // Set chart options
//   var options = {
//     title: "How Much Pizza I Ate Last Night",
//     width: 200,
//     height: 150,
//   };

//   // Instantiate and draw our chart, passing in some options.
//   var chart = new google.visualization.LineChart(
//     document.querySelector(".column4")
//   );
//   chart.draw(data, options);
// }

//Function Calls
Fetch();

// //Load visualization api and core chart package
// google.charts.load("current", { packages: ["corechart"] });

// //Callback to run when api is loaded
// google.charts.setOnLoadCallback(drawChart);

//EventListerners
window.addEventListener("scroll", (e) => {
  if (window.scrollY > 90) {
    navbar.classList.add("scrollnav");
  } else {
    navbar.classList.remove("scrollnav");
  }
});
navlist.forEach((element) => {
  element.addEventListener("mouseover", (e) => {
    for (let i = 0; i < dropdowns.length; i++) {
      let index = dropdowns[i].getAttribute("data-nav");
      if (e.target.id === index) {
        dropdowns[i].classList.add("display-dropdown");
      }
    }
  });
});
navlist.forEach((element) => {
  element.addEventListener("mouseout", (e) => {
    for (let i = 0; i < dropdowns.length; i++) {
      dropdowns[i].classList.remove("display-dropdown");
    }
  });
});
fetch(
  `https://api.allorigins.win/get?url=${encodeURIComponent(
    `https://newsapi.org/v2/everything?domains=bbc.co.uk&apiKey=${apiKey}`
  )}`
)
  .then((res) => res.json())
  .then((data) => console.log(JSON.parse(data.contents).articles));
