import './AuthPage.scss';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import {Formik, Form} from 'formik';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { settingsUpdate, tokenUpdate, userUpdate } from '../../store/actions';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/dataService';
import {motion} from 'framer-motion';
import pageEnterAnimProps from '../../funcs/pageEnterAnimProps';
const LOCAL_STORAGE = window.localStorage;
const as = new authService();

const initValues = {
    Login: '',
    Password: ''
}

const AuthPage = () => {
    const nav = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState('')



    return (
        <motion.div 
            {...pageEnterAnimProps}
            className="AuthPage page">  
            <main className="Main">
                <div className="AuthPage__in">
                    <div className="AuthPage__body">
                        <h2 className="AuthPage__body_title">Вход в админ-панель</h2>
                        <Formik
                            initialValues={initValues}
                            onSubmit={(values, {setSubmitting}) => {
                                setSubmitting(true);
                                as.auth(values).then(res => {
                                    if(res.error) {
                                        setError(res.message)
                                    } else {
                                        console.log(res)
                                        setError('')
                                        LOCAL_STORAGE.setItem('gs-token', res.user.Token)
                                        dispatch(tokenUpdate(res.user.Token))
                                        nav('/organizations', {replace: true})

                                        LOCAL_STORAGE.setItem('gs-user-settings', JSON.stringify(res.settings))
                                        dispatch(settingsUpdate(res.settings))

                                        LOCAL_STORAGE.setItem('gs-user-data', JSON.stringify(res.user))
                                        dispatch(userUpdate(res.user))
                                    }   
                                }).finally(_ => {
                                    setSubmitting(false)
                                })
                            }}
                            >
                            {({values, errors, isSubmitting, handleChange, handleBlur}) => (
                                <Form className='AuthPage__body_form'>
                                    <div className="AuthPage__body_form_item">
                                        <Input
                                            maskType={String}
                                            name={'Login'}
                                            placeholder={'Логин'}
                                            type={'text'}
                                            value={values.Login}
                                            onChange={handleChange}
                                            showErrorText={false}
                                            error={error}
                                            />
                                    </div>
                                    <div className="AuthPage__body_form_item">
                                        <Input
                                            maskType={String}
                                            name={'Password'}
                                            placeholder={'Пароль'}
                                            type={'password'}
                                            value={values.Password}
                                            onChange={handleChange}
                                            showErrorText={false}
                                            error={error}
                                            />
                                    </div>
                                    <div style={{color: 'var(--red)', fontWeight: 600}}>{error}</div>
                                    <div className="AuthPage__body_form_action">
                                        <Button
                                            load={isSubmitting}
                                            styles={{minWidth: 315}} 
                                            text={'Войти'}
                                            justify={'center'}
                                            type={'submit'}/>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                        
                    </div>
                </div>
                
            </main>
        </motion.div>
    )
}

export default AuthPage;