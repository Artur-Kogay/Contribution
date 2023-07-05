import Table from "../components/Table/Table";
import { useEffect, useState } from "react";
import { getDates } from "../api/getDates";
import "../styles/App.css";
import Info from "../components/Info/Info";

function App() {
  const [dates, setDates] = useState(null);

  useEffect(() => {
    const fetchDates = async () => {
      try {
        const data = await getDates();
        setDates(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchDates();
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="App_content">
          <Table dates={dates} setDates={setDates} />
          <div className="App_info">
            <Info />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
