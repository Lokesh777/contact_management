import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CountryData {
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

interface DataState {
  chartData: any;
  mapData: {
    countries: CountryData[];
  };
}

const initialState: DataState = {
  chartData: null,
  mapData: {
    countries: [],
  },
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setChartData(state, action: PayloadAction<any>) {
      state.chartData = action.payload;
    },
    setMapData(state, action: PayloadAction<{ countries: CountryData[] }>) {
      state.mapData = action.payload;
    },
  },
});

export const { setChartData, setMapData } = dataSlice.actions;

export default dataSlice.reducer;
