import { CustomInput } from "../CustomInput/CustomInput";
import classes from "./SelectedExercise.module.css";

export const SelectedExercise = ({
  image,
  name,
  sets,
  reps,
  weight,
  rir,
  onChange,
  onRemove
}) => {
  return (
    <div className={classes.selectedExerciseContainer}>
      <div className={classes.selectedExerciseInfo}>
        <div className={classes.innerSelectedExerciseInfo}>
            <div className={classes.selectedExerciseImgContainer}>
            <img src={"http://localhost:8080" + image} />
            </div>
            <span className={classes.selectedExerciseName}>{name}</span>
        </div> 
        <button className={classes.selectedExerciseBtn} onClick={onRemove}>✖</button>
      </div>

      <div className={classes.selectedExerciseData}>
        <CustomInput
          label="Sets"
          type="number"
          value={sets}
          onChange={(e) => onChange({ sets: Number(e.target.value) })}
        />
        <CustomInput
          label="Reps"
          type="number"
          value={reps}
          onChange={(e) => onChange({ reps: Number(e.target.value) })}
        />
        <CustomInput
          label="Weight"
          type="number"
          value={weight}
          onChange={(e) => onChange({ weight: Number(e.target.value) })}
        />
        <CustomInput
          label="RIR"
          type="number"
          value={rir}
          onChange={(e) => onChange({ rir: Number(e.target.value) })}
        />
      </div>
    </div>
  );
};
