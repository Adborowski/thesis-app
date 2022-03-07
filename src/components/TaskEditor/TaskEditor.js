import classes from "./TaskEditor.module.css";

// this is the content of the task editor popup
const TaskEditor = (props) => {
  if (props.latlng) {
    return (
      <div className={classes.TaskEditor}>
        <h3>Task name</h3>
        <input placeholder={"task title"}></input>
        <input type="number" placeholder={"reward"}></input>
        <input placeholder={"task description"}></input>
      </div>
    );
  } else {
    return null;
  }
};

export default TaskEditor;
