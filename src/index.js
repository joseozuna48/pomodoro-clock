import React from 'react';
import ReactDOM from 'react-dom';
import "./index.css";


function BreakSection(props){
  return (
    <div className="" id="break-label">
    Break Length
      <div id="break-length">5</div>
      <button id="break-decrement"><i class="fa-solid fa-arrow-down"></i></button>
      <button id="break-increment"><i class="fa-solid fa-arrow-up"></i></button>
    </div>
  );
}

function SessionSection(props){
  return (
    <div id="session-label">
      Session Length
      <div id="session-length">25</div>
      <button id="session-decrement"><i class="fa-solid fa-arrow-down"></i></button>
      <button id="session-increment"><i class="fa-solid fa-arrow-up"></i></button>
    </div>
  );
}

function TimerSection(props){
  return (
    <div id="timer-label">
      Session
      <div id="time-left">25:00</div>
      <button id="start_stop">
      <i class="fa-solid fa-play"></i> <i class="fa-solid fa-pause"></i>
      </button>
      <button id="reset">
      <i class="fa-solid fa-arrows-rotate"></i>
      </button>
    </div>
  );
}


class App extends React.Component{
  render(){
    return(
      <main>
        <div className='session-label'>
          Pomodoro Clock
        </div>

        <div id="settings">
          <BreakSection />

          <SessionSection />

        </div>
        

        <TimerSection />

      </main>
      
    ); 
  }
}

ReactDOM.render( <App/>,
  document.getElementById('root')
);

