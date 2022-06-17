import React, { useState } from 'react'
import { Grid, Container, Paper, Avatar, Typography, Button, TextField} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import { useAuth } from '../../Context/AuthContext'
import { Link, useNavigate} from 'react-router-dom'
import { ListItemText, List, Collapse, ListItemButton, ListItemIcon, } from '@mui/material'
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import { useForm } from '../../Shared/hooks/useForm'



const useStyles = makeStyles(theme=>({
    root:{
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        
    },
    container:{
        opacity: '0.8',
        height: '85%', //largo del contenedor
        marginTop: theme.spacing(5), //altura del contenedor
        [theme.breakpoints.down(400 + theme.spacing(2)+2)]:{ //responsive
            marginTop: 0,
            width: '100%',
            height: '100%'
        }
    },
    div:{
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'

    },
    avatar:{
        margin: theme.spacing(6),
        marginTop: -40,
        backgroundColor: theme.palette.secondary.main 
       
    },
    form:{
        width: '100%',
        marginTop: theme.spacing(1)
    },
    button:{
        margin: theme.spacing(3, 0, 2), //mrgen general
        //backgroundColor: theme.palette.secondary.main
        
    },
    input:{
        flex: 1, 
        padding: 4, 
        marginLeft: 85,
        marginTop: 5, 
        fontSize: 18, 
        borderWidth: 1,  
        justifyContent: 'flex-start'
    },
    text:{
        marginLeft: 170,
        marginTop: 30
    }

}))

