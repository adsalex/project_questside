import { useState } from "react"
import style from "./selector.module.css" 
import { Navigate, useNavigate } from "react-router-dom"
const test ="fLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
const butt_text = "Начать"

function Selection_section( props )
{   const [resp_dat,getResp]=useState("")
    const navi =useNavigate()
    let respon =  fetch("http://localhost:3300/preload?q="+props.header)
    .then((response) => response.text())
    .then((response) => {
            console.log(response)
            getResp(response)//resp_dat =response//this.setState({isLoaded: true});
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
    if(dirTrig){
    let respon =  fetch("http://localhost:3300/list")
    .then((response) => response.json())
    .then((response) => {
            getdir(response);
            trigSet(false)//resp_dat =response//this.setState({isLoaded: true});
    }) 
    }
    let select_buff=[]
    for(let file of dirset)
    {
        console.log(file)
        select_buff.push(<Selection_section desc_text={test} header={file.name.substring(0,file.name.lastIndexOf(".json"))}/>)
    }
    //console.log(dirset)
    return (( <div >
        {select_buff}
    </div>))
   
  }
export default Selector;