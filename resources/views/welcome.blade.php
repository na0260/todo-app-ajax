<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Laravel</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet"/>

    <script src="https://cdn.tailwindcss.com"></script>
    <script src="{{ asset('ajax.js') }}" defer></script>
</head>
<body class="bg-gray-100">
<div class="flex flex-col items-center justify-center max-w-[50%]  mx-auto p-8 ">
    <div>
        <h1 class="text-3xl font-bold text-center mb-8 text-gray-800">Student Info Management</h1>
        <form id="student-form" class="min-w-full bg-white p-6 rounded shadow-md mb-8">
            <input type="hidden" id="student-id">
            <h2 id="form-title" class="text-2xl font-bold mb-4">Add New Student</h2>
            <div class="flex items-center justify-center gap-4 mb-4">
                <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" id="name" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                       placeholder="Enter student name" required>
            </div>
            <div class="flex items-center justify-center gap-4 mb-4">
                <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" id="email" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                       placeholder="Enter student email" required>
            </div>
            <div class="flex items-center justify-center gap-4 mb-4">
                <label for="course" class="block text-sm font-medium text-gray-700">Course</label>
                <input type="text" id="course" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                       placeholder="Enter course" required>
            </div>
            <button type="submit" id="submit-button"
                    class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200 end">Add
                Student
            </button>

        </form>
    </div>
    <div>
        <table class="min-w-full bg-white shadow-md rounded-lg">
            <thead class="bg-gray-100">
            <tr>
                <th class="py-2 px-4 text-left">Name</th>
                <th class="py-2 px-4 text-left">Email</th>
                <th class="py-2 px-4 text-left">Course</th>
                <th class="py-2 px-4 text-left">Actions</th>
            </tr>
            </thead>
            <tbody id="student-list"></tbody>
        </table>
    </div>

</div>

</body>
</html>
