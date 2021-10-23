import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const UpdateUser = () => {
  const [user, setUser] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const url = `http://localhost:5000/users/${id}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  const handleUpdateUser = (e) => {
    const url = `http://localhost:5000/users/${id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          alert("Updated Successfully.");
          setUser({});
        }
      });
    e.preventDefault();
  };
  const handleNameChange = (e) => {
    const updatedName = e.target.value;
    const updatedUser = { name: updatedName, email: user.email };
    setUser(updatedUser);
  };

  const handleEmailChange = (e) => {
    const updateEmail = e.target.value;
    // const updatedUser = {...user};
    // updateUser.email = updatedEmail;
    const updatedUser = { name: user.name, email: updateEmail };
    setUser(updatedUser);
  };
  return (
    <div>
      <h1>update: {user.name}</h1>
      <h2>This is Update User: {id}</h2>
      <form onSubmit={handleUpdateUser}>
        <input
          onChange={handleNameChange}
          type="text"
          value={user.name || ""}
          name=""
          placeholder="name"
          id=""
        />
        <input
          onChange={handleEmailChange}
          type="email"
          value={user.email || ""}
          name=""
          placeholder="email"
          id=""
        />
        <input type="submit" value="update" />
      </form>
    </div>
  );
};

export default UpdateUser;
