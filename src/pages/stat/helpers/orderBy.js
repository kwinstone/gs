import checkDomain from "../../../funcs/checkDomain";

const orderBy = [
    {
        name: 'ID',
        label: 'ID'
    },
    {
        name: 'Name',
        label: 'Название блюда'
    },
    {
        name:'Price',
        label: `Продажи (${checkDomain('₽', '₸')})`
    },
    {
        name: 'Count',
        label: 'Продажи (шт)'
    },
    {
        name: 'Views',
        label: 'Просмотры'
    },
    {
        name: 'Conversion',
        label: 'Конверсия'
    },
]

export default orderBy;