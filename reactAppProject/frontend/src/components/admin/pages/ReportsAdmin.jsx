import { useState } from "react"
import { Navbar } from "../Dashboard/Navbar";
import { Sidebar } from "../Dashboard/Sidebar";
import report from '../../../styles/report.css';
import { getAllProducts } from "../../../services/productsAdminService";
import { useEffect } from "react";
import { getCategories } from "../../../services/homeAdminService";
import { getConsumptionOfAProductMonthly, getConsumptionOfAProductWeekly, getCategoryConsumptionWeekly, getCategoryConsumptionMonthly } from "../../../services/reportService";
import { CircularProgressbar } from "react-circular-progressbar";
import { getAllUsers } from "../../../services/usersAdminService";

export const ReportsAdmin = () => {

    const [products, setProducts] = useState(null);
    const [categories, setCategories] = useState(null);
    const [trabajadores, setTrabajadores] = useState(null);
    const [consumptionsProducts, setConsumptionsProduct] = useState([[0,0], [0,0]]);
    const [consumptionsCategories, setConsumptionsCategories] = useState([[0,0], [0,0]]);

    useEffect(() => {

        Promise.all([

            getAllProducts(),
            getCategories(),
            getAllUsers()

        ]).then((resultados) => {

            setProducts(resultados[0]);
            setCategories(resultados[1]);
            setTrabajadores(resultados[2]);

        }).catch((error) => {

            throw new Error(error);
        })

    }, []);

    const consumptionProductMeasure = (e) => {

        Promise.all([
            getConsumptionOfAProductWeekly(e.target.value),
            getConsumptionOfAProductMonthly(e.target.value)
        ]).then((resultados) => {

            setConsumptionsProduct(resultados);
            
        }).catch((error) => {

            throw new Error(error);
        })
    }

    const consumptionCategoryMeasure = (e) => {

        Promise.all([
            getCategoryConsumptionWeekly(e.target.value),
            getCategoryConsumptionMonthly(e.target.value)
        ]).then((resultados) => {
            setConsumptionsCategories(resultados);
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
                            <div className="col-12 text-center">
                                <select className="form-control text-center reportSelector" onChange={consumptionProductMeasure}>
                                    <option value={0} key={0}>Seleccione producto</option>
                                    {
                                        products?.map((item) => {

                                            return <option value={item.id} key={item.id}>{item.name}</option>
                                        })
                                    }
                                </select>
                                <div className="col-12 my-3 d-flex">
                                    <div className="col-6">
                                        <h4 className="text-center">Consumición semanal</h4>
                                        <div className="chartWeekly">
                                            <CircularProgressbar value={isNaN(consumptionsProducts[0][1]/consumptionsProducts[0][0]) ? 0 : (consumptionsProducts[0][1]/consumptionsProducts[0][0] * 100).toFixed(2)} text={`${isNaN(consumptionsProducts[0][1]/consumptionsProducts[0][0]) ? 0 : (consumptionsProducts[0][1]/consumptionsProducts[0][0]*100).toFixed(2)}%`}/>
                                        </div>                                       
                                    </div>
                                    <div className="col-6">
                                        <h4 className="text-center">Consumición mensual</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-3">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="text-center">Informe sobre Categoría</h4>
                        </div>
                        <div className="card-body">
                            <select className="form-control text-center reportSelector" onChange={consumptionCategoryMeasure}>
                                <option value={0} key={0}>Seleccione una Categoría</option>
                                {
                                    categories?.map((item) => {

                                        return <option value={item.id} key={item.id}>{item.name}</option>
                                    })
                                }
                            </select>
                            <div className="col-12 d-flex mt-3">
                                <div className="col-6">
                                    <h4 className="text-center">Consumisición semanal</h4>
                                    <div className="chartWeekly">
                                        <CircularProgressbar value={isNaN(consumptionsCategories[0][1]/consumptionsCategories[0][0]) ? 0 : (consumptionsCategories[0][1]/consumptionsCategories[0][0] * 100).toFixed(3)} text={`${isNaN(consumptionsCategories[0][1]/consumptionsCategories[0][0]) ? 0 : (consumptionsCategories[0][1]/consumptionsCategories[0][0]*100).toFixed(2)}%`}/>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <h4 className="text-center">Consumisición mensual</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-3">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="text-center">Informe sobre Trabajadores</h4>
                        </div>
                        <div className="card-body">
                            <select className="form-control text-center reportSelector" onChange={0}>
                                <option value={0} key={0}>Seleccione un Trabajador</option>
                                {
                                    trabajadores?.map((item) => {

                                        return <option value={item.id} key={item.id}>{item.name}</option>
                                    })
                                }
                            
                            </select>
                            <div className="col-12 d-flex mt-3">
                                <div className="col-6">
                                    <h4 className="text-center">Horas Semanales</h4>
                                    <div className="chartWeekly">
                                        <CircularProgressbar value={0} text={`${0.00}%`}/>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <h4 className="text-center">Consumisición mensual</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}