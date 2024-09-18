document.addEventListener('DOMContentLoaded', function() {
    fetchStudents();

    document.getElementById('student-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const studentId = document.getElementById('student-id').value;
        if (studentId) {
            updateStudent(studentId);
        } else {
            addStudent();
        }
    });
});
function fetchStudents() {
    fetch('/students')
        .then(response => response.json())
        .then(data => {
            let studentList = '';
            data.forEach(student => {
                studentList += `
                        <tr class="border-b hover:bg-gray-100">
                            <td class="py-2 px-4">${student.name}</td>
                            <td class="py-2 px-4">${student.email}</td>
                            <td class="py-2 px-4">${student.course}</td>
                            <td class="py-2 px-4">
                                <button onclick="editStudent(${student.id})" class="bg-yellow-400 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-500 transition duration-200">Edit</button>
                                <button onclick="deleteStudent(${student.id})" class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200">Delete</button>
                            </td>
                        </tr>`;
            });
            document.getElementById('student-list').innerHTML = studentList;
        });
}

function addStudent() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const course = document.getElementById('course').value;

    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    fetch('/students', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': csrfToken
        },
        body: JSON.stringify({
            name: name,
            email: email,
            course: course
        })
    })
        .then(response => response.json())
        .then(data => {
            fetchStudents();
            document.getElementById('student-form').reset();
        })
        .catch(error => console.error('Error:', error));
}

function deleteStudent(id) {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    fetch(`/students/${id}`, {
        method: 'DELETE',
        headers: {
            'X-CSRF-TOKEN': csrfToken
        }
    })
        .then(() => {
            fetchStudents();
        })
        .catch(error => console.error('Error:', error));
}

function editStudent(id) {
    fetch(`/students/${id}`)
        .then(response => response.json())
        .then(student => {
            document.getElementById('student-id').value = student.id;
            document.getElementById('name').value = student.name;
            document.getElementById('email').value = student.email;
            document.getElementById('course').value = student.course;

            document.getElementById('form-title').textContent = "Edit Student";
            document.getElementById('submit-button').textContent = "Update Student";
        })
        .catch(error => console.error('Error:', error));
}

function updateStudent(id) {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const course = document.getElementById('course').value;

    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    fetch(`/students/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': csrfToken
        },
        body: JSON.stringify({
            name: name,
            email: email,
            course: course
        })
    })
        .then(response => response.json())
        .then(data => {
            fetchStudents();
            document.getElementById('student-form').reset();
            document.getElementById('form-title').textContent = "Add New Student";
            document.getElementById('submit-button').textContent = "Add Student";
        })
        .catch(error => console.error('Error:', error));
}
