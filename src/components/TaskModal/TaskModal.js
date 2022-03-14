import classes from "./taskModal.module.css";
import { useState } from "react";

const TaskModal = (props) => {
  const openTaskModal = props.openTaskModal;
  return (
    <div id="taskModal" className={classes.taskModal}>
      <h1>task modal</h1>
    </div>
  );
};

export default TaskModal;
