import logo from './logo.svg';
import './App.css';
import React from 'react';

function App() {
  return (
    <Quest_table/>
  );
}


var myquest={
  "variables":
  {
      "visible":{"room":"main_room"},
      "hidden":{}
  },
  "start_from":"main_room",
  "rooms":
  {
      "main_room":
      {"text":"вы в гостинной сейчас стоите","image":"",
      "options":[
          {"text":"перейти на кухню"},
          {"text":"перейти в ванную"},
          {"text":"перейти в спальню"}
     ]},
      "kitchen":
      {"text":"кухня, пахнет горелым","image":"",
      "options":[
          {"text":"перейти на кухню"},
          {"text":"перейти в ванную"},
          {"text":"перейти в спальню"}
     ]},
      "balcony":
      {"text":"ой это балкон","image":"",
      "options":[
          {"text":"перейти на кухню"},
          {"text":"перейти в ванную"},
          {"text":"перейти в спальню"}
     ]},
      "garage":{},
      "final":{},
      "bedroom":
      {"text":"спальня, обычная, как мне видно","image":"",
      "options":[
          {"text":"перейти на кухню"},
          {"text":"перейти в ванную"},
          {"text":"перейти в спальню"}
     ]}
  }
}


class Quest_table extends React.Component
{
  constructor()
  {
    super()
    this.state = {color: "red",current_room:myquest.start_from};
  }
render()
{
  return (<div>
    <img id='photo' alt='no phot'></img>
    <div id='vars_text'>{wrapper(myquest.variables.visible) }</div>
    <div id='text_table'>{myquest.rooms[this.state.current_room]["text"]} </div>
    <div id='option_bar'>
    {}
    </div>
    </div>
  )
}}

class Quest_options extends React.Component
{
  constructor()
  {
    super()
    this.state = {color: "red"};
  }
render()
{
  return (
  
  <p class="option_buttons">
    {this.props.text}
  </p>
  )
}}

function wrapper(content) {
  let buffer=[]
  for(let elem in content)
  {
  buffer.push(<p>{content[elem]}</p>)
  }
  return (
    buffer
  );
}


export default App;
