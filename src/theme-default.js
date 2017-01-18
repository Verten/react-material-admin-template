import { fade } from 'material-ui/utils/colorManipulator';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import * as  Colors from 'material-ui/styles/colors';

const themeDefault = getMuiTheme({
  palette: {
    primary1Color: Colors.blue600,
    primary2Color: Colors.cyan700,
    primary3Color: Colors.lightBlack,
    accent1Color: Colors.pinkA200,
    accent2Color: Colors.grey100,
    accent3Color: Colors.grey500,
    textColor: Colors.darkBlack,
    alternateTextColor: Colors.white,
    canvasColor: Colors.white,
    borderColor: Colors.grey300,
    disabledColor: fade(Colors.darkBlack, 0.3)
  },
  appBar: {
    height: 57,
    color: Colors.blue600
  },
  drawer: {
    width: 230,
    color: Colors.grey900
  },
  raisedButton: {
    primaryColor: Colors.blue600,
  }
});


export default themeDefault;
