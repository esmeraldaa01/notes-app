import React, { useState, useEffect } from "react";
import "./App.css";
import { PlusOutlined } from "@ant-design/icons";
import Note from "./components/Note";

export interface Note {
  note: string;
  id: number;
}

function App() {
  const [allNotes, setAllNotes] = useState<Note[]>([]);

  const handleAddNote = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    id: number,
    setChangeDecoration: Function
  ) => {
    const index = allNotes.findIndex((note) => note.id === id);
    const allNotesCopy = [...allNotes];

    allNotesCopy[index] = {
      ...allNotesCopy[index],
      note: e.target.value,
    };

    setAllNotes(allNotesCopy);
    setChangeDecoration(false);
  };

  const handleAddNotes = () => {
    const id = Math.random();
    setAllNotes([...allNotes, { id, note: "" }]);
  };

  const handleDelete = (id: number) => {
    const filterData = allNotes.filter((note) => note.id !== id);
    setAllNotes(filterData);
  };

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("react-notes") || "")

    if (savedNotes) {
      setAllNotes(savedNotes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("react-notes", JSON.stringify(allNotes));
  }, [allNotes]);

  return (
    <div className="container">
      <button className="add-note" onClick={() => handleAddNotes()}>
        {" "}
        <PlusOutlined style={{ width: "20px" }} />
        Add note
      </button>

      <div className="all-notes">
        {allNotes?.map((note) => {
          return (
            <Note
              id={note.id}
              note={note.note}
              handleDelete={handleDelete}
              handleAddNote={handleAddNote}
            />
          );
        })}
      </div>
    </div>
  );
}
export default App;
