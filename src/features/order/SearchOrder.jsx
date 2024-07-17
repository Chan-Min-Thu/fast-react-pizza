import{ useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function SearchOrder() {
    const [query,setQuery] = useState("");
    const navigate = useNavigate();
    const handleSubmit = (e)=>{
        e.preventDefault();
        if(!query) return;
        navigate(`/order/${query}`)
        setQuery("");
    }
  return (
    <form onSubmit={handleSubmit}>
    <input className='bg-yellow-100 rounded-full py-3 px-4 text-sm placeholder:text-stone-400 sm:w-64 focus:w-72 transition-all duration-300 
    focus:ring focus:outline-none focus:opacity-50 focus:ring-yellow-500' placeholder='Search OrderId' value={query} onChange={(e)=>setQuery(e.target.value)}/>
    </form>
  )
}
