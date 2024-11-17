import React from 'react';

const SearchBar = ({ value, onChange }) => {
    return (
        <input
            type="text"
            placeholder="Search..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="p-2 border border-gray-300 rounded"
        />
    );
};

export default SearchBar;
