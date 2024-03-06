// import React, { useState, useEffect, useRef } from "react";
// import autosize from "autosize";

// function PlantsTalk() {
//   const [inputValue, setInputValue] = useState("");
//   const [divElements, setDivElement] = useState([]);
//   const textareaRef = useRef(null);

//   useEffect(() => {
//     if (textareaRef.current) {
//       textareaRef.current.focus();
//       autosize(textareaRef.current);
//     }
//   }, []);

//   const handleInputChange = (event) => {
//     setInputValue(event.target.value);
//   };

//   const handleSubmit = () => {
//     const newDivElement = (
//       <div
//         style={{
//           backgroundColor: "lightgray",
//           padding: "10px",
//           margin: "5px",
//           width: "60vw",
//           borderRadius: "15%",
//         }}
//       >
//         {inputValue}
//       </div>
//     );
//     setDivElement([...divElements, newDivElement]);
//     // setInputValue("");
//     console.log("Submit:", inputValue);
//   };

//   return (
//     <div id="container" style={{ height: "100%", padding: "20px" }}>
//       <div
//         id="content"
//         style={{
//           // backgroundColor: "red",
//           // position: "fixed",
//           // top: "20px",
//           // left: "0",
//           // width: "100%",
//           // // height: "50%",
//           // display: "flex",
//           // flexDirection: "column",
//           // justifyContent: "center",
//           // alignItems: "center",
//           // padding: "10px",
//           // overflowY: "scroll",
//           backgroundColor: "red",
//           position: "fixed",
//           top: "20px",
//           left: "0",
//           width: "100%",
//           height: "calc(100vh - 0px)", // Adjust the height as needed
//           display: "flex",
//           flexDirection: "column",
//           // justifyContent: "center",
//           alignItems: "center",
//           padding: "10px",
//           overflowY: "scroll",
//         }}
//       >
//         {" "}
//         {divElements.map((divElement, index) => (
//           <React.Fragment key={index}>{divElement}</React.Fragment>
//         ))}
//       </div>
//       <div
//         id="input-container"
//         style={{
//           position: "fixed",
//           bottom: "20px",
//           left: "0",
//           width: "100%",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           padding: "10px",
//         }}
//       >
//         <textarea
//           id="input"
//           ref={textareaRef}
//           placeholder="type some text"
//           rows={1}
//           defaultValue=""
//           value={inputValue}
//           onChange={handleInputChange}
//           style={{
//             padding: "10px",
//             overflow: "hidden",
//             marginRight: "10px",
//             border: "1px solid #ccc",
//             width: "50%",
//           }}
//         />
//         <button
//           type="submit"
//           onClick={handleSubmit}
//           style={{
//             padding: "10px 20px",
//             backgroundColor: "#4caf50",
//             color: "white",
//             border: "none",
//             cursor: "pointer",
//           }}
//         >
//           Search
//         </button>
//       </div>
//     </div>
//   );
// }

// export default PlantsTalk;
import React, { useState, useEffect, useRef } from "react";
import autosize from "autosize";

function PlantsTalk() {
  const [inputValue, setInputValue] = useState("");
  const [divElements, setDivElement] = useState([]);
  const textareaRef = useRef(null);
  const originalTextareaHeightRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
      autosize(textareaRef.current);
      originalTextareaHeightRef.current = textareaRef.current.clientHeight;
    }
  }, []);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = () => {
    if (inputValue != "" || inputValue.length != 0 || inputValue != null) {
      const nonEmptyLines = inputValue
        .split("\n")
        .filter((line) => line.trim() !== ""); // Filter out empty lines
      const newDivElement = (
        <div
          style={{
            padding: "5px",
            width: "60vw",
            wordWrap: "break-word",
          }}
        >
          {nonEmptyLines.map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </div>
      );
      setDivElement([...divElements, newDivElement]);
      setInputValue("");
      textareaRef.current.style.height = "auto";
      console.log("Submit:", inputValue);
    }
  };

  const handleTextareaChange = () => {
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
  };

  return (
    <div id="container" style={{ height: "100%", padding: "20px" }}>
      <div
        id="content"
        style={{
          position: "fixed",
          top: "20px",
          left: "0",
          width: "100%",
          height: "calc(100vh - 110px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflowY: "scroll",
        }}
      >
        {divElements.map((divElement, index) => (
          <React.Fragment key={index}>{divElement}</React.Fragment>
        ))}
      </div>
      <div
        id="input-container"
        style={{
          position: "fixed",
          bottom: "20px",
          left: "0",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px",
        }}
      >
        <textarea
          id="input"
          ref={textareaRef}
          placeholder="type something"
          rows={1}
          value={inputValue}
          onChange={(e) => {
            handleInputChange(e);
            handleTextareaChange();
          }}
          style={{
            padding: "10px",
            overflow: "hidden",
            marginRight: "10px",
            border: "1px solid #ccc",
            width: "50%",
          }}
        />
        <button
          type="submit"
          onClick={handleSubmit}
          style={{
            padding: "10px 20px",
            backgroundColor: "#4caf50",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default PlantsTalk;
