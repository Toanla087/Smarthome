import React, { useEffect, useState } from "react";
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
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useHistory } from "react-router-dom";
import ChartComponent from "../house/chartComponent";
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

export default function FormComponent(props) {
  const history = useHistory();
  const classes = useStyles();
  const [checkedArrsy, setCheckedArray] = React.useState([false, false, false]);
  const [temperature, setTemperature] = useState();
  const [humidity, setHumidity] = useState();
  console.log(Object.values(props.location.state.data.device[0]).join(""));
  useEffect(() => {
    fetch("http://localhost:4000/temperature/3")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log(data.data.map((value, index) => Number(value.temperature)));
        setTemperature(
          data.data.map((value, index) => Number(value.temperature))
        );
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:4000/temperature/3")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setHumidity(data.data.map((value, index) => Number(value.humidity)));
      });
  }, []);

  console.log("props...", props.location.state);
  const handleChange = (event, key) => {
    let dt = [];
    for (let index = 0; index < checkedArrsy.length; index++) {
      if (index == key) {
        dt.push(!checkedArrsy[index]);
      } else {
        dt.push(checkedArrsy[index]);
      }
    }
    setCheckedArray(dt);
    console.log("array...", checkedArrsy);
  };
  let tempstate = {
    temperature,
    humidity,
  };
  console.log(tempstate);
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
                <ChartComponent tempstate={tempstate} />
              </div>
              <Grid container spacing={3}>
                {props.location.state.data.device.map((card, key) => (
                  <Grid item key={key} xs={12} sm={6} md={3}>
                    <Card className={classes.card}>
                      <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                          {Object.values(card).join("")}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={checkedArrsy[key]}
                              onChange={(e) => {
                                handleChange(e, key);
                              }}
                              name="checkedA"
                            />
                          }
                        />
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Paper>
        </Grid>
      </div>
    </div>
  );
}
