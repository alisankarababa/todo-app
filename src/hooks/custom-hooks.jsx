import { useState } from "react";


export function useLocalStorage(key, value) {

    const [data, setData] = useState(() => {

        const dataFoundInStorage = localStorage.getItem(key);

        if(dataFoundInStorage)
            return JSON.parse(dataFoundInStorage);

        localStorage.setItem(key, JSON.stringify(value));
        return value;
    })

    function updateLocalStorage(valueNew) {
        
        localStorage.setItem(key, JSON.stringify(valueNew));
        setData(valueNew);
    }

    function clearLocalStorage() {
        localStorage.removeItem(key);
        setData(null);
    }

    return [data, updateLocalStorage, clearLocalStorage];
}