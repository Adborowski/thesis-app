import classes from "./app.module.css";
import MapWrapper from "./components/MapWrapper";
import dummyData from "./db.json"; // local file-based db
import { useState } from "react";
import { GoogleLogin } from "react-google-login";

function App() {
  const [userData, setUserData] = useState();
  console.log(process.env);

  const handleLogin = (e) => {
    console.log("handling login", e);
    setUserData(true);
  };

  const lockedContent = (
    <div className={classes.authModule}>
      <h3>Please authenticate</h3>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText="Log in with Google"
        onSuccess={handleLogin}
        onFailure={handleLogin}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );

  const authenticatedContent = (
    <div className={classes.main}>
      <div className={classes.desktopMenu}>
        <div className={classes.title}>thesis-app</div>
      </div>
      <MapWrapper db={dummyData} />
    </div>
  );

  if (userData) {
    return authenticatedContent;
  } else {
    return lockedContent;
  }
}

export default App;
