const checkDelivery = (type) => {
    switch (type) {
        case 2:
            return 'Самовывоз'
        case 1:
            return 'Доставка'
    }
}

export default checkDelivery;