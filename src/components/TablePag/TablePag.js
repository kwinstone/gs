import './TablePag.scss';
import {DoubleLeftOutlined, DoubleRightOutlined} from '@ant-design/icons';
import { Pagination } from 'antd';

const TablePag = ({
    onChange,
    jumpToStart,
    jumpToEnd,
    total,
    current,
    size,
    style,
    pageSize
}) => {
    return (
        <div style={style} className="TablePag">
            <div className="TablePag__in">
                <button onClick={jumpToStart} className="TablePag__side TablePag__side-start">
                    <DoubleLeftOutlined/>
                </button>
                <Pagination
                    pageSize={pageSize}
                    showSizeChanger={false}
                    total={total}
                    current={current}
                    onChange={onChange}
                    showQuickJumper={false}
                    />
                <button onClick={jumpToEnd} className="TablePag__side TablePag__side-end">
                    <DoubleRightOutlined/>
                </button>
            </div>
        </div>
    )
}

export default TablePag;