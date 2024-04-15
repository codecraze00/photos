import { useCallback, useState } from "react"
import { useDispatch } from "react-redux"

export const useThunk = (thunk) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const dispatch = useDispatch();

    const runThunk = useCallback((arg) => {
        setIsLoading(true);
        dispatch(thunk(arg))
            .unwrap()
            .catch(e => setError(e))
            .finally(() => setIsLoading(false))
    }, [dispatch, thunk])

    return [runThunk, isLoading, error]
}
