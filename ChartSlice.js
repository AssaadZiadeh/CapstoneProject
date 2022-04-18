import { createSlice } from '@reduxjs/toolkit'

export const chartSlice = createSlice({
  name: 'chart',
  initialState: {
    chartData: null,
    stockData: null,
  },
  reducers: {
    setChartData: (state, action) => {
        console.log("Hello from chart")
        state.chartData = action?.payload
    },

    setStockData: (state, action) => {
        console.log("Hello from stock");
        state.stockData = action?.payload
    },

    emptyChart: (state) => {
        state.chartData = null;
        state.stockData = null;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setChartData, emptyChart, setStockData } = chartSlice.actions

export default chartSlice.reducer