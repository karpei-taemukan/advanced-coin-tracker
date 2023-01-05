import { useEffect } from "react";
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
height: 100%;
background-color: #1C1D1E;
border-radius: 15px;
padding: 0 5%;
display: flex;
justify-content: space-around;
`;

const OverViewItem = styled.div`
color: #E0EAF6;
display: flex;
flex-direction: column;
`;

const Span = styled.span`
`;

function Price({coinId}:PriceProp){

    const {data} = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId), {staleTime: Infinity,
        cacheTime: Infinity})
   

// length로 data가 비어있는 지 확인
    return (
    <>
    <OverView>
 <OverViewItem>
           <h1>Time_Open</h1>
       { data?.length !== undefined ? <Span>{data?.map((i,index) => (
           <h2 key={index}>{i.high}</h2>
           ))}</Span> : <Span>Sorry, Price Data is not found</Span>}
</OverViewItem>
        <OverViewItem>
            <h1>Time_Close</h1>
        { data?.length !== undefined ? <Span>{data?.map((i,index) => (<h2 key={index}>{i.low}</h2>))}</Span> : <Span>Sorry, Price Data is not found</Span>}
        </OverViewItem>
        
    </OverView>
    </>)
}

export default Price;