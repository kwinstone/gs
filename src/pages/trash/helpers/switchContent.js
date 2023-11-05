import TrashItem from "../components/TrashItem/TrashItem"

const switchContent = (activeTab, {cats, subs, prods} = {cats: [], subs: [], prods: []}, deleteFunction, restoreFunction) => {

    if(activeTab === '1') {
        return (
            <div className="TrashPage__list">
                {
                    cats?.map((i, index) => (
                        <div className="TrashPage__list_item">
                            <TrashItem
                                {...i}
                                onDelete={() => deleteFunction('categories', i?.ID)}
                                onRestore={() => restoreFunction('categories', i?.ID)}
                                />
                        </div>
                    ))
                }
            </div>
            
        )
    }       

    if(activeTab === '2') {
        return (
            <div className="TrashPage__list">
            {
                subs?.map((i, index) => (
                    <div className="TrashPage__list_item">
                        <TrashItem
                            {...i}
                            onDelete={() => deleteFunction('subcategories', i?.ID)}
                            onRestore={() => restoreFunction('subcategories', i?.ID)}
                            />
                    </div>
                ))
            }
        </div>
        )
    }

    if(activeTab === '3') {
        return (
            <div className="TrashPage__list">
            {
                prods?.map((i, index) => (
                    <div className="TrashPage__list_item">
                        <TrashItem
                            {...i}
                            onDelete={() => deleteFunction('plates', i?.ID)}
                            onRestore={() => restoreFunction('plates', i?.ID)}
                            />
                    </div>
                ))
            }
        </div>
        )
    }

    return null

}


export default switchContent;