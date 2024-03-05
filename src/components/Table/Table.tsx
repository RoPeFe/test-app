import React, { useState } from 'react';
import Pagination from '../Pagination/Pagination';
import { MAX_RESULTS } from '../../constants/apiConstants';
import { DataObject } from '../../interfaces/interfaces';
import './Table.css'

interface TableColumn {
    key: string;
    label: string;
    sortOrder?: string;
}

interface TableProps {
    title: string;
    data: DataObject[];
    columns: TableColumn[];
}

const Table: React.FC<TableProps> = ({ title, data, columns }) => {
    const [currentPage, setCurrentPage] = useState(1);

    if (data.length === 0) {
        return <p>No hay datos disponibles</p>;
    }

    const sortByColumn = (key: string) => {
        const column = columns.find((col) => col.key === key);
        if (column) {
            column.sortOrder = column.sortOrder === 'asc' ? 'desc' : 'asc';

            data.sort((a, b) => {
                if (a[key] < b[key]) return column.sortOrder === 'asc' ? -1 : 1;
                if (a[key] > b[key]) return column.sortOrder === 'asc' ? 1 : -1;
                return 0;
            });
        }
    };
    const startPaginationElement = (currentPage - 1) * MAX_RESULTS;
    return (
        <div className='table-container'>
            <h2 className='table-title'>{title}</h2>
            <table>
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th key={column.key}>
                                {column.sortOrder ? (
                                    <div className='sort-col'>
                                        {column.label}
                                        <div className='sort-arrows' onClick={() => sortByColumn(column.key)}>
                                            <span>{column.sortOrder === 'asc' ? ' ▴' : ' ▵'}</span>
                                            <span>{column.sortOrder === 'asc' ? ' ▿' : ' ▾'}</span>
                                        </div>
                                    </div>
                                )
                                    :
                                    column.label
                                }
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data
                        .slice(startPaginationElement, startPaginationElement + MAX_RESULTS)
                        .map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {columns.map((column, columnIndex) => (
                                    <td key={columnIndex}>{row[column.key] ? row[column.key] : '—'}</td>
                                ))}
                            </tr>
                        ))}
                </tbody>
            </table>

            <Pagination currentPage={currentPage} totalPages={Math.ceil(data.length / MAX_RESULTS)} onPageChange={setCurrentPage} />
        </div>
    );
};

export default Table;
