import feature from '../../../styles/feature.css'

import { CircularProgressbar } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css"

import MoreVertIcon from '@mui/icons-material/MoreVert';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import GradeIcon from '@mui/icons-material/Grade';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import React, { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { getEarnToday } from '../../../services/featureService';
// Modal
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


export const Featured = () =>{

    const [target, setTarget] = useState(100);
    const [open, setOpen] = useState(false);
    const handleOpen = (e) => {e.preventDefault(); setOpen(true);};
    const handleClose = () => setOpen(false);
    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (

    <a href="" ref={ref}  onClick={e => {e.preventDefault();onClick(e);}}>
     {<MoreVertIcon className='iconDots'/>}
     {children}

  </a>
    ));
    const [earnToday, setEarnToday] = useState(0);

    useEffect( () => {
        getEarnToday()
            .then(resultado => setEarnToday(resultado))
            .catch((error) => {
                throw new error(error);
            })
    });

    return(
        
        <div className="featured">
        <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Box className='boxModal'>
            <Typography id="modal-modal-title" variant="h6" component="h2" className='text-center'>
                Introduzca el nuevo objetivo
            </Typography>
            <div className='col-sm-12 text-center my-3'>
                <input type="number" step="any" min="0" value={target} onChange={(e) => {setTarget(e.target.value)}} className='form-control text-center' id="inputModal"/>
            </div>
            <div className='col-sm-12 text-center mt-3'>
                <button className='btn btn-secondary' onClick={handleClose} id="closeButtonModal">Cerrar</button>
            </div>
            
            </Box>
        </Modal>
            <div className="topFeatured">
                <h1 className="titleFeatured">Ingresos Totales</h1>
                <Dropdown>
                    <Dropdown.Toggle as={CustomToggle}>
                    </Dropdown.Toggle>
                    <Dropdown.Menu size="sm" title="">
                        <Dropdown.Item><a href="#" onClick={(e) => {handleOpen(e)}} className="openModalButton">Cambiar objetivo</a></Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>                 
            </div>           
            <div className='bottom'>
                <div className='featuredCharts'>
                    <CircularProgressbar value={earnToday/target * 100} text={`${earnToday/target *100}%`}/>
                </div>
                <p className='titleDescription'>Ventas de hoy</p>
                <p className='amount'>{earnToday} €</p>
                <p className='description'>Estas son las ventas que se han hecho hoy</p>
                <div className="summary">
                    <div className='item'>
                        <div className='itemTitle'>
                            Objetivo
                        </div>
                        <div className='itemResult positive'>
                            <GradeIcon fontSize='small'/>
                            <div className='resultAmount'>
                                {target}€
                            </div>
                        </div>
                    </div>
                    <div className='item'>
                        <div className='itemTitle'>
                            Conseguido
                        </div>
                        <div className='itemResult positive'>
                        {earnToday > 0 ? <KeyboardArrowUpIcon fontSize='small'/> : null}
                            <div className='resultAmount'>
                                {earnToday}€
                            </div>
                        </div>
                    </div>
                    <div className='item'>
                        <div className='itemTitle'>
                            Restante
                        </div>
                        <div className={(parseFloat(target - earnToday) > 0) ? 'itemResult negative' : 'itemResult positive'}>
                            {(target - earnToday) > 0 ? <KeyboardArrowDownIcon fontSize='small'/> : <SportsScoreIcon/>}
                            <div className='resultAmount'>
                                {(target - earnToday) > 0 ? target-earnToday : 0}€
                            </div>
                        </div>
                    </div>
                </div>               
            </div>            
        </div>
    )
}