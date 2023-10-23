import "./GetStarted.css"
import {Link} from "react-router-dom"
import svgGetStarted from "../assets/get-started.svg"


export default function GetStarted(props) {
    
    const {className} = props;

    return (
        <div className={`get-started fnt-poppins ${className}`}>
            <img src={svgGetStarted} alt="get-started-img"/>
            <h1 className="fnt-w600">Get things done with ToDo</h1>
            <p className="border">Streamline your day with our intuitive todo app, seamlessly organizing tasks and boosting productivity. Your ultimate tool for efficient task management</p>
            <Link to="/register" className="btn btn-full display-block fnt-w800 bg-greenish">Get Started</Link>
        </div>
    )
}