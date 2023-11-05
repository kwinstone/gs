import { Link } from 'react-router-dom';
import './Header.scss';
import logo from '../../assets/img/logo.svg';
import logo_bao from '../../assets/img/logo-bao.png';
import checkDomain from '../../funcs/checkDomain';

const Header = () => {
    return (
        <header className="Header">
            <div className="Header__in">
                <Link to={'/organizations'} className="Header__logo">
                    <img src={checkDomain(logo, logo_bao, true)} alt="Logo" />
                </Link>
            </div>
        </header>
    )
}

export default Header;