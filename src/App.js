import classes from "./app.module.css";
import MapWrapper from "./components/MapWrapper";
import db from "./db.json"; // local file-based db

function App() {
  console.log("Data: ", db);
  return (
    <div className={classes.main}>
      <div className={classes.desktopMenu}>
        <div className={classes.title}>thesis-app</div>
      </div>
      <MapWrapper data={db} />
    </div>
  );
}

export default App;
