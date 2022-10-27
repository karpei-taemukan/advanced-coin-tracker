import {useParams, useLocation} from "react-router";
import styled from "styled-components";
import { useEffect, useState } from "react";


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
    const [loading, setLoading] = useState(true);
    const {coinId} = useParams();
    const {state} = useLocation();
    const [info, setInfo] = useState<InfoData>();
    const [priceInfo, setPriceInfo] = useState<PriceData>();
   // console.log(coinId)
   //const location = useLocation();
   //console.log(location);
useEffect(()=>{
(async()=>{
const infoData = await (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();
console.log(infoData);
const priceData = await (await fetch(`https://api.coinpaprika.com/v1/ticker/${coinId}`)).json();
console.log(priceData);
setInfo(infoData);
setPriceInfo(priceData);

})()
},[]);
    return (
    <Container>
        <Header>
          <Title>{state?.name || "Loading"}</Title>
        </Header>
      <h3>{priceInfo?.price_usd}</h3>
        {loading ? <Loader>Loading...</Loader> : null}
      </Container>)
}

export default Coin;
