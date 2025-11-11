import classes from "./HeroBtn.module.css"

export const HeroBtn = ({text, bgColor, color, bgHoverColor, colorHover}) => {
    return(
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
    );
}