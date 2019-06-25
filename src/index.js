import React, { Fragment } from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { MuiThemeProvider } from "@material-ui/core/styles/"
import registerServiceWorker from "./registerServiceWorker"
import Landing from "./landing/Landing"
import Scene from "./app/Scene";
import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import "./index.css";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: purple,
    secondary: {
      main: '#f44336',
    },
  },
});

ReactDOM.render(
  <Router>
    <MuiThemeProvider theme={theme}>
      <Fragment>
        <Route exact path="/" component={Landing} />
        <Route path="/scene/:id" component={Scene} />
      </Fragment>
    </MuiThemeProvider>
  </Router>,
  document.getElementById("root")
)
registerServiceWorker()
