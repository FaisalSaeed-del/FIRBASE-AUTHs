import React from "react";
import { getDatabase, ref, set } from "firebase/database";
import { app } from "./Firebase";
const db = getDatabase(app);

function App() {
  const putData = () => {
    set(
      ref(db, "user/data"),

      {
        id: 2222,
        name: "Faisal",
        age: 23,
      }
    );
  };

  return (
    <div>
      <h1>Hello World</h1>
      <button 
      className="py-2 px-10 bg-blue-500 border-2 border-blue-500 flex m-auto"
      onClick={putData}>click me</button>
    </div>
  );
}

export default App;
