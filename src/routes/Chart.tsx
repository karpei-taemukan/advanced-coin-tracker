import { useQuery } from "@tanstack/react-query";
import {fetchCoinHistory} from "../api";

interface ChartProp{
    coinId: string | undefined;
}

function Chart({coinId}:ChartProp){
const {isLoading, data} = useQuery(["ohlcv", coinId], () => fetchCoinHistory(coinId))
    return (<div>
Chart
    </div>)
}

export default Chart;