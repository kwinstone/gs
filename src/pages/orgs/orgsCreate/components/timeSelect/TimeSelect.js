import './TimeSelect.scss';
import { useEffect, useState } from 'react';
import EditTime from '../../../modals/editTime/EditTime';
import useModal from '../../../../../hooks/useModal';

const TimeSelect = ({list, selected, save, plate, shadow}) => {
    const {visible, hideModal, showModal} = useModal();


    const [timeList, setTimeList] = useState({});
    const [editIndex, setEditIndex] = useState(0);
    const [editValue, setEditValue] = useState();
    const [editRest, setEditRest] = useState(false);
    const [editName, setEditName] = useState('');
    const [editEnabled, setEditEnabled] = useState(false)
    const [editDisabled, setEditDisabled] = useState(false)

    useEffect(() => {
        setTimeList(list)
    }, [list])

    const openEdit = (index) => {
        setEditIndex(index);
        setEditValue(list[index].values)
        setEditName(list[index].name)
        setEditRest(list[index].rest)
        setEditEnabled(list[index].enabled)
        setEditDisabled(list[index].disabled)
        showModal()
    }

    // useEffect(() => {
    //     console.log(timeList)
    // }, [timeList])

    return (
        <div className={"TimeSelect" + (shadow ? ' shadow ' : '')}>
            <EditTime
                ddisabledVal={editDisabled}
                enabledVal={editEnabled} 
                plate={plate} 
                save={save} 
                name={editName} 
                rest={editRest} 
                editIndex={editIndex} 
                values={editValue} 
                visible={visible} 
                close={hideModal}/>
            {
                timeList && timeList.length > 0 ? (
                    timeList.map((item, index) => (
                        <div onClick={() => openEdit(index)} className="TimeSelect__item" key={index}>
                            <div className="TimeSelect__item_name">{item.name}</div>
                            <div className="TimeSelect__item_vals">
                                {
                                    plate ? (
                                        // !item?.enabled && !item?.disabled ? (
                                        //     item?.values?.map((i, ind) => (
                                        //         <div className='TimeSelect__item_vals_item' key={ind}>
                                        //             no enabled & no disabled
                                        //             <>
                                        //                 {i?.start}-{i?.end}
                                        //             </>
                                        //         </div>
                                        //     ))
                                        // ) : (   
                                        //     <div className="TimeSelect__item_vals_item">
                                        //         {
                                        //               item.enabled ?  (
                                        //                 item.enabled
                                        //             ) : item.disabled
                                        //         }
                                        //     </div>
                                        // )
                                        item?.enabled || item?.disabled ? (
                                                <div className="TimeSelect__item_vals_item">
                                                    {
                                                        item.enabled ?  (
                                                            item.enabled
                                                        ) : item.disabled
                                                    }
                                                </div>
                                        ) : (
                                                item?.values?.map((i, ind) => (
                                                    <div className='TimeSelect__item_vals_item' key={ind}>
                                                  
                                                        <>
                                                            {i?.start}-{i?.end}
                                                        </>
                                                    </div>
                                                ))
                                        )
                                    ) : (
                                        !item?.rest ? (
                                            item?.values && item?.values?.length > 0 ? (
                                                item?.values?.map((i, ind) => (
                                                    <div className='TimeSelect__item_vals_item' key={ind}>
                                                        <>
                                                            {i?.start}-{i?.end}
                                                        </>
                                                    </div>
                                                ))
                                            ) : '-'
                                        ) : (
                                            <div className='TimeSelect__item_vals_item'>
                                                {item?.rest}
                                            </div>
                                        )
                                    )
                                }
                            </div>
                        </div>
                    ))
                ) : null
            }
        </div>
    )
}

export default TimeSelect;