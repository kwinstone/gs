import './Bc.scss';
import { useState } from 'react';

const Bc = ({parent}) => {
    const [links, setLinks] = useState([])

    return (
        <div className="Bs">
            {
                links?.map((item,index) => (
                    <div className="Bc__item" key={index}>
                        
                    </div>
                ))
            }
        </div>
    )
}



export default Bc;

