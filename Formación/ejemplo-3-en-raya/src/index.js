import React from 'react';
import ReactDOM from 'react-dom/client';
import { useState } from 'react';
import './index.css';

/*
Prueba implementando el mismo ejemplo utilizando funciones en vez de clases
*/

const Square=(props)=>{
  return (
    <button className='square' onClick={props.onClick}>
      {props.value}
    </button>
  );
}

const Board=(props)=>{
  const renderSquare=(i)=>{
    return <Square value={props.squares[i]} onClick={()=>props.onClick(i)}/>;
  }

  return (
    <div>
      <div className='board-row'>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className='board-row'>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className='board-row'>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

const Game=()=>{
  const [squares,setSquares]=useState(Array(9).fill(null));
  const [xIsNext,setNext]=useState(true);
  const [history,setHistory]=useState([squares]);
  const [step,setStep]=useState(0);

  let status;
  const winner=calculateWinner(squares);
  if(winner){
    status="Winner: "+winner;
  }else{
    status='Next player: '+(xIsNext?"X":"O");
  }

  const handleClick=(i)=>{
    const tempHistory=history.slice(0,step+1);
    const current=tempHistory[tempHistory.length-1];
    const tablero=current.slice();

    if(winner||tablero[i]){
      return;
    }
    
    tablero[i]=xIsNext?"X":"O";
    setSquares(tablero);
    setHistory([...tempHistory,tablero]);
    setStep(history.length);
    setNext(!xIsNext);
  }

  const moves=history.map((step,move)=>{
    const desc=move?"Go to move #"+move:"Go to game start";
    return (
      <li key={move}>
        <button onClick={()=>jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  const jumpTo=(step)=>{
    setStep(step);
    setNext((step%2)===0);
    setSquares(history[step]);
  }

  return (
    <div className='game'>
      <div className='gameBoard'>
        <Board 
          onClick={(i)=>handleClick(i)}
          squares={squares}/>
      </div>
      <div className='game-info'>
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

const root=ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);

function calculateWinner(squares){
  const lines=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];

  const tam=lines.length;
  for(let i=0;i<tam;i++){
    const[a,b,c]=lines[i];
    if(squares[a]&&squares[a]===squares[b]&&squares[a]===squares[c]){
      return squares[a];
    }
  }
  return null;
}