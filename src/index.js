import { Request } from "./requests";
import { UI } from "./ui";

//Selection Elements
const form = document.getElementById("employee-form");
const nameInput = document.getElementById("name");
const departmentInput = document.getElementById("department");
const salaryInput = document.getElementById("salary");
const employees = document.getElementById("employees");
const updateEmployeeButton = document.getElementById("update");
const searchInput = document.getElementById("search-input");
const clearButton = document.getElementById("clear-employees");

const request = new Request("http://localhost:3000/employees");
const ui = new UI();

let updateState = null;

eventListeners();

function eventListeners() {
  document.addEventListener("DOMContentLoaded", getAllEmployees);
  form.addEventListener("submit", addEmployee);
  employees.addEventListener("click", updateOrDelete);
  updateEmployeeButton.addEventListener("click", updateEmployee);
  searchInput.addEventListener("keyup", search);
  clearButton.addEventListener("click", clearAllEmployees);
}

function clearAllEmployees() {
  request
    .get()
    .then((employees) => {
      // ui.addAllEmployeeToUI(employees);
      // console.log(employees);
      for (let i = employees.length; i > 0; i--) {
        request
          .delete(employees[i].id)
          .then((message) => console.log(message))
          .catch((err) => console.log(err));
        console.log("ok");
      }
    })
    .catch((err) => console.log(err));
  // ui.clearEmployees();
}

function search() {
  const value = this.value;
  // console.log("Value: "+value);
  searchData(value);
}

function searchData(value) {
  let filteredEmployee = [];
  request
    .get()
    .then((employees) => {
      for (let i = 0; i < employees.length; i++) {
        value = value.toString().toLowerCase();
        const name = employees[i].name.toLowerCase();
        const department = employees[i].department.toLowerCase();
        const salary = employees[i].salary.toString().toLowerCase();
        const id = employees[i].id.toString().toLowerCase();
        if (
          name.includes(value) ||
          department.includes(value) ||
          salary.includes(value) ||
          id.includes(value)
        ) {
          // console.log("ok");
          filteredEmployee.push(employees[i]);
          // console.log(employees);
          ui.showFilteredEmployee(filteredEmployee);
        }
        //  else {
        //     if(value===null || value===""){
        //         ui.showEmployees();
        //     }else{
        //         ui.unShowEmployees();
        //     }
        // }
        // getAllEmployees();
      }
    })
    .catch((err) => console.log(err));
}

function updateOrDelete(e) {
  if (e.target.id === "update-employee") {
    //Update
    updateEmployeeController(e.target.parentElement.parentElement);
  } else if (e.target.id === "delete-employee") {
    //Delete
    deleteEmployee(e.target);
  }
}

function updateEmployeeController(targetEmployee) {
  ui.toggleUpdateButton(targetEmployee);

  if (updateState === null) {
    updateState = {
      updateId: targetEmployee.chidren[3].textContent,
      updatedParent: targetEmployee,
    };
  } else {
    updateState = null;
  }
}

function updateEmployee() {
  if (updateState) {
    //Update
    const data = {
      name: nameInput.value.trim(),
      department: departmentInput.value.trim(),
      salary: Number(salaryInput.value.trim()),
    };
    request
      .put(updateState.updateId, data)
      .then((updatedEmployee) => {
        ui.updateEmployeeOnUI(updatedEmployee, updateState.updateEmployee);
        // ui.clearInputs();
      })
      .catch((err) => console.log(err));
  }
}

function deleteEmployee(targetEmployee) {
  const id =
    targetEmployee.parentElement.previousElementSibling.previousElementSibling
      .textContent;
  request
    .delete(id)
    .then((message) => {
      // console.log(message);
      ui.deleteEmployeeFromUI(targetEmployee.parentElement.parentElement);
    })
    .catch((err) => console.log(err));
}

function addEmployee(e) {
  const employeeName = nameInput.value.trim();
  const employeeDepartment = departmentInput.value.trim();
  const employeeSalary = salaryInput.value.trim();

  if (
    employeeName === "" ||
    employeeDepartment === "" ||
    employeeSalary === ""
  ) {
    alert("Fill all the gaps, please");
  } else {
    request
      .post({
        name: employeeName,
        department: employeeDepartment,
        salary: parseInt(employeeSalary),
      })
      .then((employee) => {
        ui.addEmployeeToUI(employee);
      })
      .catch((err) => console.log(err));
  }

  // ui.clearInputs();
  e.preventDefault();
}

function getAllEmployees() {
  request
    .get()
    .then((employees) => {
      ui.addAllEmployeeToUI(employees);
      // console.log(employees);
    })
    .catch((err) => console.log(err));
}

//GET
// request.get()
// .then(employees => console.log(employees))
// .catch(err => console.log(err));

//POST
// request.post({name:"",department:"",salary:0})
// .then(employee => console.log(employee))
// .catch(err => console.log(err));

//PUT
// request.put(3,{name:"Mardan Novruzov",department:"IT",salary:1000})
// .then(employees => console.log(employees))
// .catch(err => console.log(err));

//DELETE
// request.delete(4)
// .then(message => console.log(message))
// .catch(err => console.log(err));
