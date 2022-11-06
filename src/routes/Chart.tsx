import { useQuery } from "@tanstack/react-query";
import {fetchCoinHistory} from "../api";
import ApexChart from "react-apexcharts";
import styled from "styled-components";
import {useRecoilValue, useSetRecoilState} from "recoil";
import { isDarkAtom, TwoChart } from "../atom";

interface ChartProp{
    coinId: string | undefined;
  /*  isDark: boolean; */
}


interface IHistorical{
time_open: number;
time_close: number;
open: string;
high: string;
low: string;
close: number;
volume: string;
market_cap: number;
}

const ChangeBtn = styled.button`
width: 70px;
height: 20px;
`

function Chart({coinId/*, isDark*/}:ChartProp){
const isDark = useRecoilValue(isDarkAtom);
const chooseChart = useSetRecoilState(TwoChart);
const changeChart = () => chooseChart((prev) => !prev);
const twoChart = useRecoilValue(TwoChart);

const {isLoading, data} = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId), {refetchInterval: 5000})
   // IHistorical[]: data가 IHistorical의 array이다 
console.log(data);
const datas = data?.map(i => ({
  x: new Date(i.time_open),
  y: [i.open, i.high, i.close, i.low]
})) ?? [];
   return (
   <>
   
   <ChangeBtn onClick={changeChart}>Change</ChangeBtn>
   {isLoading ? "Loading chart" : twoChart ? 
  
<ApexChart
   type="line" 
   series={[
{
    name: coinId,
    data: data?.map((price) => price.close) ?? [],
},
]}
options={{
theme: {
    mode: isDark ? "dark" : "light", 
}, 
xaxis: {
    categories: data?.map((price) => new Date(price.time_close*1000).toUTCString().substring(5,25)) ?? [],
type: "datetime"  
},
fill: {
    type: "gradient",
    gradient: {
        gradientToColors: ["#0be881"],
      },
    },
    colors: ["#0fbcf9"],
    tooltip:{
        y: {
                formatter: (value) => `$${value}`,
        },
    },
chart:{
width:500, 
height: 500,
toolbar: {
    show: true,
    tools: {
        download: false,
        selection: true,
        zoom: true,
        zoomin: true,
        zoomout: true,
        pan: true,
      },
},

animations: {
    enabled: true,
    easing: 'easeinout',
    speed: 800,
    animateGradually: {
        enabled: true,
        delay: 150
    },
    dynamicAnimation: {
        enabled: true,
        speed: 350
    }
},

},

stroke: {
    curve: "smooth",
    width: 2,
    lineCap: 'butt',
}

}
}
/>


:

<ApexChart 
type="candlestick" 
series={
[
{  
name: coinId,
data: datas
}
]
}
options={{
  theme:{
   mode: isDark ? "dark" : "light"

  },
    chart:{
    height: 500,
    width: 500,
    },
     xaxis:{
        type: "datetime",
        categories: data?.map((price) =>
        new Date(price.time_close * 1000).toUTCString(),
        
      ),
        labels:{
            style: {
                colors: "blue",
                fontSize: '12px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 400,
                cssClass: 'apexcharts-xaxis-label',
            },
        }
     },
     yaxis:{
        tooltip: {
            enabled: true
          },
      labels: {
        show: true,
        style: {
            colors: "red",
            fontSize: '12px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 400,
            cssClass: 'apexcharts-yaxis-label',
        },
      }
     },

     plotOptions: {
        candlestick: {
          colors: {
            upward: '#00B746',
            downward: '#EF403C'
          },
          wick: {
            useFillColor: true
          }
        }
    }
    
    }} 
/>
}
</>)

} 

export default Chart;