import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import HomeList from "./houseList";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menu: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    backgroundColor: "rgba(49, 24, 224, 0.5)",
    direction: "column",
    height: "100vh",
    color: "white",
  },
  avatar: {
    margin: "auto",
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
}));

export default function HomeComponent(props) {
  const classes = useStyles();
  const history = useHistory();
  console.log("user...", props.user);
  let name = "root";
  if (props.user.status) {
    name = props.user.data.full_name;
  }
  return (
    <div className={classes.root}>
      <div style={{ width: 300, position: "fixed" }}>
        <Grid item xs={12}>
          <Paper className={classes.menu}>
            <Avatar
              className={classes.avatar}
              alt="Cindy Baker"
              src="home-logo.jpg"
            />
            <h2>{name}</h2>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                window.location.replace("http://localhost:3000/");
              }}
            >
              Đăng xuất
            </Button>
          </Paper>
        </Grid>
      </div>
      <HomeList {...props} />
    </div>
  );
}
