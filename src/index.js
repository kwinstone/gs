import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import 'antd/dist/antd.css';
import 'swiper/css';
import './styles/styles.scss';
import App from './app/App';
import { ConfigProvider } from 'antd';
import ru from 'antd/es/locale/ru_RU';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "cropperjs/dist/cropper.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
      <Provider store={store}>
            <ConfigProvider locale={ru}>
                <App/>
            </ConfigProvider>
            <ToastContainer position={'bottom-center'} style={{ width: 400, bottom: 40}} />
      </Provider>
    </Router>
  
);


