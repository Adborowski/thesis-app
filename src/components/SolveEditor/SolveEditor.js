import classes from "./SolveEditor.module.css";
import { useEffect, useState } from "react";
import Nav from "../Nav/Nav";
import { MapContainer, TileLayer, useMap, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Icon from "../Icons/Icon";
import Minimap from "../Minimap/Minimap";
import Masonry from "react-responsive-masonry";

const SolveEditor = (props) => {
  const [task, setTask] = useState(props.task);

  useEffect(() => {
    if (props.task) {
      setTask(props.task);
    }
  }, [props]);

  if (task) {
    return (
      <div className={classes.SolveEditor}>
        <Nav />
        <h1 className={classes.header}>Solve Task</h1>

        <div className={classes.latlng}>
          <div className={classes.position}>
            {task ? task.latlng[0] : "dummy"}
          </div>
          <div className={classes.position}>
            {task ? task.latlng[1] : "dummy"}
          </div>
        </div>

        <Minimap taskLatlng={task.latlng} icon={Icon} />

        <div className={classes.taskInfo}>
          <div className={`${classes.infoItem} ${classes.reward}`}>
            {0 == 1 && <div className={"label"}>Reward</div>}
            <div className={`${classes.content} taskReward`}>
              ${task.reward}
            </div>
          </div>
          <div className={classes.infoItem}>
            {0 == 1 && <div className={"label"}>Title</div>}
            <div className={`${classes.content} taskTitle`}>{task.title}</div>
          </div>

          <div className={classes.infoItem}>
            {0 == 1 && <div className={"label"}>Description</div>}
            <div className={`${classes.content} taskDescription`}>
              {task.description}
            </div>
          </div>
        </div>

        <div className={classes.taskMedia}>
          <Masonry columnsCount={2} gutter={"12px"}>
            {task.media.map((item) => (
              <img src={`data:image/jpeg;base64,${item}`} />
            ))}
          </Masonry>
        </div>
        {0 == 1 && <h1 className={classes.header}>Submit Solution</h1>}

        <div className={classes.controls}>
          <button className={"button"}>Submit</button>
          <button className={"button btnDelete"}>DELETE</button>
        </div>
      </div>
    );
  } else {
    return <Nav />;
  }
};

export default SolveEditor;
