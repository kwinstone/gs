

export const checkIsBao = () => {
    return window.location.host.includes('bao.gscore.ru') || window.location.host.includes('localhost') || window.location.host.includes('demo.gscore.ru') || window.location.host.includes('test.gscore.ru');
}