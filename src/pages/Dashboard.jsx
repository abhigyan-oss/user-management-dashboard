import { useEffect, useState } from "react";
import { getUsers } from "../api/usersApi";
import UserTable from "../components/UserTable";
import SearchBar from "../components/SearchBar";
import FilterModal from "../components/FilterModal";
import Pagination from "../components/Pagination";
import UserForm from "../components/UserForm";
import DeleteModal from "../components/DeleteModal";
import { sortUsers } from "../utils/sortUser";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Search
  const [searchTerm, setSearchTerm] = useState("");

  // Filter
  const [department, setDepartment] = useState("");

  // Sorting
  const [sortConfig, setSortConfig] = useState({
    key: "",
    direction: "asc",
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Add / Edit Modal
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // Delete Modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      setLoading(true);

      const response = await getUsers();

      const departments = [
        "Engineering",
        "HR",
        "Marketing",
        "Finance",
        "Sales",
      ];

      const formattedUsers = response.data.map((user, index) => {
        const names = user.name.split(" ");

        return {
          id: user.id,
          firstName: names[0],
          lastName: names.slice(1).join(" "),
          email: user.email,
          department: departments[index % departments.length],
        };
      });

      setUsers(formattedUsers);
    } catch (err) {
      setError("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  }

  function handleSort(key) {
    let direction = "asc";

    if (
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }

    setSortConfig({
      key,
      direction,
    });
  }

  const filteredUsers = users.filter((user) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      user.firstName.toLowerCase().includes(search) ||
      user.lastName.toLowerCase().includes(search) ||
      user.email.toLowerCase().includes(search);

    const matchesDepartment =
      department === "" || user.department === department;

    return matchesSearch && matchesDepartment;
  });

  const sortedUsers = sortUsers(filteredUsers, sortConfig);

  const totalPages = Math.ceil(sortedUsers.length / rowsPerPage);

  const startIndex = (currentPage - 1) * rowsPerPage;

  const paginatedUsers = sortedUsers.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  function handleEdit(user) {
    setEditingUser(user);
    setShowForm(true);
  }

  function handleDelete(user) {
    setSelectedUser(user);
    setShowDeleteModal(true);
  }

  function confirmDelete() {
    setUsers(users.filter((user) => user.id !== selectedUser.id));
    setShowDeleteModal(false);
    setSelectedUser(null);
  }

  if (loading) return <h2>Loading...</h2>;

  if (error) return <h2>{error}</h2>;

  return (
    <div className="dashboard">
      <h1>User Management Dashboard</h1>

      <p className="total-users">
        Total Users: {sortedUsers.length}
      </p>

      <div
        style={{
          display: "flex",
          gap: "15px",
          flexWrap: "wrap",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <FilterModal
          department={department}
          setDepartment={setDepartment}
        />

        <button
          className="primary-btn"
          onClick={() => {
            setEditingUser(null);
            setShowForm(true);
          }}
        >
          + Add User
        </button>
      </div>

      <div className="table-container">
        <UserTable
          users={paginatedUsers}
          onSort={handleSort}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
      />

      {showForm && (
        <UserForm
          users={users}
          setUsers={setUsers}
          editingUser={editingUser}
          setEditingUser={setEditingUser}
          onClose={() => {
            setShowForm(false);
            setEditingUser(null);
          }}
        />
      )}

      {showDeleteModal && (
        <DeleteModal
          onConfirm={confirmDelete}
          onCancel={() => {
            setShowDeleteModal(false);
            setSelectedUser(null);
          }}
        />
      )}
    </div>
  );
}

export default Dashboard;