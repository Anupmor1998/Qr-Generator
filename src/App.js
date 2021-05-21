import React from "react";
import { Box, ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import QrGenerator from "./components/QrGenerator/QrGenerator";
// import QrImg from "./components/QrGenerator/QrImg";
import QrMail from "./components/QrGenerator/QrMail";
import bg from "./components/QrGenerator/bg.jpg";
import GithubRibbon from "./components/GitHubRibbon/GitHubRibbon";

function App() {
  return (
    <ChakraProvider>
      <GithubRibbon />
      <Box backgroundImage={`url(${bg})`}>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={QrGenerator} />
            {/* <Route path="/img" component={QrImg} /> */}
            <Route path="/mail" component={QrMail} />
          </Switch>
        </BrowserRouter>
      </Box>
    </ChakraProvider>
  );
}

export default App;
