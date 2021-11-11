import React, { useState } from "react";
import { db } from "fbase";
import { doc, setDoc } from "firebase/firestore";
import { addDoc, collection } from "firebase/firestore";

const Home = () => {
  const [text, setText] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    const docRef = await addDoc(collection(db, "twit"), {
      text,
      createdAt: Date.now(),
    });

    // await setDoc(doc(db, "twit", "LA"), {
    //   name: "Los Angeles",
    //   state: "CA",
    //   country: "USA",
    // });
    setText("");
  };

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
        <input type="submit" value="Fire" />
      </form>
    </div>
  );
};
export default Home;
