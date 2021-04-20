// import base
import { useEffect, useState } from 'react';

// Custom hook to get a debounced value to avoid swamping the server
export default function useDebounce ({ initValue, time }) {
    const [value, setValue] = useState(initValue);
    const [debouncedVal, setDebouncedVal] = useState(initValue);

    useEffect(() => {
        const debounce = setTimeout(() => {
            setDebouncedVal(value);
        }, time);
        
        return () => { clearTimeout(debounce); }
    }, [value, time]);

    return [debouncedVal, setValue];
}