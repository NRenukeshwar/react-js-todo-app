import React, { Component } from "react";
import { render } from "react-dom";
import TodoComponent from "./todoComponent";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      todolist: [
        { priority: "3", text: "Sample Task 3" },
        { priority: "1", text: "Sample Task 1" }
      ],
      text: "",
      priority: ""
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    let text = this.state.text;
    let priority = this.state.priority;
    let todolist = this.state.todolist;

    if (text != "" && priority != "") {
      const arr = todolist.filter(todo => todo.text == text);
      if (arr[0] == null) {
        let todo = {
          priority: priority,
          text: text
        };

        todolist.push(todo);
        this.setState({
          todolist: todolist,
          text: "",
          priority: ""
        });
      } else {
        alert("Todo item already added");
        this.setState({
          text: "",
          priority: ""
        });
      }
    }
  };

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  };

  handleDelete = (event, text, priority) => {
    event.preventDefault();
    let todo = {
      priority: priority,
      text: text
    };
    const list = this.state.todolist;
    list = list.filter(todo => todo.text != text);
    this.setState({
      todolist: list
    });
  };
  
  render() {
    const sorted = this.state.todolist.sort((a, b) =>
      a.priority.localeCompare(b.priority)
    );
    const show = sorted.map(todo => (
      <TodoComponent
        key={todo.text}
        text={todo.text}
        priority={todo.priority}
        handleDelete={this.handleDelete}
      />
    ));
    return (
      <div>
        <h1 className="text-white text-center bg-primary mb-3">TODO APP</h1>
        <div className="container">
          <form
            className="m-2"
            onSubmit={event => this.handleSubmit(event)}
            method="POST"
          >
            <div className="row">
              <input
                className="form-control offset-sm-1 col-sm-7"
                type="text"
                id="text"
                name="text"
                placeholder="Enter Todo item text"
                value={this.state.text}
                onChange={event => this.handleChange(event)}
                required
              />

              <select
                id="priority"
                name="priority"
                className="form-control col-sm-2"
                onChange={event => this.handleChange(event)}
                value={this.state.priority}
                required
              >
                <option value="">Select Priority</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
              <div className="col d-flex justify-content-center">
                <button id="submit" className="btn btn-success">
                  Add ToDo
                </button>
              </div>
            </div>
          </form>
          <p className="text-center mt-3">
            <i>ToDo Items pending list...</i>
          </p>
          <div style={{ maxWidth: "700px" }} className="mx-auto">
            {show}
          </div>
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
