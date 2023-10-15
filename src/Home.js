import React from "react";
import { useState, useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { Typography, Card, Box, Divider, Accordion } from "@mui/material";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { listTodos } from "./graphql/queries";

function Home(props) {
  const { username } = props;
  const [recordings, setRecordings] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const alldata = await API.graphql(graphqlOperation(listTodos));
      const data = alldata.data.listTodos.items;
      setRecordings(data);
    } catch (err) {
      console.log("error fetching todos");
    }
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
      <Typography
        align="left"
        paddingY="16px"
        paddingX="60px"
        fontSize="32px"
        color="#FFFFFF"
        fontFamily="sans-serif"
        fontWeight="700"
      >
        Here are your recordings:
      </Typography>

      <Box>
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
          {recordings.map(
            (record) =>
              record.name === username && (
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
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
                      {record.notesName}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box
                      sx={{
                        display: "box",
                        flexDirection: "column",
                      }}
                    >
                      <Typography
                        align="left"
                        paddingX="60px"
                        fontSize="16px"
                        color="#101758"
                        style={{ color: "text.secondary" }}
                      >
                        Date Created: {record.createdAt}
                      </Typography>
                      <Divider
                        style={{ borderWidth: 1, borderColor: "#101758" }}
                        variant="middle"
                      ></Divider>
                      <Typography
                        color="#101758"
                        fontFamily="sans-serif"
                        fontWeight="700"
                        paddingTop="8px"
                        fontSize="24px"
                      >
                        Transcript:
                      </Typography>
                      <Typography
                        color="#101758"
                        fontFamily="sans-serif"
                        fontWeight="700"
                        paddingTop="8px"
                        fontSize="20px"
                        paddingBottom="16px"
                      >
                        {record.transcript}
                      </Typography>
                      <Divider
                        style={{ borderWidth: 1, borderColor: "#101758" }}
                        variant="middle"
                      ></Divider>
                      <Typography
                        color="#101758"
                        fontFamily="sans-serif"
                        fontWeight="700"
                        paddingTop="8px"
                        fontSize="24px"
                      >
                        Generated Notes:
                      </Typography>
                      <Typography
                        color="#101758"
                        fontFamily="sans-serif"
                        fontWeight="700"
                        paddingTop="8px"
                        fontSize="20px"
                        paddingBottom="16px"
                      >
                        {record.notes}
                      </Typography>
                    </Box>
                  </AccordionDetails>
                </Accordion>
              )
          )}
        </Card>
      </Box>
    </div>
  );
}

export default Home;
