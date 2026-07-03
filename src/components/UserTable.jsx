function UserTable({ users, onSort, onEdit, onDelete }) {
    return (
      <table>
        <thead>
          <tr>
            <th onClick={() => onSort("id")}>
              ID ⬍
            </th>
  
            <th onClick={() => onSort("firstName")}>
              First Name ⬍
            </th>
  
            <th onClick={() => onSort("lastName")}>
              Last Name ⬍
            </th>
  
            <th onClick={() => onSort("email")}>
              Email ⬍
            </th>
  
            <th onClick={() => onSort("department")}>
              Department ⬍
            </th>
  
            <th>Actions</th>
          </tr>
        </thead>
  
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td
                colSpan="6"
                style={{
                  textAlign: "center",
                  padding: "30px",
                  fontWeight: "bold",
                }}
              >
                No Users Found
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
  
                <td>{user.firstName}</td>
  
                <td>{user.lastName}</td>
  
                <td>{user.email}</td>
  
                <td>{user.department}</td>
  
                <td
                  style={{
                    display: "flex",
                    gap: "10px",
                    flexWrap: "wrap",
                  }}
                >
                  <button
                    className="edit-btn"
                    onClick={() => onEdit(user)}
                  >
                    ✏ Edit
                  </button>
  
                  <button
                    className="delete-btn"
                    onClick={() => onDelete(user)}
                  >
                    🗑 Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    );
  }
  
  export default UserTable;