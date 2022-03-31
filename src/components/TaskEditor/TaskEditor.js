import classes from "./TaskEditor.module.css";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMap, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import EditorIcon from "../Icons/EditorIcon";
import axios from "axios";
import Minimap from "../Minimap/Minimap";
import Nav from "../Nav/Nav";

const TaskEditor = (props) => {
  const [taskTitle, setTaskTitle] = useState();
  const [taskDescription, setTaskDescription] = useState();
  const [taskReward, setTaskReward] = useState();
  const [taskLatlng, setTaskLatlng] = useState([0, 0]);
  const [taskId, setTaskId] = useState();
  const [taskMedia, setTaskMedia] = useState();

  // Minimap takes a whole task so let's make a dummy
  const [fakeTask, setFakeTask] = useState({ latlng: [0, 0] });

  useEffect(() => {
    setFakeTask({ latlng: taskLatlng });
  }, [taskLatlng]);

  // figure out which Id is next in the database

  const getNewTaskId = () => {
    axios
      .get("http://localhost:81/tasks")
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
    console.log(e.target.files);
    setTaskMedia(e.target.files);
  };

  const handleTaskSubmit = (e) => {
    e.preventDefault();
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

    // axios
    //   .post("https://tiszuk.com/create-task", newTaskData)
    //   .then((res) => {
    //     console.log(res.data);
    //     if (res.data) {
    //       props.closeTaskModal();
    //       props.fetchTaskData();
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    const formData = new FormData();

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    for (var mediaItem of taskMedia) {
      console.log(mediaItem);
      formData.append("uploadedFile", mediaItem);
    }

    axios
      .post("http://localhost:81/upload-media", formData, config)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });

    for (var p of formData) {
      console.log(p);
    }

    // fetch("https://tiszuk.com/upload-media", {
    //   method: "POST",
    //   body: newTaskFormData,
    // })
    //   .then((response) => response.json())
    //   .then((result) => {
    //     console.log("Success:", result);
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });
  };

  if (props.latlng) {
    return (
      <div className={classes.TaskEditor}>
        <Nav />
        <h1 className={classes.header}>Create Task</h1>

        <div className={classes.latlng}>
          <div className={classes.position}>
            {taskLatlng ? taskLatlng.lat : "dummy"}
          </div>
          <div className={classes.position}>
            {taskLatlng ? taskLatlng.lng : "dummy"}
          </div>
        </div>

        <Minimap taskLatlng={taskLatlng} icon={EditorIcon} />

        <form
          className={classes.form}
          encType="multipart/form-data"
          onSubmit={handleTaskSubmit}
          id="form"
        >
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
            multiple
            accept=".png, .jpg, .jpeg"
            name="uploadedFile"
            onChange={handleMediaChange}
          />

          <div className={classes.buttons}>
            <button type="submit" id="btnCreateTask" className={"button"}>
              Create
            </button>
            <div
              onClick={props.closeTaskModal}
              className={`${classes.btnCancel} button`}
            >
              Cancel
            </div>
          </div>
        </form>
      </div>
    );
  } else {
    return <h3>Error: task editor received no location data</h3>;
  }
};

export default TaskEditor;
