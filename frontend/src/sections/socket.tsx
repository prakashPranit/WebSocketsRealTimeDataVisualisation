import React from 'react';
import io from "socket.io-client";

// Define the props interface for Socket component
interface SocketProps {
  setNewSensorData: React.Dispatch<React.SetStateAction<any>>; // Set type for setNewSensorData function
}

const Socket: React.FC<SocketProps> = ({ setNewSensorData }: SocketProps) => {
  // State for the server time
  const [time, setTime] = React.useState<string>('fetching');

  // Effect to establish socket connection and handle events
  React.useEffect(() => {
    // Connect to the server's socket.io instance
    const socket = io('http://localhost:5000');

    // Event listener for successful connection
    socket.on('connect', () => console.log(socket.id));

    // Event listener for connection errors
    socket.on('connect_error', () => {
      // Retry connection after 5 seconds if there's an error
      setTimeout(() => socket.connect(), 5000);
    });

    // Event listener for receiving server time updates
    socket.on('time', (data) => setTime(data));

    // Event listener for receiving sensor readings updates
    socket.on('reading', (data) => setNewSensorData(data));

    // Event listener for disconnection from the server
    socket.on('disconnect', () => setTime('server disconnected'));

    // Clean-up function to disconnect socket when component unmounts
    return () => {
      socket.disconnect();
    };
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <div className="mb-2">
      {/* Display server time */}
      <p className='bg-blue-200 border-blue-800 border-[2px] p-1 rounded-md shadow-md'>
        Server Time: {time}
      </p>
    </div>
  );
}

export default Socket;
