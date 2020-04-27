import React from "react";

function TodoComponent(props) {

  const color = ["red", "blue", "green"];
  const index = Number(props.priority) - 1;

  return (
    <div
      className="row m-2"
      style={{
        color: `${color[index]}`,
        fontSize: "25px",
        border: "1px solid"
      }}
    >
      <span className="badge">{props.priority}</span>
      <div className="ml-2">{props.text}</div>

      <button
        className="btn btn-primary ml-auto font-weight-bold"
        style={{ fontSize: "20px" }}
        onClick={event => {
          props.handleDelete(event, props.text, props.priority);
        }}
        title="Remove item"
      >
        X
      </button>
    </div>
  );
}
export default TodoComponent;
