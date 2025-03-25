// import { toHaveDisplayValue } from '@testing-library/jest-dom/dist/matchers';
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import "./index.css";
import audio from "./static/beep.mp3";



function BreakSection(props){
  return (
    <div className="border border-5 border-warning rounded p-2 m-1 m-md-3 fs-5" id="break-label">
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
      {props.break ? "Break":"Session"} 
      <div id="time-left">{props.display}</div>
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
      timer : 1500,
      break : 5,
      length: 25,
      display: "25:00",
      breakTime: false
    }
    this.timerID = 0;
    this.pause = true;
    this.audioRef = React.createRef();
  

    this.counter = this.counter.bind(this);
    this.reset = this.reset.bind(this);
    this.breakHandler = this.breakHandler.bind(this);
    this.sessionHandler = this.sessionHandler.bind(this);
  }

  componentDidMount(){
    console.log(this.beep);
  }

  counter(){
    this.pause = !this.pause;
    if(!this.pause && this.state.timer > 0){

      this.timerID = setInterval( ()=>{
        if(this.state.timer > 0){
          this.setState( (state)=>({timer:state.timer-1, display:this.displayTime(state.timer-1)}));
          if(this.state.timer === 0){
            this.audioRef.current.play();
          }
        }else{ 
          // This functiones manages when the timer reaches zero in case it is a break or a session.
          (!this.state.breakTime) ? this.setState({timer: this.state.break*60,breakTime:true,display:this.displayTime(this.state.break*60)}) :
          this.setState({timer: this.state.length*60,breakTime:false,display:this.displayTime(this.state.length*60)});
        }  
      } ,1000);

    }else{
      clearInterval(this.timerID);  
    }
  }

  reset(){
    this.setState({timer:1500,break:5,length:25,display:"25:00",breakTime:false});
    this.pause = true;
    clearInterval(this.timerID);
    this.audioRef.current.load();
  }

  breakHandler(btnType){
    if(this.pause){
      if(btnType === "up" && this.state.break <=59){
        this.setState( (state)=>(
          {
           break :state.break +1,
           timer: (state.breakTime)? ((state.break+1)*60): state.timer, 
           display: (state.breakTime)? this.displayTime( ((state.break+1)*60) ) : state.display 
          }) );
      }else if(btnType === "down" && this.state.break>=2){
        this.setState( (state)=>(
          {
            break: state.break-1, 
            timer: (state.breakTime)? ((state.break-1)*60):state.timer,
             display: (state.breakTime)? this.displayTime( ((state.break-1)*60) ):state.display  
            }));
      }
    }
  }

  sessionHandler(btnType){
    if(this.pause){
      if(btnType === "up" && this.state.length <=59){
        this.setState( (state)=>(
          {
            length: state.length +1,
            timer : (!state.breakTime)? (state.length+1)*60: state.timer,
            display: (!state.breakTime)?  this.displayTime((state.length+1)*60) : state.display
            }) );

      }else if( btnType === "down" && this.state.length>=2 ){
        this.setState( (state)=>(
          {
            length:state.length -1 ,
            timer: (!state.breakTime)? (state.length-1)*60 :state.timer,
            display: (!state.breakTime)? this.displayTime((state.length-1)*60): state.display
          }));
      }
    }
  }

  displayTime(time){
    let minutes = parseInt(time/60);
    let seconds = time % 60;

    // Condintionals added in case the result is a one digit number and a zero is needed to
    // display the result in the same format a clock would.
    let result = "" + ( (minutes <10 )? ("0"+minutes) : (minutes) ) + ":" + ( (seconds <10) ? ("0"+seconds): seconds );

    return result;
  }

  render(){
    return(
      <main className='col-10 mt-5 col-md-6'>
        <div className='session-label display-3'>
          Pomodoro Clock
        </div>

        <div id="settings">
          <BreakSection break = {this.state.break} breakHandler = {this.breakHandler} />
          <SessionSection length={this.state.length} sessionHandler = {this.sessionHandler} />
        </div>  
        <TimerSection display={this.state.display} update={this.counter} reset = {this.reset} break={this.state.breakTime} />

        <audio ref={this.audioRef} id="beep">
          <source src={audio} type="audio/mpeg"></source>
        </audio>

      </main>
      
    ); 
  }
}

ReactDOM.render( <App/>,
  document.getElementById('root')
);

