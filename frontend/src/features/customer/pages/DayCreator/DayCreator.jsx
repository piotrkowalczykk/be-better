import { Layout } from "../../components/layout/Layout/Layout";
import classes from "./DayCreator.module.css";

export const DayCreator = () => {
    return (
        <Layout>
            <div className={classes.dayCreatorContainer}>
                <div className={classes.dayCreatorLeftContainer}>
                    <div className={classes.dayDataSection}>
                        
                    </div>
                    <div className={classes.dayExercises}>

                    </div>
                </div>
                <div className={classes.dayCreatorRightContainer}>

                </div>
            </div>
        </Layout>
    );
}