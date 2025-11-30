import { useEffect, useState } from "react";
import { DashboardIcon, ExitIcon, HomeIcon, LogoutIcon, SettingsIcon, MenuIcon, DumbbellIcon, RoutinesIcon } from "../../../../../app/icons/Icons";
import classes from "./SideBar.module.css";
import { Link, NavLink  } from "react-router-dom";

export const SideBar = () => {

    const [isMobile, setIsMobile] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        }

        checkMobile();
        window.addEventListener("resize", checkMobile);

        return () => window.removeEventListener("resize", checkMobile);
    }, []);
    
    return (
        <>
            {isMobile && (
                <div className={classes.mobileTopbarContainer}>
                    <button 
                        className={classes.mobileTopbarBtn}
                        onClick={() => setIsOpen(!isOpen)}>
                        <MenuIcon className={classes.mobileTopbarBtnIcon} />
                    </button>
                </div>
            )}
            
            {isMobile && isOpen && (
                <div className={classes.overlay} onClick={() => setIsOpen(false)}/>
            )}
            
                <div className={`${classes.sidebarContainer} ${isMobile ? classes.mobile : ""} ${isOpen ? classes.open : classes.closed}`}>
                    <div className={classes.sidebarHeader}>
                        <Link className={classes.logoContainer} to="/dashboard">
                            <h1 className={classes.logo}><span style={{color: "yellow"}}>BEE</span>BETTER</h1> 
                        </Link>

                        {isMobile && (
                            <button 
                            className={classes.sidebarBtn}
                            onClick={() => setIsOpen(!isOpen)}>
                            <ExitIcon />
                        </button>
                        )}
                    </div>
                    <div className={classes.sidebarItems}>
                        <NavLink className={({ isActive }) =>
        isActive ? `${classes.sidebarItem} ${classes.active}` : classes.sidebarItem
    } to="/feed">
                            <HomeIcon className={classes.sidebarItemIcon} />                       
                            <span className={classes.sidebarItemText}>Feed</span>
                        </NavLink>
                        <NavLink className={({ isActive }) =>
        isActive ? `${classes.sidebarItem} ${classes.active}` : classes.sidebarItem
    } to="/dashboard">
                            <DashboardIcon className={classes.sidebarItemIcon} />                       
                            <span className={classes.sidebarItemText}>Dashboard</span>
                        </NavLink>
                        <NavLink className={({ isActive }) =>
        isActive ? `${classes.sidebarItem} ${classes.active}` : classes.sidebarItem
    } to="/exercises">
                            <DumbbellIcon className={classes.sidebarItemIcon} />                       
                            <span className={classes.sidebarItemText}>Workout Planner</span>
                        </NavLink>
                        <NavLink className={({ isActive }) =>
        isActive ? `${classes.sidebarItem} ${classes.active}` : classes.sidebarItem
    } to="/routines">
                            <RoutinesIcon className={classes.sidebarItemIcon} />                       
                            <span className={classes.sidebarItemText}>Routines</span>
                        </NavLink>
                        <NavLink className={({ isActive }) =>
        isActive ? `${classes.sidebarItem} ${classes.active}` : classes.sidebarItem
    } to="/settings">
                            <SettingsIcon className={classes.sidebarItemIcon} />                       
                            <span className={classes.sidebarItemText}>Settings</span>
                        </NavLink>
                    </div>
                    <div className={classes.sidebarFooter}>
                        <Link className={classes.sidebarItem} to="/settings">
                            <LogoutIcon className={classes.sidebarItemIcon}/>
                            <span className={classes.sidebarItemText}>Logout</span>
                        </Link>
                    </div>  
                </div>
        </>
    );
}