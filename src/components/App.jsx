import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notesArray, setNotesArray] = useState([]);

  // Fetch notes from backend on page load
  useEffect(() => {
    async function fetchNotes() {
      try {
        const response = await axios.get("http://localhost:5000/notes");
        setNotesArray(response.data);
      } catch (err) {
        console.error("Error fetching notes:", err);
      }
    }

    fetchNotes(); // call the async function
  }, []);

  // Add new note
  async function addNote(note) {
    try {
      const res = await axios.post("http://localhost:5000/notes", note);
      setNotesArray((prev) => [res.data, ...prev]); // add the newly created note
    } catch (err) {
      console.error("Error adding note:", err);
    }
  }

  // Delete note
  async function deleteNote(id) {
    try {
      await axios.delete(`http://localhost:5000/notes/${id}`);
      setNotesArray((prev) => prev.filter((note) => note.id !== id));
    } catch (err) {
      console.error("Error deleting note:", err);
    }
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notesArray.map((noteItem) => (
        <Note
          key={noteItem.id}
          id={noteItem.id}
          title={noteItem.title}
          content={noteItem.content}
          onDelete={deleteNote}
        />
      ))}
      <Footer />
    </div>
  );
}

export default App;
