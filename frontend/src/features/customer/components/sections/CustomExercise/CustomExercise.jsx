import { CustomBtn } from "../../../../../components/ui/CustomBtn/CustomBtn";
import ImageUploader from "../../../../../components/ui/ImageUploader/ImageUploader";
import { CustomInput } from "../../ui/CustomInput/CustomInput";
import classes from "./CustomExercise.module.css";
import { useState } from "react";

export const CustomExercise = () => {
    return (
        <div className={classes.customExercisesContainer}>
            <ImageUploader />
            <CustomInput label="Name" />
            <CustomInput label="Muscle Group" />
            <CustomBtn text="Save" color="white" bgColor="#209d3dff" />
        </div>
    );
}