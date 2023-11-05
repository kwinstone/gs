import { Modal } from "antd";
import { useState } from "react";
import './ActionItemSelect.scss';
import {Row, Col} from 'antd';
import Button from "../../../../components/Button/Button";
import Input from "../../../../components/Input/Input";
import { useEffect } from "react";
import actionsOnBtn from "../../../../funcs/actionsOnBtn";
import StorieCatItem from "../../components/StorieCatItem/StorieCatItem";
import SaveIcon from "../../../../icons/SaveIcon/SaveIcon";
import Pl from "../../../../components/Pl/Pl";


const ActionItemSelect = ({
    list,
    actionType,
    visible,
    close,
    setButtonActionItemID,
    actionItem
}) => {
    const [head, setHead] = useState('')
    const [searchVal, setSearchVal] = useState('')
    const [searchList, setSearchList] = useState([])
    const [item, setItem] = useState(null)

    useEffect(() => {
        if(actionItem) {
            setItem(actionItem)
        } else setItem(null)
    }, [actionItem])

    
    const closeHandle = () => {
        setSearchVal('')
        setSearchList([])
        setItem(actionItem)
        close()
    }

    useEffect(() => {
        if(searchVal) {
            setSearchList(list?.filter(item => item?.Name?.toLowerCase()?.includes(searchVal?.toLowerCase())))
        }   
    }, [searchVal])

    const selectItem = (item) => {
        setItem(item)
    }

    useEffect(() => {
        if(actionType) {
            setHead(actionsOnBtn?.find(item => item.ID == actionType).pl)
        }
    }, [actionType])

    return (
        <Modal 
            width={600} 
            onCancel={closeHandle} 
            open={visible} 
            className="Modal ActionItemSelect">
            <h2 className="Modal__head">{head}</h2>
            <Row gutter={[20, 20]}>
                {
                    !item ? (
                        <Col span={24}>
                            <Input
                                shadow={true}
                                placeholder={actionsOnBtn?.find(item => item.ID == actionType).pl}
                                value={searchVal}
                                onChange={e => setSearchVal(e.target.value)}
                                maskType={String}
                                />
                        </Col>
                    ) : null
                }
                {
                    item ? (
                        <Col span={24}>
                            <div className="ActionItemSelect__selected">
                                <Row gutter={[10,10]}>
                                    <Col span={16}>
                                        <StorieCatItem {...item}/>
                                    </Col>
                                    <Col span={8}>
                                        <Pl
                                            onClick={() => setItem(null)}
                                            shadow={true}
                                            text={'Выбрать другую'}
                                            />
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    ) : (
                        <Col span={24}>
                            <div className="ActionItemSelect__result">
                                {
                                    searchList?.map(item => (
                                        <div className="ActionItemSelect__result_item" key={item.ID}>
                                            <StorieCatItem select={selectItem} {...item}/>
                                        </div>
                                    ))
                                }
                            </div>
                        </Col>
                    )
                }
                <Col span={24}>
                    <Button
                        styles={{width: '100%'}}
                        before={<SaveIcon color={'#fff'} size={20}/>}
                        text={'Сохранить'}
                        onClick={() => {
                            if(item) {
                                setButtonActionItemID(item.ID)
                            }
                            closeHandle()
                        }}
                        />
                </Col>
            </Row>
        </Modal>
    )
}

export default ActionItemSelect;