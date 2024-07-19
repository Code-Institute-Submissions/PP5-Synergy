import { createContext, useContext, useEffect, useState } from "react";
import { axiosReq } from "../api/axiosDefaults";

export const optionsContext = createContext();

export const useOptions = () => useContext(optionsContext);

export const OptionsContext = ({ children }) => {
    const [categoryOptions, setCategoryOptions] = useState([])
    const [projectOptions, setProjectOptions] = useState([])

    const handleMount = async () => {
        try {
            const [{ data: category }, { data: project }] =
            await Promise.all([
                axiosReq.get(`/api/category/`),
                axiosReq.get(`/api/project/`),
            ]);
            setCategoryOptions(category.results)
            setProjectOptions(project.results)
        } catch (err) {
        }
    };

    useEffect(() => {
        handleMount();
    }, []);

    return (
        <optionsContext.Provider value={[categoryOptions,projectOptions]}>
            {children}
        </optionsContext.Provider>
    );
};