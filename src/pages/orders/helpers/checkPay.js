const checkPay = (type) => {
    switch (type) {
        case 0:
            return 'Оплата наличными'
        case 1:
            return 'Оплата по карте при получении'
        case 2:
            return 'Оплата по карте в приложении'
        
    }
}

export default checkPay;