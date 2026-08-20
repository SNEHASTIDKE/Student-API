const API_URL = "http://localhost:8080/api/students";

const studentTableBody = document.getElementById("studentTableBody");
const errorMessage = document.getElementById("errorMessage");
const nameInput = document.getElementById("nameInput");
const ageInput = document.getElementById("ageInput");
const emailInput = document.getElementById("emailInput");
const saveBtn = document.getElementById("saveBtn");
const cancelBtn = document.getElementById("cancelBtn");

let editingStudentId = null;

function loadStudents() {
    studentTableBody.innerHTML = "<tr><td colspan='5'>Loading students...</td></tr>";

    fetch(API_URL)
        .then(function (response) {
            return response.json();
        })
        .then(function (students) {
            renderStudents(students);
        })
        .catch(function (error) {
            errorMessage.textContent = "Failed to load students. Is the backend running?";
            console.log(error);
        });
}
function renderStudents(students) {
    studentTableBody.innerHTML = "";

    students.forEach(function (student) {
        const row = document.createElement("tr");

        row.innerHTML =
            "<td>" + student.id + "</td>" +
            "<td>" + student.name + "</td>" +
            "<td>" + student.age + "</td>" +
            "<td>" + student.email + "</td>" +
            "<td>" +
                "<button class='edit-btn'>Edit</button>" +
                "<button class='delete-btn'>Delete</button>" +
            "</td>";

        const editBtn = row.querySelector(".edit-btn");
        editBtn.addEventListener("click", function () {
            startEditing(student);
        });

        const deleteBtn = row.querySelector(".delete-btn");
        deleteBtn.addEventListener("click", function () {
            deleteStudent(student.id);
        });

        studentTableBody.appendChild(row);
    });
}

function startEditing(student) {
    editingStudentId = student.id;

    nameInput.value = student.name;
    ageInput.value = student.age;
    emailInput.value = student.email;

    saveBtn.textContent = "Update Student";
    cancelBtn.style.display = "inline-block";
}

function deleteStudent(id) {
    const confirmed = confirm("Are you sure you want to delete this student?");

    if (!confirmed) {
        return;
    }

    fetch(API_URL + "/" + id, {
        method: "DELETE"
    })
        .then(function () {
            loadStudents();
        })
        .catch(function (error) {
            errorMessage.textContent = "Failed to delete student.";
            console.log(error);
        });
}

saveBtn.addEventListener("click", function () {
    const name = nameInput.value.trim();
    const age = ageInput.value.trim();
    const email = emailInput.value.trim();

    if (name === "" || age === "" || email === "") {
        errorMessage.textContent = "Please fill in all fields.";
        return;
    }

    errorMessage.textContent = "";
    saveBtn.disabled = true;
    saveBtn.textContent = editingStudentId === null ? "Adding..." : "Updating...";

    const studentData = {
        name: name,
        age: parseInt(age),
        email: email
    };

    if (editingStudentId === null) {
        createStudent(studentData);
    } else {
        updateStudent(editingStudentId, studentData);
    }
});

function createStudent(studentData) {
    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(studentData)
    })
        .then(function (response) {
            if (!response.ok) {
                return response.json().then(function (errors) {
                    throw errors;
                });
            }
            return response.json();
        })
        .then(function () {
            resetForm();
            loadStudents();
        })
        .catch(function (errors) {
            showValidationErrors(errors);
        });
}

function updateStudent(id, studentData) {
    fetch(API_URL + "/" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(studentData)
    })
        .then(function (response) {
            if (!response.ok) {
                return response.json().then(function (errors) {
                    throw errors;
                });
            }
            return response.json();
        })
        .then(function () {
            resetForm();
            loadStudents();
        })
        .catch(function (errors) {
            showValidationErrors(errors);
        });
}

function showValidationErrors(errors) {
    saveBtn.disabled = false;
    saveBtn.textContent = editingStudentId === null ? "Add Student" : "Update Student";

    if (typeof errors === "object" && errors !== null) {
        const messages = Object.values(errors).join(" | ");
        errorMessage.textContent = messages;
    } else {
        errorMessage.textContent = "Something went wrong. Please try again.";
    }
    console.log(errors);
}

function resetForm() {
    nameInput.value = "";
    ageInput.value = "";
    emailInput.value = "";
    editingStudentId = null;
    saveBtn.disabled = false;
    saveBtn.textContent = "Add Student";
    cancelBtn.style.display = "none";
}

cancelBtn.addEventListener("click", function () {
    resetForm();
    errorMessage.textContent = "";
});

loadStudents();
