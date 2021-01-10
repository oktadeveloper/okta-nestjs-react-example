import React from "react";

const ToDoList = ({ authState, list, onCompleteItem }) => {
  if (!authState.isAuthenticated) {
    return (
      <div>
        <p>
          Hey there, it looks like you aren't logged in yet. To log in, click
          here.
        </p>
      </div>
    );
  } else if (!list) {
    return <div className="container">Loading....</div>;
  }

  return (
    <div className="container">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Task</th>
            <th width="15%">Complete</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item, i) => {
            return (
              <tr key={i}>
                <td>{item.text}</td>
                <td>
                  <button className="btn btn-primary" onClick={() => onCompleteItem(item)}>
                    Complete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default ToDoList;
