import classes from "./Day.module.css";
export const Day = ({title, color, secondColor, icon, message, visible}) => {

    return (
        <div className={classes.dayContainer} style={{ backgroundColor: secondColor }}>
            <div className={classes.dayHeader} style={{backgroundColor: color}}>
                <div className={classes.dayIcon} style={{ backgroundColor: secondColor }}>{icon}</div>
                <div className={classes.dayTitle}>{title}</div>
            </div>
            {visible && (
                <div className={classes.dayMessageContainer} style={{ backgroundColor: secondColor }}>
                    <p className={classes.dayMessage}>{message}</p>
                </div>
            )}
        </div>
    );
}