export default function SignIn() {
    const { signup } = useAuth() //esta funcion viene de /context/AuthContext
    const [error, setError] = useState(null);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confpas,setConfpas] = useState('')
    const [usrVerf, setUsrVerf] = useState(false)
    const [open, setOpen] = useState(false)
    const [form, handleFormChange] = useForm({categoria:""})
    const handleEmail = (event) => setEmail(event.target.value) //el email se setea deacuerdo al valor que ingrese en el input
    const handlePassword = (event) => setPassword(event.target.value) //la password se setea deacuerdo al valor que ingrese en el input  
    const handleConfirm = (event) => setConfpas(event.target.value)
    const classes = useStyles()
    const navigate = useNavigate();

    
    /**
     * handleSubmit es la funcion que se ejecuta al presionar el boton 'crear', esta de debe invocar (onSubmit) cuando se cree el formulario
     * donde se ingresara la info necesaria, en este caso email y password
     * 
     */

    const handleSubmit = async(event) => {
        event.preventDefault(); //para evitar que se recarge
        
        if (password !== confpas){
            setError('Contraseñas no coinciden')
            setTimeout(()=> setError(''), 2500)
        
        }else{
            try{
                await signup(email, password) //aqui ya se verifico que ambas contrasenias sean iguales, por lo tanto, un error aca solo seria del servidor
                navigate('/perfiljugador') //se crea la cuenta y se redirige al proytecto raiz
            } catch(prop){
                setError('Server Error')
                setTimeout(()=> setError(''), 2500)             
            }
        }
    }

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <div>
            <Grid container component = 'main' className = {classes.root}>
                <Container component={Paper} elevation={5} maxWidth = 'xs' className = {classes.container}>{/** caja contenedora blanca */}
                    <div className = {classes.div}>
                        {error && <p className= 'error'>{error}</p>}
                        <br/>
                        <Avatar className = {classes.avatar}>
                            <PersonAddAltOutlinedIcon/> {/**icono de addUser */}
                        </Avatar>
                        <Typography component = 'h1' variant = 'h4'> Sign Up </Typography>
                        <form className = {classes.form} onSubmit = {handleSubmit}>
                            <br/>
                            {/*
                            <TextField
                                variant = 'outlined'
                                color='secondary'
                                fullWidth
                                required
                                autoFocus //enfocado en input de usuario
                                placeholder='Nombre'
                            />
                            <br/>
                            <br/>
                            <TextField
                                variant = 'outlined'
                                color='secondary'
                                fullWidth
                                required
                                autoFocus //enfocado en input de usuario
                                placeholder='Apellido Paterno'
                            />
                            <br/>
                            <br/>
                            <TextField
                                variant = 'outlined'
                                color='secondary'
                                fullWidth
                                required
                                autoFocus //enfocado en input de usuario
                                placeholder='Apellido Materno'
                            />
                            <br/>
                            <br/>*/}
                            <TextField
                                variant = 'outlined'
                                color='secondary'
                                fullWidth
                                required
                                autoFocus //enfocado en input de usuario
                                placeholder = 'Correo'
                                type = 'email' 
                                onChange = {handleEmail}                               
                            />
                            <br/>
                            <br/>

                            <TextField
                                variant = 'outlined'
                                color='secondary'
                                fullWidth
                                required
                                autoFocus //enfocado en input de usuario
                                placeholder = 'Contraseña'
                                type = 'password' //eso encripta la password por pantalla
                                onChange = {handlePassword}
                            />
                            <br/>
                            <br/>
                            <TextField
                                variant = 'outlined'
                                color='secondary'
                                fullWidth
                                required
                                autoFocus //enfocado en input de usuario
                                placeholder = 'Confirmar contraseña'
                                type = 'password' //eso encripta la password por pantalla
                                onChange = {handleConfirm}
                            />
                            <br/>
                            <br/>
                            <ListItemButton onClick={handleClick}>
                                <ListItemIcon>
                                    <FormatListNumberedIcon />
                                </ListItemIcon>
                                <ListItemText primary="Categoria" secondary = {form.categoria}/>
                                {open ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <List
                                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                                component="nav"
                            >
                                <Collapse in={open} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        <ListItemButton 
                                            onClick={() => {
                                                    const function1 = handleFormChange({categoria: 'primera'});
                                                    const function2 = handleClick()
                                                    function1()
                                                    function2()
                                                }
                                            } 
                                        >
                                            Primera
                                        </ListItemButton>
                                        <ListItemButton 
                                            onClick={() => {
                                                    const function1 = handleFormChange({categoria: 'segunda'});
                                                    const function2 = handleClick()
                                                    function1()
                                                    function2()
                                                }
                                            } 
                                        >
                                            Segunda
                                        </ListItemButton>
                                        <ListItemButton 
                                            onClick={() => {
                                                    const function1 = handleFormChange({categoria: 'tercera'});
                                                    const function2 = handleClick()
                                                    function1()
                                                    function2()
                                                }
                                            } 
                                        >
                                            Tercera
                                        </ListItemButton>
                                        <ListItemButton 
                                            onClick={() => {
                                                    const function1 = handleFormChange({categoria: 'cuarta'});
                                                    const function2 = handleClick()
                                                    function1()
                                                    function2()
                                                }
                                            } 
                                        >
                                            Cuarta
                                        </ListItemButton>
                                        <ListItemButton 
                                            onClick={() => {
                                                    const function1 = handleFormChange({categoria: 'quinta'});
                                                    const function2 = handleClick()
                                                    function1()
                                                    function2()
                                                }
                                            } 
                                        >
                                            Quinta
                                        </ListItemButton>
                                        <ListItemButton 
                                            onClick={() => {
                                                    const function1 = handleFormChange({categoria: 'sexta'});
                                                    const function2 = handleClick()
                                                    function1()
                                                    function2()
                                                }
                                            } 
                                        >
                                            Sexta
                                        </ListItemButton>
                                        <ListItemButton 
                                            onClick={() => {
                                                    const function1 = handleFormChange({categoria: 'DA'});
                                                    const function2 = handleClick()
                                                    function1()
                                                    function2()
                                                }
                                            } 
                                        >
                                            Damas A
                                        </ListItemButton>
                                        <ListItemButton 
                                            onClick={() => {
                                                    const function1 = handleFormChange({categoria: 'DB'});
                                                    const function2 = handleClick()
                                                    function1()
                                                    function2()
                                                }
                                            } 
                                        >
                                            Damas B
                                        </ListItemButton>
                                        <ListItemButton 
                                            onClick={() => {
                                                    const function1 = handleFormChange({categoria: 'DC'});
                                                    const function2 = handleClick()
                                                    function1()
                                                    function2()
                                                }
                                            } 
                                        >
                                            Damas C
                                        </ListItemButton>
                                    </List>
                                </Collapse>
                            </List>
                            <Button
                                type = 'submit'
                                value = 'signup'
                                fullWidth
                                variant = 'contained'
                                className = {classes.button}                                
                            >
                                Crear
                            </Button>
                    
                            <Link to = '/loginJugador'>
                                <ListItemText secondary = 'Regresar' className = {classes.text}/>
                            </Link>
                            <br/><br/>
                        </form>
                    </div>
                </Container>
            </Grid>  
        </div>
    )
}