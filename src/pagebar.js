import { useState } from "react"
import { useNavigate } from "react-router-dom"
import style from "./main.module.css"
import { useDispatch ,useSelector } from "react-redux"
import { Questreducer } from "."
import { createSlice } from "@reduxjs/toolkit"
import { configureStore } from '@reduxjs/toolkit'
//import { counterSlice } from './pagebar';


const initialState = {
  value: 0,
};

 export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    // Редьюсеры в слайсах меняют состояние и ничего не возвращают
    reducers: {
      increment: (state) => {
        if(state.value>2){state.value=0}
        state.value += 1;
        
      },
      
    }
  });
   const { increment} = counterSlice.actions;

   export const Queststore = configureStore({
    reducer: counterSlice.reducer
  });

function PageBar(props)
{
let count =useSelector((state) => state.value)
const dispatch = useDispatch()
const move = useNavigate()
const [opt_counter,setOpt]=useState(0)
const move_map =[{name:"qu_side",path:"/"},{name:"о нас",path:"/about"},{name:"faq",path:"/faq"}]
return(
<div className={style.pagebar}>
<span 
onClick={()=>{move(move_map[opt_counter].path)}}>{move_map[count].name}</span>{/*()=>{move(move_map[opt_counter].path)}}>{move_map[opt_counter].name}</span>*/}
<span className={""} 
onClick={
            ()=>{dispatch(increment())}

            //()=>{if(opt_counter<move_map.length-1){setOpt(1+opt_counter);dispatch(action())}else{setOpt(0)}}
        }
    >{">"}</span>
</div>)
}
export default PageBar


/*

const dispatch = useDispatch()
const move = useNavigate()
const [opt_counter,setOpt]=useState(0)
const move_map =[{name:"qu_side",path:"/"},{name:"о нас",path:"/about"},{name:"faq",path:"/faq"}]
return(
<div className={style.pagebar}>
<span 
onClick={()=>{move(move_map[opt_counter].path)}}>{move_map[opt_counter].name}</span>
<span className={""} 
onClick={()=>{if(opt_counter<move_map.length-1){setOpt(1+opt_counter)}else{setOpt(0)}}}>{">"}</span>
</div>)
}
*/