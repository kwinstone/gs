const checkEmptyValue = (formdata, name, value) => {
    if(value != '') {
        formdata.append(name, value)
    } else {
        formdata.delete(name)
    }
}
export default checkEmptyValue;