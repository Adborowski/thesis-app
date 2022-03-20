import classes from "./TaskEditor.module.css";
import { useState, useEffect } from "react";
// this is the content of the task editor popup

const TaskEditor = (props) => {
  const [taskTitle, setTaskTitle] = useState();
  const [taskDescription, setTaskDescription] = useState();
  const [taskReward, setTaskReward] = useState();
  const [taskLatlng, setTaskLatlng] = useState(props.latlng);

  useEffect(() => {
    setTaskLatlng(props.latlng);
  }, [props.latlng]);

  const handleTitleChange = (e) => {
    console.log(e.target.value);
    setTaskTitle(e.target.value);
  };

  const handleRewardChange = (e) => {
    console.log(e.target.value);
    setTaskReward(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    console.log(e.target.value);
    setTaskDescription(e.target.value);
  };

  const handleTaskSubmit = (e) => {
    console.log("Creating new task...");
    console.log("Title:", taskTitle);
    console.log("Description:", taskDescription);
    console.log("Reward", taskReward);
    console.log("Latlng:", taskLatlng);
  };

  if (props.latlng) {
    return (
      <div className={classes.TaskEditor}>
        <h3>Task name</h3>
        <form>
          <input
            onChange={handleTitleChange}
            id="taskTitle"
            placeholder={"task title"}
          ></input>

          <input
            onChange={handleRewardChange}
            id="taskReward"
            type="number"
            placeholder={"reward"}
          ></input>

          <input
            onChange={handleDescriptionChange}
            id="taskDescription"
            placeholder={"task description"}
          ></input>

          <div
            onClick={handleTaskSubmit}
            id="btnCreateTask"
            className={"button"}
          >
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
