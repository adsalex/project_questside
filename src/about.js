import PageBar from "./pagebar";
import style from "./descpages.module.css"
import { Textframe } from "./faq";
import { Component, useState,React, createRef, forwardRef } from "react";
function AboutUs(props)
{
return(
<div className={style.body_part}>
 <PageBar></PageBar>
 <Textframe header={"hello"} text={"ggg"}></Textframe>    
</div>)
}



export default AboutUs;
//export  Textframe;
