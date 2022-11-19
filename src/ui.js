export class UI {
  constructor() {
    this.employeeList = document.getElementById("employees");
    this.updateButton = document.getElementById("update");
    this.nameInput = document.getElementById("name");
    this.departmentInput = document.getElementById("deparment");
    this.salaryInput = document.getElementById("salary");
    this.searchInput = document.getElementById("search-input");
  }

  showFilteredEmployee(employees){
    let result = "";
    employees.forEach((employee) => {
      result += `
            <tr>
                <td>${employee.name}</td>
                <td>${employee.department}</td>
                <td>${employee.salary}</td>
                <td>${employee.id}</td>
                <td><a href="#" id = "update-employee" class= "btn btn-success">Update</a></td> 
                <td> <a href="#" id = "delete-employee" class= "btn btn-danger">Delete</a></td>
            </tr>
            `;
    });
    this.employeeList.innerHTML = result;
    }
  

  addAllEmployeeToUI(employees) {
    let result = "";
    employees.forEach((employee) => {
      result += `
            <tr>
                <td>${employee.name}</td>
                <td>${employee.department}</td>
                <td>${employee.salary}</td>
                <td>${employee.id}</td>
                <td><a href="#" id = "update-employee" class= "btn btn-success">Update</a></td> 
                <td> <a href="#" id = "delete-employee" class= "btn btn-danger">Delete</a></td>
            </tr>
            `;
    });
    this.employeeList.innerHTML = result;
  }

  clearInputs(){
    this.nameInput.value = "";
    this.departmentInput.value = "";
    this.salaryInput.value = "";
  }

  addEmployeeToUI(employee){

    this.employeeList.innerHTML += `
            <tr>
                <td>${employee.name}</td>
                <td>${employee.department}</td>
                <td>${employee.salary}</td>
                <td>${employee.id}</td>
                <td><a href="#" id = "update-employee" class= "btn btn-success">Update</a></td> 
                <td> <a href="#" id = "delete-employee" class= "btn btn-danger">Delete</a></td>
            </tr>
    
    `;
  }

  deleteEmployeeFromUI(element){
    element.remove();
    // console.log("employee removed from ui");
  }

  toggleUpdateButton(target){
    if(this.updateButton.style.display==="none"){
        this.updateButton.style.display= "block"; 
        this.addEmployeeInfoToInputs(target);
    }else{
        this.updateButton.style.display = "none";
        this.clearInputs();
    }
  }

  addEmployeeInfoToInputs(target){
    // const children = target.children;
    this.nameInput.value = target.children[0].textContent;
    this.departmentInput.value = target.children[1].textContent;
    this.salaryInput.value = target.children[2].textContent;
  }

  updateEmployeeOnUI(employee,parent){
    parent.innerHTML = `
    <tr>
        <td>${employee.name}</td>
        <td>${employee.department}</td>
        <td>${employee.salary}</td>
        <td>${employee.id}</td>
        <td><a href="#" id = "update-employee" class= "btn btn-success ">Update</a></td> 
        <td> <a href="#" id = "delete-employee" class= "btn btn-danger">Delete</a></td>
    </tr>
    `;
    this.clearInputs();
  }

  showEmployees(){
    this.employeeList.style = "display:block";
  }

  unShowEmployees(){
    this.employeeList.style = "display:none";
  }

  clearEmployees(){
    if(confirm("Are you sure to clear all employees?")===true){
      this.employeeList.innerHTML = "";
      return true;

    }else{
      return false;
    }

  }
}
