import PageBar from "./pagebar";
import style from "./main.module.css"
function ErrorPage(props)
{
let errorNames={404:"Человек, тут ничего интересного нет",
500:"Человек, уходи, у нас все упало, починим, придешь"}
return(<div>
     <PageBar/>
<div className={style.error_page}>
    <img src="./cat_play.svg"/>
 <div>   <h1>{props.errorCode}</h1>
<h2>{errorNames[props.errorCode]}.</h2></div></div>
</div>)
}
export default ErrorPage;