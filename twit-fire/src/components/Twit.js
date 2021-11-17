import React, { useState } from "react";
import { storageService } from "../fbase";
import { deleteObject, ref } from "@firebase/storage";
import { deleteDoc, getFirestore, doc, updateDoc } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

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
    <div className="nweet">
      {editing ? (
        <>
          <form className="container nweetEdit" onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit your Twit"
              value={newTwit}
              required
              onChange={onChange}
            />
            <input className="formBtn" type="submit" value="Update Twit" />
          </form>
          <span onClick={toggleEditing} className="formBtn cancelBtn">
            Cancel
          </span>
        </>
      ) : (
        <>
          <h4>{item.text}</h4>
          {item.attachmentUrl && <img src={item.attachmentUrl} />}
          {isOwner && (
            <div className="nweet__actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Twit;
