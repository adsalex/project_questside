import { useState } from "react"
import { useNavigate } from "react-router-dom"
import style from "./main.module.css"
function PageBar(props)
{
const move = useNavigate()
const [opt_counter,setOpt]=useState(0)
const move_map =[{name:"qu_side",path:"/"},{name:"о нас",path:"/"},{name:"faq",path:"/"}]
return(
<div className={style.pagebar}>
<span 
onClick={()=>{move(move_map[opt_counter].path)}}>{move_map[opt_counter].name}</span>
<span className={""} 
onClick={()=>{if(opt_counter<move_map.length-1){setOpt(1+opt_counter)}else{setOpt(0)}}}>{">"}</span>
</div>)
}
export default PageBar