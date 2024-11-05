import React, { useState } from 'react';
import './App.css';
import * as math from 'mathjs';
import { Route, Routes, useNavigate } from 'react-router-dom';

interface IButton {
  num?: number | string;
  op?: string;
  bgColor?: string;
  type?: string;
  link?: string;
}

function App() {
  const [display, setDisplay] = useState<string>('');
  const [history, setHistory] = useState<string[]>([]);
  const [filled, setFilled] = useState<boolean>(false);
  const [showTiket, setShowTiket] = useState<boolean>(true);
  const navigate = useNavigate();

  const ButtonNum = (props: IButton) => {
    return (
      <button className={props.type === 'buttonL' ? props.type : ''} onClick={() => handleButtonClick(props.num || '')}>
        {props.num}
      </button>
    );
  };

  const ButtonOp = (props: IButton) => {
    
    return (
      <button
        style={{ backgroundColor: props.bgColor ? props.bgColor : '' }}
        className={props.type === 'buttonL' ? props.type : ''}
        onClick={() => handleButtonClick(props.op || '')}
      >
        {props.op}
      </button>
    );
  };


  const ButtonQ = (props: IButton) => {
    return (
      <button
        style={{ backgroundColor: props.bgColor ? props.bgColor : '' }}
        className={props.type === 'buttonL' ? props.type : ''}
        onClick={() => handleButtonClick(props.op || '')} 
      >
        {props.op}
      </button>
    );
  };

  const handleButtonClick = (value: string | number) => {
    let result = '';

    if (value === '=') {
      try {
        result = math.evaluate(display).toString();
        setDisplay(math.evaluate(display).toString());
        setHistory((prevHistory) => (result !== 'Infinity' ? [...prevHistory, `${result}`] : prevHistory));
      } catch (error) {
        setDisplay('Err');
      }
    } else if (value === 'C') {
        setDisplay('');
    } else if (value === 'DEL') {
        setDisplay((prev) => prev.slice(0, -1));
    } else if (value === '?') {
        navigate('/support');
    } else {
        setDisplay((prev) => {
        if (prev === '0' && value !== '.') {
          return value.toString();
        } else {
          return prev + value.toString();
        }
      });
    }
  };  
  
  const Display = ()=>{
    return(
        <>
          <div className="historyContainer">
            <div className="history">
                <p>History (scrollable)</p>
                {
                  history.map((history)=>(
                    <p>{history}</p>
                  ))
                }
            </div>
        </div>
  
            <div className="display">
              <input type="text" value={display} readOnly />
            </div>
        </>
    );
  }

  const Operator=()=>{
    return(
      <>
        <div className="operator">
              <div>
                <ButtonOp op="C" />
                <ButtonOp op="DEL" />
                <ButtonQ op="?" bgColor="Brown"/>
                <ButtonOp op="/" bgColor="orange" />
              </div>
              <div>
                <ButtonNum num={1} />
                <ButtonNum num={2} />
                <ButtonNum num={3} />
                <ButtonOp op="*" bgColor="orange" />
              </div>
              <div>
                <ButtonNum num={4} />
                <ButtonNum num={5} />
                <ButtonNum num={6} />
                <ButtonOp op="-" bgColor="orange" />
              </div>
              <div>
                <ButtonNum num={7} />
                <ButtonNum num={8} />
                <ButtonNum num={9} />
                <ButtonOp op="+" bgColor="orange" />
              </div>
              <div>
                <ButtonNum num='0' type="buttonL" />
                <ButtonOp op="=" type="buttonL" />
              </div>
            </div>
            
      </>
      
    );
  }

  const Body = ()=>{
    return(
      <div className="container">
        <div className="calculator">
          <div className='form'>
            <Display/>
            <Operator/>
          </div>
        </div>
      </div>
    );
  }

  const Kiri=()=>{
    return(
      <div className='kiri'>
        <div className='block'>
          <div className='nameKiri'>
            <Input name="Name"/>
          </div>
          <div className='nameKanan'>
            <Input name="lastName"/>
          </div>
        </div>
        
        <div className='block1'>
          <Input name="Email"/>  
        </div>

        <div className='block2'>
          <label>Topic</label>
          <div className='Topic'>
            <h2>What can i help you today?</h2>
            <input type='radio' id='1'/>
            <label htmlFor='1'> General</label><br/>
            <input type='radio' id='2'/>
            <label htmlFor='2'> Bug</label>
          </div>
        </div>
      </div>
    );
  }

  const Kanan=()=>{
    return(
      <div className='kanan'>
        <div className='block1'>
          <Input name="Description"/>  
        </div>
      </div>
    );
  }

  const Input = (props: { name: string }) => {
    const [inputValue, setInputValue] = useState<string>('');
  
    const handleChange = (event: any) => {
      setInputValue(event.target.value);
    };
  
    const isFirstNameEmpty = props.name === 'Name' && inputValue.trim() === '';
    const isLastNameEmpty = props.name === 'lastName' && inputValue.trim() === '';
    const isEmailEmpty = props.name === 'Email' && inputValue.trim() === '';
  
    return (
      <>
        <label htmlFor="name">{props.name === 'lastName' ? null : props.name}</label>
        <br />

        {props.name === 'Description' ? (
    <textarea autoComplete="off"></textarea>
) : (
    <input 
        className={props.name === 'Topic' ? props.name : ''} 
        type="text" 
        id="name" 
        required={props.name !== 'Description'} 
        onChange={handleChange} 
        placeholder={
            props.name === 'Name' ? 'First Name' : 
            props.name === 'lastName' ? 'Last Name' : 
            props.name === 'Email' ? 'Email Address' : 
            ''
        }
        autoComplete="off"
    />
)}


        {props.name === 'Name' ? 'First' : null}
        {props.name === 'lastName' ? 'Last' : null}
        {isFirstNameEmpty ? <span style={{ color: 'red' }}> ( Input your First name! )</span> : null}
        {isLastNameEmpty ? <span style={{ color: 'red' }}> ( Input your Last name! )</span> : null}
        {isEmailEmpty ? <span style={{ color: 'red' }}> ( Input your Email! )</span> : null}

      </>
    );
  };

  const FormTicket = ()=>{
    const navigate = useNavigate();

    const handleBack = () => {
      navigate('/');
    };
    
    const handleSubmit = (event:any)=>{
      event.preventDefault();
      showTiket === true? setShowTiket(false) : setShowTiket(true);
    }


    return(
      <form className='formTicket' onSubmit={handleSubmit}>
        <div className='top'>
          <Kiri/>
          <Kanan/>
        </div>
        <div className='button'>
          <button onClick={handleBack}>Back</button>
          <button type='submit' className='send-button'>Send</button>
        </div>
        
      </form>
    );
  }

  const SuccessReport=()=>{

    const ChangeState = ()=>{
      showTiket === true? setShowTiket(false) : setShowTiket(true);
      return(<></>);
    }

    return(
      <div className='success'>
        <h1>Thank you for sending us your report, we will track the problem now</h1><br/>
        <h2>Ticket number : {Math.floor(Math.random() * 1001)}</h2><br/>
        <button onClick={ChangeState}>Back</button>
      </div>
    );
  }

  const Support = () =>{
    return(
      <>
        <div className='container'>
          <div className='kotak'>
            <h1>Support Ticket Form</h1>
            <hr/>
            {showTiket===true?<FormTicket/>:<SuccessReport/>}
            
          </div>
        </div>
      </>
    );
  }

  return (
    <>
        <Routes>
          <Route path='/' element={<Body />}></Route>
          <Route path='/support' element={<Support />}></Route>
        </Routes>
    </>
  );
}

export default App;
