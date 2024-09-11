import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { setMapData } from '../features/Chart/dataSlice';

interface CountryData {
  country: string;
  countryInfo: {
    iso2: string;
    lat: number;
    long: number;
  };
  cases: number;
  deaths: number;
  recovered: number;
}

const fetchCountryData = async (): Promise<CountryData[]> => {
  const response = await fetch('https://disease.sh/v3/covid-19/countries');
  if (!response.ok) throw new Error('Failed to fetch country data');
  return response.json();
};

const Map: React.FC = () => {
  const countries = useSelector((state: RootState) => state.data.mapData.countries);
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);
  const validCountries = countries.filter(country => country.countryInfo.iso2);

  React.useEffect(() => {
    if (countries.length === 0) { 
      const fetchData = async () => {
        try {
          const data = await fetchCountryData();
          dispatch(setMapData({ countries: data }));
        } catch (err) {
          setError('Error fetching country data');
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    } else {
      setLoading(false); 
    }
  }, [dispatch, countries]);

  const icon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    shadowSize: [41, 41],
  });

  return (
    <div className="relative flex-grow">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
          <div className="w-16 h-16 border-4 border-t-transparent border-blue-600 rounded-full animate-spin"></div>
        </div>
      )}
      {error && <p className="text-red-600 text-center">{error}</p>}
      <div className="w-full text-center py-4 bg-lightblue-600 text-black font-bold">
        COVID-19 Country Data Map
      </div>
      <MapContainer center={[20, 0]} zoom={2} style={{ height: 'calc(100vh - 80px)', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {validCountries.map((country, index) => (
          <Marker
            key={country.countryInfo.iso2 || `marker-${index}`}
            position={[country.countryInfo.lat, country.countryInfo.long]}
            icon={icon}
          >
            <Popup>
              <div className="p-2 bg-white">
                <h2 className="text-xl font-bold text-blue-600 mb-2">{country.country}</h2>
                <div className="flex flex-col">
                  <p className="text-sm text-gray-700 mb-1"><strong>Cases:</strong> {country.cases.toLocaleString()}</p>
                  <p className="text-sm text-red-600 mb-1"><strong>Deaths:</strong> {country.deaths.toLocaleString()}</p>
                  <p className="text-sm text-green-600"><strong>Recovered:</strong> {country.recovered.toLocaleString()}</p>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
