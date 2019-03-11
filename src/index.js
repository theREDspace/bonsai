import React, { Fragment } from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { MuiThemeProvider, getMuiTheme } from "material-ui/styles/"
import registerServiceWorker from "./registerServiceWorker"
import Landing from "./landing/Landing"
import Scene from "./app/Scene"
import "./index.css"

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: "#43a047",
    primary2Color: "#558b2f",
    accent1Color: "#33691e",
    primary3Color: "#81c784",
    pickerHeaderColor: "#009688"
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
