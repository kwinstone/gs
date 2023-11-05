const checkStatus = (status) => {
    switch(status) {
        case 1: 
            return {
                name: 'Новый',
                color: "#30B42E"
            } 
        case 2: 
            return {
                name: 'Не оплачен',
                color: "#FF4A4A"
            } 
        case 3: 
            return {
                name: 'В работе',
                color: "#7B99FF"
            } 
        case 4: 
            return {
                name: 'Отменен',
                color: "#898989"
            } 
        case 5: 
            return {
                name: 'Завершен',
                color: "#898989"
            } 
        case 6: 
            return {
                name: 'Оплачено',
                color: "#7B99FF"
            } 
        default: 
            return {
                name: 'Неизвестно',
                color: 'var(--red)'
            }
    }
}

export default checkStatus;