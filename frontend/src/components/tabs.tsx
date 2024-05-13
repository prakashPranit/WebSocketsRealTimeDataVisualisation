import React from 'react';

interface TabProps {
  setSelectedTab: (index: number) => void; // Set type for setSelectedTab function
}

const Tabs: React.FC<TabProps> = ({ setSelectedTab }: TabProps) => {
  // State for the active tab
  const [activeTab, setActiveTab] = React.useState<number>(0);

  // Array containing tab section names
  const tabSections: string[] = ['Sensor 1', 'Sensor 2', 'Sensor 3'];

  // Function to handle tab click
  const handleClick = (index: number) => {
    setActiveTab(index);
    setSelectedTab(index);
  };

  return (
    <>
      {/* Navigation bar */}
      <nav className="flex justify-around bg-white border-gray-200 px-4 w-full lg:px-6 py-2 dark:bg-gray-800 shadow-md mb-5">
        {/* Branding */}
        <div className='self-center text-xl font-semibold whitespace-nowrap text-blue-600'>
          Nav Prayukti IOT
        </div>

        {/* Tabs */}
        <div className="flex gap-6" aria-label="Tabs">
          {tabSections.map((section, index) => (
            <button
              key={index}
              onClick={() => handleClick(index)} // Call handleClick function on click
              className={`shrink-0 rounded-lg p-2 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700 ${activeTab === index ? 'bg-gray-100 text-gray-700' : 'text-gray-500 hover:text-gray-700'}`}
            >
              {section}
            </button>
          ))}
        </div>

        {/* Additional links */}
        <div className='flex gap-3'>
          <a className='self-center text-sm whitespace-nowrap text-grey-400 '>Sign Up</a>
          <a className='self-center text-sm whitespace-nowrap text-grey-400'>Sign Up</a>
        </div>
      </nav>
    </>
  );
}

export default Tabs;
