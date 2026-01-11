import classes from "./Exercise.module.css";

export const Exercise = ({ image, name, muscleGroup, onClick }) => {
  return (
    <div className={classes.exerciseContainer} onClick={onClick}>
      <div className={classes.exerciseImgContainer}>
        <img src={"http://localhost:8080" + image} />
      </div>
      <div className={classes.exerciseTextContainer}>
        <span className={classes.exerciseName}>{name}</span><br />
        <span className={classes.exerciseMuscleGroup}>{muscleGroup}</span>
      </div>
    </div>
  );
};
