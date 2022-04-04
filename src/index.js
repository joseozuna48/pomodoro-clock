// import { toHaveDisplayValue } from '@testing-library/jest-dom/dist/matchers';
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import "./index.css";



function BreakSection(props){
  return (
    <div className="border border-5 border-warning rounded p-2 m-3 fs-5" id="break-label">
    Break Length
      <div id="break-length">{props.break}</div>
      <button id="break-decrement" className="btn btn-warning me-2" onClick={(e) => props.breakHandler("down")}>
        <i className="fa-solid fa-arrow-down"></i>
      </button>
      <button id="break-increment" className="btn btn-warning" onClick={(e)=> props.breakHandler("up")}>
        <i className="fa-solid fa-arrow-up"></i>
      </button>
    </div>
  );
}

function SessionSection(props){
  return (
    <div id="session-label" className="border border-5 border-warning rounded p-2 m-3 fs-5">
      Session Length
      <div id="session-length">{props.length}</div>
      <button id="session-decrement" className="btn btn-warning me-2"  onClick={(e) => props.sessionHandler("down")}>
       <i className="fa-solid fa-arrow-down"></i>
      </button>
      <button id="session-increment" className="btn btn-warning me-2"  onClick={(e) => props.sessionHandler("up")}>
        <i className="fa-solid fa-arrow-up">
      </i></button>
    </div>
  );
}

function TimerSection(props){

  return (
    <div id="timer-label" className="border border-5 border-warning rounded p-2 m-3 fs-5">
      Session
      <div id="time-left">{props.timer}</div>
      <button id="start_stop" className="btn btn-warning me-2" onClick={props.update}>
      <i className="fa-solid fa-play"></i> <i className="fa-solid fa-pause"></i>
      </button>
      <button id="reset" className="btn btn-warning me-2" onClick={props.reset}>
      <i className="fa-solid fa-arrows-rotate"></i>
      </button>
    </div>
  );
}


class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      timer : 25,
      break : 5,
      length: 25
    }
    this.timerID = 0;
    this.pause = true;

    this.counter = this.counter.bind(this);
    this.reset = this.reset.bind(this);
    this.breakHandler = this.breakHandler.bind(this);
    this.sessionHandler = this.sessionHandler.bind(this);
  }

  counter(){
    this.pause =  !this.pause;
    if(!this.pause && this.state.timer >= 0){
      this.timerID = setInterval( ()=>{
        if(this.state.timer > 0){
          this.setState( (state)=>({timer:state.timer-1}))
        }else{
          clearInterval(this.timerID);
        }  
      } ,1000);
    }else{
      clearInterval(this.timerID);  
    }
  }

  reset(){
    this.setState({timer:25,break:5,length:25});
    this.pause = true;
    clearInterval(this.timerID);
  }

  breakHandler(btnType){
    if(this.pause){
      if(btnType === "up"){
        this.setState( (state)=> ({break :state.break +1}) );
      }else if(this.state.break>=2){
        this.setState( (state)=> ({break: state.break-1}) );
      }
    }
  }

  sessionHandler(btnType){
    if(this.pause){
      if(btnType === "up"){
        this.setState( (state)=> ({timer :state.length +1,length:state.length +1}) );
      }else if(this.state.timer>=2){
        this.setState( (state)=> ({timer: state.timer-1,length:state.timer -1}) );
      }
    }
  }

  render(){
    return(
      <main className='col-6 mt-5'>
        <div className='session-label display-3'>
          Pomodoro Clock
        </div>

        <div id="settings">
          <BreakSection break = {this.state.break} breakHandler = {this.breakHandler}/>
          <SessionSection length={this.state.length} sessionHandler = {this.sessionHandler} />

        </div>  
        <TimerSection timer={this.state.timer} update={this.counter} reset = {this.reset}/>

      </main>
      
    ); 
  }
}

ReactDOM.render( <App/>,
  document.getElementById('root')
);

