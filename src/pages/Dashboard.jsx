import { useEffect, useState } from "react";
import { getUsers } from "../api/usersApi";
import UserTable from "../components/UserTable";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div className="dashboard">
      <h1>User Management Dashboard</h1>
  
      <p className="total-users">Total Users: {users.length}</p>
  
      <div className="table-container">
        <UserTable users={users} />
      </div>
    </div>
  );
}

export default Dashboard;