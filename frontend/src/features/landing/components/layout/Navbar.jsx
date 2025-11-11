import { useEffect, useState } from "react";
import classes from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { HeroBtn } from "../ui/HeroBtn/HeroBtn";

export const Navbar = () => {

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const heroHeight = window.innerHeight * 0.1;
            setIsVisible(window.scrollY > heroHeight);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className={`${classes.navbarContainer} ${isVisible ? classes.visible : ""}`}>
            <img src="/public/logo.png" className={classes.logo}/>
            <div className={classes.navLinks}>
                <a href="#home" className={classes.navLink}>Home</a>
                <a href="#about" className={classes.navLink}>About us</a>
                <a href="#contact" className={classes.navLink}>Contact</a>
            </div>
            <HeroBtn bgColor="yellow" color="black" bgHoverColor="black" colorHover="yellow" text="SIGN IN"/>
        </div>
    );
}