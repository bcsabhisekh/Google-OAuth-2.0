import './App.css';
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";



function App() {

  const [user, setUser] = useState({});

  function handleCallbackResponse(response) {
    // console.log("Encoded JWD ID token: " + response.credential);
    const userObject = jwt_decode(response.credential);
    setUser(userObject);
    // console.log(user);
    document.getElementById("signInDiv").hidden = true;
  }

  const performCallback = () => {
    try {
      /* global google */
      google.accounts.id.initialize({
        client_id: "541756185971-gfeb25fijasb90vsgpe8339mdr72vf5k.apps.googleusercontent.com",
        callback: handleCallbackResponse
      });

      google.accounts.id.renderButton(
        document.getElementById("signInDiv"),
        { theme: "outline", size: "large" }
      );

      google.accounts.id.prompt();
    }
    catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    performCallback();
  }, []);


  const handleSignOut = (e) => {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  }

  return (
    <div className="App">
      <div id="signInDiv"></div>
      {Object.keys(user).length != 0 && <button onClick={handleSignOut} type="button">Sign Out</button>}
      {
        user &&
        <div>
          <img src={user.picture} />
          <h3>{user.name}</h3>
        </div>
      }
    </div>
  );
}

export default App;
