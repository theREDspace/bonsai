import React, { Fragment } from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles/"
import registerServiceWorker from "./registerServiceWorker"
import Landing from "./landing/Landing"
import Scene from "./app/Scene"
import "./index.css"

const muiTheme = createMuiTheme({
  palette: {
    primary: {
      main : "#43a047"
    },
    secondary: {
      main: "#558b2f"
    },
    textStyle: {
      fontFamily: "Roboto Mono",
      fontSize: 12,
      color:"#ff0000"
    },
    tabContent: {
      margin: "20px"
    }
  }
})

ReactDOM.render(
  <Router>
    <MuiThemeProvider muiTheme={muiTheme}>
      <Fragment>
        <Route exact path="/" component={Landing} />
        <Route path="/scene/:id" component={Scene} />
      </Fragment>
    </MuiThemeProvider>
  </Router>,
  document.getElementById("root")
)
registerServiceWorker()
