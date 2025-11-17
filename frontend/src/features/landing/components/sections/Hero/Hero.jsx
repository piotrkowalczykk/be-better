import classes from "./Hero.module.css"
import { HeroBtn } from "../../ui/HeroBtn/HeroBtn"

export const Hero = () => {
    return (
        <div className={classes.heroContainer}>
            <h1 className={classes.heroMainText}>Every rep counts</h1>
            <h1 className={classes.heroMainText}>Track them all</h1>
            <div className={classes.btnContainer}>
                <HeroBtn text="JOIN US" bgColor="yellow" color="black" bgHoverColor="transparent" colorHover="white" to="/register" />
                <HeroBtn text="SIGN IN" bgColor="transparent" color="white" bgHoverColor="yellow" colorHover="black" to="/login" />
            </div>
        </div>
    );
}