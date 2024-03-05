import React, { Dispatch, SetStateAction } from 'react';
import { DataObject } from '../../interfaces/interfaces';
import './Filters.css'

interface FilterProps {
    data: DataObject[];
    setFilters: Dispatch<SetStateAction<{
        [key: string]: string;
    }>>;
}

const Filters: React.FC<FilterProps> = ({ data, setFilters }) => {
    const handleFilterChange = (key: string, value: string) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [key]: value
        }));
    };

    const uniqueValuesByKey = (key: string): string[] => {
        const valuesByKey = data.map(obj => {return obj[key]});
        return Array.from(new Set(valuesByKey));
    };
    

    const shouldRenderSelect = (key: string) => {
        const values = uniqueValuesByKey(key);
        return values.length > 1 && values.length < data.length;
    };

    return (
        <div>
            {data[0] && Object.keys(data[0]).map(key => (
                shouldRenderSelect(key) && (
                    <div  className='filter' key={key}>
                        <label htmlFor={key}>{key}</label>
                        <select id={key} onChange={(e) => handleFilterChange(key, e.target.value)}>
                            <option value="">Todos</option>
                            {uniqueValuesByKey(key).map(value => (
                                <option key={value} value={value}>{value}</option>
                            ))}
                        </select>
                    </div>
                )
            ))}
        </div>
    );
};

export default Filters;
