import { Link, NavLink } from "react-router-dom";
import { Layout } from "../../components/layout/Layout/Layout";
import { Day } from "../../components/ui/Day/Day";
import classes from "./Exercises.module.css";
import { CustomInput } from "../../components/ui/CustomInput/CustomInput";

export const Exercises = () => {
    return (
        <Layout>
            <div className={classes.exercisesContainer}>
                <div className={classes.exercisesLeftContainer}>
                    <h2 className={classes.exercisesTitle}>Workout Planner</h2>
                    <div className={classes.exercisesWeekPlannerContainer}>
                        <div className={classes.WeekPlannerItem}>
                           <h3 className={classes.WeekPlannerItemTitle}>Monday</h3>
                            <Day title="PUSH A" color="#4848e6ff" secondColor="#6868ff" icon="✋" message="Upper chest more focus" visible={true} />
                        </div>
                        <div className={classes.WeekPlannerItem}>
                            <h3 className={classes.WeekPlannerItemTitle}>Tuesday</h3>
                        </div>
                        <div className={classes.WeekPlannerItem}>
                            <h3 className={classes.WeekPlannerItemTitle}>Wednesday</h3>
                            <Day title="PULL A" color="#33c32bff" secondColor="#0dff00ff" icon="💪" message="Upper chest more focus" visible={true} />
                        </div>
                        <div className={classes.WeekPlannerItem}>
                            <h3 className={classes.WeekPlannerItemTitle}>Thursday</h3>
                        </div>
                        <div className={classes.WeekPlannerItem}>
                            <h3 className={classes.WeekPlannerItemTitle}>Friday</h3>
                        </div>
                        <div className={classes.WeekPlannerItem}>
                            <h3 className={classes.WeekPlannerItemTitle}>Saturday</h3>
                            <Day title="SHOULDERS" color="#e84040ff" secondColor="#e96666ff" icon="🟡" message="Upper chest more focus" visible={true} />
                        </div>
                        <div className={classes.WeekPlannerItem}>
                            <h3 className={classes.WeekPlannerItemTitle}>Sunday</h3>
                        </div>
                    </div>
                </div>

                <div className={classes.exercisesRightContainer}>
                    <div className={classes.exercisesDaysList}>
                        <div className={classes.exercisesDaysListHeader}>
                            <h2 className={classes.exercisesTitle}>Days</h2>
                            <NavLink to="/day-creator" className={classes.exercisesAddBtn}>
                                +
                            </NavLink>
                        </div>
                        
                        <Day title="PUSH A" color="#4848e6ff" secondColor="#6868ff" icon="💪" message="Upper chest more focus" visible={false} />
                    </div>
                    <div className={classes.exercisesManageDay}>
                        <h2 className={classes.exercisesTitle}>Selected day</h2>
                        <div className={classes.exercisesManageDayContainer}>
                            <Day title="None" color="var(--second-color)" secondColor="var(--first-color)" icon="?" visible={false} />
                            <CustomInput label="Week day"/>
                            <CustomInput label="Frequency"/>
                        </div>
                    </div>
                </div>
            </div>
            
        </Layout>
    );
}