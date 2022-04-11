import classes from "./TaskEditor.module.css";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMap, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import EditorIcon from "../Icons/EditorIcon";
import axios from "axios";
import Minimap from "../Minimap/Minimap";
import Nav from "../Nav/Nav";
import uuid from "react-uuid";

const TaskEditor = (props) => {
  const [taskTitle, setTaskTitle] = useState();
  const [taskDescription, setTaskDescription] = useState();
  const [taskReward, setTaskReward] = useState();
  const [taskLatlng, setTaskLatlng] = useState([0, 0]);
  const [taskId, setTaskId] = useState();
  const [taskMedia, setTaskMedia] = useState(); // frontend
  // Minimap takes a whole task so let's make a dummy
  const [fakeTask, setFakeTask] = useState({ latlng: [0, 0] });
  const [mediaRefs, setMediaRefs] = useState([]);
  const [mediaStrings, setMediaStrings] = useState([]);

  useEffect(() => {
    setFakeTask({ latlng: taskLatlng });
  }, [taskLatlng]);

  useEffect(() => {
    console.log("taskMedia:", taskMedia);

    if (taskMedia) {
      for (let i = 0; i < taskMedia.length; i++) {
        const imageData = new FormData();
        imageData.append("task_media", taskMedia[i]);

        axios
          .post("http://localhost:81/upload-media", imageData, {
            headers: {
              "Content-type": "multipart/form-data",
            },
          })
          .then((res) => {
            console.log(res);
            setMediaStrings((mediaStrings) => [
              ...mediaStrings,
              res.data.imgString,
            ]);
          })
          .catch((error) => {
            console.log(error);
          });
      } // end of for loop
    } // end of if
  }, [taskMedia]);

  useEffect(() => {
    console.log("mediaRefs", mediaRefs);
  }, [mediaRefs]);

  useEffect(() => {
    console.log("mediaStrings", mediaStrings);
  }, [mediaStrings]);

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
    setTaskMedia(e.target.files);
  };

  const handleTaskSubmit = (e) => {
    e.preventDefault();

    const newTaskData = {
      id: taskId,
      ownerId: 1,
      media: mediaStrings,
      title: "dummyTitle",
      description: "dummyDesc",
      reward: 420,
      latlng: [props.latlng.lat, props.latlng.lng],
    };

    console.log("Creating new task...", newTaskData);

    const configJ = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .post("http://localhost:81/create-task", newTaskData)
      .then((res) => {
        console.log(res.data);
        console.log(res);
        if (res.data) {
          // props.closeTaskModal();
          props.fetchTaskData();
        }
      })
      .catch((error) => {
        console.log(error);
      });
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
          onSubmit={handleTaskSubmit}
          id="form"
          method="POST"
        >
          {
            // <div>
            //   <input
            //     onChange={handleTitleChange}
            //     id="taskTitle"
            //     placeholder={"task title"}
            //     defaultValue={"Test Task"}
            //   ></input>
            //   <input
            //     onChange={handleRewardChange}
            //     id="taskReward"
            //     type="number"
            //     placeholder={"reward"}
            //     defaultValue={102}
            //   ></input>
            //   <input
            //     onChange={handleDescriptionChange}
            //     id="taskDescription"
            //     placeholder={"task description"}
            //     defaultValue={
            //       "Test Description Test Description Test Description Test Description "
            //     }
            //   ></input>
            // </div>
          }

          <input
            type="file"
            multiple
            required
            accept=".png, .jpg, .jpeg"
            name="task_files"
            onChange={handleMediaChange}
          />

          <button type="submit" id="btnCreateTask" className={"button"}>
            Create
          </button>
          <div
            // onClick={props.closeTaskModal}
            className={`${classes.btnCancel} button`}
          >
            Cancel
          </div>
        </form>
      </div>
    );
  } else {
    return <h3>Error: task editor received no location data</h3>;
  }
};

export default TaskEditor;
