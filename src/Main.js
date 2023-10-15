import React from "react";
import { useState } from "react";
import { Card, Grid, Box, Button } from "@mui/material";
import Home from "./Home";
import Outline from "./Outline";

function Main(props) {
  const { username } = props;
  const [home, setHome] = useState("box");
  const [outline, setOutline] = useState("none");

  const handleClickNewRecording = (e) => {
    e.preventDefault();
    setHome("none");
    setOutline("box");
  };

  return (
    <div className="App">
      <Grid paddingBottom="64px" paddingRight="32px" paddingLeft="32px">
        <Box
          sx={{
            display: { home },
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Card
            align="center"
            variant="outlined"
            style={{
              backgroundColor: "#101758",
              border: "2px solid #FFFFFF",
              marginTop: "32px",
              paddingTop: "32px",
              paddingBottom: "16px",
              minWidth: "100%",
              minHeight: "100vh",
              alignItems: "left",
            }}
          >
            <Box display={home}>
              <Home username={username} />
              <Box
                m={1} //margin
                display="flex"
                justifyContent="flex-start"
                paddingX="60px"
                alignItems="flex-start"
              >
                <Button
                  onClick={handleClickNewRecording}
                  style={{
                    backgroundColor: "#FFFFFF",
                    width: "200px",
                    color: "#101758",
                    alignSelf: "left",
                    height: "50px",
                    fontSize: "18px",
                    fontWeight: 700,
                  }}
                >
                  New Recording
                </Button>
              </Box>
            </Box>
            <Box display={outline}>
              <Outline username={username} />
            </Box>
          </Card>
        </Box>
      </Grid>
    </div>
  );
}

export default Main;
