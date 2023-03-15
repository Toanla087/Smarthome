import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
// import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    alignItems: "center",
    color: theme.palette.text.secondary,
    backgroundImage: "url(bg3.jpg)",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "96vh",
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
    paddingTop: theme.spacing(8),
    paddingLeft: theme.spacing(30),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "rgba(20, 19, 19, 0.5)",
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
    backgroundColor: "rgba(20, 19, 19, 0.5)",
    marginLeft: 220,
    color: "white",
  },
  but: {
    color: "rgba(205,44,130,1)",
    backgroundColor: "white",
  },
}));

export default function HouseList(props) {
  const history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [codeHome, setCodeHome] = React.useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const addHome = () => {
    let dataid = {
      idUser: props.user.data._id,
      idHome: codeHome,
    };
    props.createHome(dataid);
    handleClose();
  };
  const deleteHome = (id) => {
    let dataid = {
      idUser: props.user.data._id,
      idHome: id,
    };
    props.deleteHome(dataid);
  };
  const detailPage = (id, item) => {
    console.log("id...", id);
    // if (id == "60ac72775320b70988150d12") {
    history.push("/house", { data: item });
    console.log(item);
    // } else {
    //   history.push("/form", { data: item });
    // }
  };
  //let data;
  // if (props.user.data.smart_home) {
  //   data = props.user.data.smart_home.map((item, card) => (
  //     <Grid item key={card} xs={12} sm={6} md={3}>
  //       <Card className={classes.card}>
  //         <CardContent className={classes.cardContent}>
  //           <Typography gutterBottom variant="h5" component="h2">
  //             {console.log(props)}
  //           </Typography>
  //         </CardContent>
  //         <CardActions>
  //           <Button
  //             className={classes.but}
  //             size="small"
  //             variant="outlined"
  //             color="secondary"
  //             onClick={() => {
  //               detailPage(item._id, item);
  //             }}
  //           >
  //             Chi tiết
  //           </Button>
  //           <Button
  //             className={classes.but}
  //             size="small"
  //             variant="outlined"
  //             color="secondary"
  //             onClick={() => {
  //               deleteHome(item._id);
  //             }}
  //           >
  //             Xóa
  //           </Button>
  //         </CardActions>
  //       </Card>
  //     </Grid>
  //   ));
  // }
  return (
    <div>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Button
            className={classes.button}
            variant="outlined"
            color="secondary"
            onClick={handleClickOpen}
          >
            Add your home
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle
              style={{ color: "rgba(205,44,130,1)" }}
              id="alert-dialog-title"
            >
              {"Nhập mã căn nhà của bạn vào đây !"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <TextField
                  style={{ width: "100%" }}
                  id="outlined-basic"
                  label="Mã nhà"
                  variant="outlined"
                  color="secondary"
                  onChange={(e) => {
                    setCodeHome(e.target.value);
                  }}
                />
              </DialogContentText>
            </DialogContent>

            <DialogActions>
              <Button onClick={handleClose} color="secondary">
                Bỏ qua
              </Button>
              <Button
                onClick={() => {
                  addHome();
                }}
                color="secondary"
                autoFocus
              >
                Đồng ý
              </Button>
            </DialogActions>
          </Dialog>
          <Container className={classes.cardGrid} maxWidth="lg">
            {/* End hero unit */}
            <Grid container spacing={3}>
              {props.user.data.smart_home.map((item, card) => (
                <Grid item key={card} xs={12} sm={6} md={3}>
                  <Card className={classes.card}>
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {item.name_home}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        className={classes.but}
                        size="small"
                        variant="outlined"
                        color="secondary"
                        onClick={() => {
                          detailPage(item._id, item);
                        }}
                      >
                        Chi tiết
                      </Button>
                      <Button
                        className={classes.but}
                        size="small"
                        variant="outlined"
                        color="secondary"
                        onClick={() => {
                          deleteHome(item._id);
                        }}
                      >
                        Xóa
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Paper>
      </Grid>
    </div>
  );
}
