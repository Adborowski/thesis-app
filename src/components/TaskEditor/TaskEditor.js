import classes from "./TaskEditor.module.css";

// this is the content of the task editor popup
// the TaskEditor is
const TaskEditor = (props) => {
  if (props.latlng) {
    return (
      <div className={classes.TaskEditor}>
        <h3>Task name</h3>
        <form>
          <input id="taskTitle" placeholder={"task title"}></input>
          <input id="taskReward" type="number" placeholder={"reward"}></input>
          <input id="taskDescription" placeholder={"task description"}></input>
          <div id="btnCreateTask" className={"button"}>
            Create
          </div>
        </form>
      </div>
    );
  } else {
    return null;
  }
};

export default TaskEditor;
