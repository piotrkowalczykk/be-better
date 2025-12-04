import { ModalWindow } from "../../../../components/layout/ModalWindow/ModalWindow";
import { CustomBtn } from "../../../../components/ui/CustomBtn/CustomBtn";
import { SearchBar } from "../../../../components/ui/SearchBar/SearchBar";
import { Layout } from "../../components/layout/Layout/Layout";
import { CustomExercise } from "../../components/sections/CustomExercise/CustomExercise";
import { CustomInput } from "../../components/ui/CustomInput/CustomInput";
import { Exercise } from "../../components/ui/Exercise/Exercise";
import { SelectedExercise } from "../../components/ui/SelectedExercise/SelectedExercise";
import classes from "./DayCreator.module.css";
import { useState } from "react";

export const DayCreator = () => {

    const [showModal, setShowModal] = useState(false);

    return (
        <Layout>

            {showModal && 
                <ModalWindow onClose={() => setShowModal(false)} title="Create Exercise">
                    <CustomExercise />
                </ModalWindow>
            }

            <div className={classes.dayCreatorContainer}>
                <div className={classes.dayCreatorLeftContainer}>
                    <div className={classes.dayDataSection}>
                        <div className={classes.dayDataSectionHeader}>
                            <h2 className={classes.dayDataSectionTitle}>Create Day</h2>
                            <CustomBtn text="Save" bgColor="#209d3dff" color="white"/>
                        </div>
                        
                        <div className={classes.dayDataSectionContainer}>
                            <CustomInput type="text" label="Name"/>
                            <CustomInput type="color" label="Color"/>
                            <CustomInput type="color" label="Secondary Color"/>
                            <CustomInput type="text" label="Description"/>
                        </div>
                    </div>
                    <div className={classes.dayExercises}>
                            <SelectedExercise name="Biceps Curls" image="https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2024/02/dumbbell-curl-top-position.png?resize=700%2C713&ssl=1" />
                    </div>
                </div>
                <div className={classes.dayCreatorRightContainer}>
                    <div className={classes.dayRightHeader}>
                        <h2 className={classes.dayDataSectionTitle}>Library</h2>
                        <button className={classes.dayRightBtn} onClick={() => setShowModal(!showModal)}>Custom Exercise</button>
                    </div>
                    <div className={classes.dayRightSection1}>
                        <CustomInput label="Equipment"/>
                        <CustomInput label="Muscle group"/>
                        <SearchBar />
                     </div>
                    <div className={classes.dayRightSection2}>
                        <Exercise image="https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2024/02/dumbbell-curl-top-position.png?resize=700%2C713&ssl=1" name="Biceps curls" muscleGroup="Biceps" />
                        <Exercise image="https://www.puregym.com/media/4nzgihyv/bench-press.jpg?quality=80" name="Biceps curls" muscleGroup="Biceps" />
                    </div>
                </div>
            </div>
        </Layout>
    );
}