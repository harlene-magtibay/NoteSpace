import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notesArray, setNotesArray] = useState([]);

  function addNote(note) {
    setNotesArray(prevNotes => {
      return [...prevNotes, note];
    });
  }

  function deleteNote(id) {
    setNotesArray(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    })
  }
  
  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notesArray.map((noteItem, index) => {
        return (
          <Note 
            key={index} 
            id={index}
            title={noteItem.title} 
            content={noteItem.content} 
            onDelete={deleteNote}
          />
        );
      })}
      
      <Footer />
    </div>
  );
}

export default App;
