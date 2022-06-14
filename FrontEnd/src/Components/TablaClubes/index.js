import React, {useEffect,useState} from 'react';
import axios from 'axios';
import { makeStyles , TextField, Button, Modal} from '@material-ui/core';
//import { Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, TextField } from '@material-ui/core';
import {Edit, Delete} from '@material-ui/icons';
import { TableContainer,Table,TableHead,TableBody,TableRow,TableCell,Paper} from '@mui/material'
import Box from '@mui/material/Box';
import BackdropFilter from "react-backdrop-filter";

const useStyles = makeStyles((theme)=>({
    modal:{
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        padding: theme.spacing(2,4,3),
        top: '50%',
        left:'50%',
        transform: 'translate(-50%, -50%)'
    },
    icons: {
        cursor: 'pointer'
    },
    inputMaterial:{
        width: '100%'
    },
  
}));

export default function TablaClubes() {
    const classes = useStyles();

    const [data, setData] = useState([]);
    const [modalEdit, setModalEdit] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);
    const [ClubSeleccionado, setClubSeleccionado] = useState({
        direccion:'',
        representante:'',
        telefono: '',
        comuna:''
    })

    const abrirCerrarModalEdit =() =>{
        setModalEdit(!modalEdit); //abre o cierra el modal
    }

    const handleChange=e=>{ //alamcenamos lo que se escribe en el textfield
        const{name, value}=e.target; //name es una propiedad que le di a cada textfield mas abajo
        if(name!==""){
            setClubSeleccionado(prevState=>({
                ...prevState,
                [name]:value
            }))
        }

    }

    const bodyEdit = (
        <div className= {classes.modal}>
            <h3>Editar datos</h3>
            <TextField name = 'direccion' className={classes.inputMaterial} label='Direccion' onChange={handleChange} value = {ClubSeleccionado && ClubSeleccionado.direccion}/>
            <br/>
            <TextField name = 'representante' className={classes.inputMaterial} label='Representante' onChange={handleChange} value = {ClubSeleccionado && ClubSeleccionado.representante}/>
            <br/>
            <TextField name = 'telefono' className={classes.inputMaterial} label='Telefono' onChange={handleChange} value = {ClubSeleccionado && ClubSeleccionado.telefono}/>
            <br/>
            <TextField name = 'comuna' className={classes.inputMaterial} label='Comuna' onChange={handleChange} value = {ClubSeleccionado && ClubSeleccionado.comuna}/>
            <br></br>
            <div align = 'right'>
                <Button onClick={()=>editarClub()}>Editar Club</Button>
                <Button onClick={()=>abrirCerrarModalEdit()}>Cancelar</Button>
            </div>
        </div>
    )

    const bodyEliminar = (
        <div className={classes.modal}>
          <p>Estás seguro que deseas eliminar la sala? <b>{ClubSeleccionado && ClubSeleccionado.id_club}</b> ? </p>
          <div align="right">
            <Button color="secondary" onClick={()=>deleteClub()}>Sí</Button>
            <Button onClick={()=>abrirCerrarModalELiminar()}>No</Button>
          </div>
        </div>
    )

    const abrirCerrarModalELiminar=() =>{
        setModalEliminar(!modalEliminar);
    }

    const seleccionarClub=(club, caso)=>{
        setClubSeleccionado(club);
        (caso === 'Editar')?abrirCerrarModalEdit():abrirCerrarModalELiminar()

    }
    
    //peticion get
    const getClubes = async() =>{
        await axios.get('http://localhost:3001/api/Administrador/getClubes')
        .then(response =>{
           setData(response.data) 
           console.log(response)
        });
        
    }

    useEffect (() =>{
        getClubes();
    },[])

    console.log(getClubes());

    //petición put
    const editarClub = async()=>{
        await axios.put('http://localhost:3001/api/Administrador/updateClub/'+ ClubSeleccionado.id_club, ClubSeleccionado)
        .then(response =>{
            var dataNueva = data; //guarda los nuevos datos de la sala
            dataNueva.forEach(club=>{ //recorre el arrego con los nuevos datos de la sala 
                if(ClubSeleccionado.id_club === club.id_club){
                    club.direccion = ClubSeleccionado.direccion;
                    club.representante = ClubSeleccionado.representante;
                    club.telefono = ClubSeleccionado.telefono;
                    club.comuna = ClubSeleccionado.comuna;
                }
            })
            setData(dataNueva);
            abrirCerrarModalEdit();
        })
    }
    
    const deleteClub = async() =>{
        await axios.delete('http://localhost:3001/api/Administrador/deleteClub/'+ClubSeleccionado.id_club)
        .then(response=>{
            setData(data.filter(club=>club.id_club!==ClubSeleccionado.id_club)); //filtar los datos por cdsala
            abrirCerrarModalELiminar();
        })
    }


    return (
        <div className = 'App'>
            <br/>
            <div align = 'center'>
            </div>
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
                mx = {25} 
                border = {1}
                borderColor = '#adc178'
                >
                <BackdropFilter
                        className="bluredForm"
                        filter={"blur(5px)"}
                        html2canvasOpts={{
                            allowTaint: true
                        }}
                        onDraw={() => {
                            console.log("Rendered !");
                        }}
                >
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nombre club</TableCell>
                                <TableCell>Editar</TableCell>
                                <TableCell>Eliminar</TableCell>
                            </TableRow>
                        </TableHead> 

                        <TableBody>
                            {data.map(club =>(
                                <TableRow sx={{ '&:last-child td, &:last-child th': {border: 0}}}>
                                    <TableCell>{club.nombre_club}</TableCell>
                                    <TableCell>
                                    <Edit className = {classes.icons} onClick = {()=>seleccionarClub(club, 'Editar')}/>
                                    <Modal
                                        open = {modalEdit}
                                        onClose = {abrirCerrarModalEdit}
                                    >
                                        {bodyEdit}
                                    </Modal>
                                    </TableCell>
                                    <TableCell>
                                    <Delete className = {classes.icons} onClick ={()=>seleccionarClub(club, 'Eliminar')}/>
                                    <Modal
                                        open = {modalEliminar}
                                        onClose = {abrirCerrarModalELiminar}
                                    >
                                        {bodyEliminar}
                                    </Modal>
                                </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
    
                </TableContainer>
                </BackdropFilter>
            </Box>     
            </div>
        
    )
}



