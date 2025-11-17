import classes from "./HeroBtn.module.css"
import { Link } from "react-router-dom";

export const HeroBtn = ({text, bgColor, color, bgHoverColor, colorHover, to}) => {
    return(
        <Link to={to}>
        <button 
        className={classes.heroBtn}
        style={{
            "--bg-color": bgColor,
            "--bg-hover-color": bgHoverColor,
            "--color": color,
            "--color-hover": colorHover,
            
        }}>
            {text}
        </button>
        </Link>
    );
}