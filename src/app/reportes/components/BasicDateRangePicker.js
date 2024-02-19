import React from 'react';
import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;
const App = () => (
  <Space direction="vertical" >
    <RangePicker className='h-12 bg-white ml-8 mr-36 mt-4 mb-4' />
    
  </Space>
);
export default App;