import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import indigo from '@material-ui/core/colors/indigo';

const theme = createMuiTheme({
  palette: {
    primary: red,
    secondary: indigo,
  },
});

export default theme;
