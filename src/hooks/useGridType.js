import { useState } from "react";

// grid types
// - big
// - small



const useGridType = () => {
    const [gridType, setGridType] = useState('big')

    return {setGridType, gridType}
}


export default useGridType;