const checkNull = (value, isCheckbox = false) => {

    if(value === null && isCheckbox) {
        return '0'
    }
    if(value === null && !isCheckbox) {
        return ''
    }
    if(value !== null) {
        return value;
    }

}

export default checkNull;