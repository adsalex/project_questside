import PageBar from "./pagebar";
import style from "./descpages.module.css"

import { Component, useState,React, createRef, forwardRef } from "react";
function Faq(props)
{
return(
<div className={style.body_part}>
<PageBar></PageBar>
 <Foldable_Tframe header={"hello"} text={"ggg"}></Foldable_Tframe>    
</div>)
}

export class Textframe extends Component
{
     constructor(props)
     {
          super(props)
     }
     render()
     {    
          
          let funcbuffer
          if(typeof this.props.swFunc == "function")
          {
              funcbuffer=this.props.swFunc
          }
          else{funcbuffer=()=>{}}
          if(this.props.folded)
          {
               return (
                    <div className={style.main_part}>
                    <div className={style.header} onClick={ funcbuffer}>
                    {this.props.header}     
                    </div>
                    </div>
               )
          }
          else{
               return (
                    <div className={style.main_part}>
                    <div className={style.header} onClick={funcbuffer}>
                    {this.props.header}     
                    </div>
                    <div className={style.text_frame}>
                    {this.props.text}
                    </div>
                    </div>
               )
          }
     }
}
class Foldable_Tframe extends Component
{
     constructor(props)
     {
          super(props)
          this.state={
               folded:false
          }
          this.toggleSW=this.toggleSW.bind(this)
     }
     render()
     {
          
          return <Textframe text={"fff"} header={"aaa"} folded={this.state.folded} swFunc={this.toggleSW}/>
     }
     toggleSW(event)
     {
          console.log("fff")
          let buff=this.state.folded
          this.setState({folded:!buff})
     }
}
export default Faq;


