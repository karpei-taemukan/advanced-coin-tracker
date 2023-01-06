import { BrowserRouter,HashRouter, Routes, Route } from 'react-router-dom';
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";

interface IRouterProp{
 /*   toggleDark: () => void;
    isDark: boolean;*/
}

/*
Props를 줄때마다 interface 생성
*/
function Router({/*toggleDark,isDark*/}:IRouterProp){
return (
<BrowserRouter basename={process.env.PUBLIC_URL}>
<Routes>
<Route path="/" element={<Coins /*toggleDark={toggleDark}*//>}/>
<Route path="/:coinId/*" element={<Coin /*isDark={isDark} toggleDark={toggleDark}*//>}/>      
</Routes>
</BrowserRouter>
)}
export default Router;