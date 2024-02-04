

export const checkIsMacarons = () => {
    return window.location.host.includes('macarons.gscore.ru') || window.location.host.includes('localhost') || window.location.host.includes('demo.gscore.ru') || window.location.host.includes('test.gscore.ru');
}