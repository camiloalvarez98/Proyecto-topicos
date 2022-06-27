import React, {useEffect,useState} from 'react';
//import axios from 'axios';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { makeStyles, } from '@material-ui/core';
import {Modal, Button, TextField } from '@material-ui/core';
import { Contenedor } from '../../Components';
import BackdropFilter from "react-backdrop-filter";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

const useStyles = makeStyles((theme)=>({
    modal:{
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2,4,3),
        top: '50%',
        left:'50%',
        transform: 'translate(-50%, -50%)'
    },
    icons: {
        cursor: 'pointer'
    },
    inputMaterial:{
        width: '100%',
        
    },
    text:{
        fontFamily: 'oswald',
    },
    text2:{
        textAlign : 'left',
        marginLeft: '20px'
    },
    button:{
        width: '20%',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        marginLeft: theme.spacing(5),
        marginRigt: theme.spacing(5),
        
        [theme.breakpoints.down(400 + theme.spacing(2)+2)]:{
            margin: theme.spacing(0),
            width: '100%',
            height: '100%'
        }
    },
  
}));


  

export default function PrincipalClub() {
    const classes = useStyles()
    const [modalEdit, setModalEdit] = useState(false);
    const [data, setData] = useState([]);
    const [ClubSeleccionado, setClubSeleccionado] = useState({
        id_club: '' 
    })

    

    const handleChange=e=>{ //alamcenamos lo que se escribe en el textfield
        const{name, value}=e.target; //name es una propiedad que le di a cada textfield mas abajo
        if(name!==""){
            setClubSeleccionado(prevState=>({
                ...prevState,
                [name]:value
            }))
        }

    }

    const correo_club = localStorage.getItem('correo_club')
    const getClub = async() =>{
        await axios.get('http://localhost:3001/api/Club/getClub/'+ correo_club)
        .then(response =>{
           setData(response.data) 
           console.log(response.data)
        })
    }

    useEffect (() =>{
        getClub();
    },[])
           

    const abrirCerrarModalEdit =() =>{
        setModalEdit(!modalEdit); //abre o cierra el modal
    }
    
    const bodyEdit = (
        <div className= {classes.modal}>
            <h3>Editar datos</h3>
            <TextField name = 'direccion' className={classes.inputMaterial} label='Direccion' onChange={handleChange} />
            <br/>
            <TextField name = 'representante' className={classes.inputMaterial} label='Representante' onChange={handleChange}/>
            <br/>
            <TextField name = 'telefono' className={classes.inputMaterial} label='Telefono' onChange={handleChange}/>
            <br/>   
            <TextField name = 'comuna' className={classes.inputMaterial} label='Comuna' onChange={handleChange}/>
            <br></br>
            <div align = 'right'>
                <Button>Guardar</Button>
                <Button onClick={()=>abrirCerrarModalEdit()}>Cancelar</Button>
            </div>
        </div>
    )

    return (
        <div>
            <Contenedor/>
            <br/>
            <div align = 'center'>
                <Box 
                    sx = {{
                        width:{
                          xs: 300,
                          sm: 400,
                          md: 600,
                          lg: 800,
                          xl: 1200,
                        }
                    }}
                    color = 'contrastText'
                    border = {1}
                >
                    <BackdropFilter
                        className="bluredForm"
                        filter={"blur(5px) "}
                        html2canvasOpts={{
                            allowTaint: true
                        }}
                        onDraw={() => {
                            console.log("Rendered !");
                        }}
                    >
                        <br></br>
                        
                        
                        {data.map((club)=>(
                            
                            <Grid container>
                                <Grid item xs = {12}>
                                    <h1>{club.nombre_club}</h1>
                                </Grid>
                                <br></br>
                                <br></br>
                                {/*Direccion*/}
                                <Grid item xs ={3}>
                                    <h4 className={classes.text2}>Direccion:</h4>  
                                </Grid>
                                <Grid item xs = {8} marginTop= {'10px'} marginRight = {'50px'} >
                                    <TextField variant='outlined' color = 'secondary' fullWidth inputProps={{readOnly: true,}} defaultValue={club.nombre_club} size = 'small'/>
                                </Grid>

                                {/*Representante*/}
                                <Grid item xs = {3}>
                                    <h4 className={classes.text2}>Representante:</h4>               
                                </Grid>
                                <Grid item xs = {8} marginTop= {'10px'} marginRight = {'50px'}>
                                    <TextField variant='outlined' color = 'secondary' fullWidth inputProps={{readOnly: true,}} defaultValue={club.representante_club} size = 'small'/>
                                </Grid>

                                {/*Telefono*/}
                                <Grid item xs = {3}>
                                    <h4 className={classes.text2}>Telefono:</h4>
                                </Grid>
                                <Grid item xs = {8} marginTop= {'10px'} marginRight = {'50px'}>
                                    <TextField variant='outlined' color = 'secondary' fullWidth inputProps={{readOnly: true,}} defaultValue={club.telefono_club} size = 'small'/>
                                </Grid>


                                {/*Comuna*/}
                                <Grid item xs = {3}>
                                    <h4 className={classes.text2}>Comuna:</h4>
                                </Grid>
                                <Grid item xs = {8} marginTop= {'10px'} marginRight = {'50px'}>
                                    <TextField variant='outlined' color = 'secondary' fullWidth inputProps={{readOnly: true,}} defaultValue={club.comuna_club} size = 'small'/>
                                </Grid>
                            </Grid>
                        ))}
                        <br></br>
                    </BackdropFilter>
                </Box>

                <div  mx = {20}>
                    <Button 
                        className={classes.button}
                        type = "button"
                        variant = 'contained'
                        size='small'
                        onClick = {()=>abrirCerrarModalEdit()}
                    >
                        Editar
                    </Button>
                    <Modal
                        open = {modalEdit}
                        close = {abrirCerrarModalEdit}
                    >
                        {bodyEdit}
                    </Modal>
                    
                </div>
            </div>
            
        </div>
        
    )
}
