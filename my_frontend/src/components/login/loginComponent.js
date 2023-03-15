import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function LoginComponent(props) {
    const history = useHistory();
    useEffect(() => {
        if (props.user) {
            if (props.user.status) {
                history.push("/home");
            }
        }
    }, [props])

    const classes = useStyles();
    const [checkLogin, setCheckLogin] = useState(true)
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const funcLogin = () => {
        let data = { user_name: userName, password: password }
        props.login(data)
    }
    const funRegister = () => {
        let data = {
            user_name: userName,
            password: password,
            full_name: fullName,
            email: email
        }
        props.register(data)
    }
    const formDataInput = () => {
        if (checkLogin) {
            return (
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Login
                    </Typography>

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        color="secondary"
                        autoComplete="username"
                        autoFocus
                        onChange={(e) => { setUserName(e.target.value) }}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        color="secondary"
                        autoComplete="current-password"
                        onChange={(e) => { setPassword(e.target.value) }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        className={classes.submit}
                        onClick={() => { funcLogin() }}
                    >
                        Login
                    </Button>
                    <Grid container>
                        <Grid item xs>
                        </Grid>
                        <Grid item>
                            <Link color="secondary" href="#" variant="body2" onClick={() => { setCheckLogin(!checkLogin) }} >
                                {"Don't have an account? Register"}
                            </Link>
                        </Grid>
                    </Grid>
                </div>
            )
        }
        else {
            return (
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Register
                    </Typography>

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        color="secondary"
                        autoComplete="username"
                        autoFocus
                        onChange={(e) => { setUserName(e.target.value) }}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        color="secondary"
                        autoComplete="current-password"
                        onChange={(e) => { setPassword(e.target.value) }}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="fullname"
                        label="Full name"
                        name="fullname"
                        color="secondary"
                        autoComplete="fullname"
                        autoFocus
                        onChange={(e) => { setFullName(e.target.value) }}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        color="secondary"
                        autoComplete="email"
                        autoFocus
                        onChange={(e) => { setEmail(e.target.value) }}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        className={classes.submit}
                        onClick={() => { funRegister() }}
                    >
                        Register
                    </Button>
                    <Grid container>
                        <Grid item xs>
                        </Grid>
                        <Grid item>
                            <Link color="secondary" href="#" variant="body2" onClick={() => { setCheckLogin(!checkLogin) }} >
                                {"I have an account! Login"}
                            </Link>
                        </Grid>
                    </Grid>
                </div>
            )
        }
    }
    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                {formDataInput()}
            </Grid>
        </Grid>
    );
}