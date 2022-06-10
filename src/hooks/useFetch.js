import { useEffect, useState } from "react";


function useFetch(url, options={}) {
    const [state, setState] = useState({
        items: [],
        loading: true
    });

    const hasOptions = Object.keys(options).length === 0;

    useEffect(function() {
        (async function() {
            const response = await fetch(url, hasOptions? options: null);
            const responseData = await response.json();
            if (response.ok) {
                setState({
                    items: responseData,
                    loading: false
                })
            } else {
                setState(state ({
                    ...state,
                    loading: false
                }))
            }
        })();
    }, [])

    return [
        state.loading,
        state.items
    ]
}

export default useFetch;
