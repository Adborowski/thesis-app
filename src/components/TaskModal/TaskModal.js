import classes from "./taskModal.module.css";
import TaskEditor from "../TaskEditor/TaskEditor";
import { useState } from "react";

const TaskModal = (props) => {
  const closeTaskModal = () => {
    const taskModal = document.getElementById("taskModal");
    taskModal.classList.remove("open");
    console.log("closing task modal");
  };

  return (
    <div id="taskModal" data-lat="" data-lng="" className={classes.taskModal}>
      <div className={classes.controls}>
        <div onClick={closeTaskModal} className={classes.btnCloseModal}>
          x
        </div>
      </div>
      <TaskEditor latlng={[0, 0]} />
    </div>
  );
};

export default TaskModal;
