import { useEffect, useState } from "react";
import ReactGA from "react-ga4";

const App = () => {
  // const [analyticsData, setAnalyticsData] = useState(null);

  // useEffect(() => {
  //   ReactGA.initialize("G-08SGRJZ6RY");

  //   ReactGA.send("pageview", {
  //     page: window.location.pathname + window.location.search,
  //   });

  //   const data = ReactGA.ga("getData");
  //   setAnalyticsData(data);
  // }, []);

  // useEffect(() => {
  //   ReactGA.event({
  //     category: "Category name",
  //     action: "Action name",
  //   });

  //   ReactGA.send("pageview", { page: "/" });

  //   const data = ReactGA.ga("getAll");
  //   setAnalyticsData(data);
  // }, []);

  // console.log(analyticsData);

  return (
    <div className="app">
      <h2>Analytics Setup</h2>
      <p>An application to test Analytics setup with Analytics Tracking API</p>
      {/* {analyticsData && <p>{analyticsData}</p>} */}
    </div>
  );
};

export default App;
