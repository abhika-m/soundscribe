import React from "react";
import { useState } from "react";
import { Amplify } from "aws-amplify";
import {
  Predictions,
  AmazonAIConvertPredictionsProvider,
} from "@aws-amplify/predictions";
import awsconfig from "./aws-exports";
import { Typography, TextField, Box, Divider, Button } from "@mui/material";
import SpeechToText from "./Dictaphone";

Amplify.configure(awsconfig);
Predictions.addPluggable(new AmazonAIConvertPredictionsProvider());

function Outline(props) {
  const { username } = props;
  const [outline, setOutline] = useState("");
  const [name, setName] = useState("");
  const [showSubmit, setSubmit] = useState("box");
  const [showRecord, setRecord] = useState("none");

  const handleEditOutline = (input) => {
    input.preventDefault();
    setOutline(input.target.value);
  };

  const handleEditName = (input) => {
    input.preventDefault();
    setName(input.target.value);
  };

  const handleSubmit = (input) => {
    input.preventDefault();
    setSubmit("none");
    setRecord("box");
  };

  return (
    <div className="App">
      <Typography
        align="center"
        paddingBottom="16px"
        paddingX="60px"
        fontSize="32px"
        color="#FFFFFF"
        fontWeight="700"
        fontFamily="sans-serif"
        component="h2"
      >
        Welcome {username}!
      </Typography>
      <Divider
        style={{ borderWidth: 3, borderColor: "#FFFFFF" }}
        variant="middle"
      ></Divider>
      <Box display={showSubmit}>
        <Typography
          align="left"
          paddingY="16px"
          paddingX="60px"
          fontSize="32px"
          color="#FFFFFF"
          fontFamily="sans-serif"
          fontWeight="700"
        >
          Give your recording a name:
        </Typography>
        <Box paddingY="24px" paddingX="32px">
          <TextField
            fullWidth
            multiline
            minRows={1}
            label="Name your recording"
            variant="filled"
            onChange={handleEditName}
            style={{ backgroundColor: "#FFFFFF" }}
          />
        </Box>
        <Typography
          align="left"
          paddingY="16px"
          paddingX="60px"
          fontSize="32px"
          color="#FFFFFF"
          fontFamily="sans-serif"
          fontWeight="700"
        >
          If there is an outline you'd like the generated notes to follow,
          please type the outline here:
        </Typography>

        <Box paddingY="24px" paddingX="32px">
          <TextField
            fullWidth
            multiline
            minRows={5}
            label="Enter your desired outline or sections here"
            variant="filled"
            onChange={handleEditOutline}
            style={{ backgroundColor: "#FFFFFF" }}
          />
        </Box>

        <Box
          m={1} //margin
          display="flex"
          justifyContent="flex-start"
          paddingX="60px"
          alignItems="flex-start"
        >
          <Button
            style={{
              backgroundColor: "#FFFFFF",
              width: "200px",
              color: "#101758",
              alignSelf: "left",
              height: "50px",
              fontSize: "18px",
              fontWeight: 700,
            }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>
      </Box>
      <Box display={showRecord}>
        <SpeechToText outline={outline} username={username} name={name} />
      </Box>
    </div>
  );
}

export default Outline;
