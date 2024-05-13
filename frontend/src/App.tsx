import { useEffect, useState } from "react";
import Card from "./components/card";
import LineChartCustom from "./components/lineChart";
import axios from "axios";

import Tabs from "./components/tabs";
import Socket from "./sections/socket";
import {formatSensorReadings} from "./utils/lib.js"


/**
 * This is the main App component of the Nav Prayukti IOT frontend.
 * It renders the Tabs component, Socket component and a Card component
 * that renders the Line Chart component according to the selected tab.
 * @param {React.ComponentProps} props
 */
function App() {

  /**
   * The state variable to store the currently active sensor.
   * This value is passed to the Tabs component as a prop and used
   * to determine which chart to render in the Card component.
   * @type {number}
   */
  const [activeSensor,setActiveSensor]= useState(1)
  // eslint-disable-next-line no-console
  console.log(activeSensor)

  const [newSensorData,setNewSensorData]= useState(null)
  const [apiResponse,setApiResponse]= useState<any>(null)



  /**
   * An array of JSX elements that represent the charts to be rendered
   * in the Card component. The element at the index of the activeSensor
   * state is rendered in the Card component.
   * @type {[JSX.Element]}
   */
  const ChartsMap = [<LineChartCustom  data={apiResponse?apiResponse[0]?.data:[]}/>,<LineChartCustom  data={apiResponse?apiResponse[1]?.data:[]}/>,<LineChartCustom  data={apiResponse?apiResponse[2]?.data:[]}/>]

 useEffect(() => {
   function fetchNewData() {
     axios
     .get("http://localhost:5000/api/sensors")
     .then((response) => {
      const formattedData = formatSensorReadings(response.data??[])
      setApiResponse(formattedData.length>0?formattedData:null)
     })
     .catch((error) => {
       console.log(error);
     });
   }
   fetchNewData()
 },[newSensorData])



  /**
   * The JSX element representing the App component.
   * @return {JSX.Element}
   */
  return (
    <>
  
    <div className="flex flex-col justify-center items-center">
    <Tabs  setSelectedTab={setActiveSensor}/>
    <Socket   setNewSensorData={setNewSensorData} />
      <Card className="w-[1200px]">
    {ChartsMap[activeSensor]}
    </Card>
    </div>
     
    </>

  );
}


export default App;
