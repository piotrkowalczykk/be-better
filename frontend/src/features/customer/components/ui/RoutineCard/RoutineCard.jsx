import classes from "./RoutineCard.module.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

export const RoutineCard = ({ title, Icon, userProgres, scope, unit, value, pathColor, trailColor }) => {
    return (
        <div className={classes.routineCardContainer}>
            <h2 className={classes.routineCardtitle}>{title}</h2>

            <div className={classes.progressWrapper}>
                <CircularProgressbar
                    value={value}
                    styles={buildStyles({
                        pathColor: pathColor,
                        trailColor: trailColor,
                    })}
                />

                <div className={classes.progressIcon}>
                    <Icon style={{
                        fill: pathColor,
                        width: "40px",
                        height: "40px"}}/>
                </div>
            </div>

            <span className={classes.routineCardProgres}>
                <span style={{color: pathColor}} >{userProgres}</span>
                <span style={{ color: "var(--third-color)", display: "inline-block", margin: "0.5em 0" }}> / {scope} {unit}</span>
            </span>
        </div>
    );
};
