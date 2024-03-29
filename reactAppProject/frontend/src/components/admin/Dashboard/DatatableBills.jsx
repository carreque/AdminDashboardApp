import datatable from '../../../styles/datatable.css'
import { DataGrid } from '@mui/x-data-grid';
import { columnsBills, deleteBills } from '../../../services/datatableService';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';

export const DatatableBills = ({numRows, Rows}) => {

    
    const actionColunm = [{
        field: 'action', headerName: 'Acciones', width: 250, renderCell: (params) => {
            return (
                <div className='cellAction d-flex'>
                    <div className='editButton'><Link to={"orderBills"} state={{idBill: params.row.id}}><button type="button" className='btn btn-primary'><CreateIcon /></button></Link></div>
                    <div className='DeleteButton ms-3'><button type="button" className="btn btn-primary" onClick={(e) => {e.preventDefault(); handleDeleteBill(params.row.id)}}><DeleteIcon /></button></div>
                </div>
            )
        }
    }];
   
    const handleDeleteBill = (id) => {

        swal({
            title: "¿Estás seguro?",
            text: "¡Los cambios no se podrán revertir!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((confirmacion) => {

            if(confirmacion){
                
                deleteBills(id)
                .then(resultado => {

                    if(resultado === 'Factura eliminada Correctamente'){

                        swal("Eliminado Correctamente", {
                            icon: "success",
                        }).then((resultadoConfirmacion) => {

                            if (resultadoConfirmacion) {

                                window.location.reload()
                            }
                        });
                    }
                })
                .catch((error) => {

                    throw new Error(error);
                })
            }
        })
    }
    return(
        <div className='datatable'>
            <DataGrid
            rows={Rows ? Rows : []}
            columns={columnsBills.concat(actionColunm)}
            pageSize={numRows}
            rowsPerPageOptions={[5]}
            checkboxSelection/>
        </div>
    )
}