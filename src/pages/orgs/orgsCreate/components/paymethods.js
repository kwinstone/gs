const paymethods = [
    {
        value: 'Оплата наличными',
        PaymentType: 0,
        IsNeedToChangeCash: '0',
        checkbox: true,
        cmsID: ''
        // delete: true
    },
    {
        value: 'Оплата по карте в приложении',
        PaymentType: 2,
        IsNeedToChangeCash: '0',
        cmsID: ''
        // delete: true
    },
    {
        value: 'Оплата по карте при получении',
        PaymentType: 1,
        IsNeedToChangeCash: '0',
        cmsID: ''
        // delete: true
    },
    {
        value: 'Оплата бонусами',
        PaymentType: 3,
        IsNeedToChangeCash: '0',
        cmsID: ''
    }
]

export default paymethods;