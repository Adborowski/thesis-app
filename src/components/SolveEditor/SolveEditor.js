import classes from "./SolveEditor.module.css";
import { useEffect, useState } from "react";
import Nav from "../Nav/Nav";
import { MapContainer, TileLayer, useMap, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Icon from "../Icons/Icon";
import Minimap from "../Minimap/Minimap";

const SolveEditor = (props) => {
  const [task, setTask] = useState(props.task);
  console.log(props);

  useEffect(() => {
    if (props.task) {
      setTask(props.task);
      console.log(props);
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
          <div className={classes.infoItem}>
            <div className={classes.label}>Title</div>
            <div className={classes.content}>{task.title}</div>
          </div>
          <div className={classes.infoItem}>
            <div className={classes.label}>Description</div>
            <div className={classes.content}>{task.description}</div>
          </div>
          <div className={classes.infoItem}>
            <div className={classes.label}>Reward</div>
            <div className={classes.content}>{task.reward}</div>
          </div>
        </div>

        <h1 className={classes.header}>Task Media</h1>
        <div className={classes.taskMedia}>
          {task.media.map((item) => (
            <div
              key={item}
              style={{ backgroundImage: `url(img/${item})` }}
              className={classes.mediaItem}
            ></div>
          ))}
        </div>

        <div className={classes.controls}></div>
      </div>
    );
  } else {
    return <p>loading...</p>;
  }
};

export default SolveEditor;
