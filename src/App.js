import "./App.css";
import MapWrapper from "./components/MapWrapper";
import db from "./db.json"; // local file-based db

function App() {
  console.log(db);
  return (
    <div className="App">
      <h3>thesis-app</h3>
      <MapWrapper />
    </div>
  );
}

export default App;
