const {
    colors,
    CssBaseline,
    ThemeProvider,
    Typography,
    Container,
    makeStyles,
    createMuiTheme,
    Box,
    SvgIcon,
    Link,
    TextField,
    Button,
    Switch,
    FormControlLabel,
    Paper
} = MaterialUI;
const MyContext = React.createContext(null)
const UPDATE_USER = 'UPDATE_USER'
const SET_NEWS = 'SET_NEWS'
const SET_PROMO = 'SET_PROMO'
const initialState = {
    name: null,
    lastname: null,
    cpf: null,
    news: false,
    promo: false,
}
const isUserComplete = (obj) => {
    const isNullOrUndefined = (obj === null) || (obj === undefined)
    if (isNullOrUndefined) return false;
    if (Object.values(obj).includes(null)) return false;
    return true;
}

function reducer(state, action) {
    switch (action.type) {
        case 'UPDATE_USER':
            return {
                ...state,
                name: action.name,
                lastname: action.lastname,
                cpf: action.cpf,
            }
        case 'SET_NEWS':
            return {
                ...state,
                news: action.news ? true : false
            }
        case 'SET_PROMO':
            return {
                ...state,
                promo: action.promo ? true : false
            }
        default:
            break;
    }
}

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#556cd6',
        },
        secondary: {
            main: '#19857b',
        },
        error: {
            main: colors.red.A400,
        },
        background: {
            default: '#fff',
        },
    },
});

function LightBulbIcon(props) {
    return (
        <SvgIcon {...props}>
            <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z" />
        </SvgIcon>
    );
}

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(6, 0, 3),
    },
    lightBulb: {
        verticalAlign: 'middle',
        marginRight: theme.spacing(1),
    },
    switchAlign: {
        marginLeft: '30%'
    },
    buttonAlign: {
        marginTop: '3rem',
        width: '60%',
        marginLeft: '20%',
    },
    jsonAlign: {
        padding: '3rem 0 3rem 0',
        width: '60%',
        marginLeft: '20%',
    },
    inputsAlign: {
        marginBottom: '1rem'
    }
}));

function Form() {
    const classes = useStyles();
    const { dispatch } = React.useContext(MyContext);
    const [values, setValues] = React.useState({
        name: null,
        lastname: null,
        cpf: null,
    });

    const handleChange = ({ target }) => setValues({ ...values, [target.id]: target.value });
    const handleSubmit = (submitEvent) => {
        submitEvent.preventDefault();
        dispatch({ type: 'UPDATE_USER', ...values });
    }

    return (
        <form onSubmit={handleSubmit}>
            <TextField className={classes.inputsAlign} id="name"
                onChange={handleChange} label="Nome" variant="outlined" fullWidth />
            <TextField className={classes.inputsAlign} id="lastname"
                onChange={handleChange} label="Sobrenome" variant="outlined" fullWidth />
            <TextField className={classes.inputsAlign} id="cpf"
                onChange={handleChange} label="CPF" variant="outlined" fullWidth />
            <Switches />
            <Button className={classes.buttonAlign} type="submit"
                variant="contained" color="primary">
                CADASTRAR
            </Button>
        </form>
    );
}

function Switches() {
    const classes = useStyles();
    const { user, dispatch } = React.useContext(MyContext);
    const handleSwitchChange = ({ target }) => {
        const { name } = target;
        if (name === 'promo') {
            return dispatch({ type: 'SET_PROMO', promo: target.checked });
        }
        dispatch({ type: 'SET_NEWS', news: target.checked });
    }

    return (
        <div className={classes.switchAlign}>
            <FormControlLabel
                control={
                    <Switch
                        checked={user.promo}
                        onChange={handleSwitchChange}
                        name="promo"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                }
                label="Receber promoções"
            />
            <FormControlLabel
                control={
                    <Switch
                        checked={user.news}
                        onChange={handleSwitchChange}
                        color="primary"
                        name="news"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                }
                label="Receber novidades"
            />
        </div>
    );
}

function ProTip() {
    const classes = useStyles();
    return (
        <Typography align="center" className={classes.root} color="textSecondary">
            <LightBulbIcon className={classes.lightBulb} />
                Pro tip: See more{' '}
            <Link href="https://material-ui.com/getting-started/templates/">
                templates
            </Link>{' '}
            on the Material-UI documentation.
        </Typography>
    );
}

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Diego Dario
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

function Reset() {
    const classes = useStyles();
    const { user, dispatch } = React.useContext(MyContext);
    const setDefault = () => {
        dispatch({ type: 'UPDATE_USER', ...initialState });
        dispatch({ type: 'SET_NEWS', news: '' });
        dispatch({ type: 'SET_PROMO', promo: '' });
    }

    return (
        <React.Fragment>
            <Paper elevation={3}>
                <div className={classes.jsonAlign}>
                    <pre>{JSON.stringify(user, null, 2)}</pre>
                </div>
            </Paper>

            <Button onClick={setDefault} className={classes.buttonAlign} type="submit"
                variant="contained" color="primary">
                RESETAR
            </Button>
        </React.Fragment>
    );
}

function App() {
    const [user, dispatch] = React.useReducer(reducer, initialState);

    return (
        <Container maxWidth="sm">
            <div style={{ marginTop: 24, }}>
                <Typography align="center" variant="h4" component="h1" gutterBottom>
                    Formulário com React
                </Typography>
                <MyContext.Provider value={{ user, dispatch }}>
                    {
                        isUserComplete(user)
                            ? <Reset />
                            : <Form />
                    }
                </MyContext.Provider>
                <ProTip />
                <Copyright />
            </div>
        </Container>
    );
}

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
    </ThemeProvider>,
    document.querySelector('#root'),
);