import './Notfound.scss';
import { useNavigate } from 'react-router-dom';
import elon from '../../assets/img/elon.png';
import {motion} from 'framer-motion';
import elonSmile from '../../assets/img/elon-smile.png';
import { useState, useEffect } from 'react';


const Notfound = () => {
    const nav = useNavigate();
    const [img, setImg] = useState(null)

    useEffect(() => {
        setImg(elon)
    }, []) 

    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.5}}
            exit={{opacity: 0}}

            className="Notfound">
            <main className="Main">
                <div className="pageBody">
                    <div className="pageBody-content Notfound">
                        <div
                            onMouseOver={e => {
                                setImg(elonSmile)
                            }} 
                            onMouseLeave={e => {
                                setImg(elon)
                            }}
                            className="Notfound__icon"
                            >
                            <img src={img} alt="" />
                        </div>
                        <div className="Notfound__text">Такой страницы либо нет либо в разработке</div>
                    </div>
                </div>
            </main>
            
        </motion.div>
    )
}

export default Notfound;