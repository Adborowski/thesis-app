import classes from "./TaskEditor.module.css";
import { useState, useEffect } from "react";
// this is the content of the task editor popup

const TaskEditor = (props) => {
  const [taskTitle, setTaskTitle] = useState();
  const [taskDescription, setTaskDescription] = useState();
  const [taskReward, setTaskReward] = useState();
  const [taskLatlng, setTaskLatlng] = useState();

  // dummy latlng is [0,0]
  useEffect(() => {
    if (props.latlng[0] === 0) {
      console.log("received dummy latlng props", props.latlng);
    } else {
      console.log("received real latlng props", props.latlng);
      setTaskLatlng(props.latlng);
    }
  }, []);

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
    const newTaskData = {
      title: taskTitle,
      description: taskDescription,
      reward: taskReward,
      latlng: props.latlng,
    };
    console.log("Creating new task...", newTaskData);
  };

  if (props.latlng) {
    return (
      <div className={classes.TaskEditor}>
        <div className={classes.latlng}>
          <div className={classes.position}>
            {taskLatlng ? taskLatlng.lat : "dummy"}
          </div>
          <div className={classes.position}>
            {taskLatlng ? taskLatlng.lng : "dummy"}
          </div>
        </div>

        <form className={classes.form}>
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
