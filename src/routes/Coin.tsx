import {useParams, useLocation} from "react-router";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Routes, Route, Link, useMatch } from 'react-router-dom';
import Price from "./Price";
import Chart from "./Chart";
import { useQuery } from "@tanstack/react-query";
import { fetchCoinInfo,fetchCoinTickers } from "../api";

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Overview = styled.div`
width: 450px;
height: 100px;
background-color: #1C1D1E;
border-radius: 15px;
display: flex;
justify-content: space-between;
padding: 0 5%;
span:first-child{
  font-size: 12px;
  font-weight: 400;
  text-transform: uppercase;
}
`;

const OverviewItem = styled.div`
color: #E0EAF6;
display: flex;
flex-direction: column;
justify-content: space-around;
align-items: center;
`;

const Description = styled.p`
margin: 20px 0;
line-height: 300%;
`;

const Tabs = styled.div`
display: grid;
grid-template-columns: repeat(2, 1fr); 
margin: 25px 0px;
gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
background-color: #1C1D1E;
text-transform: uppercase;
text-align: center;
padding: 20px;
border-radius: 10px;

a{
  display: block;
  color: ${(props) => props.isActive ? props.theme.accentColor : props.theme.textColor}
}
`;

interface ITag{
  id: string,
  name: string,
  position: string,
}

interface InfoData{
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  tags: object;
  team: ITag;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  links: object;
  links_extended: object;
  whitepaper: object;
  first_data_at: string;
  last_data_at: string;
}

interface PriceData{
  id: string;
  name: string;
  symbol: string;
  rank: string;
  price_usd: string;
  price_btc: string;
  volume_24h_usd: string;
  market_cap_usd: string;
  circulating_supply: string;
  total_supply: string;
  max_supply: string;
  percent_change_1h: string;
  percent_change_24h: string;
  percent_change_7d: string;
  last_updated: string;
}

function Coin(){
   //const [loading, setLoading] = useState(true);
    const {coinId} = useParams();
    const {state} = useLocation();
   // const [info, setInfo] = useState<InfoData>();
  //  const [priceInfo, setPriceInfo] = useState<PriceData>();
   // console.log(coinId)
   //const location = useLocation();
   //console.log(location);
const [tag, setTag] = useState<ITag>();
// useMatch 유저가 특정 URL에 있는 지의 여부를 알려줌
const priceMatch = useMatch("/:coinId/price");
console.log(priceMatch);
const chartMatch = useMatch("/:coinId/chart");
console.log(chartMatch);



const {isLoading: infoLoading, data: infoData} = useQuery<InfoData>(["info", coinId], ()=>fetchCoinInfo(coinId));
const {isLoading: tickersLoading, data:tickersData} = useQuery<PriceData>(["ticker", coinId],()=>fetchCoinTickers(coinId));
/*useEffect(()=>{
(async()=>{
const infoData = await (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();
console.log(infoData);
const priceData = await (await fetch(`https://api.coinpaprika.com/v1/ticker/${coinId}`)).json();
console.log(priceData);
setInfo(infoData);
setPriceInfo(priceData);
//infoData.team.forEach((i:any) => console.log(i.position));
setTag(infoData.team);
setLoading(false);
})()
},[coinId]); // coinId는 URL 위치해서 component의 일생동안 바뀌지 않는다 그래서 useEffect에 []를 넣는것과 같음
*/

const loading = infoLoading || tickersLoading;

    return (
    <Container>
      {/*  <Header>
         <Title>{state?.name ? state.name : loading ? "Loading..." : info?.name}</Title>
        </Header>
      <h2>{tag?.position}</h2>
     <h3>{info?.team.position}</h3>
      {/*<h3>{priceInfo?.price_usd}</h3>*/}
      {/*  {loading ? <Loader>Loading...</Loader> : null}
        <>
      <Overview>
      <OverviewItem>
        <span>rank:</span>
        <span>{priceInfo?.rank}</span>
        </OverviewItem>
        <OverviewItem>
        <span>symbol:</span>
        <span>{priceInfo?.symbol}</span>
        </OverviewItem>
        <OverviewItem>
        <span>circulating_supply:</span>
        <span>{priceInfo?.circulating_supply}</span>
        {/* priceInfo가 존재하는 경우에만 max_supply를 찾는다 */}
      {/*</OverviewItem>
      </Overview>
      <Description>
        <span>{info?.description}</span>
      </Description>
      <Overview>
        <OverviewItem>
        <span>first_data_at:</span>
        <span>{info?.first_data_at}</span>
        </OverviewItem>
        <OverviewItem>
        <span>proof_type:</span>
        <span>{info?.proof_type}</span>
      </OverviewItem>
      </Overview>

      {/*
      nestd route를 사용하기 때문에 버튼이 필요없고 URL만 바꾸면 된다
      URL에 따라 페이지를 re-render하지 않고 바꾸는 부분만 바꾼다
      */}

   <Header>
<Title>{state?.name ? state.name : loading ? "Loading..." : infoData?.name}</Title>
        </Header>
      <h2>{tag?.position}</h2>
     <h3>{infoData?.team.position}</h3>
        {loading ? <Loader>Loading...</Loader> : null}
        <>
      <Overview>
      <OverviewItem>
        <span>rank:</span>
        <span>{tickersData?.rank}</span>
        </OverviewItem>
        <OverviewItem>
        <span>symbol:</span>
        <span>{tickersData?.symbol}</span>
        </OverviewItem>
        <OverviewItem>
        <span>circulating_supply:</span>
        <span>{tickersData?.circulating_supply}</span>

      </OverviewItem>
      </Overview>
      <Description>
        <span>{infoData?.description}</span>
      </Description>
      <Overview>
        <OverviewItem>
        <span>first_data_at:</span>
        <span>{infoData?.first_data_at}</span>
        </OverviewItem>
        <OverviewItem>
        <span>proof_type:</span>
        <span>{infoData?.proof_type}</span>
      </OverviewItem>
      </Overview>



      <Tabs>
        <Tab isActive={priceMatch !== null}>
          <Link to="price">Price</Link>
        </Tab>
        <Tab isActive={chartMatch !== null}>
          <Link to="chart">Chart</Link>
        </Tab>
      </Tabs>
   
      <Routes>
      <Route path="price" element={<Price />}/>
       <Route path="chart" element={<Chart coinId={coinId}/>}/> 
      </Routes>
      </>
      </Container>)
}

export default Coin;
