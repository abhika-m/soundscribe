import * as React from "react";
import PropTypes from "prop-types";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
function Header(props) {
  const { title, signOutAction } = props;

  const refreshPage = () => {
    window.location.reload(false);
  };

  return (
    <React.Fragment>
      <Toolbar
        sx={{
          paddingTop: "16px",
          backgroundColor: "#101758",
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <img
          src={require("./soundscribelogo.png")}
          width="80px"
          height="80px"
          alt="SoundScribeLogo"
          style={{ borderRadius: "50px", marginRight: "24px" }}
        />
        <Typography
          component="h2"
          fontSize="48px"
          align="left"
          color="#FFFFFF"
          fontWeight="700"
          fontFamily="arial"
          borderColor="#101758"
          noWrap
          sx={{ flex: 1 }}
        >
          {title}
        </Typography>
        <Button
          style={{
            backgroundColor: "#FFFFFF",
            width: "200px",
            color: "#101758",
            alignSelf: "left",
            height: "50px",
            fontSize: "18px",
            fontWeight: 700,
            marginRight: "8px",
          }}
          onClick={refreshPage}
        >
          Home
        </Button>
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
          onClick={signOutAction}
        >
          Sign Out
        </Button>

        <IconButton></IconButton>
      </Toolbar>
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;
