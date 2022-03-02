import "./App.css";
import MapWrapper from "./components/MapWrapper";
import db from "./db.json"; // local file-based db

function App() {
  console.log("Data: ", db);
  return (
    <div className="App">
      <h3>thesis-app</h3>
      <MapWrapper data={db} />
    </div>
  );
}

export default App;
