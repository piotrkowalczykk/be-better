import classes from "./AuthLayout.module.css";

export const AuthLayout = ({children}) => {
    return (
        <div className={classes.authLayoutContainer}>
            {children}
        </div>
    );
}