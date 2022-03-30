import classes from "./SolveEditor.module.css";

const SolveEditor = () => {
  return (
    <div className={classes.SolveEditor}>
      <h1>Solve Task</h1>
      <div className={classes.controls}>
        <div className={`button ${classes.btnBack}`}>back</div>
      </div>
    </div>
  );
};

export default SolveEditor;
