import { SideBar } from "../SideBar/SideBar";
import classes from "./Layout.module.css";

export const Layout = ({ children }) => {
    return (
        <div className={classes.layoutContainer}>
            <SideBar />
            <div className={classes.layoutContent}>
                {children}
            </div>
        </div>
    );
}