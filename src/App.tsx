import React, { useState } from "react";
import Circle from "./Circle";

function App() {
  const [value, setValue] = useState("");
  const onchange = (e:React.FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  }
const onsubmit = (e:React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
console.log("hi", value);
}
  return (
    <div>
      <Circle bgColor="#F000DC" text="Circle"/>
      <form onSubmit={onsubmit}>
        <input value={value} onChange={onchange} type="text" placeholder="username"/>
      </form>
    </div>
  );
}

export default App;
