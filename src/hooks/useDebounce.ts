import { useEffect, useState } from "react"

const DEBOUNCE_TIMEOUT = 1 * 1000

const useDebounce = <T, > (value: T) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    const [isUserTyping, setIsUserTyping] = useState(false);

    useEffect(() => {
        setIsUserTyping(true)
        const debounceTimeout = setTimeout(() => {
            setDebouncedValue(value);
            setIsUserTyping(false)
        },DEBOUNCE_TIMEOUT);

        return () => clearTimeout(debounceTimeout);
    }, [value])

  return  { debouncedValue, isUserTyping }
}

export default useDebounce