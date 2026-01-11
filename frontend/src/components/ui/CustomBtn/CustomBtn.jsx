import classes from "./CustomBtn.module.css";

export const CustomBtn = ({text, bgColor, color, onClick}) => {
    return (
        <button className={classes.customBtnContainer} style={{backgroundColor: bgColor, color: color}} onClick={onClick}>
            {text}
        </button>
    )
}