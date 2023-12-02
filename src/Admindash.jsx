import React from "react";
import { useState } from "react";

import jdata from "./amazondata.json";
import axiosinstance from "./helpers/AxiosInstance";
import { Link } from "react-router-dom";
import { useEffect } from "react";
const Admindash = () => {
  const user = jdata.user;
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = user.slice(firstIndex, lastIndex);
  const npage = Math.ceil(user.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);
  const [searchname, setsearchname] = useState("");
  const [data, setData] = useState(records);

  // Function to handle delete
  const handleDelete = (id) => {
    axiosinstance.delete(`/user/${id}`);
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
  };
  const handleRole = (id, newrole, email, name) => {
    let role = newrole;
    let payload = { role, name, email };
    let resp = axiosinstance.put(`/user/${id}`, payload);
  };
  const handleEmail = (id, newemail, name, role) => {
    let email = newemail;
    let payload = { email, name, role };
    let resp = axiosinstance.put(`/user/${id}`, payload);
  };

  return (
    <div className="container">
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
        />
      </div>
      <table cellSpacing={0} id="myTable" className="table table-hover">
        <tbody>
          {records
            .filter((item) => {
              return searchname === "" ? item : item.name.includes(searchname);
            })
            .map((x) => {
              console.log(x.id);

              return (
                <>
                  <tr>
                    <td className="item">
                      <input type="checkbox" />
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
        </ul>
      </nav>
    </div>
  );
};

export default Admindash;
