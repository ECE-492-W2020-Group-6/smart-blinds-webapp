import { createMuiTheme } from "@material-ui/core/styles";
// import purple from "@material-ui/core/colors/purple";
// import common from "@material-ui/core/colors/common";
// import blueGrey from "@material-ui/core/colors/blueGrey";
// import blue from "@material-ui/core/colors/blue";
import yellow from "@material-ui/core/colors/yellow";
import lightBlue from "@material-ui/core/colors/lightBlue";
// import grey from "@material-ui/core/colors/grey";
import lightGreen from "@material-ui/core/colors/lightGreen";

export const defaultTheme = createMuiTheme({
  palette: {
    primary: lightGreen,
    secondary: lightBlue,
    info: yellow
  }
});
