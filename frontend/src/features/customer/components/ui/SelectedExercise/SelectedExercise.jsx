import { CustomInput } from "../CustomInput/CustomInput";
import classes from "./SelectedExercise.module.css";
export const SelectedExercise = ({ image, name}) => {
    return (
        <div className={classes.selectedExerciseContainer}>
            <div className={classes.selectedExerciseInfo}>
                <div className={classes.selectedExerciseImgContainer}><img src={image} /></div>
                <span className={classes.selectedExerciseName}>{name}</span>
            </div>
            <div className={classes.selectedExerciseData}>
                <CustomInput label="Sets" />
                <CustomInput label="Reps" />
                <CustomInput label="Weight" />
                <CustomInput label="RIR" />
            </div>
        </div>
    );
}