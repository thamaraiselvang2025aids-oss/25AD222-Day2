// Load employees when page opens
document.addEventListener("DOMContentLoaded", function () {
    loadEmployees();
    loadLeaves();
});


// ===============================
// EMPLOYEE API
// ===============================

function loadEmployees() {

    fetch("/employees")
        .then(response => response.json())
        .then(employees => {

            const tableBody =
                document.getElementById("employeeTableBody");

            tableBody.innerHTML = "";

            employees.forEach(employee => {

                const row = `
                    <tr>
                        <td>${employee.id}</td>
                        <td>${employee.name}</td>
                        <td>${employee.email}</td>
                        <td>${employee.department}</td>
                        <td>${employee.salary}</td>
                        <td>
                            <button onclick="editEmployee(${employee.id})">
                                Edit
                            </button>
                        
                            <button onclick="deleteEmployee(${employee.id})">
                                Delete
                            </button>
                        </td>
                    </tr>
                `;

                tableBody.innerHTML += row;
            });

            // Update employee count
            document.getElementById("employeeCount").textContent =
                employees.length;
        })
        .catch(error => {
            console.error("Error loading employees:", error);
        });
}


// ===============================
// DELETE EMPLOYEE
// ===============================

function deleteEmployee(id) {

    if (!confirm("Are you sure you want to delete this employee?")) {
        return;
    }

    fetch(`/employees/${id}`, {
        method: "DELETE"
    })
        .then(response => {

            if (response.ok) {
                alert("Employee deleted successfully!");
                loadEmployees();
                loadLeaves();
            } else {
                alert("Failed to delete employee.");
            }

        })
        .catch(error => {
            console.error("Delete error:", error);
        });
}
function editEmployee(id) {

    const name = prompt("Enter employee name:");
    const email = prompt("Enter employee email:");
    const department = prompt("Enter department:");
    const salary = prompt("Enter salary:");

    if (!name || !email || !department || !salary) {
        return;
    }

    const employee = {
        name: name,
        email: email,
        department: department,
        salary: parseFloat(salary)
    };

    fetch(`/employees/${id}`, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(employee)

    })
        .then(response => {

            if (response.ok) {

                alert("Employee updated successfully!");

                loadEmployees();

            } else {

                alert("Failed to update employee.");

            }

        })
        .catch(error => {

            console.error("Update error:", error);

        });
}


// ===============================
// EMPLOYEE FORM
// ===============================

function showEmployeeForm() {
    document.getElementById("employeeModal").style.display = "block";
}

function closeEmployeeForm() {
    document.getElementById("employeeModal").style.display = "none";
}


// Add Employee

document.getElementById("employeeForm").addEventListener("submit", function (event) {

    event.preventDefault();

    const employee = {

        name: document.getElementById("employeeName").value,

        email: document.getElementById("employeeEmail").value,

        department: document.getElementById("employeeDepartment").value,

        salary: parseFloat(
            document.getElementById("employeeSalary").value
        )
    };


    fetch("/employees", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(employee)

    })
        .then(response => response.json())

        .then(data => {

            alert("Employee added successfully!");

            document.getElementById("employeeForm").reset();

            closeEmployeeForm();

            loadEmployees();

        })

        .catch(error => {

            console.error("Error adding employee:", error);

            alert("Failed to add employee.");

        });
});


// ===============================
// LEAVE API
// ===============================

function loadLeaves() {

    fetch("/leaves")

        .then(response => response.json())

        .then(leaves => {

            const tableBody =
                document.getElementById("leaveTableBody");

            tableBody.innerHTML = "";

            let pending = 0;
            let approved = 0;

            leaves.forEach(leave => {

                if (leave.status === "PENDING") {
                    pending++;
                }

                if (leave.status === "APPROVED") {
                    approved++;
                }


                const employeeName =
                    leave.employee
                        ? leave.employee.name
                        : "Unknown";


                const row = `
                    <tr>

                        <td>${leave.id}</td>

                        <td>${employeeName}</td>

                        <td>${leave.leaveType}</td>

                        <td>${leave.startDate}</td>

                        <td>${leave.endDate}</td>

                        <td>${leave.reason}</td>

                        <td>${leave.status}</td>

                        <td>
                            <button onclick="deleteLeave(${leave.id})">
                                Delete
                            </button>
                        </td>

                    </tr>
                `;

                tableBody.innerHTML += row;

            });


            document.getElementById("leaveCount").textContent =
                leaves.length;

            document.getElementById("pendingCount").textContent =
                pending;

            document.getElementById("approvedCount").textContent =
                approved;

        })

        .catch(error => {

            console.error("Error loading leaves:", error);

        });
}


// ===============================
// DELETE LEAVE
// ===============================

function deleteLeave(id) {

    if (!confirm("Are you sure you want to delete this leave?")) {
        return;
    }

    fetch(`/leaves/${id}`, {

        method: "DELETE"

    })

        .then(response => {

            if (response.ok) {

                alert("Leave deleted successfully!");

                loadLeaves();

            } else {

                alert("Failed to delete leave.");

            }

        })

        .catch(error => {

            console.error("Delete error:", error);

        });
}


// ===============================
// LEAVE FORM
// ===============================

function showLeaveForm() {

    document.getElementById("leaveModal").style.display = "block";

}

function closeLeaveForm() {

    document.getElementById("leaveModal").style.display = "none";

}


// Apply Leave

document.getElementById("leaveForm").addEventListener("submit", function (event) {

    event.preventDefault();


    const leaveRequest = {

        leaveType:
        document.getElementById("leaveType").value,

        startDate:
        document.getElementById("startDate").value,

        endDate:
        document.getElementById("endDate").value,

        reason:
        document.getElementById("leaveReason").value,

        status: "PENDING",

        employee: {

            id: parseInt(
                document.getElementById("leaveEmployeeId").value
            )

        }

    };


    fetch("/leaves", {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(leaveRequest)

    })

        .then(response => response.json())

        .then(data => {

            alert("Leave request submitted!");

            document.getElementById("leaveForm").reset();

            closeLeaveForm();

            loadLeaves();

        })

        .catch(error => {

            console.error("Error applying leave:", error);

            alert("Failed to apply leave.");

        });

});