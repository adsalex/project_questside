import logo from './logo.svg';
import './App.css';
import React from 'react';
var vid_ext=[]
var img_ext=[]

var myquest={
  style:
  {

  },
  music:["sr2.mp4","human.mp4"],
  "variables":
  {
      "visible":{"room":"22","kll":"33"},
      "hidden":{}
  },
  "start_from":"main_room",
  "rooms":
  {
      "main_room":
      {"text":"вы в гостинной сейчас стоите <$ins>kll<$ins> <$ins>room<$ins>","image":"/human.mp4",isvid:0,
      "options":[
          {"text":"перейти на кухню","move":"kitchen","stringf":[{va:"<$ins>room",vb:"33",operator:"+",write_to:"room"},{va:"<$ins>room",vb:"33",operator:"+",write_to:"room"}]
          /* "change":{cell:"room",value:"22"} */},
          {"text":"перейти в ванную", 
          ifsw:[{a_val:"<$ins>room",b_val:"22", operator:"=",
            then:{"move":"balcony","change":[{cell:"room",value:"22"},{cell:"kll",value:"kithcen 453"}]},
            qelse:{"move":"balcony","change":[{cell:"room",value:"22"}]}
          },
          {a_val:"<$ins>room",b_val:"22", operator:"=",
          then:
          {
            ifsw:[{a_val:"<$ins>room",b_val:"22", operator:"=",
            then:{"move":"main_room","change":[{cell:"kick",value:"kithcen 9990"},{cell:"kll",value:"kithcen 453"}]},
            qelse:{"move":"balcony","change":[{cell:"kick",value:"kithcen 99977"}]}}]
          },
          qelse:{"move":"balcony","change":[{cell:"room",value:"kithcen 778"}]}
          }
        ],
          "move":"balcony","change":[{cell:"room",value:"kithcen 333"}] },
          
          {"text":"перейти в спальню",
            qswitch:[
            {
              cell:"room",
              cases:{
                "22":{"move":"kitchen","change":{cell:"room",value:"swi223399"}},
                "33":{"move":"kitchen","change":{cell:"room",value:"sih 33uu77"}},
                "44":{"move":"kitchen","change":{cell:"room",value:"sw 889hgfgg"}}},
              qdefault:{"move":"kitchen","change":{cell:"room",value:"default vcase"}}
            },
            {
              cell:"room",
              cases:{
                "22":{"move":"kitchen","change":{cell:"room",value:"swi223399"}},
                "33":{"move":"kitchen","change":{cell:"room",value:"sih 33uu77"}},
                "44":{"move":"kitchen","change":{cell:"room",value:"sw 889hgfgg"}}},
              qdefault:{"move":"kitchen","change":{cell:"room",value:"default vcase"}}
            }
          ]
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
    <Quest_Table max_recursor={1} trim={1}/>
  );
}

class Quest_Table extends React.Component
{
  constructor()
  {
    super()
    this.props ={max_recursor:3}
    this.state = {color: "red",current_room:myquest.start_from};
    this.transit=this.transit.bind(this)
    this.post_transit=this.post_transit.bind(this)
    this.ifswitch=this.ifswitch.bind(this)
    this.qswitch_f=this.qswitch_f.bind(this)
  }
render()
{
  const textbuffer=this.instex(myquest.rooms[this.state.current_room]["text"])
  
  return (<div id='quest_app'>
    <PicFrame source={myquest.rooms[this.state.current_room].image} 
    isvideo={myquest.rooms[this.state.current_room].isvid}/>
   {/*  <div id='vars_text'>{wrapper(myquest.variables.visible) }</div> */}
    <div id='text_table'>{textbuffer/* myquest.rooms[this.state.current_room]["text"] */} </div>
    <div id='option_bar'>
    <Quest_Options options={myquest.rooms[this.state.current_room]["options"]}
    room={this.state.current_room}
    trans_f={this.transit}></Quest_Options>
    </div>
    <Audio_player/>
    </div>
    
  )
}

instex(replaceble)
{
  const capture_regex=/<\$ins>(.*?)<\$ins>/gi
  let recursor = 0
  
    //let replaceble=myquest.rooms[this.state.current_room]["text"]
    while(replaceble.match(capture_regex) && recursor<this.props.max_recursor){ 
    const matchbuff=[...replaceble.matchAll(capture_regex)]
    console.log(recursor,this.props.max_recursor)
    for(const key of matchbuff){
    const ins_regex=new RegExp(`<\\$ins>${key[1]}<\\$ins>`,"gi");
    replaceble= replaceble.replace(ins_regex,myquest.variables.visible[key[1]])}
    
    recursor++
      
  }
  if(this.props.trim)
  {
    replaceble=replaceble.replace(capture_regex,"")
  }
  return replaceble
}

qswitch_f(switch_obj)
{
  for(let sw_obj in switch_obj){
  let choise =switch_obj[sw_obj].cases[myquest.variables.visible[switch_obj[sw_obj].cell]] 
  console.log(switch_obj[sw_obj])
  if(!choise)
  {
    this.post_transit(switch_obj[sw_obj].qdefault)
  }
  else
  {
    this.post_transit(switch_obj[sw_obj].cases[myquest.variables.visible[switch_obj[sw_obj].cell]])
  }
  }
}

math_func(oper_obj)
{
let arr_iter=oper_obj.length
if(Array.isArray(oper_obj)){}
//else{}
for(let it_counter=0; it_counter<arr_iter;it_counter++){
let varname_buff_a=null//this.cut_var(oper_obj[it_counter].va)
if(typeof oper_obj[it_counter].va =="string")
{varname_buff_a=(oper_obj[it_counter].va.replace("<$ins>","")) }

console.log(oper_obj[it_counter],"im hungry",varname_buff_a)
oper_obj[it_counter].va=Number(this.get_var(oper_obj[it_counter].va))
oper_obj[it_counter].vb=Number(this.get_var(oper_obj[it_counter].vb))
let buffer=0
switch(oper_obj[it_counter].operator)
{
case "+":{buffer=oper_obj[it_counter].va+oper_obj[it_counter].vb;break}
case "-":{buffer=oper_obj[it_counter].va-oper_obj[it_counter].vb;break}
case "/":{buffer=oper_obj[it_counter].va/oper_obj[it_counter].vb;break}
case "*":{buffer=oper_obj[it_counter].va*oper_obj[it_counter].vb;break}
case "^":{buffer=oper_obj[it_counter].va**oper_obj[it_counter].vb;break}
case "ln":{ buffer=Math.log(oper_obj[it_counter].va);break}
case "log":{ buffer=Math.log(oper_obj[it_counter].va)/Math.log(oper_obj[it_counter].vb);break}
}
if(oper_obj[it_counter].write_to){
myquest.variables.visible[oper_obj[it_counter].write_to]=buffer
}
else
{
if(varname_buff_a){myquest.variables.visible[varname_buff_a]=buffer}
}

}
}

get_var(forcheck)
{
  if(typeof forcheck==="string"&&forcheck.includes("<$ins>"))
  {
    return(myquest.variables.visible[forcheck.replace("<$ins>","")])
  }
  else{return forcheck}
}

ifswitch(switch_obj)
{
  for(const if_obj in switch_obj){
  let choise =false
  
  console.log(switch_obj[if_obj].a_val,switch_obj[if_obj].b_val)
  
  switch_obj[if_obj].a_val=this.get_var(switch_obj[if_obj].a_val)
  switch_obj[if_obj].b_val=this.get_var(switch_obj[if_obj].b_val)

  switch(switch_obj[if_obj].operator)
  {
    case "=" :{choise=switch_obj[if_obj].a_val==switch_obj[if_obj].b_val;break}
    case "<" :{choise=switch_obj[if_obj].a_val<switch_obj[if_obj].b_val;break}
    case ">" :{choise=switch_obj[if_obj].a_val>switch_obj[if_obj].b_val;break}
    case "!=" :{choise=switch_obj[if_obj].a_val==switch_obj[if_obj].b_val;break}
  }
  console.log(switch_obj[if_obj].a_val,switch_obj[if_obj].b_val)
  if(choise)
  {
    this.post_transit(switch_obj[if_obj].then)
  }
  else{this.post_transit(switch_obj[if_obj].qelse)}
}
}

post_transit(trans_map)
{
  console.log(trans_map)
  if(trans_map.change)
  {
  let ch_items=trans_map.change.length
  for(let iter_ch=0;iter_ch<ch_items;iter_ch++)
  {
  myquest.variables.visible[trans_map.change[iter_ch].cell]=trans_map.change[iter_ch].value
  }
  }
  if(trans_map.mathf)
  {
    console.log(333)
    this.math_func(trans_map.mathf)
  }
  if(trans_map.stringf)
  {
    console.log(333)
    this.string_work(trans_map.stringf)
  }
  if(trans_map.move)
  {
  this.setState({current_room:trans_map.move})
  }
  else{ if(trans_map.ifsw)
  {
    this.ifswitch(trans_map.ifsw)
  }
  else if(trans_map.qswictch)
  {
    this.qswitch_f(trans_map.qswictch)
  }
}
  console.log(myquest.variables.visible)
}

transit_loop(trans_obj)
{ 

if(trans_obj.qswitch)
{
  this.qswitch_f(trans_obj.qswitch)
}

if(trans_obj.ifsw)
{
  this.ifswitch(trans_obj.ifsw)  
}
else
{
this.post_transit(trans_obj)
}
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

string_work(string_obj)
{
  let swork_arr=string_obj.length
console.log(string_obj)
  for(let st_counter=0;st_counter<swork_arr;st_counter++){ let buffer
  let varname_buff_a=null//this.cut_var(oper_obj[it_counter].va)
  if(typeof string_obj[st_counter].va =="string")
  {varname_buff_a=(string_obj[st_counter].va.replace("<$ins>","")) }
  string_obj[st_counter].va=(this.get_var(string_obj[st_counter].va))
  string_obj[st_counter].vb=(this.get_var(string_obj[st_counter].vb))
  console.log(string_obj[st_counter].va)
  switch(string_obj[st_counter].operator)
{
  case "+":{buffer=string_obj[st_counter].va.concat(string_obj[st_counter].vb);break}
  case "*":{buffer=string_obj[st_counter].va.repeat(string_obj[st_counter].vb);break}
  case "includes":{buffer=string_obj[st_counter].va.includes(string_obj[st_counter].vb);break}
  case "replace":{buffer=string_obj[st_counter].va.replace(string_obj[st_counter].vb,string_obj[st_counter].vc);break}
} console.log(buffer)
if(string_obj[st_counter].write_to){
  myquest.variables.visible[string_obj[st_counter].write_to]=buffer
  }
  else
  {
  if(varname_buff_a){myquest.variables.visible[varname_buff_a]=buffer;console.log(buffer)}
  }

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
    opt_buffer.push(<p > <span className="options" onClick={(handler)=>(this.props.trans_f(handler,constbuff,this.props.room))}>{this.props.options[elem].text}</span></p>)
    indcount++
  }
  return opt_buffer

}}

/* function wrapper(content, tag_class) {
  let buffer=[]
  for(let elem in content)
  {
  buffer.push(<p className={tag_class}> <span>{content[elem]}</span></p>)
  }
  return (

    buffer
  );
}
 */
class Audio_player extends React.Component
{
  constructor()
  {
    super()
    this.state={track:Math.round(Math.random()*(myquest.music.length-1)),
    no_muted:1,playing:0}
    this.mute_unmute=this.mute_unmute.bind(this)
    this.play_pause=this.play_pause.bind(this)
    this.playlist_ctrl=this.playlist_ctrl.bind(this)
    this.audioref=React.createRef()
  }
  render()
  {
    return(<div className='audio'>
      <audio ref={this.audioref} autoPlay id ="music_player" muted={this.state.no_muted}
      controls onEnded={this.playlist_ctrl}
      src={myquest.music[this.state.track]}/>
      <button onClick={this.play_pause}>|| </button>
      <button onClick={this.mute_unmute}> 🔇</button>
      </div>)
  }
  mute_unmute(handler)//{}
  {let buff=!this.state.no_muted;this.setState({no_muted:buff})}
  play_pause(handler)
  {
    //console.log(handler.target)
    let buff=!this.state.playing;this.setState({playing:buff})
    console.log(this.audioref.current)
  if(this.state.playing){ this.audioref.current.play()}
  else{this.audioref.current.pause()}      
  }
  playlist_ctrl(handler)
  {
    //alert("ended")
    let trn_buffer=this.state.track+1
   if(trn_buffer<myquest.music.length)
    this.setState({track:trn_buffer})
   else
    this.setState({track:0})
    
  }
}

Quest_Table.prototype.concat=function()
{

}

class PicFrame extends React.Component
{
  constructor()
  {
    super()
    this.props={source:"",isvideo:false}
  }
  render()
  {
    let novid=false
    const img_array=["BMP", "GIF", "JPG", "JPEG", "PNG", "WebP","SVG"]
    for(const ext of img_array)
    {
      if(this.props.source.toUpperCase().includes(ext)){novid=true;break}
    }
    if(!novid){return(<div className='image_store'><video muted autoPlay loop
     src={this.props.source}/></div>)}
    else{return(<div className='image_store'><img alt='noph' src={this.props.source}/></div>)}
  }
}

export default App;