import PageBar from "./pagebar";
import style from "./descpages.module.css"

import { Component, useState,React, createRef, forwardRef } from "react";
function Faq(props)
{
return(
<div className={style.body_part}>
<PageBar></PageBar>

 <Foldable_Tframe key={1} header={"что это за сайт?"} 
 text={"на этом сайте вы можете сыграть в различные текстовые квесты"}></Foldable_Tframe>  
 <Foldable_Tframe key={2} header={"Как начать играть?"} 
 text={"Выберите квест из списка, нажмите кнопку 'начать', для выключения музыки нажмите на соответсвующий флажок, нажмите кнопку 'начать'."}></Foldable_Tframe>      

<Foldable_Tframe key={3} header={"Как играть?"} 
 text={"В квесте у вас еть такие элементы как: картинка, текст (нужны для описания ситуации), варианты ответов, выбирайте нужный вам вариант ответа и вы перейдете на соответствующую 'страницу' квеста. "}></Foldable_Tframe> 
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
               let copymark=""
               if(this.props.copy){copymark="Создано Савко А.Д ИСиТ 2 БГТУ 2023"}
               
               return (
                    <div className={style.main_part}>
                    <div className={style.header} onClick={funcbuffer}>
                    {this.props.header}     
                    </div>
                    <div className={style.text_frame}>
                    {this.props.text}
                    <p>{copymark}</p>
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
               folded:true
          }
          this.toggleSW=this.toggleSW.bind(this)
     }
     render()
     {
          
          return <Textframe header={this.props.header} text={this.props.text} swFunc={this.toggleSW} folded={this.state.folded}/>
           
          
     }
     toggleSW(event)
     {
          console.log("fff")
          let buff=this.state.folded
          this.setState({folded:!buff})
     }
}
export default Faq;


