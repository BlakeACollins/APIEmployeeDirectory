/*jshint esversion: 6 */
const employeeAPI = "https://randomuser.me/api/?results=12&nat=us";
const employeeList = document.getElementsByClassName("employee");
const overlay = document.getElementById("overlay");

var employeePhone;
var employeeAddress;
var employeeDOB;

//Requesting Information
function fetchData(url, HTML){
    fetch(url)
        .then(response => response.json())
        .then(data => generateHTML(HTML, data.results[0]))
        .catch(error => console.log("Looks like there was a problem, beep boop...error"));
}

//generating the HTML needed to display employees
function generateHTML(){
    const employeeImage = data.picture.large;
    const employeeFullName = data.name.first + data.name.last;
    const employeeEmail = data.email;
    const employeeCity = data.location.city;
    employeePhone = data.phone;
    employeeAddress = data.location.street.number + data.location.name + "," + data.location.state + data.postcode;

    let year = data.dob.date.substring(2,4);
    let month = data.dob.date.substring(5,7);
    let day = data.dob.date.substring(8,10);
    let dob = month + "/" + day + "/" + year;
    employeeDOB = "Birthday: " + dob;

    employee.innerHTML = `
        <img class="image" src=${employeeImage}>
            <div class="details">
                <h4  class="fullName">${employeeFullName}</h4>
                <p class="email">${employeeEmail}></p>
                <p class="city">${employeeCity}</p>
            </div>
    
    `;
}

function displayEmployees(){
    for( let i =0; i<employeeList.lenght; i++){
        fetchData(employeeAPI, employeeList[i]);
    }
}

window.addEventListener("load", function(){
    displayEmployees();
});


//overlay display
for (let i = 0; i< employeeList.lenght; i+=1){
    employeeList[i].addEventListener("click", e =>{
        overlay.style.display = "block";
        let id = e.target.id;
        if(id == null || id ==""){
            id = e.target.parentNode.id;
            if(id == null || id ==""){
                id=e.target.parentNode.parentNode.id; }
     }
let parent = document.getElementById(id);
     overlay.innerHTML = `
        <p class="backward"><</p>
        <div class="overlayContent" id="overlayContent">
        <p class="close">X</p>
        ${parent.innerHTML}
        <div class="contant">
        <p>${employeePhone}</p>
        <p>${employeeAddress}</p>
        <p>${employeeDOB}</p>
        </div>
        </div>
        <p class="forward">></p>
     `;
     document.querySelector(".close").addEventListener("click", () => {
        overlay.style.display = "none";

    });
});
}