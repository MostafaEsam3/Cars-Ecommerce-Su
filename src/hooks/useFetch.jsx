import axios from "axios";
import { useEffect, useState } from "react";

export const useFetchData = (url,sessionnNameToStore) => {
    const [Data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get(url);
            // console.log(response);
            setData(response.data.data);
            sessionStorage.setItem(sessionnNameToStore, JSON.stringify(response.data.data));
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, [url]);

    return { Data, setData, fetchData };  
}