import productos from '../../../styles/productos.css'
import { Navbar, } from '../Dashboard/Navbar';
import {Sidebar} from '../Dashboard/Sidebar';
import { DatatableAdminProductos } from '../Dashboard/DatatableProductos';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import swal from 'sweetalert'
import { useState, useEffect, useRef } from 'react';
import { getAllProducts, getProductsOfACategory, createCategory, createProduct, deleteCategory, openSettings } from '../../../services/productsAdminService';
import { getCategories } from '../../../services/homeAdminService';

export const ProductsAdmin = () => {

    const [Productos, SetProductos] = useState(null);
    const [Categorias, setCategorias] = useState(null);

    useEffect(() => {
        Promise.all([
            getAllProducts(),
            getCategories()
        ]).then((response) => {
            SetProductos(response[0]);
            setCategorias(response[1]);
        }).catch((error) => {

            throw new Error(error);
        })
    }, []);

    const handleChangeCategorias = (e) => {
        getProductsOfACategory(e.target.value)
            .then((result) => { SetProductos(result) })
            .catch((error) => {

                throw new Error(error);
            })
    }
    const [numPages, setPages] = useState(5);
    const [open, setOpen] = useState(false);
    const [contenido1, setContenido1] = useState('none');
    const [contenido2, setContenido2] = useState('none');
    const [borradoCategoria, setBorradoCategoria] = useState('none');
    const [categoriaABorrar, setCategoriaABorrar] = useState(0);
    const [alturaBox, setAlturaBox] = useState('boxModalProduct');
    const [nuevaCategoria, setNuevaCategoria] = useState('');
    const refe1 = useRef(null);
    const refe2 = useRef(null);
    const [nuevoProductoFeatures, setNuevoProductoFeatures] = useState({

        'name': '',
        'tipo': 1,
        'precio_racion': 0,
        'precio_bebida': 0,
        'IVA': 0,
        'Cocina': 0,
        'Activado': 0
    })
    const handleClose = () => setOpen(false);
    const handleOpen = (string) => {
        console.log(string);
        const settings = openSettings(string);
        setContenido1(settings[0]);
        setContenido2(settings[1]);
        setBorradoCategoria(settings[2]);
        setAlturaBox(settings[3]);

        setOpen(true)
    };

    const handleChangeNuevoProducto = (e) => {

        setNuevoProductoFeatures({
            ...nuevoProductoFeatures,
            [e.target.name]: e.target.value
        })
    }

    const handleInputAlimento = (opcion) => {
        if (opcion === 'Alimento') {

            refe1.current.style.setProperty("display", "block", "important");
            refe2.current.style.setProperty("display", "none", "important");

        } else if (opcion === 'Bebida') {

            refe1.current.style.setProperty("display", "none", "important");
            refe2.current.style.setProperty("display", "block", "important");
        }
    }

    const handleNewProduct = (event) => {

        event.preventDefault();
        createProduct(nuevoProductoFeatures)
            .then((resultado) => {
                console.log(resultado);
                if (resultado) {

                    setOpen(false);
                    window.location.reload();
                }

            }).catch((error) => {

                throw new Error(error);
            })
    }

    const handleNewCategory = (event) => {

        event.preventDefault();
        createCategory(nuevaCategoria)
            .then((resultado) => {

                if (resultado) {

                    setOpen(false);
                    window.location.reload();
                }
            }).catch((error) => {

                throw new error(error);
            })
    }

    const handleDeleteCategory = (event) => {

        event.preventDefault();
        setOpen(false);
        swal({
            title: "¿Estás seguro?",
            text: "¡Los cambios no se podrán revertir!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((resultado) => {

            if (resultado) {
                deleteCategory(categoriaABorrar)
                    .then((confirmacion) => {
                            if (confirmacion) {

                                swal("Eliminado Correctamente", {
                                    icon: "success",
                                }).then((resultadoConfirmacion) => {

                                    if (resultadoConfirmacion) {

                                        window.location.reload()
                                    }
                                });
                            }
                    }).catch((error) => {

                        throw new error(error);
                    })
            }
        }).catch((error) => {

            throw new error(error);
        })
    }

    return (
        <div className='homeProduct'>
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box className={alturaBox}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" className='text-center'>
                        {contenido1 !== 'none' ? 'Nuevo Producto' : (contenido2 !== 'none' ? 'Nueva Categoría' : (borradoCategoria !== 'none' ? 'Seleccione Categoría A Borrar' : ''))}
                    </Typography>
                    <form style={{ display: `${contenido1}` }} onSubmit={handleNewProduct}>
                        <div className="col-12 d-flex">
                            <div className="col-6 text-center p-3">
                                <label className='form-label'>Nombre</label>
                                <input type="text" placeholder='Introduzca el nombre' value={nuevoProductoFeatures.name} onChange={handleChangeNuevoProducto} className="form-control text-center modalInputsNewProduct" name="name" />
                            </div>
                            <div className="col-6 text-center p-3">
                                <label className='form-label'>Tipo</label>
                                <select className='form-control text-center modalInputsNewProduct' name="price" onChange={(e) => { handleInputAlimento(e.target.value) }}>
                                    <option value={'Alimento'}>Alimento</option>
                                    <option value={'Bebida'}>Bebida</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-12 d-flex">
                            <div className="col-6 text-center p-3" id="precioRacion" ref={refe1}>
                                <label className='form-label'>Precio</label>
                                <input type="number" placeholder='Introduzca el precio del producto' value={nuevoProductoFeatures.precio_racion} onChange={handleChangeNuevoProducto} className="form-control text-center modalInputsNewProduct" name='precio_racion' step="any" min="0" />
                            </div>
                            <div className="col-6 text-center p-3"  id="precioBebida" ref={refe2}>
                                <label className='form-label'>Precio</label>
                                <input type="number" placeholder='Introduzca el precio del producto' value={nuevoProductoFeatures.precio_bebida} onChange={handleChangeNuevoProducto} className="form-control text-center modalInputsNewProduct" name='precio_bebida' step="any" min="0" />
                            </div>
                            <div className="col-6 text-center p-3">
                                <label className='form-label'>IVA</label>
                                <input type="number" placeholder='Introduzca el IVA  del producto' value={nuevoProductoFeatures.IVA} onChange={handleChangeNuevoProducto} className="form-control text-center modalInputsNewProduct" name="IVA" step="any" min="0" />
                            </div>
                        </div>
                        <div className="col-12 d-flex">
                            <div className="col-6 text-center p-3">
                                <label className='form-label'>Activado</label>
                                <select className='form-control text-center modalInputsNewProduct' value={nuevoProductoFeatures.Activado} onChange={handleChangeNuevoProducto} name="Activado">
                                    <option value={0}>Desactivado</option>
                                    <option value={1}>Activado</option>
                                </select>
                            </div>
                            <div className="col-6 text-center p-3">
                                <label className='form-label'>Categoría</label>
                                <select name="tipo" className='form-control text-center modalInputsNewProduct' value={nuevoProductoFeatures.tipo} onChange={handleChangeNuevoProducto}>
                                    {
                                        Categorias?.map((categoria) => {
                                            return (<option key={categoria.id} value={categoria.id}>{categoria.name}</option>)
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className='col-sm-12 p-3'>
                            <label className='form-label'>Cocina</label>
                            <select className='form-control text-center modalInputsNewProduct' value={nuevoProductoFeatures.Cocina} onChange={handleChangeNuevoProducto} name="Cocina">
                                <option value={0}>No Cocina</option>
                                <option value={1}>A Cocina</option>
                            </select>
                        </div>
                        <div className='col-sm-12 text-center mt-3'>
                            <button className="btn btn-primary" id="sendButtonModalProduct">Crear</button>
                            <button type="button" className='btn btn-secondary ms-2' onClick={handleClose} id="closeButtonModal">Cerrar</button>
                        </div>
                    </form>
                    <form style={{ display: `${contenido2}` }} onSubmit={handleNewCategory}>
                        <div className='col-sm-12 text-center my-3'>
                            <input type="text" placeholder='Nombre de la nueva Categoría' className="form-control text-center modalInputsNewProduct" value={nuevaCategoria} onChange={(e) => { setNuevaCategoria(e.target.value) }} name="categoria" id="newCategoriaInput" />
                        </div>
                        <div className='col-sm-12 text-center'>
                            <button className='btn btn-primary buttonCategoryCreation'>Crear</button>
                            <button type="button" className='btn btn-secondary buttonCategoryCreation ms-3' onClick={handleClose}>Cerrar</button>
                        </div>
                    </form>
                    <form style={{ display: `${borradoCategoria}` }} onSubmit={handleDeleteCategory}>
                        <div className='col-sm-12 text-center my-3'>
                            <select name="categoriaAEliminar" className='form-control text-center modalInputsNewProduct' value={categoriaABorrar} onChange={(e) => (setCategoriaABorrar(e.target.value))} id="selectDeleteCategory">
                                <option value={0}>Seleccione Categoría.....</option>
                                {
                                    Categorias?.map((categoria) => {
                                        return (<option key={categoria.id} value={categoria.id}>{categoria.name}</option>)
                                    })
                                }
                            </select>
                        </div>
                        <div className='col-sm-12 my-3 text-center'>
                            <button className='btn btn-danger buttonCategoryCreation'>Eliminar</button>
                            <button type="button" className='btn btn-secondary buttonCategoryCreation ms-3' onClick={handleClose}>Cerrar</button>
                        </div>
                    </form>
                </Box>
            </Modal>
            <Sidebar />
            <div className='containerProduct'>
                <Navbar />
                <div className='col-sm-12 d-flex mt-3'>
                    <div className="col-sm-6 d-flex">
                        <div className='col-sm-3 p-2 ms-2'>
                            <label className='form-label'>Número de Páginas: </label>
                        </div>
                        <select className='form-control selectPages text-center' onClick={(e) => { setPages(e.target.value) }}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="30">30</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                    </div>
                    <div className='col-sm-6 d-flex'>
                        <div className='col-sm-3 p-2 ms-2'>
                            <label className='form-label'>Categorías: </label>
                        </div>
                        <select className='form-control selectPages text-center' onClick={(e) => { handleChangeCategorias(e) }}>
                            <option value={0}>Todos</option>
                            {
                                Categorias?.map((categoria) => {
                                    return (<option key={categoria.id} value={categoria.id}>{categoria.name}</option>)
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className='col-sm-12 mt-3 text-center'>
                    <a href="#" className='btn btn-primary ms-1 buttonCreation' onClick={(e) => { e.preventDefault(); handleOpen('Producto') }}>Crear Producto</a>
                    <a href="#" className='btn btn-secondary ms-1 buttonCreation' onClick={(e) => { e.preventDefault(); handleOpen('Categoria'); }}>Crear Categoría</a>
                    <a href="#" className='btn btn-danger ms-1 buttonCreation' onClick={(e) => { e.preventDefault(); handleOpen('BorrarCategoria') }}>Borrar Categoría</a>
                </div>
                <DatatableAdminProductos numRows={parseInt(numPages)} Rows={Productos} />
            </div>
        </div>
    )
}