import React, { useState, useCallback } from 'react';
import { TextField, IconButton, Typography } from '@mui/material';

const SearchBar = ({search}) => {
  const [searchText, setSearchText] = useState('');

  

  const handleChange = (event) => {
    setSearchText(event.target.value);
    search(event.target.value)
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '16px' }}>
  <TextField
    label='Buscar:'
    variant="outlined"
    size="small"
    value={searchText}
    onChange={handleChange}
    onKeyPress={handleKeyPress}
    style={{ width: '200px' }} // Ajusta el ancho según tus necesidades
  />
</div>
  );
};

export default SearchBar;
