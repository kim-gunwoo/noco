import React, { useState } from "react";
import { storageService } from "../fbase";
import { deleteObject, ref } from "@firebase/storage";
import { deleteDoc, getFirestore, doc, updateDoc } from "firebase/firestore";

const Twit = ({ item, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newTwit, setNewTwit] = useState(item.text);

  const onDeleteClick = async () => {
    const ok = window.confirm("삭제 하시겠습니까?");
    if (ok) {
      await deleteDoc(doc(getFirestore(), "twit", item.id));
      if (item.attachmentUrl) {
        await deleteObject(ref(storageService, item.attachmentUrl));
      }
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    // await updateDoc(doc(getFirestore(), `twit/${item.id}`), {
    await updateDoc(doc(getFirestore(), "twit", item.id), {
      text: newTwit,
    });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewTwit(value);
  };
  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit your Twit"
              value={newTwit}
              required
              onChange={onChange}
            />
            <input type="submit" value="Update Twit" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{item.text}</h4>
          {item.attachmentUrl && (
            <img src={item.attachmentUrl} width="50px" height="50px" />
          )}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Twit</button>
              <button onClick={toggleEditing}>Edit Twit</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Twit;
