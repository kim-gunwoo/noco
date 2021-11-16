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

const Home = ({ userObj }) => {
  const [text, setText] = useState("");
  const [texts, setTexts] = useState([]);
  const [attachment, setAttachment] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentUrl = "";

    if (attachment !== "") {
      const fileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
      const uploadFile = await uploadString(fileRef, attachment, "data_url");
      attachmentUrl = await getDownloadURL(uploadFile.ref);
    }

    await addDoc(collection(db, "twit"), {
      text,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    });

    // await setDoc(doc(db, "twit", "LA"), {
    //   name: "Los Angeles",
    //   state: "CA",
    //   country: "USA",
    // });
    setText("");
    setAttachment("");
  };

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

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onClearAttachment = () => setAttachment("");

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setText(value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
          onChange={onChange}
          value={text}
        />
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Fire" />
        {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" />
            <button onClick={onClearAttachment}>Clear</button>
          </div>
        )}
      </form>
      <div>
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
