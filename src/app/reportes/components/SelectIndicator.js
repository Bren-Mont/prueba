import * as React from 'react';
import Select, { selectClasses } from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';

export default function SelectIndicator({ options, onSelectChange }) {
  const handleSelectChange = (event) => {
    const selectedParkingId = event.target.value;
    onSelectChange(selectedParkingId);
  };

  return (
    <Select 
      className="h-12 bg-white ml-8 mt-2 mb-2"
      placeholder="Seleccione estación"
      onChange={handleSelectChange}
      indicator={<KeyboardArrowDown sx={{ color: '#0099CC' }}/>}
      sx={{
        width: 240,
        [`& .${selectClasses.indicator}`]: {
          transition: '0.2s',
          [`&.${selectClasses.expanded}`]: {
            transform: 'rotate(-180deg)',
          },
        },
      }}
    >
      {options.map(option => (
        <Option key={option.parking_id} value={option.parking_id}>
          {option.parking_name}
        </Option>
      ))}
    </Select>
  );
}