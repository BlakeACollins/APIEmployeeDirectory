const employeeAPI = 'https://randomuser.me/api/?results=12&inc=name,location,email,dob,cell,picture&nat=US';
const modalContainer = document.querySelector('.modalContainer');
const mainContainer = document.querySelector('.container');
const gridContainer = document.querySelector('.employeeGrid');
const modal = document.querySelector('#modal');
let employees = [];

//fetching employees
fetch(employeeAPI)
    .then(response => response.json())
    .then(data => data.results)
    .then(data => {
        employees.push(data);
        employees = employees[0];
        generateEmployees(employees);
    })
    .catch(err => console.log('Something went wrong...Beep Boop'))



// Creating employee cards
function generateEmployees(data) {
    const employees = data;
    console.log(employees.length);
    var statusHTML = '';
    employees.forEach((employee, index) => {
        let picture = employee.picture.large;
        let firstName = employee.name.first;
        let lastName = employee.name.last;
        let email = employee.email;
        let city = employee.location.city;

        statusHTML += `
        
            <div class="card" data-index="${index}">
                <img class ="profilePicture" src="${picture}">
                    <h3 class="employee_name">${firstName} ${lastName}</h3><br> 
                    <p>${email}</p>
                    <p>${city}</p>
            </div>
        `;
    });
    gridContainer.innerHTML = statusHTML;

    gridContainer.querySelectorAll('.card').forEach((card, index) => {
        card.addEventListener('click', (e) => { 
            generateModal(employees[index]);
        }); 
    })


}

//modal window
function generateModal(employee) {

    function modalHtml(employee) {
        let dob = new Date(Date.parse(employee.dob.date)).toLocaleDateString(navigator.language);
        modalContainer.innerHTML = `
            <div class="modal-box">
                <span class="closeButton">&times;</span>
                <div class="modal-info">
                    <div class="modal-content">
                        <image src="${employee.picture.large}" class="modal-picture">
                        <h2 class="employee_name">${employee.name.first} ${employee.name.last}</h2>
                        <p>${employee.email}</p><br>
                        <p>${employee.location.state}</p>
                        <hr>
                        <p>${employee.cell}</p><br>
                        <p>${employee.location.street.number}</p> 
                        <p>${employee.location.street.name}</p>
                        <p>${employee.location.city}</p>
                        <p>${employee.location.postcode}</p>
                        <p>Birthday: ${dob}</p>
                    </div>
                </div>
            </div>
        `;  
    }

    modalContainer.style.display = 'block';
    modalHtml(employee);
}


//Close modal window
modalContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('closeButton') || e.target.classList.contains('modal-container')) {
        document.querySelector('.modal-box').innerHTML = "";
        modal.style.display = 'none';
    }
})