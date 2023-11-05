import './TrashItem.scss';
import {Row, Col} from 'antd';
import Button from '../../../../components/Button/Button';

const TrashItem = (props) => {
    const {
        onDelete,
        onRestore,
        Name
    } = props



    return (
        <div className='TrashItem'>
            <div className={'TrashItem__name'}>
                {Name}
            </div>
            <div className='TrashItem__action'>
                <Row gutter={[5,5]}>
                    <Col span={24}>
                        <Button
                            text={'Восстановить'}
                            onClick={onRestore}
                            />
                    </Col>
                    <Col span={24}>
                        <Button
                            variant={'danger'}
                            text={'Удалить'}
                            onClick={onDelete}
                            />
                    </Col>
                </Row>
            </div>
        </div>
    )
}


export default TrashItem;