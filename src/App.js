import "./App.css";
import React, { useRef } from "react";
import DrawingArea from "./DrawingArea";
import axios from "axios";

function App() {
  const stageRef = useRef(null);

  const width = window.innerWidth - 20;
  const height = window.innerHeight - 20;

  if (width < height) {
    var area = width;
  } else {
    var area = height;
  }

  const handleSave = () => {
    sendImage();
  };

  const sendImage = () => {
    const backendUrl = "http://localhost:7654/classify";
    const uri = stageRef.current.toDataURL();
    const base64Image = uri.split(",")[1];

    axios
      .post(backendUrl, { image_base64: base64Image })
      .then((response) => {
        console.log("Classification result:", response.data);
        alert(
          response.data.classification +
            " (" +
            parseFloat(response.data.percentage).toFixed(2) +
            "%)"
        );
      })
      .catch((error) => {
        console.error(
          "There was a problem with the axios request:",
          JSON.stringify(error.message)
        );
        alert("Server is not running.");
      });
  };

  return (
    <div>
      <h1
        style={{
          width: "100%",
          height: "50px",
          margin: "auto",
          display: "block",
          margin: "auto",
          position: "absolute",
          left: "50%",
          top: "10px",
          transform: "translate(-50%, 0)",
          zIndex: "100",
          textAlign: "center",
          color: "white",
        }}
      >
        Drawing Prediction
      </h1>

      <div
        style={{
          width: area + "px",
          height: area + "px",
          border: "5px solid black",
          margin: "auto",
          backgroundColor: "white",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          borderRadius: "100px",
        }}
      >
        <DrawingArea stageRef={stageRef} area={area} />
      </div>

      <button
        style={{
          width: "100px",
          height: "50px",
          margin: "auto",
          display: "block",
          margin: "auto",
          position: "absolute",
          // top: "50%",
          left: "50%",
          bottom: "10px",
          transform: "translate(-50%, 0)",
          zIndex: "100",
          textAlign: "center",
          borderRadius: "100px",
        }}
        onClick={handleSave}
      >
        Predict
      </button>
    </div>
  );
}

export default App;
