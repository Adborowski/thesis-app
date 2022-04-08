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
  const [taskMedia, setTaskMedia] = useState();

  // Minimap takes a whole task so let's make a dummy
  const [fakeTask, setFakeTask] = useState({ latlng: [0, 0] });

  useEffect(() => {
    setFakeTask({ latlng: taskLatlng });
  }, [taskLatlng]);

  useEffect(() => {
    console.log(taskMedia);
  }, [taskMedia]);

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
    const mediaIds = [];

    // loop through files (FileList)
    for (let i = 0; i < e.target.files.length; i++) {
      const newMediaId = uuid();
      e.target.files[i].uid = newMediaId;
      mediaIds.push(newMediaId);
    }

    setTaskMedia(e.target.files);
    console.log(taskMedia);
  };

  const createTask = (taskData) => {
    const config = {
      "content-type": "application/json",
    };
    axios
      .post("http://localhost:81/create-task", taskData, config)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          // props.closeTaskModal();
          props.fetchTaskData();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleTaskSubmit = (e) => {
    e.preventDefault();

    const newTaskData = {
      id: taskId,
      ownerId: 1,
      media: [],
      title: "dummyTitle",
      description: "dummyDesc",
      reward: 420,
      latlng: [props.latlng.lat, props.latlng.lng],
    };

    const config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };

    // loop through files and upload each one to DB(FileList)
    const mediaRefs = [];
    for (let i = 0; i < taskMedia.length; i++) {
      const imageData = new FormData();
      imageData.append("task_media", taskMedia[i]);

      axios
        .post("http://localhost:81/upload-media", imageData, config)
        .then((res) => {
          console.log(res);
          mediaRefs.push(res._id);
        })
        .catch((error) => {
          console.log(error);
        });
    } // end of for loop

    newTaskData.media = mediaRefs;
    createTask(newTaskData);

    // console.log("Creating new task...", newTaskData);
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
          action="/upload-media"
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
