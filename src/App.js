import logo from './logo.svg';
import './App.css';
import React from 'react';

var myquest={
  "variables":
  {
      "visible":{"room":"22"},
      "hidden":{}
  },
  "start_from":"main_room",
  "rooms":
  {
      "main_room":
      {"text":"вы в гостинной сейчас стоите","image":"/logo192.png",
      "options":[
          {"text":"перейти на кухню","move":"kitchen","mathf":{va:"<$ins>room",vb:"33",operator:"+"}
          /* "change":{cell:"room",value:"22"} */},
          {"text":"перейти в ванную", 
          ifsw:{a_val:"<$ins>room",b_val:"22", operator:"=",
            then:{"move":"balcony","change":{cell:"room",value:"kithcen 453"}},
            qelse:{"move":"balcony","change":{cell:"room",value:"kithcen 333"}}
          },
          "move":"balcony","change":{cell:"room",value:"kithcen 333"} },
          
          {"text":"перейти в спальню",
            qswitch:{
              cell:"room",
              cases:{
                "22":{"move":"kitchen","change":{cell:"room",value:"swi223399"}},
                "33":{"move":"kitchen","change":{cell:"room",value:"sih 33uu77"}},
                "44":{"move":"kitchen","change":{cell:"room",value:"sw 889hgfgg"}}},
              qdefault:{"move":"kitchen","change":{cell:"room",value:"default vcase"}}}
          }
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
    this.post_transit=this.post_transit.bind(this)
    this.ifswitch=this.ifswitch.bind(this)
    this.qswitch_f=this.qswitch_f.bind(this)
  }
render()
{
  return (<div id='quest_app'>
    <img id='photo' alt='no phot' src={myquest.rooms[this.state.current_room].image}></img>
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

qswitch_f(switch_obj)
{
  let choise =switch_obj.cases[myquest.variables.visible[switch_obj.cell]]
  
  console.log(switch_obj)
  if(!choise)
  {
    //alert(switch_obj.qdefault)
    this.post_transit(switch_obj.qdefault)
    
  }
  else
  {
    //alert(switch_obj.cases[myquest.variables.visible[switch_obj.cell]])
    this.post_transit(switch_obj.cases[myquest.variables.visible[switch_obj.cell]])
  }

}

math_func(oper_obj)
{
let varname_buff_a=null//this.cut_var(oper_obj.va)
if(typeof oper_obj.va =="string")
{varname_buff_a=(oper_obj.va.replace("<$ins>","")) }

console.log(oper_obj,"im hungry",varname_buff_a)
oper_obj.va=Number(this.get_var(oper_obj.va))
oper_obj.vb=Number(this.get_var(oper_obj.vb))
let buffer=0
switch(oper_obj.operator)
{
case "+":{buffer=oper_obj.va+oper_obj.vb;break}
case "-":{buffer=oper_obj.va-oper_obj.vb;break}
case "/":{buffer=oper_obj.va/oper_obj.vb;break}
case "*":{buffer=oper_obj.va*oper_obj.vb;break}
case "^":{buffer=oper_obj.va**oper_obj.vb;break}
case "ln":{ buffer=Math.log(oper_obj.va);break}
case "log":{ buffer=Math.log(oper_obj.va)/Math.log(oper_obj.vb);break}
}
if(oper_obj.write_to){
myquest.variables.visible[oper_obj.write_to]=buffer
}
else
{
if(varname_buff_a){myquest.variables.visible[varname_buff_a]=buffer}
}

}


get_var(forcheck)
{
  //let forcheck=new String
  if(typeof forcheck==="string"&&forcheck.includes("<$ins>"))
  {
    return(myquest.variables.visible[forcheck.replace("<$ins>","")])
  }
  else{return forcheck}
}

ifswitch(switch_obj)
{
  let choise =false
  
  console.log(switch_obj.a_val,switch_obj.b_val)
  
  switch_obj.a_val=this.get_var(switch_obj.a_val)
  switch_obj.b_val=this.get_var(switch_obj.b_val)

  switch(switch_obj.operator)
  {
    case "=" :{if(switch_obj.a_val==switch_obj.b_val){choise=true};break}
    case "<" :{if(switch_obj.a_val<switch_obj.b_val){choise=true};break}
    case ">" :{if(switch_obj.a_val>switch_obj.b_val){choise=true};break}
  }
  console.log(switch_obj.a_val,switch_obj.b_val)
  if(choise)
  {
    this.post_transit(switch_obj.then)
  }
  else{this.post_transit(switch_obj.qelse)}
}

post_transit(trans_map)
{
  console.log(trans_map)
  if(trans_map.change)
  {
  myquest.variables.visible[trans_map.change.cell]=trans_map.change.value
  }
  if(trans_map.mathf)
  {
    console.log(333)
    this.math_func(trans_map.mathf)
  }
  if(trans_map.move)
  {
  this.setState({current_room:trans_map.move})
  }
  console.log(myquest)
}

transit(handler,index,room)
{ 
let commandbuff=myquest.rooms[room].options[index]

if(commandbuff.qswitch)
{
  this.qswitch_f(commandbuff.qswitch)
}

if(commandbuff.ifsw)
{
  this.ifswitch(commandbuff.ifsw)  
}
else
{
this.post_transit(commandbuff)
}
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

class audio_player extends React.Component
{
  constructor()
  {
    this.state={}
  }
  render()
  {
    return(<audio controls/>)
  }
}


export default App;