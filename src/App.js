import logo from "./logo.svg";
import "./App.css";
import Home from "./Home";
import Header from "./Header";
import { Amplify } from "aws-amplify";
import {
  withAuthenticator,
  Button,
  Heading,
  Authenticator,
  ThemeProvider,
  Theme,
  useTheme,
} from "@aws-amplify/ui-react";
import "./styles.css";

import awsExports from "./aws-exports";
import Main from "./Main";
Amplify.configure(awsExports);

function App({ signOut, user }) {
  //function App() {
  return (
    <div className="App">
      <Header title="SoundScribe" signOutAction={signOut} />
      <header className="App-header">
        <Main username={user.username} />
      </header>
    </div>
  );
}

export default withAuthenticator(App);
//export default App;
