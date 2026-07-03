import { useEffect, useState } from "react";
import Modal from "./common/Modal";

function UserForm({
  users,
  setUsers,
  editingUser,
  setEditingUser,
  onClose,
}) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "Engineering",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingUser) {
      setFormData(editingUser);
    }
  }, [editingUser]);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  }

  function validate() {
    let newErrors = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "Required";

    if (!formData.lastName.trim())
      newErrors.lastName = "Required";

    if (!formData.email.trim())
      newErrors.email = "Required";

    if (
      formData.email &&
      !/\S+@\S+\.\S+/.test(formData.email)
    ) {
      newErrors.email = "Invalid email";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!validate()) return;

    if (editingUser) {
      const updated = users.map((user) =>
        user.id === editingUser.id
          ? { ...formData, id: editingUser.id }
          : user
      );

      setUsers(updated);
      setEditingUser(null);
    } else {
      setUsers([
        ...users,
        {
          ...formData,
          id: Date.now(),
        },
      ]);
    }

    onClose();
  }

  return (
    <Modal onClose={onClose}>

      <h2>
        {editingUser ? "Edit User" : "Add User"}
      </h2>

      <form onSubmit={handleSubmit}>

        <input
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
        />
        <small>{errors.firstName}</small>

        <input
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
        />
        <small>{errors.lastName}</small>

        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <small>{errors.email}</small>

        <select
          name="department"
          value={formData.department}
          onChange={handleChange}
        >
          <option>Engineering</option>
          <option>HR</option>
          <option>Marketing</option>
          <option>Finance</option>
          <option>Sales</option>
        </select>

        <div className="modal-buttons">

          <button
            type="button"
            className="secondary-btn"
            onClick={() => {
              setEditingUser(null);
              onClose();
            }}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="primary-btn"
          >
            {editingUser ? "Update" : "Save"}
          </button>

        </div>

      </form>

    </Modal>
  );
}

export default UserForm;