import { useState } from "react"
import PageBar from "./pagebar"
import style from "./selector.module.css" 
import {  useNavigate } from "react-router-dom"
import ErrorPage from "./error"
const test ="fLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
const butt_text = "Начать"

function Selection_section( props )
{   const [resp_dat,getResp]=useState("")
    const navi =useNavigate()
     fetch("http://localhost:3300/preload?q="+props.header)
    .then((response) => response.text())
    .then((response) => {
            console.log(response)
            getResp(response)
    })

    return(<div className={style.Selection_section}>
    <div><h1>{props.header + " "}
    </h1>{resp_dat}{}</div> <button onClick={()=>{navi("game"+"?"+props.header)}}>{butt_text}</button>
    </div>)
}


function Selector() 
{
    const [dirset,getdir]=useState("")
    const [dirTrig,trigSet]=useState(true)
    const [serv_ok,setStatus]=useState(true)
    if(dirTrig){
    fetch("http://localhost:3300/list")
    .then((response) => response.json())
    .then((response) => {
            getdir(response);
            setStatus(true)
            trigSet(false)//resp_dat =response//this.setState({isLoaded: true});
    }).catch((err)=> setStatus(false) ) 
    trigSet(false)
    }
    let select_buff=[]
    let keynum=0
    for(let file of dirset)
    {
        console.log(file)
        select_buff.push(<Selection_section key={keynum++} desc_text={test} header={file.name.substring(0,file.name.lastIndexOf(".json"))}/>)
    }
    console.log(serv_ok)
    if(serv_ok){
    return (( <div >
        {<PageBar/>}
        {select_buff}
    </div>))}
    else{return(<ErrorPage errorCode={500}/>)}
  }
export default Selector;