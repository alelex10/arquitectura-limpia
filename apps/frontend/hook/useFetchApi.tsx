import { URL_API_BASE } from "../constants/constants";


export const useFetchApi = async () => {
    
    const response = await fetch(`${URL_API_BASE}`);
    const data = await response.json();
    return data;
};