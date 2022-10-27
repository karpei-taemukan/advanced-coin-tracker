import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Title = styled.h1`
font-size: 40px;
color: ${(props) => props.theme.accentColor}
`;

const Container = styled.div`
padding: 0px 20px;
max-width: 1300px;
margin: 0 auto;
`;

const Header = styled.header`
height: 15vh;
display: flex;
justify-content: center;
align-items: center;
`;

const CoinList = styled.ul``;

const Coin =  styled.li`
background-color: white;
color: ${props => props.theme.bgColor};
margin-bottom: 10px;
border-radius: 15px;
text-align: center;
a{
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color .2s ease-in;
}
&:hover{
    a{
        color: ${props => props.theme.accentColor}
    } 
}
`;
// Link 스타일은 a로 수정 결국엔 Link도 a로 바뀜
// li에 padding을 적용하면 text는 padding 공간을 뻰 공간만 갖는다
// 즉, li내에서 text가 이용할 부분이 적어진다

const Loading = styled.h1`
text-align: center;
display: block;
`;

const Img = styled.img`
width: 35px;
height: 35px;
margin-right: 20px;
`;

interface CoinInterface{
id: string,
name: string,
symbol: string,
rank: number,
is_new: boolean,
is_active: boolean,
type: string
}


function Coins(){
    const [coins, setCoins] = useState<CoinInterface[]>([]);
    const [loading,setLoading] = useState<boolean>(true);
    useEffect(()=>{
    (async () => { 
    const response = await fetch("https://api.coinpaprika.com/v1/coins")
    const json = await response.json();   
  // console.log(json.slice(0, 100))
   setCoins(json.slice(0,100));
   setLoading(false);
   //setTimeout(()=>{setLoading(false)}, 3000);
    })()
},[])
    return (
    <Container>
        <Header>
        <Title>Coins</Title>
        </Header>
        {loading ?
         <Loading>Loading...</Loading> :
        <CoinList>
        {coins.map((coin) => 
        <Coin key={coin.id}>
        <Link to = {{pathname: `/${coin.id}`}} state={{name: coin.name}}>
        <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />
        {coin.name} &rarr;
        </Link></Coin>)}
        </CoinList>}
    </Container>)
}
// a 태그를 사용하면 새로고침이 되버리기때문에 Link 사용

// state는 Coins 화면을 열때와 Coin 화면으로 넘어갈때 생성
// 만약 http://localhost:3000/btc-bitcoin 로 바로 접속하면 
// 에러가 난다 이유는 state가 생성되려면 Coins 화면을 열어야한다
export default Coins;