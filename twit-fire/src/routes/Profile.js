import React, { useState, useEffect } from "react";
import { auth, db } from "fbase";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "@firebase/auth";
import { collection, getDocs, query, where } from "@firebase/firestore";

const Profile = ({ userObj, refreshUser }) => {
  const navigate = useNavigate();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const onLogOutClick = () => {
    auth.signOut();
    navigate("/");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(userObj, { displayName: newDisplayName });
      refreshUser();
    }
  };
  const getMyProfile = async () => {
    const q = query(
      collection(db, "twit"),
      where("creatorId", "==", userObj.uid)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data());
    });
  };
  useEffect(() => {
    getMyProfile();
  }, []);
  return (
    <div className="container">
      <form className="profileForm" onSubmit={onSubmit}>
        <input
          className="formInput"
          type="text"
          autoFocus
          placeholder="Display name"
          value={newDisplayName}
          onChange={onChange}
        />
        <input
          type="submit"
          value="Update Profile"
          className="formBtn"
          style={{
            marginTop: 10,
          }}
        />
      </form>
      <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
        Log Out
      </span>
    </div>
  );
};

export default Profile;
