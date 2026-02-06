class Student {
    constructor(id, fullName, dob, className, gpa) {
        this.id = id;
        this.fullName = fullName;
        this.dob = dob;
        this.className = className;
        this.gpa = gpa;
    }

    updateInfo(fullName, dob, className, gpa) {
        this.fullName = fullName;
        this.dob = dob;
        this.className = className;
        this.gpa = gpa;
    }
}

const students = [];
const form = document.getElementById('studentForm');
const tableBody = document.getElementById('studentTableBody');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const id = document.getElementById('studentId').value;
    const fullName = document.getElementById('fullName').value;
    const dob = document.getElementById('dob').value;
    const className = document.getElementById('class').value;
    const gpa = parseFloat(document.getElementById('gpa').value);

    const existingStudent = students.find(student => student.id === id);
    if (existingStudent) {
        existingStudent.updateInfo(fullName, dob, className, gpa);
    } else {
        const newStudent = new Student(id, fullName, dob, className, gpa);
        students.push(newStudent);
    }

    form.reset();
    renderTable();
});

function renderTable() {
    tableBody.innerHTML = '';
    students.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.fullName}</td>
            <td>${student.dob}</td>
            <td>${student.className}</td>
            <td>${student.gpa.toFixed(2)}</td>
            <td>
                <button onclick="editStudent('${student.id}')">Chỉnh sửa</button>
                <button onclick="deleteStudent('${student.id}')">Xóa</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function editStudent(id) {
    const student = students.find(student => student.id === id);
    if (student) {
        document.getElementById('studentId').value = student.id;
        document.getElementById('fullName').value = student.fullName;
        document.getElementById('dob').value = student.dob;
        document.getElementById('class').value = student.className;
        document.getElementById('gpa').value = student.gpa;
    }
}

function deleteStudent(id) {
    const index = students.findIndex(student => student.id === id);
    if (index !== -1) {
        students.splice(index, 1);
        renderTable();
    }
}
