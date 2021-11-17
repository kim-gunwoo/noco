import React, { useState, useEffect } from "react";
import AppRouter from "components/Router";
import { auth } from "fbase";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserObj(user);
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);

  useEffect(() => {
    console.log(auth);
  }, [auth]);
  const refreshUser = async () => {
    const user = auth.currentUser;
    setUserObj({});
    setUserObj(user);
  };
  return (
    <>
      {init ? (
        <AppRouter
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
          refreshUser={refreshUser}
        />
      ) : (
        "Init..."
      )}
      {/* <footer>&copy; {new Date().getFullYear()} twit-fire</footer> */}
    </>
  );
}

export default App;
