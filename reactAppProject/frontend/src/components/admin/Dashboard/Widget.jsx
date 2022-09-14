import  widget from '../../../styles/widget.css'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { widgetFill } from '../../../services/homeAdminService';
export const Widget = ({ type, numeroActual }) => {

    const data = widgetFill(type);
    const diff = 20;
    
    return (
        <div className='widget p-3'>
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
