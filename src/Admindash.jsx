import React from "react";
import { useState } from "react";

import jdata from "./amazondata.json";
import axiosinstance from "./helpers/AxiosInstance";

const Admindash = () => {
  const [user, setUser] = useState(jdata.user);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = user.slice(firstIndex, lastIndex);
  const npage = Math.ceil(user.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);
  const [searchname, setsearchname] = useState("");
  const [data, setData] = useState(records);
  const [selectedRows, setSelectedRows] = useState([]);

  // Function to handle delete
  const handleDelete = (id) => {
    axiosinstance.delete(`/user/${id}`);
    alert("deleted");
    window.location.assign("/");
  };
  const Nextpage = () => {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  };
  const prepage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const changeCpage = (id) => {
    setCurrentPage(id);
  };

  const handlename = (id, newname, role, email) => {
    let name = newname;
    let payload = { name, role, email };
    let resp = axiosinstance.put(`/user/${id}`, payload);
    window.location.assign("/");
  };
  const handleRole = (id, newrole, email, name) => {
    let role = newrole;
    let payload = { role, name, email };
    let resp = axiosinstance.put(`/user/${id}`, payload);
    window.location.assign("/");
  };
  const handleEmail = (id, newemail, name, role) => {
    let email = newemail;
    let payload = { email, name, role };
    let resp = axiosinstance.put(`/user/${id}`, payload);
    window.location.assign("/");
  };
  const handleCheckboxChange = (id) => {
    const updatedSelectedRows = [...selectedRows];
    const index = updatedSelectedRows.indexOf(id);

    if (index === -1) {
      updatedSelectedRows.push(id);
    } else {
      updatedSelectedRows.splice(index, 1);
    }

    setSelectedRows(updatedSelectedRows);
    const tableRow = document.getElementById(`row-${id}`);

    console.log(tableRow);
    if (tableRow) {
      tableRow.classList.toggle(
        "table-danger",
        updatedSelectedRows.includes(id)
      );
    }
  };
  const handleDeleteAll = () => {
    selectedRows.map((x) => {
      axiosinstance.delete(`/user/${x}`);
      window.location.assign("/");
    });
  };

  return (
    <div className="container shadow p-3 mb-5 bg-body-tertiary rounded">
      <h1>Admin Dashboard</h1>
      <div>
        <input
          type="search"
          name=""
          id=""
          placeholder="search"
          onChange={(e) => {
            setsearchname(e.target.value);
          }}
          className="form-control me-2 search"
        />
      </div>
      <table cellSpacing={0} id="myTable" className="table table-hover">
        <thead>
          <th></th>
          <th>Id</th>
          <th>name</th>
          <th>email</th>
          <th>role</th>
        </thead>
        <tbody>
          {records
            .filter((item) => {
              return searchname === "" ? item : item.name.includes(searchname);
            })
            .map((x) => {
              console.log(x.id);

              return (
                <>
                  <tr
                    className={
                      selectedRows.includes(x.id) ? "table-danger item" : "item"
                    }
                    id={`row-${x.id}`}
                  >
                    <td>
                      <input
                        type="checkbox"
                        onChange={() => handleCheckboxChange(x.id)}
                        checked={selectedRows.includes(x.id)}
                        id={`check-${x.id}`}
                        name="selected"
                      />
                    </td>
                    <td className="item">{x.id}</td>
                    <td className="item">{x.name}</td>
                    <td className="item">{x.email}</td>
                    <td className="item">{x.role}</td>
                    <td>
                      <button
                        onClick={() => {
                          handleDelete(x.id);
                        }}
                        className="btn btn-danger"
                      >
                        delete
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          let key = prompt(
                            `to update name enter "name"\n to update role enter "role"\n to update email enter "email"`
                          );
                          if (key === "role") {
                            const newRole = prompt("Enter new role:");
                            if (newRole !== null) {
                              handleRole(x.id, newRole, x.email, x.name);
                            }
                          }
                          if (key === "name") {
                            const newname = prompt("Enter new name:");
                            if (newname !== null) {
                              handlename(x.id, newname, x.role, x.email);
                            }
                          }
                          if (key === "email") {
                            const newemail = prompt("Enter new email:");
                            if (newemail !== null) {
                              handleEmail(x.id, newemail, x.name, x.role);
                            }
                          }
                        }}
                        className="btn btn-success"
                      >
                        edit
                      </button>
                    </td>
                  </tr>
                </>
              );
            })}
        </tbody>
      </table>
      <nav>
        <ul className="pagination">
          <li className="page-item">
            <a href="#" className="page-link" onClick={prepage}>
              Prev
            </a>
          </li>
          {numbers.map((n, i) => {
            return (
              <>
                <li
                  className={`page-item ${currentPage === n ? "active" : ""}`}
                  key={i}
                >
                  <a
                    href="#"
                    className="page-link"
                    onClick={() => {
                      changeCpage(n);
                    }}
                  >
                    {n}
                  </a>
                </li>
              </>
            );
          })}
          <li className="page-item">
            <a href="#" className="page-link" onClick={Nextpage}>
              Next
            </a>
          </li>
          <button
            onClick={handleDeleteAll}
            className="btn btn-danger deleteall"
          >
            deleteAll
          </button>
        </ul>
      </nav>
    </div>
  );
};

export default Admindash;
