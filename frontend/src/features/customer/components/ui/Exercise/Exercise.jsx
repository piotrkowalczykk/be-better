import classes from "./Exercise.module.css";

export const  Exercise = ({image, name, muscleGroup}) => {
    return (
        <div className={classes.exerciseContainer}>
                <div className={classes.exerciseImgContainer}>
                    <img src={image} />
                </div>
                <div className={classes.exerciseTextContainer}>
                    <span className={classes.exerciseName}>{name}</span><br />
                    <span className={classes.exerciseMuscleGroup}>{muscleGroup}</span>
                </div>
        </div>
    );
}