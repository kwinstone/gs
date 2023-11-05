import './Button.scss';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';



const Button = ({
    text, 
    before, 
    after, 
    justify, 
    variant, 
    type, 
    styles, 
    onClick,
    load,
    disabled
}) => {
    

    const variantSw = () => {
        switch(variant) {
            case 'default':
                return ' default '
            case 'danger':
                return ' danger '
            case 'light':
                return ' light '
            default:
                return ' default '
        }
    }


    return (
        <button disabled={load || disabled} onClick={onClick} type={type} className={"Button " + variantSw()} style={{justifyContent: justify, ...styles}}>
            {
                load ? (
                    <div className="Button__load">
                        <Spin className='Button__load_icon' indicator={<LoadingOutlined/>}/>
                    </div>
                ) : null
            }
            {
                before ? (
                    <span className="Button__before">{before}</span>
                ) : null
            }
            <div className="Button__text">{text}</div>
            {
                after ? (
                    <span className="Button__after">{after}</span>
                ) : null
            }
        </button>
    )
}

export default Button;