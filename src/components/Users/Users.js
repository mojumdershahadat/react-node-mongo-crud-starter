import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  // delete an user
  const handleDeleteUser = (id) => {
    const proceed = window.confirm("Are you sure, you want to delete?");
    if (proceed) {
      const url = `http://localhost:5000/users/${id}`;
      fetch(url, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            alert("deleted successfully");
            const remainingUsers = users.filter((user) => user._id !== id);
            setUsers(remainingUsers);
          }
        });
    }
  };

  return (
    <div>
      <h2>This is Users: {users.length}</h2>
      <ul>
        {users.map((pd) => (
          <li key={pd._id}>
            {pd.name} :: {pd.email}
            <Link to={`/users/update/${pd._id}`}>
              <button>update</button>
            </Link>
            <button onClick={() => handleDeleteUser(pd._id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
