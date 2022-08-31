import  widget from '../../../styles/widget.css'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import EuroIcon from '@mui/icons-material/Euro';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';

export const Widget = ({ type, numeroActual }) => {

    let data;
    const diff = 20;
    switch (type) {
        case "user":
            data = {
                title: "USERS",
                isMoney: false,
                link: "Ver todos los usuarios",
                icon: (
                    <PersonOutlinedIcon className='iconWidget' />
                )
            };
            break;

        case "products":
            data = {
                title: "Categorias",
                isMoney: false,
                link: "Ver todas las categorias",
                icon: (
                    <ProductionQuantityLimitsIcon className='iconWidget' />
                )
            };
            break;
        case "Precios":
            data = {
                title: "Precios",
                isMoney: true,
                link: "Ver los precios actuales",
                icon: (
                    <EuroIcon className='iconWidget' />
                )
            };
            break;
        default:
            break;

    }
    return (
        <div className='widget'>
            <div className='left'>
                <span className='titleWidget'>{data.title}</span>
                <span className='counter'>{data.isMoney} {numeroActual}</span>
                <span className='link'>{data.link}</span>
            </div>
            <div className='right'>
                <div className='percentage positive'>
                    <KeyboardArrowUpIcon />
                    {diff}%
                </div>
                {data.icon}
            </div>
        </div>
    )
}
