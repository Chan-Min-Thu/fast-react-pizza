import { Link } from "react-router-dom"

export default function Button({ children, disabled ,to,type,onClick}) {
    const base = 
    'bg-yellow-400 text-sm md:text-xs hover:bg-yellow-300 text-stone-800 uppercase font-semibold tracking-wide rounded-full transition-colors duration-300 inline-block focus:outline-none focus:bg-yellow-300 focus:ring focus:ring-yellow-300 focus:ring-offset-2 active:bg-slate-400  disabled:cursor-not-allowed'
    const styles = {
        primary:base+ ' px-4 py-3 md:px-6 md:py-4',
        small:base+ ' py-2 px-3 md:px-5 md:py-2.5 text-xs',
        round: base + ' px-2.5 py-1 md:px-3.5 md:py-2 text-sm',
        secondary: 'hover:bg-stone-300 border-2 text-sm border-stone-300 text-stone-800 uppercase font-semibold py-3 px-4 tracking-wide rounded-full transition-colors duration-300 inline-block focus:outline-none focus:bg-stone-300 focus:ring focus:ring-stone-300 focus:ring-offset-2 active:bg-slate-400 px-2 py-2.5 md:px-5 md:py-3.5 disabled:cursor-not-allowed '
    }
    if(to)return <Link className={styles[type]} to={to}>
        {children}
    </Link>
    if(onClick) 
        return (
        <button disabled={disabled}
        onClick={onClick}
        className={styles[type]}>
            {children}
        </button>
    )
    return (
        <button disabled={disabled}
        className={styles[type]}>
            {children}
        </button>
    )
}
