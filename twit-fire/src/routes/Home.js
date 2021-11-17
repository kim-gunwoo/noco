import React, { useState, useEffect } from "react";
import { db, storageService } from "fbase";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "@firebase/storage";
import { v4 as uuidv4 } from "uuid";
import {
  addDoc,
  collection,
  getDocs,
  query,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import Twit from "components/Twit";
import TwitFactory from "components/TwitFactory";

const Home = ({ userObj }) => {
  const [texts, setTexts] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "twit"), orderBy("createdAt", "desc")),
      (snapshot) => {
        const newArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTexts(newArray);
      }
    );
    return () => unsubscribe();
  }, []);

  return (
    <div className="container">
      <TwitFactory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
        {texts.map((item) => (
          <Twit
            key={item.id}
            item={item}
            isOwner={item.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;
