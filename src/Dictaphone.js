import React from "react";
import useSpeechToText from "react-hook-speech-to-text";
import { useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { createTodo } from "./graphql/mutations";

import { Typography, Card, Box, Button } from "@mui/material";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "",
  dangerouslyAllowBrowser: true,
});

const DownloadButton = (textOutput) => {
  if (typeof textOutput !== "string") {
    console.log(typeof textOutput);
    console.log(JSON.stringify(textOutput));
  }
  const file = new Blob([textOutput.textOutput], { type: "text/plain" });
  return (
    <Button
      variant="outlined"
      style={{
        backgroundColor: "#FFFFFF",
        width: "300px",
        color: "#101758",
        alignSelf: "left",
        height: "50px",
        fontSize: "18px",
        fontWeight: 700,
        marginTop: "32px",
      }}
    >
      <a
        download="notes.txt"
        href={URL.createObjectURL(file)}
        style={{
          textDecoration: "inherit",
          color: "inherit",
        }}
      >
        Download Notes
      </a>
    </Button>
  );
};

export default function SpeechToText(props) {
  const { outline, username, name } = props;
  const [finalnotes, setNotes] = useState("");
  const [complete, setComplete] = useState("none");
  const [loading, setLoading] = useState("none");
  const [record, setRecord] = useState("box");
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
    googleApiKey: "",
  });

  const addEntry = async (notesgen) => {
    if (typeof notesgen !== "string") {
      console.log(typeof notesgen);
      console.log(JSON.stringify(notesgen));
    }
    try {
      let transcript = "";
      results.forEach((result) => {
        transcript += result.transcript + " ";
      });
      const data = {
        name: username,
        notes: notesgen,
        transcript: transcript,
        notesName: name,
      };
      await API.graphql(graphqlOperation(createTodo, { input: data }));
    } catch (err) {
      console.log("error adding notes:", err);
    }
  };

  const handleFinish = (input) => {
    input.preventDefault();
    setLoading("box");
    setRecord("none");
    let transcript = "";
    let sections = "";
    if (outline === "") {
      sections =
        "Now, summarize the transcript above into a set of bulleted notes organized into topics / sections if possible.\nGenerated Notes:";
    } else {
      sections =
        "Now, summarize the transcript above into a set of bulleted notes organized into the following outline / sections:##\n";
      sections += outline + "\n##\nGenerated Notes:";
    }
    results.forEach((result) => {
      transcript += result.transcript + " ";
    });
    let prompt =
      "Read the following transcript:\n" + transcript + "\n" + sections;
    openai.chat.completions
      .create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "system", content: prompt }],
      })
      .then((response) => {
        let notes = response.choices[0].message.content;
        console.log(JSON.stringify(response));
        setNotes(notes);
        addEntry(notes);
        setLoading("none");
        setComplete("box");
      })
      .catch((error) => {
        console.error("Error occurred:", error);
        // Handle errors here if necessary
      });
  };

  if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;

  return (
    <div>
      <Box display={record}>
        <Typography
          align="left"
          paddingY="16px"
          paddingX="60px"
          fontSize="32px"
          color="#FFFFFF"
          fontFamily="sans-serif"
          fontWeight="700"
        >
          Recording: {isRecording.toString()}
        </Typography>
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
            onClick={isRecording ? stopSpeechToText : startSpeechToText}
          >
            {isRecording ? "Stop Recording" : "Start Recording"}
          </Button>
        </Box>
        <Typography
          align="left"
          paddingTop="16px"
          paddingX="60px"
          fontSize="32px"
          color="#FFFFFF"
          fontFamily="sans-serif"
          fontWeight="700"
        >
          Transcript:
        </Typography>

        <Card
          align="center"
          variant="outlined"
          style={{
            backgroundColor: "#FFFFFFD7",
            border: "2px dotted #FFFFFF",
            marginTop: "32px",
            paddingTop: "16px",
            paddingBottom: "16px",
            marginLeft: "32px",
            marginRight: "32px",
            marginBottom: "32px",
            minWidth: "80%",
            alignItems: "left",
          }}
        >
          <ul>
            {results.map((result) => (
              <Typography
                align="left"
                paddingY="16px"
                paddingX="60px"
                fontSize="24px"
                color="#101758"
                fontFamily="sans-serif"
                fontWeight="700"
                key={result.timestamp}
              >
                {result.transcript}
              </Typography>
            ))}
            {interimResult && (
              <Typography
                align="left"
                paddingY="16px"
                paddingX="60px"
                fontSize="16px"
                color="##10175"
                fontFamily="sans-serif"
                fontWeight="700"
              >
                {interimResult}
              </Typography>
            )}
          </ul>
        </Card>
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
          onClick={handleFinish}
        >
          Generate Notes
        </Button>
      </Box>
      <Box display={loading}>
        <Typography
          align="left"
          paddingY="16px"
          paddingX="60px"
          fontSize="24px"
          color="#FFFFFF"
          fontFamily="sans-serif"
          fontWeight="700"
        >
          Hang tight! Loading Downloadable Notes File...
        </Typography>
      </Box>
      <Box display={complete}>
        <Card
          align="center"
          variant="outlined"
          style={{
            backgroundColor: "#FFFFFFD7",
            border: "2px dotted #FFFFFF",
            marginTop: "32px",
            paddingTop: "16px",
            paddingBottom: "16px",
            marginLeft: "32px",
            marginRight: "32px",
            marginBottom: "32px",
            minWidth: "80%",
            alignItems: "left",
          }}
        >
          <Typography
            align="left"
            paddingY="16px"
            paddingX="60px"
            fontSize="24px"
            color="#101758"
            fontFamily="sans-serif"
            fontWeight="700"
          >
            {finalnotes}
          </Typography>
        </Card>
        <DownloadButton textOutput={finalnotes}></DownloadButton>
      </Box>
    </div>
  );
}
