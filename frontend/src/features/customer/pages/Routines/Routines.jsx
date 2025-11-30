import { Layout } from "../../components/layout/Layout/Layout";
import { RoutineCard } from "../../components/ui/RoutineCard/RoutineCard";
import classes from "./Routines.module.css";
import { WaterIcon, BedIcon, StepsIcon, MeditationIcon, ResetIcon, DeleteIcon, AddIcon, ArrorLeft, ArrorRight, HelpIcon } from "../../../../app/icons/Icons";
import { CustomInput } from "../../components/ui/CustomInput/CustomInput";
import { useState } from "react";

export const Routines = () => {

    const [showHelp, setShowHelp] = useState(false);

    return (
        <Layout>
            <div className={classes.routinesContainer}>
                <div className={classes.routinesTopContainer}>
                    <h2 className={classes.routinesCardTitle}>My routines</h2>
                    <div className={classes.cardsContainer}>
                        <RoutineCard title="Sleep" Icon={BedIcon}  userProgres={4} scope={8} unit="h" value={(3 / 8) * 100} pathColor="yellow" trailColor="#2b2b27"/>
                        <RoutineCard title="Water" Icon={WaterIcon} userProgres="1.4" scope="2" unit="L" value="50" pathColor="aqua" trailColor="#2b2b27"/>
                        <RoutineCard title="Steps" Icon={StepsIcon} userProgres="5300" scope="10 000" unit="s" value="50" pathColor="red" trailColor="#2b2b27"/>
                        <RoutineCard title="Meditation" Icon={MeditationIcon} userProgres="15" scope="15" unit="min" value="50" pathColor="#00ff44" trailColor="#2b2b27"/>
                        <RoutineCard title="Meditation" Icon={MeditationIcon} userProgres="15" scope="15" unit="min" value="50" pathColor="#00ff44" trailColor="#2b2b27"/>
                        <RoutineCard title="Meditation" Icon={MeditationIcon} userProgres="15" scope="15" unit="min" value="50" pathColor="#00ff44" trailColor="#2b2b27"/>
                        <RoutineCard title="Meditation" Icon={MeditationIcon} userProgres="15" scope="15" unit="min" value="50" pathColor="#00ff44" trailColor="#2b2b27"/>
                        <RoutineCard title="Meditation" Icon={MeditationIcon} userProgres="15" scope="15" unit="min" value="50" pathColor="#00ff44" trailColor="#2b2b27"/>
                        <RoutineCard title="Meditation" Icon={MeditationIcon} userProgres="15" scope="15" unit="min" value="50" pathColor="#00ff44" trailColor="#2b2b27"/>
                    </div>
                </div>
                <div className={classes.routinesBottomContainer}>
                    <div className={classes.routinesManageContainer}>
                        <h2 className={classes.routinesCardTitle}>Create / edit routine</h2>
                        <div className={classes.routinesInnerManageContainer}>
                            <div className={classes.routinesInnerManageContainer1}>
                                <CustomInput label="Name" name="name" type="text" value="siema" onChange="CO TO" />
                                <CustomInput label="Scope" name="scope" type="text" value="siema" onChange="CO TO" />
                                <CustomInput label="Units" name="units" type="text" value="siema" onChange="CO TO" />
                            </div>
                            <div className={classes.routinesInnerManageContainer1}>
                                <CustomInput label="Icon" name="icon" type="text" value="siema" onChange="CO TO" />
                                <CustomInput label="Color" name="color" type="select" value="Select unit" onChange="CO TO" />
                                <CustomInput label="Dashboard priority" name="scope" type="select" value="siema" onChange="CO TO" />
                            </div>
                            <div className={classes.routinesInnerManageContainer1}>
                                <CustomInput label="Frequency" name="color" type="select" value="Select unit" onChange="CO TO" />
                                <div className={classes.helpWrapper}>
                                    <button className={classes.routinesHelpBtn} onClick={() => setShowHelp(prev => !prev)}>
                                        <HelpIcon />
                                    </button>
                                    {showHelp && (
                                        <div className={classes.helpTooltip}>
                                            Siema
                                        </div>
                                    )}
                                </div>
                                <div className={classes.routinesManageBtnContainer}>
                                    <button className={classes.routinesManageBtn}><ResetIcon /> CLEAR</button>
                                    <button className={classes.routinesManageBtn}><DeleteIcon /> DELETE</button>
                                    <button className={classes.routinesManageBtn}><AddIcon /> SAVE</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={classes.routinesSelectContainer}>
                        <h2 className={classes.routinesCardTitle}>Use our routines</h2>
                        <div className={classes.cardSelectContainer}>
                            <RoutineCard title="Meditation" Icon={MeditationIcon} userProgres="15" scope="15" unit="min" value="50" pathColor="#00ff44" trailColor="#2b2b27"/>
                            <div className={classes.cardSelectBtns}>
                                <button className={classes.cardBtn}><ArrorLeft /></button>
                                <button className={classes.cardBtn}><ArrorRight /></button>
                            </div>  
                        </div>        
                    </div>
                </div>
            </div>
        </Layout>
    );
}