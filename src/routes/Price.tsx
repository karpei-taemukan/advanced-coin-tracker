import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import {fetchCoinHistory} from "../api";


interface PriceProp{
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

const OverView = styled.div`
width: 450px;
height: 1000px;
background-color: #1C1D1E;
border-radius: 15px;
display: flex;
flex-direction: column;
padding: 0 5%;
`;

const OverViewItem = styled.div`
color: #E0EAF6;
display: flex;
flex-direction: column;
justify-content: space-around;
align-items: center;
`;

function Price({coinId}:PriceProp){
    const {isLoading, data} = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId), {refetchInterval: 5000})
    return (
    <>
    <OverView>
        <OverViewItem>
        <span>{data?.map((i) => i.open)}</span>
        </OverViewItem>
    </OverView>
    </>)
}

export default Price;