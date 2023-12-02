import React from "react";
import jsondata from "./amazondata.json";
const Table = () => {
  return (
    <div>
      <table>
        {jsondata.user.map((x) => {
          return (
            <>
              <td>{x.id}</td>
              <td>{x.name}</td>
              <td>{x.role}</td>
              <td>{x.email}</td>
            </>
          );
        })}
      </table>
    </div>
  );
};

export default Table;
