import React from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import LockIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Footer from "./Footer/Footer.jsx";
import Header from "./Header/Header.jsx";
import FormInput from "./FormInput.jsx";
import AuthService from "./AuthService";
import { LoginContext } from "../../App";

const styles = theme => ({
  layout: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`,
    boxShadow: "none",
    backgroundColor: "#fafafa"
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  },
  text: {
    color: "rgba(0, 0, 0, 0.87)",
    fontSize: "0.875rem",
    fontWeight: "400",
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    lineHeight: "1.46429em",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    verticalAlign: "middle"
  },
  forgetPWD: {
    color: "#1890ff",
    float: "right"
  },
  register: {
    color: "#1890ff"
  },
  wrap: {
    display: "flex",
    justifyContent: "space-between"
  },
  warpBottom: {
    marginTop: "20px"
  },
  typography: {
    useNextVariants: true
  }
});

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      formDirty: false,
      loginSuccess: false
    };
    this.Auth = new AuthService();
    this.handleUserName = this.handleUserName.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.setFormDirty = this.setFormDirty.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleUserName(value) {
    this.setState({
      username: value
    });
  }
  handlePassword(value) {
    this.setState({
      password: value
    });
  }
  setFormDirty(value) {
    this.setState({
      formDirty: value
    });
  }
  handleSubmit(ev, setLogin) {
    ev.preventDefault();
    const { username, password } = this.state;
    this.setFormDirty(true);
    if (!username || !password) {
      return;
    }
    this.Auth.login(username, password)
    .then(()=>{
      if (this.Auth.loggedIn()) {
        setLogin(true);
      }
    });
  }

  render() {
    const { classes } = this.props;
    const { username, password, formDirty } = this.state;
    return (
      <LoginContext.Consumer>
        {({ setLogin }) => (
          <React.Fragment>
            <Header />
            <CssBaseline />
            <main className={classes.layout}>
              <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Login
                </Typography>
                <form
                  className={classes.form}
                  onSubmit={ev => {
                    this.handleSubmit(ev, setLogin);
                  }}
                >
                  <FormControl margin="normal" required fullWidth>
                    <FormInput
                      value={username}
                      onChange={this.handleUserName}
                      formDirty={formDirty}
                      errorMessage={!username && "Username is required"}
                      id="username"
                      name="username"
                      autoComplete="username"
                      autoFocus
                    />
                  </FormControl>
                  <FormControl margin="normal" required fullWidth>
                    <FormInput
                      value={password}
                      onChange={this.handlePassword}
                      formDirty={formDirty}
                      errorMessage={!password && "Password is required"}
                      name="password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                    />
                  </FormControl>
                  <div className={classes.wrap}>
                    <FormControlLabel
                      control={<Checkbox value="remember" color="primary" />}
                      label="Remember me"
                    />
                    <a
                      href="/forgotpassword"
                      className={`${classes.forgetPWD} ${classes.text}`}
                    >
                      Forgot password
                    </a>
                  </div>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Login
                  </Button>
                  <div className={classes.warpBottom}>
                    <span className={classes.text}>Or</span>{" "}
                    <a
                      href="/register"
                      className={`${classes.register} ${classes.text}`}
                    >
                      Register now!
                    </a>
                  </div>
                </form>
              </Paper>
            </main>
            <Footer />
          </React.Fragment>
        )}
      </LoginContext.Consumer>
    );
  }
}

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LoginForm);
