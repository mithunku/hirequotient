import React from "react";
import { useState } from "react";

import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Edit = () => {
  let navigate = useNavigate();
  let { id } = useParams();
  let [name, setname] = useState("");
  let [email, setEmail] = useState("");
  let [role, setRole] = useState("");

  const handleEdit = () => {
    sessionStorage.setItem("name", name);
    sessionStorage.setItem("email", email);
    sessionStorage.setItem("role", role);
  };
  return (
    <div>
      <form onSubmit={handleEdit}>
        <label htmlFor="">Name</label>
        <input
          type="text"
          onChange={(e) => {
            setname(e.target.value);
          }}
        />
        <label htmlFor="">Email</label>
        <input
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <label htmlFor="">Role</label>
        <input
          type="text"
          onChange={(e) => {
            setRole(e.target.value);
          }}
        />
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default Edit;
