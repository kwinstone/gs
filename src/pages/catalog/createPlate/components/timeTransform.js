import * as _ from 'lodash';

const weekItemName = (index) => {
    switch(index) {
        case 0:
            return 'ПН'
        case 1:
            return 'ВТ'
        case 2:
            return 'СР'
        case 3:
            return 'ЧТ'
        case 4:
            return 'ПТ'
        case 5:
            return 'СБ'
        case 6:
            return 'ВС'
        default:
            return ''
    }
}

const getMins = (value) => {
    if(value > 10) {
        return value / 10
    } else {
        return value
    }
}


const timeFormat = (time) => {
    // const timeNum = time.toString()

    // const hour = Number(timeNum) < 10 ? '0' + Number.parseInt(timeNum) : Number.parseInt(timeNum);
    // const minutes = Number.isInteger(Number(timeNum)) ? '00' : (timeNum.split('.')[1] + '0').slice(0,2)

    // return `${hour}:${minutes}`
    const timeNum = _.round(time, 2).toString()

    const hour = Number(timeNum) < 10 ? '0' + Number.parseInt(timeNum) : Number.parseInt(timeNum);
    //const minutes = Number.isInteger(Number(timeNum)) ? '00' : 60 * (Math.round(Number(timeNum.split('.')[1])) * 0.1).toString();
    const checkMin = Math.round(60 * (getMins(Number(timeNum.split('.')[1])) * 0.1));
    const minutes = Number.isInteger(Number(timeNum)) ? '00' : checkMin < 10 ? `0${checkMin}` : checkMin.toString();

    return `${hour}:${minutes}`
}

const timeTransform = (time, index) => {
    // if(time !== 'Disabled' && time !== 'Enabled') {
    //     return {
    //         name: weekItemName(index),
    //         // values: {
    //         //     start: timeFormat(Number(time?.split('-')[0]) / 60),
    //         //     end: timeFormat(Number(time?.split('-')[1]) / 60)
    //         // },
    //         values: time.map(i => ({
    //             start: timeFormat(Number(i?.split('-')[0]) / 60),
    //             end: timeFormat(_.round(Number(i?.split('-')[1]) / 60, 2))
    //         })),
    //         enabled: '',
    //         disabled: ''
    //     }
    // } else {
        
    //     return {
    //         name: weekItemName(index),
    //         // values: {
    //         //     start: 0,
    //         //     end: 0
    //         // },
    //         values: [{start: 0, end: 0}],
    //         enabled: time == 'Enabled' ? 'Весь день' : '',
    //         disabled: time == 'Disabled' ? 'Выключено' : ''
    //     }
    // }

    if(time === 'Disabled' || time === 'Enabled') {
        return {
            name: weekItemName(index),
            // values: {
            //     start: 0,
            //     end: 0
            // },
            values: [{start: 0, end: 0}],
            enabled: time == 'Enabled' ? 'Весь день' : '',
            disabled: time == 'Disabled' ? 'Выключено' : ''
        }
    } else {
        return {
            name: weekItemName(index),
            // values: {
            //     start: timeFormat(Number(time?.split('-')[0]) / 60),
            //     end: timeFormat(Number(time?.split('-')[1]) / 60)
            // },
            values: time?.map(i => ({
                start: timeFormat(Number(i?.split('-')[0]) / 60),
                end: timeFormat(_.round(Number(i?.split('-')[1]) / 60, 2))
            })),
            enabled: '',
            disabled: ''
        }
    }
    
}

export default timeTransform;