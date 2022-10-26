import {useParams} from "react-router";

function Coin(){
    const {coinId} = useParams();
    console.log(coinId)
    return (<div>
        <h1>Coin: {coinId}</h1>
    </div>)
}

export default Coin;