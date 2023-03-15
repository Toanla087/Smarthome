import ChartComponent from "./chartComponent";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useHistory } from "react-router-dom";
// const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    alignItems: "center",
    color: theme.palette.text.secondary,
  },
  menu: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    backgroundColor: "rgba(255,117,191,0.5)",
    direction: "column",
    height: "100vh",
    color: "white",
  },
  avatar: {
    margin: "auto",
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "rgba(205,44,130,0.5)",
    color: "white",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  button: {
    backgroundColor: "rgba(205,44,130,0.5)",
    marginLeft: 220,
    color: "white",
  },
  but: {
    color: "rgba(205,44,130,1)",
    backgroundColor: "white",
  },
}));

export default function HouseComponent(props) {
  const history = useHistory();
  const classes = useStyles();
  const [stateLedRed, SetStateLedRed] = React.useState(false);
  const [stateLedBlue, SetStateLedBlue] = React.useState(false);
  const [stateLedGreen, SetStateLedGreen] = React.useState(false);
  const [stateDoor, SetStateDoor] = React.useState(false);
  console.log("props...", props.location.state);
  const updateStateDoor = () => {
    let state = !stateDoor;
    SetStateDoor(state);
    props.addStateDoor({ state: state });
  };
  const upDateStateLed = (type) => {
    let color = "";
    let data;
    if (type == 1) {
      color = "red";
      data = !stateLedRed;
      SetStateLedRed(data);
    } else if (type == 2) {
      color = "green";
      data = !stateLedGreen;
      SetStateLedGreen(data);
    } else {
      color = "yellow";
      data = !stateLedBlue;
      SetStateLedBlue(data);
    }
    props.addStateLed({ state: data + "/" + color });
  };
  console.log(props);
  return (
    <div className={classes.root}>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => {
          history.push("/home");
        }}
      >
        Trở lại
      </Button>
      <h3 style={{ pading: 0, margin: 0 }}>
        {props.location.state.data.name_home}
      </h3>
      <div>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Container className={classes.cardGrid} maxWidth="lg">
              {/* End hero unit */}
              <div style={{ width: "80%", margin: "auto" }}>
                <ChartComponent {...props} />
              </div>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                  <Card className={classes.card}>
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        Red Led
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Switch
                        checked={stateLedRed}
                        onClick={() => {
                          upDateStateLed(1);
                        }}
                      />
                    </CardActions>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Card className={classes.card}>
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        Green Led
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Switch
                        checked={stateLedGreen}
                        onClick={() => {
                          upDateStateLed(2);
                        }}
                      />
                    </CardActions>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Card className={classes.card}>
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        Yellow Led
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Switch
                        checked={stateLedBlue}
                        onClick={() => {
                          upDateStateLed(3);
                        }}
                      />
                    </CardActions>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Card className={classes.card}>
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        Door
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Switch
                        checked={stateDoor}
                        onClick={() => {
                          updateStateDoor();
                        }}
                      />
                    </CardActions>
                  </Card>
                </Grid>
              </Grid>
            </Container>
          </Paper>
        </Grid>
      </div>
    </div>
  );
}
