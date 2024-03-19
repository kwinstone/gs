

export const checkIsTigrus = () => {
    return window.location.host.includes('tigrus.gscore.ru') || window.location.host.includes('osaka.gscore.ru') || window.location.host.includes('testjonny.gscore.ru') || window.location.host.includes('localhost') || window.location.host.includes('test.gscore.ru');
}