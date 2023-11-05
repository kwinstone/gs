export const handleDragStart = (e, item, setCurrentItem) => {
    e.currentTarget.querySelector('.draggable').classList.add('dragStart')
    setCurrentItem(item)
}

export const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.querySelector('.draggable').classList.add('dragOver')
}

export const handleDragLeave = (e) => {
    e.preventDefault();
    e.currentTarget.querySelector('.draggable').classList.remove('dragOver')
}

export const handleDrop = (e, item, updateList, currentItem, list, index) => {
    console.log(index)
    console.log(item)
    e.preventDefault();
    e.currentTarget.querySelector('.draggable').classList.remove('dragStart')
    e.currentTarget.querySelector('.draggable').classList.remove('dragOver')
    updateList(state => state.map((i, cIndex) => {
        if(Number(i.ID) == Number(item.ID)) {
            return {
                ...i,
                ItemOrder: currentItem.ItemOrder
            }
        }
        
        // if(Number(i.ID) == Number(currentItem.ID)) {
        //     return {
        //         ...i,
        //         ItemOrder: item.ItemOrder
        //     }
        // }
        return i;
    }))
}

export const handleDragEnd = (e) => {
    e.currentTarget.querySelector('.draggable').classList.remove('dragStart')
    e.currentTarget.querySelector('.draggable').classList.remove('dragOver')
}

export const sortItems = (a, b) => {
    if(Number(a.ItemOrder) > Number(b.ItemOrder)) {
        return 1    
    } else {
        return -1
    }
}