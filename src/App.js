import logo from './logo.svg';
import './App.css';
import React from 'react';

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
          {"text":"перейти на кухню","move":"kitchen","change":{cell:"room",value:"kithcen 222"}},
          {"text":"перейти в ванную"},
          {"text":"перейти в спальню"}
     ]},
      "kitchen":
      {"text":"кухня, пахнет горелым","image":"",
      "options":[
          {"text":"перейти в гостинную"},
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


function App() {
  return (
    <Quest_Table/>
  );
}




class Quest_Table extends React.Component
{
  constructor()
  {
    super()
    this.state = {color: "red",current_room:myquest.start_from};
    this.transit=this.transit.bind(this)
  }
render()
{
  return (<div id='quest_app'>
    <img id='photo' alt='no phot'></img>
    <div id='vars_text'>{wrapper(myquest.variables.visible) }</div>
    <div id='text_table'>{myquest.rooms[this.state.current_room]["text"]} </div>
    <div id='option_bar'>
    <Quest_Options options={myquest.rooms[this.state.current_room]["options"]}
    room={this.state.current_room}
    trans_f={this.transit}></Quest_Options>
    </div>
    </div>
  )
}
transit(handler,index,room)
{

 
let commandbuff=myquest.rooms[room].options[index]

if(commandbuff.change){
myquest.variables.visible[commandbuff.change.cell]=commandbuff.change.value}

if(commandbuff.move){
this.setState({current_room:commandbuff.move})}
console.log(myquest)
}


}

class Quest_Options extends React.Component
{
  constructor()
  {
    super()
    this.props = {options:{}}
    this.state = {color: "red"};
  }
render()
{
  let opt_buffer=[]
  let indcount=0
  for(let elem in this.props.options)
  {
    const constbuff =indcount
    opt_buffer.push(<p > <span class="options" onClick={(handler)=>(this.props.trans_f(handler,constbuff,this.props.room))}>{this.props.options[elem].text}</span></p>)
    indcount++
  }
  return opt_buffer

}}

function wrapper(content, tag_class) {
  let buffer=[]
  for(let elem in content)
  {
  buffer.push(<p class={tag_class}> <span>{content[elem]}</span></p>)
  }
  return (

    buffer
  );
}



export default App;
