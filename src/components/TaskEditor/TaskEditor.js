import classes from "./TaskEditor.module.css";
import { useState } from "react";

// this is the content of the task editor popup
// the TaskEditor is
const TaskEditor = (props) => {
  const [taskTitle, setTaskTitle] = useState("Dummy Title");
  const [taskDescription, setTaskDescription] = useState("Dummy Description");
  const [taskReward, setTaskReward] = useState(0);

  const handleTitleChange = (e) => {
    console.log(e.target.value);
    setTaskTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    console.log(e.target.value);
    setTaskDescription(e.target.value);
  };

  const handleRewardChange = (e) => {
    console.log(e.target.value);
    setTaskReward(e.target.value);
  };

  const handleCreateTask = (e) => {
    console.log("Creating task...", e);
  };

  if (props.latlng) {
    return (
      <div className={classes.TaskEditor}>
        <h3>Task name</h3>

        <input
          onChange={handleTitleChange}
          id="taskTitle"
          placeholder={"task title"}
        ></input>

        <input
          onChange={handleDescriptionChange}
          id="taskDescription"
          placeholder={"task description"}
        ></input>

        <input
          onChange={handleRewardChange}
          id="taskReward"
          type="number"
          placeholder={"reward"}
        ></input>

        <div id="btnCreateTask" className={"button"} onClick={handleCreateTask}>
          Create
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default TaskEditor;
