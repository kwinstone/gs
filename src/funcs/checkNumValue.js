const checkNumValue = (formdata, name, value) => {
    if(value == '') {
        formdata.append(name, 0)
    } else {
        formdata.append(name, value)
    }
}

export default checkNumValue;