import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from "react"
import PopContainer from "./components/Msgs/PopContainer.js"
import PopTest from './components/Msgs/popTest';
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom"
import MainPage from './components/page/main.js';
import FooterC from './components/Layout/FooterC.js';
import NavBar from './components/ScreenC/NavBar.js';
import { show$,showS$ } from './Observables/obsShow'
import { lstMsg$ } from './Observables/obsShow'
import LoginP from './components/page/loginP.js';
import SignP from './components/page/signP.js';
import UsrDataMCon from './components/page/usrDataMC.js';
import FgtPassP from './components/page/fgtPassP.js';
import ServicesC from './components/page/services.js';
import ServiceEdit from './components/page/serviceEdit.js';
import ServPassP from './components/page/ServPassP.js';
import Info from './components/page/info.js';
export function change2(title1, msg1, type1,lstV) {
  //let arr = [...popLst];
  let arr = [...lstV.getValue()];

  //console.log(Msg)
  arr.push({ id: Date.now(), show: true, title: title1, msg: msg1, type: type1 });
  //setPopLst(arr);
  lstV.next(arr);
}
function App() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const subscription = show$.subscribe(setShow);
    return () => subscription.unsubscribe();
  }, []);
  const [showS, setShowS] = useState(false);
  useEffect(() => {
    const subscription = showS$.subscribe(setShowS);
    return () => subscription.unsubscribe();
  }, []);
  /*-----------------------*/
  const [popLst, setPopLst] = useState([])
  useEffect(() => {
    const subscription = lstMsg$.subscribe(setPopLst);
    return () => subscription.unsubscribe();
  }, [lstMsg$.getValue()]);
  //const [rand, SetRand] = useState(1)
  //const [Msg, SetMsg] = useState({ title: "t", msg: "t", type: "" });
  /*-----------------------*/
  /*----------------------*/
  /*
  function change2(title1, msg1, type1,lstV) {
    //let arr = [...popLst];
    let arr = [...lstMsg$.getValue()];

    //console.log(Msg)
    arr.push({ id: Date.now(), show: true, title: title1, msg: msg1, type: type1 });
    //setPopLst(arr);
    lstMsg$.next(arr);
  }*/
    function change2(title1, msg1, type1,lstV) {
      //let arr = [...popLst];
      let arr = [...lstV.getValue()];
  
      //console.log(Msg)
      arr.push({ id: Date.now(), show: true, title: title1, msg: msg1, type: type1 });
      //setPopLst(arr);
      lstV.next(arr);
    }
  /*----------------------*/
  function f01() {
    change2('Sucesso', 'as informações foram enviádas', 3,lstMsg$)
  }
  return (
    <div className="App">

      <Router>
        <NavBar></NavBar>
        <FgtPassP></FgtPassP>
        <ServPassP></ServPassP>
        <Routes>
          <Route path='/' element={<MainPage></MainPage>}></Route>
          <Route path='/update' element={<UsrDataMCon></UsrDataMCon>}></Route>
          <Route path='/services' element={<ServicesC></ServicesC>}></Route>
          <Route path='/servicedit' element={<ServiceEdit></ServiceEdit>}></Route>
          <Route path='/info' element={<Info></Info>}></Route>
        </Routes>
      </Router>
      <LoginP showP={show}></LoginP>
      <SignP showP={showS}></SignP>
      <FooterC></FooterC>
      {popLst && popLst.length > 0 && (
        <PopContainer>
          {popLst.map((res, index) => (
            <div key={res.id}>
              <PopTest //show={popLst[index][1]} 
                popLst={popLst}
                setPopLst={setPopLst}
                numb={res.id}></PopTest>
            </div>
          ))}
        </PopContainer>
      )}
    </div>
  );
}

export default App;
