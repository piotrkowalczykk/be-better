import classes from "./Hero.module.css"
import { HeroBtn } from "../../ui/HeroBtn/HeroBtn"

export const Hero = () => {
    return (
        <div className={classes.heroContainer}>
            <h1 className={classes.heroMainText}>Every rep counts</h1>
            <h1 className={classes.heroMainText}>Track them all</h1>
            <div className={classes.btnContainer}>
                <HeroBtn text="Join us" bgColor="yellow" color="black"/>
                <HeroBtn text="Sign in" bgColor="transparent" color="white"/>
            </div>
        </div>
    );
}