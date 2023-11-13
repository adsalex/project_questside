import { useNavigate } from "react-router-dom"

function useHome()
{
const nav = useNavigate()
return ()=>nav("/")
}
export default useHome