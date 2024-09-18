document.addEventListener('DOMContentLoaded', function() {
    fetchStudents();

    document.getElementById('student-form').addEventListener('submit', function(e) {
        e.preventDefault();
        addStudent();
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
