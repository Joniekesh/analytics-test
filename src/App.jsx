import { useEffect, useState } from "react";
// import ReactGA from "react-ga4";
import axios from "axios";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const CLIENT_ID =
  "342435754519-u3lol595ek1e5v77muq0ag72loadlbh1.apps.googleusercontent.com";
const PROPERTY_ID = "435005097";

const App = () => {
  const [totalSessionsForOtherCategories, setTotalSessionsForOtherCategories] =
    useState(0);

  const handleLoginSuccess = (response) => {
    const accessToken = response?.access_token;
    if (accessToken) {
      fetchData(accessToken);
    }
  };

  const fetchData = async (accessToken) => {
    try {
      const metrics = [{ name: "ga:sessions" }]; // Total number of sessions
      const dimensions = [{ name: "ga:deviceCategory" }]; // Device categories
      const startDate = "2024-03-01"; // Start date for the report
      const endDate = "2024-03-04"; // End date for the report

      const requestBody = {
        dateRanges: [{ startDate, endDate }],
        metrics,
        dimensions,
      };

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      };

      const apiResponse = await axios.post(
        `https://analyticsdata.googleapis.com/v1beta/properties/${PROPERTY_ID}:runReport`,
        requestBody,
        { headers }
      );

      const responseData = apiResponse.data;

      console.log(responseData.rows);

      // Process the response to exclude desktop, mobile, and tablet categories
      const filteredRows = responseData.rows.filter(([deviceCategory]) => {
        return (
          deviceCategory !== "desktop" &&
          deviceCategory !== "mobile" &&
          deviceCategory !== "tablet"
        );
      });

      // Calculate the total number of sessions for the filtered categories
      const totalSessions = filteredRows.reduce(
        (total, [, sessions]) => total + parseInt(sessions),
        0
      );

      setTotalSessionsForOtherCategories(totalSessions);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="app">
      <GoogleOAuthProvider clientId={CLIENT_ID}>
        <h1>Google Analytics Report</h1>
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onFailure={console.error}
          clientId={CLIENT_ID}
          buttonText="Check Analytics"
          responseType="token"
          scope="https://www.googleapis.com/auth/analytics.readonly"
        />
        {totalSessionsForOtherCategories > 0 && (
          <div>
            <h2>Total Sessions for Other Categories</h2>
            <p>{totalSessionsForOtherCategories}</p>
          </div>
        )}
      </GoogleOAuthProvider>
    </div>
  );
};

export default App;
