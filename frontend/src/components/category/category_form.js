import React from "react";
import { withRouter } from "react-router-dom";

class CategoryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      name: ""
    };
  }

  update(field) {
    return e =>
      this.setState({
        [field]: e.currentTarget.value
      });
  }

  handleSubmit(e) {
    console.log(this.props, 'submit propbs')
    console.log(this.state,' submit state')
    e.preventDefault();
    let cat = {
      title: this.state.title
    };
    let task = {
      name: this.state.name,
      status: "Incomplete",
      category_id: ""
    }
    this.props.processCat(cat)
      .then((category) => {task.category_id = category.category.data._id
        this.props.addTask(task)
      })
      .then(this.props.closeModal())
    }

  

  render() {
    return (
      <div className="cat-modal">
        <form className="cat-form" onSubmit={this.handleSubmit.bind(this)}>
          <h1>Add a Category</h1>
          <h3>Title:</h3>
          <input
            type="text"
            className="cat-title-input"
            autoFocus="autofocus"
            value={this.state.title}
            onChange={this.update("title")}
            placeholder="Title"
          />
          <br></br>
          <h3>Tasks:</h3>
          <input
            type="text"
            className="cat-task-input"
            value={this.state.name}
            onChange={this.update("name")}
            placeholder="Task"
          />
          <input type="submit" className="add-cat-submit" value="Submit" />
        </form>
      </div>
    );
  }
}



export default CategoryForm;