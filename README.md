# User Management Dashboard

A responsive User Management Dashboard built with React and Vite. The application allows users to view, search, filter, sort, add, edit, and delete user records using the JSONPlaceholder REST API.

## Features

- View all users
- Add new users
- Edit existing users
- Delete users
- Search users
- Filter users by department
- Sort users by different columns
- Pagination (10, 25, 50, 100 rows)
- Responsive design
- Form validation
- Error handling

## Tech Stack

- React
- Vite
- JavaScript
- Axios
- CSS

## API

The project uses the JSONPlaceholder API.

https://jsonplaceholder.typicode.com/users

## Installation

Clone the repository

```bash
git clone https://github.com/abhigyan-oss/user-management-dashboard.git
```

Go to the project folder

```bash
cd user-management-dashboard
```

Install dependencies

```bash
npm install
```

Run the project

```bash
npm run dev
```

## Folder Structure

```
src/
│
├── api/
├── components/
│   ├── common/
│   ├── UserForm.jsx
│   ├── UserTable.jsx
│   ├── Pagination.jsx
│   ├── SearchBar.jsx
│   └── FilterModal.jsx
│
├── hooks/
├── pages/
├── utils/
├── constants/
```

## Challenges Faced

- Mapping JSONPlaceholder data into the required structure.
- Managing search, sorting, filtering, and pagination together.
- Reusing the same form for Add and Edit operations.
- Handling simulated CRUD operations using JSONPlaceholder.

## Future Improvements

- Authentication
- Dark Mode
- Unit Tests
- Toast Notifications
- Backend Integration with a real database

## Live Demo

https://user-management-dashboard-eight-delta.vercel.app/

## Author

Abhigyan Jha
