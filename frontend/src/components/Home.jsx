import PieChartt from './PieChartt';
import GridChart from './GridChart';
import API from '../API';
import { useState, useEffect } from 'react';
import { HR, Spinner } from 'flowbite-react';
import { MdWavingHand } from 'react-icons/md';
import AreaChartt from './AreaChartt';
import ChargesChart from './ChargesChart';

const Home = () => {
  const [apiData, setApiData] = useState([]);
  const [charges, setCharges] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [loadingCharges, setLoadingCharges] = useState(true);

  const fetchCharges = async () => {
    try {
      const response = await API.get('/charges/six_months_charges');
      setCharges(response.data);
      console.log('Fetched data for 6 months:', response.data);
    } catch (error) {
      console.error('Error fetching data for 6 months:', error);
    } finally {
      setLoadingCharges(false);
    }
  };

  const fetchPieData = async () => {
    try {
      const response = await API.get('/piechart/data');
      setApiData(response.data);
      console.log('Fetched data:', response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    const error = console.error;
    console.error = (...args) => {
      if (/defaultProps/.test(args[0])) return;
      error(...args);
    }; // to remove the warning of grid chart

    fetchPieData();
    fetchCharges();
  }, []);

  return (
    <div className="ml-60 px-10 space-y-8 mt-36 flex flex-col mb-20">
      <div className="w-full flex justify-between items-center rounded-md">
        <div className="text-3xl font-semibold px-2 py-2 rounded-md">
          <div className="flex justify-start items-center">
            Welcome Back Doctor,
            <MdWavingHand className="text-5xl text-yellow-300 ml-3 -rotate-12" />
          </div>
          <div className="text-sm text-gray-400 mt-1">
            Voici la dernière mise à jour pour ce mois-ci. Vérifiez-la
            maintenant.
          </div>
          <HR.Trimmed className="bg-blue-200 md:w-[27rem] md:mx-0 md:mt-4 md:mb-0" />
        </div>
      </div>
      <div className="flex justify-center items-center space-x-5">
        {loadingData ? (
          <Spinner aria-label="Loading pie chart data" />
        ) : (
          <>
            <PieChartt data={apiData} />
            <GridChart data={apiData} />
          </>
        )}
      </div>
      <div className="flex justify-start items-center space-x-5">
        {loadingData || loadingCharges ? (
          <Spinner aria-label="Loading area and charges charts" />
        ) : (
          <>
            <AreaChartt data={apiData} />
            <ChargesChart data={apiData} chargeData={charges} />
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
