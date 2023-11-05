import { useState } from "react";


const useContent = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [view, setView] = useState(false);


    return {
        loading,
        error,
        view,
        setLoading,
        setError,
        setView
    }
}

export default useContent;