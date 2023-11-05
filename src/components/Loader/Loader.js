import './Loader.scss';
import {PulseLoader} from 'react-spinners';

const Loader = ({loading}) => {
    return (
        <div className={"Loader"}>
            <PulseLoader size={15} color="#7B99FF" />
        </div>
    )
}

export default Loader;