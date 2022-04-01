import React from 'react';
import { Line as LineJS } from 'chart.js/auto'
import { Line }            from 'react-chartjs-2'

export default function LineChart({chartData}) {
  
    return (
      <div>
        <Line
          data={chartData}
          type='line'
          options={{
            title:{
              display:true,
              text:'Stock Value',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
          redraw
        />
      </div>
    );
}
