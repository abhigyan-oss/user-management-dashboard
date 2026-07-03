import { useEffect, useState } from "react";
import { getUsers } from "../api/usersApi";
import UserTable from "../components/UserTable";
import SearchBar from "../components/SearchBar";
import { sortUsers } from "../utils/sortUser";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [sortConfig, setSortConfig] = useState({
    key: "",
    direction: "asc",
  });

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

    return (
      user.firstName.toLowerCase().includes(search) ||
      user.lastName.toLowerCase().includes(search) ||
      user.email.toLowerCase().includes(search) ||
      user.department.toLowerCase().includes(search)
    );
  });

  const sortedUsers = sortUsers(filteredUsers, sortConfig);

  if (loading) return <h2>Loading...</h2>;

  if (error) return <h2>{error}</h2>;

  return (
    <div className="dashboard">
      <h1>User Management Dashboard</h1>

      <p className="total-users">
        Total Users: {sortedUsers.length}
      </p>

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <div className="table-container">
        <UserTable
          users={sortedUsers}
          onSort={handleSort}
        />
      </div>
    </div>
  );
}

export default Dashboard;