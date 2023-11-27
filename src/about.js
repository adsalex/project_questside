import PageBar from "./pagebar";
import style from "./descpages.module.css"
import { Textframe } from "./faq";
import { Component, useState,React, createRef, forwardRef } from "react";
function AboutUs(props)
{
const text="Используя наш сайт Qu_side вы сможете"+
 "сыграть в различные текстовые квесты, написанные нашими авторами"+
 "мы постоянно будем пополнять список квестов, выпуская квесты самых различных жанров"

return(
//"<br>"+ copymark
<div className={style.body_part}>
 <PageBar></PageBar>
 <Textframe header={"О нас"} text={text} copy={true}></Textframe>    
</div>)
}



export default AboutUs;
//export  Textframe;
