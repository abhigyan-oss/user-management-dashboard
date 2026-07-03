import { useEffect, useState } from "react";
import { getUsers } from "../api/usersApi";
import UserTable from "../components/UserTable";
import SearchBar from "../components/SearchBar";
import FilterModal from "../components/FilterModal";
import Pagination from "../components/Pagination";
import UserForm from "../components/UserForm";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [department, setDepartment] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 100;

  // New state
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    let result = [...users];

    if (searchTerm.trim()) {
      const value = searchTerm.toLowerCase();

      result = result.filter(
        (user) =>
          user.firstName.toLowerCase().includes(value) ||
          user.lastName.toLowerCase().includes(value) ||
          user.email.toLowerCase().includes(value) ||
          user.department.toLowerCase().includes(value)
      );
    }

    if (department) {
      result = result.filter((user) => user.department === department);
    }

    setFilteredUsers(result);
    setCurrentPage(1);
  }, [users, searchTerm, department]);

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
      setFilteredUsers(formattedUsers);
    } catch (err) {
      setError("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  }

  const lastUserIndex = currentPage * usersPerPage;
  const firstUserIndex = lastUserIndex - usersPerPage;

  const currentUsers = filteredUsers.slice(firstUserIndex, lastUserIndex);

  if (loading) return <h2>Loading...</h2>;

  if (error) return <h2>{error}</h2>;

  return (
    <div className="dashboard">
      <h1>User Management Dashboard</h1>

      <p className="total-users">Total Users: {filteredUsers.length}</p>

      <button
        onClick={() => setShowForm(true)}
        style={{
          marginBottom: "20px",
          padding: "10px 20px",
          cursor: "pointer",
        }}
      >
        Add User
      </button>

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <FilterModal
        department={department}
        setDepartment={setDepartment}
      />

      <div className="table-container">
        <UserTable users={currentUsers} />
      </div>

      <Pagination
        totalUsers={filteredUsers.length}
        usersPerPage={usersPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      {showForm && (
        <UserForm
          users={users}
          setUsers={setUsers}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}

export default Dashboard;