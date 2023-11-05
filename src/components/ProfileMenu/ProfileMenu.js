import './ProfileMenu.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { tokenUpdate, settingsUpdate, userUpdate } from '../../store/actions';

const LOCAL_STORAGE = window.localStorage;


const ProfileMenu = () => {
    const {token} = useSelector(state => state)
    const dispatch = useDispatch()
    const nav = useNavigate()

    const logout = () => {
        dispatch(tokenUpdate(null))
        dispatch(settingsUpdate(null))
        dispatch(userUpdate(null))
        LOCAL_STORAGE.removeItem('gs-token')
        LOCAL_STORAGE.removeItem('gs-user-settings')
        LOCAL_STORAGE.removeItem('gs-user-data')
        nav('/auth', {replace: true})
    }

    return (
        <div className="ProfileMenu">
            <div className="ProfileMenu__item">Все настройки</div>
            <div onClick={logout} className="ProfileMenu__item danger">Выйти</div>
        </div>
    )
}

export default ProfileMenu;