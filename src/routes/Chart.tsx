import { useQuery } from "@tanstack/react-query";
import {fetchCoinHistory} from "../api";
import ApexChart from "react-apexcharts";

interface ChartProp{
    coinId: string | undefined;
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

function Chart({coinId}:ChartProp){
const {isLoading, data} = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId))
   // IHistorical[]: data가 IHistorical의 array이다 

   return (
   <div>{isLoading ? "Loading chart" : 
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
mode: 'dark', 
}, 
xaxis: {
    categories: data?.map((price) => new Date(price.time_close*1000). toUTCString().substring(5,25)) ?? [],
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
/>}
</div>)
}

export default Chart;