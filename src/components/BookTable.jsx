import React from 'react';
import { useTable, useSortBy } from 'react-table';
import { generateCSVLink } from '../utils/downloadCSV';

const BookTable = ({ data }) => {
  const columns = React.useMemo(() => [
    { Header: 'Title', accessor: 'title' }, // Header is the column name and accessor is the key in the data
    { Header: 'Author Name', accessor: 'author_name' },
    { Header: 'First Publish Year', accessor: 'first_publish_year' },
    { Header: 'Subject', accessor: 'subject' },
    { Header: 'Author Birth Date', accessor: 'author_birth_date' },
    { Header: 'Author Top Work', accessor: 'author_top_work' },
    { Header: 'Ratings Average', accessor: 'ratings_average' },
  ], []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data }, useSortBy);

  return (
    <div className="overflow-x-auto">
      {generateCSVLink(data, columns)}
      <table {...getTableProps()} className="min-w-full bg-white">
        <thead className="bg-gray-800 text-white">
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())} className="px-6 py-3 border-b-2 border-gray-300">
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="hover:bg-gray-100">
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()} className="px-6 py-4 border-b border-gray-300">{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BookTable;
