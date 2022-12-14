import {useParams, useLocation} from "react-router";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Routes, Route, Link, useMatch } from 'react-router-dom';
import Price from "./Price";
import Chart from "./Chart";
import { useQuery } from "@tanstack/react-query";
import { fetchCoinInfo,fetchCoinTickers} from "../api";
import {Helmet} from "react-helmet";
import { useSetRecoilState } from "recoil";
import {isDarkAtom} from "../atom";
import { info } from "console";

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
  font-family: Georgia, serif;
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
margin-top: 10%;
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

const Back = styled.div`
background-color: #1C1D1E;
text-transform: uppercase;
text-align: center;
padding: 20px;
border-radius: 10px;
margin-bottom: 10px;
a{
  color: ${(props) => props.theme.textColor}
}
&:hover{
  a{
      color: ${props => props.theme.accentColor}
  } 
}
`;


const ToggleDarkmode = styled.button`
width: 7%;
height: 5%;
border: none;
border-radius: 15px;
position: absolute;
top: 15%;
font-family: Georgia, serif;
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


interface ICoinProps{
 /* toggleDark: () => void;
  isDark: boolean;*/
}

function Coin({/*toggleDark, isDark*/}:ICoinProps){

const [isDark, setIsDark] = useState(false);

const setDarkAtom = useSetRecoilState(isDarkAtom);
const toggleDarkAtom = () => {
  setDarkAtom((prev) => !prev)
  setIsDark((prev) => !prev)
};



   //const [loading, setLoading] = useState(true);
    const {coinId} = useParams();
    const {state} = useLocation();
  // const [info, setInfo] = useState<InfoData>();
  // const [priceInfo, setPriceInfo] = useState<PriceData>();
   // console.log(coinId)
   //const location = useLocation();
   //console.log(location);
const [tag, setTag] = useState<ITag>();
// useMatch ????????? ?????? URL??? ?????? ?????? ????????? ?????????
const priceMatch = useMatch("/:coinId/price");
//console.log(priceMatch);
const chartMatch = useMatch("/:coinId/chart");
//console.log(chartMatch);

//console.log(state.name)
//console.log(coinId)

const {isLoading: infoLoading, data: infoData} = useQuery<InfoData>(["info", coinId], ()=>fetchCoinInfo(coinId));

const {isLoading: tickersLoading, data:tickersData} = useQuery<PriceData>(["ticker", coinId],()=>fetchCoinTickers(coinId), {refetchInterval: 5000});



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
},[coinId]); // coinId??? URL ???????????? component??? ???????????? ????????? ????????? ????????? useEffect??? []??? ???????????? ??????
*/



const loading = infoLoading || tickersLoading;


    return (
    <Container>
      <Helmet>
        <title>
     {state?.name ? state.name : loading ? "Loading..." : infoData?.name} 
        </title>
        <link rel="icon" href="https://w7.pngwing.com/pngs/210/596/png-transparent-upbit-hd-logo.png" />
      </Helmet>
       <Header>
         <Title>{state?.name ? state.name : loading ? "Loading..." : infoData?.name}</Title>
         {isDark ? 
         <ToggleDarkmode 
         style={{backgroundColor: "black", boxShadow: "10px 5px 5px black" ,color: "white"}} 
         onClick={toggleDarkAtom}>Dark</ToggleDarkmode> 
         : 
         <ToggleDarkmode style={{boxShadow: "10px 5px 5px black"}}
          onClick={toggleDarkAtom}>Light</ToggleDarkmode>}
         
        </Header>
      <h2>{tag?.position}</h2>
     {/*<h3>{infoData?.team.position}</h3>*/}
      {/*<h3>{priceInfo?.price_usd}</h3>*/}
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
        {/* priceInfo??? ???????????? ???????????? max_supply??? ????????? */}
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

      {/*
      nestd route??? ???????????? ????????? ????????? ???????????? URL??? ????????? ??????
      URL??? ?????? ???????????? re-render?????? ?????? ????????? ????????? ?????????
      */}

  

      <Tabs>
        <Tab isActive={priceMatch !== null}>
          <Link to="price">Price</Link>
        </Tab>
        <Tab isActive={chartMatch !== null}>
          <Link to="chart">Chart</Link>
        </Tab>
      </Tabs>
   
      <Routes>
      <Route path="price" element={<Price coinId={coinId}/>}/>
       <Route path="chart" element={<Chart /*isDark={isDark}*/ coinId={coinId}/>}/> 
      </Routes>
      </>
      </Container>)
}

export default Coin;
