const switchCrm = (settings, iiko, rkeeper, bitrix, frontpad) => {
    const {cms_type} = settings;

    if(cms_type == 'iiko') {
        return iiko;
    }
    if(cms_type == 'rkeeper') {
        return rkeeper;
    }
    if(cms_type == '1c') {
        return bitrix
    }
    if(cms_type == 'frontpad') {
        return frontpad
    }
    if(cms_type == 'none') {
        return null
    }
    
    return null;
}

export default switchCrm;