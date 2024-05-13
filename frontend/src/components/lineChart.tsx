import { useEffect, useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import toast, { Toaster } from 'react-hot-toast';
import Card from './card';

// // Define the default data for the LineChart
// const defaultData = [
//   { name: '0 AM', TEMP: 400, time: 0 },
//   { name: '2 AM', TEMP: 300, time: 2 },
//   { name: '4 AM', TEMP: 200, time: 4 },
//   { name: '6 AM', TEMP: 278, time: 6 },
//   { name: '8 AM', TEMP: 189, time: 8 },
//   { name: '10 AM', TEMP: 350, time: 10 },
//   { name: '12 PM', TEMP: 220, time: 12 },
//   { name: '14 PM', TEMP: 180, time: 14 },
//   { name: '16 PM', TEMP: 270, time: 16 },
//   { name: '18 PM', TEMP: 200, time: 18 },
//   // Add more objects as needed
// ];

// Define the props interface for LineChartCustom component
interface LineChartProps {
  data: { name: string, TEMP: number, time: number }[]
}

const LineChartCustom = ({ data }: LineChartProps) => {
  // State variables for slider values and filtered chart data
  const [fromSlider, setFromSlider] = useState(0);
  const [toSlider, setToSlider] = useState(20);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [chartData, setChartData] = useState(data);

  // Function to filter the chart data based on slider values
  const filterChartData = () => {
    const filteredData = data.filter((item) => item.time >= fromSlider && item.time <= toSlider);
    setChartData(filteredData);
  }

  // Function to set the range of sliders based on min and max time values in the data
  const filtersRangeSetter = () => {
    let min = 24, max = 0;
    data.forEach((item) => {
      if (item.time > max) max = item.time;
      if (item.time < min) min = item.time;
    });
    setStartTime(min);
    setEndTime(max);
  }

  // Event handler for 'From' slider change
  const handleFromSlider = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    setFromSlider(value);
  }

  // Event handler for 'To' slider change
  const handleToSlider = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    setToSlider(value);
  }

  // Function to check for valid filter range
  const checkForValidFilter = () => {
    if (fromSlider > toSlider) {
      toast.error('From time should be less than To time');
      return false;
    }
    return true;
  }

  // Effect to filter chart data when slider values or data change
  useEffect(() => {
    filterChartData();
    checkForValidFilter();
  }, [fromSlider, toSlider, data]);

  // Effect to set slider range when chartData changes
  useEffect(() => {
    filtersRangeSetter();
  }, [chartData]);

  return (
    <>

    {
      chartData.length === 0 ? <p className='text-red-500 text-center'>No data available</p> :<div className='flex flex-row gap-2'>
      <LineChart className='grow' width={700} height={400} data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <Line type="monotone" dataKey="TEMP" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
      </LineChart>
      <div>
        <Card className='mb-4 p-1 w-[400px]'>
          <div>
            <label htmlFor="from-range" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">From Time</label>
            <input type="range" min={startTime} max={endTime} step={2} value={fromSlider} className="range range-primary w-full" onChange={handleFromSlider} />
            <div className="w-full flex justify-between text-xs px-2">
              {data.map((item, index) => <span key={index} className='text-gray-500 font-bold text-md'>| {item.time} |</span>)}
            </div>
          </div>
        </Card>

        <Card className='mb-2 p-2 w-[400px]'>
          <div>
            <label htmlFor="to-range" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">To Time</label>
            <input type="range" min={startTime} max={endTime} step={2} value={toSlider} className="range range-primary w-full" onChange={handleToSlider} />
            <div className="w-full flex justify-between text-xs px-2">
              {data.map((item, index) => <span key={index} className='text-gray-500 font-bold text-md'>| {item.time} |</span>)}
            </div>
          </div>
        </Card>
      </div>
    </div>
    }
      
      <Toaster />
    </>
  );
}

export default LineChartCustom;