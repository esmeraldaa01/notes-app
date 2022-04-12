import React, { useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import "./Note.css";
import { Note as Props } from "../App";

export interface IProps {
  note: Props["note"];
  handleDelete: (id: number) => void;
  handleAddNote: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    id: number,
    setChangeDecoration: Function
  ) => void;
  id: number ;
}

const Note: React.FC<IProps> = ({ handleDelete, handleAddNote, id, note }) => {
  const [changeDecoration, setChangeDecoration] = useState<boolean>(false);

  const handleFocus = (id: number) => {
    const textarea = document.getElementById(`${id}`);
    const end = textarea?.onselectionchange
    textarea?.focus();
    setChangeDecoration(true);
  };

  return (
    <div className="note">
      <div className="note-header">
        <button className="button" onClick={() => handleFocus(id)}>
          <EditOutlined className="edit-icon" />
        </button>
        <DeleteOutlined
          onClick={() => handleDelete(id)}
          className="delete-icon"
        />
      </div>
      <textarea
        className={changeDecoration ? "decoration" : "none"}
        onChange={(e) => handleAddNote(e, id, setChangeDecoration)}
        rows={17}
        cols={30}
        value={note}
      />
    </div>
  );
};
export default Note;
