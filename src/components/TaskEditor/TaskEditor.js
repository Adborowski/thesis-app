import classes from "./TaskEditor.module.css";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMap, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import EditorIcon from "../Icons/EditorIcon";
import axios from "axios";

const TaskEditor = (props) => {
  const [taskTitle, setTaskTitle] = useState();
  const [taskDescription, setTaskDescription] = useState();
  const [taskReward, setTaskReward] = useState();
  const [taskLatlng, setTaskLatlng] = useState([0, 0]);
  const [taskId, setTaskId] = useState();
  const [taskMedia, setTaskMedia] = useState();

  // figure out which Id is next in the database
  const getNewTaskId = () => {
    axios
      .get("https://tiszuk.com/tasks")
      .then(function (response) {
        const ids = response.data.map((task) => {
          return task.id;
        });
        let taskId = Math.max(...ids) + 1;
        setTaskId(taskId);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getNewTaskId();
  }, []);

  const MapScript = () => {
    const map = useMap();

    useEffect(() => {
      console.log("new taskLatLng", taskLatlng);
      map.panTo(taskLatlng);
    }, [taskLatlng]);

    return null;
  };

  // dummy latlng is [0,0]
  useEffect(() => {
    if (props.latlng[0] === 0) {
      // console.log("received dummy latlng props", props.latlng);
    } else {
      // console.log("received real latlng props", props.latlng);
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

  const handleMediaChange = (e) => {
    console.log(e.target.files[0]);
    setTaskMedia(e.target.files[0]);
  };

  const handleTaskSubmit = (e) => {
    const newTaskData = {
      id: taskId,
      ownerId: 1,
      media: ["jerry.jpeg"],
      title: taskTitle,
      description: taskDescription,
      reward: taskReward,
      latlng: [props.latlng.lat, props.latlng.lng],
    };
    console.log("Creating new task...", newTaskData);

    const newTaskFormData = new FormData();
    newTaskFormData.append("myFile", taskMedia);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    axios
      .post("http://tiszuk.com/upload-media", newTaskFormData, config)
      .then((response) => {
        alert("The file is successfully uploaded");
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .post("https://tiszuk.com/create-task", newTaskData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (props.latlng) {
    return (
      <div className={classes.TaskEditor}>
        <h1 className={classes.header}>Create Task</h1>

        <div className={classes.latlng}>
          <div className={classes.position}>
            {taskLatlng ? taskLatlng.lat : "dummy"}
          </div>
          <div className={classes.position}>
            {taskLatlng ? taskLatlng.lng : "dummy"}
          </div>
        </div>

        <div className={classes.miniMapWrapper}>
          <MapContainer
            className={classes.miniMap}
            center={taskLatlng}
            zoom={17}
            tap={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://tile.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=4a75cf0a5d344e36bb1ebac1821b42e2"
            />
            <MapScript />
            <Marker icon={EditorIcon()} position={taskLatlng} />
          </MapContainer>
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

          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            name="photo"
            onChange={handleMediaChange}
          />

          <div className={classes.buttons}>
            <div
              onClick={handleTaskSubmit}
              id="btnCreateTask"
              className={"button"}
            >
              Create
            </div>
            <div className={`${classes.btnCancel} button`}>Cancel</div>
          </div>
        </form>
      </div>
    );
  } else {
    return <h3>Error: task editor received no location data</h3>;
  }
};

export default TaskEditor;
