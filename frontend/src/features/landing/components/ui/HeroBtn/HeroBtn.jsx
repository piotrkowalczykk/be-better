import classes from "./HeroBtn.module.css"

export const HeroBtn = ({text, bgColor, color}) => {
    return(
        <button 
        className={classes.heroBtn}
        style={{
            backgroundColor: bgColor,
            color: color
        }}>
            {text}
        </button>
    );
}