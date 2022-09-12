import { useState } from "react"
import { Navbar } from "../Dashboard/Navbar";
import { Sidebar } from "../Dashboard/Sidebar";
import report from '../../../styles/report.css';
import { getAllProducts } from "../../../services/productsAdminService";
import { useEffect } from "react";
import { getCategories } from "../../../services/homeAdminService";
import { getConsumptionOfAProductMonthly, getConsumptionOfAProductWeekly } from "../../../services/reportService";
export const ReportsAdmin = () => {

    const [products, setProducts] = useState(null);
    const [categories, setCategories] = useState(null);
    const [consumptionsProducts, setConsumptionsProduct] = useState(null);
    useEffect(() => {

        Promise.all([

            getAllProducts(),
            getCategories()

        ]).then((resultados) => {

            setProducts(resultados[0]);
            setCategories(resultados[1]);

        }).catch((error) => {

            throw new Error(error);
        })

    }, []);

    const consumptionsProduct = (idProducto) => {

        Promise.all([
            getConsumptionOfAProductWeekly(),
            getConsumptionOfAProductMonthly()
        ]).then((resultados) => {

            setConsumptionsProduct(resultados);
        }).catch((error) => {

            throw new Error(error);
        })
    }
    return (

        <div className="d-flex">
            <Sidebar/>
            <div className="w-100">
                <Navbar/>
                <div className="p-3">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="text-center">Informe sobre Producto</h4>
                        </div>
                        <div className="card-body">
                            <div className="col-12 text-cemter">
                                <select className="form-control text-center reportSelector">
                                    <option value={0}>Seleccione producto</option>
                                    {
                                        products?.map((item) => {

                                            return <option value={item.id} key={item.id}>{item.name}</option>
                                        })
                                    }
                                </select>
                                <div className="col-12 my-3 d-flex">
                                    <div className="col-6">
                                        <h4 className="text-center">Consumición semanal</h4>

                                    </div>
                                    <div className="col-6">
                                        <h4 className="text-center">Consumición mensual</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}