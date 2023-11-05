import './SearchResult.scss';


const SearchResult = ({list, select}) => {
    return (
        <div className='SearchResult'>
            
            {
                list && list.length > 0 ? (
                    list.map((item, index) => (
                        <div className='SearchResult__item' key={index} onClick={() => select({...item})}>
                            <div className="SearchResult__item_img">
                                <img src={item.ThumbnailPicture} alt="" />
                            </div>
                            <div className="SearchResult__item_name">
                                {item.Name}
                            </div>
                        </div>
                    ))
                ) : null
            }
        </div>
    )
}

export default SearchResult;