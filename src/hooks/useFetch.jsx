import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export const useFetchData = (url,sessionnNameToStore) => {
    const [Data, setData] = useState([]);
    const [loading, setLoading] = useState(true);


    const fetchData =  useCallback(async () => {
        try {
            const response = await axios.get(url);
            console.log(response);
            setData(response.data.data || []);
            sessionStorage.setItem(sessionnNameToStore, JSON.stringify(response.data.data));
            setLoading(false);
            
        } catch (err) {
            console.log(err);
            setLoading(false);

        }
    }, [url]);

    // useEffect(() => {
    //     fetchData();
    // }, [url]);

    return { Data, setData, fetchData ,loading};  
}