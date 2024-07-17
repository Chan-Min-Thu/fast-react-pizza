import { Link, useNavigate } from "react-router-dom"
export default function LinkButton({ children, to }) {
    const navigate = useNavigate();
    const className = "text-blue-500 text-sm hover:text-blue-600 mb-8 hover:underline"
    if (to === "-1") return (
        <button className={className} onClick={() => navigate(-1)}>{children}</button>
    )
    return (
        <Link to={to} className={className}>{children}</Link>
    )
}
