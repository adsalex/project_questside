
import { useNavigate } from "react-router-dom"
import style from "./main.module.css"
import { useDispatch ,useSelector } from "react-redux"

import { createSlice } from "@reduxjs/toolkit"
import { configureStore } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
};

 export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
      increment: (state) => {
        state.value = (state.value + 1) % 3;
      },
      
    }
  });
  export const { increment} = counterSlice.actions;

   export const Queststore = configureStore({
    reducer: counterSlice.reducer
  });

function PageBar(props)
{
let count =useSelector((state) => state.value)
const dispatch = useDispatch()
const move = useNavigate()
const move_map =[{name:"qu_side",path:"/"},{name:"о нас",path:"/about"},{name:"faq",path:"/faq"}]
return(
<div className={style.pagebar}>
<span 
onClick={()=>{move(move_map[count].path)}}>{move_map[count].name}</span>
<span className={""} 
onClick={
            ()=>{dispatch(increment())}
        }
    >{">"}</span>
</div>)
}
export default PageBar

