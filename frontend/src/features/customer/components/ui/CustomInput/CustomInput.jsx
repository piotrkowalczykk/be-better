import classes from "./CustomInput.module.css";

export const CustomInput = ({ label, name, type, value, onChange, placeholder }) => {
    return (
        <div className={classes.formInputContainer}>
            <label htmlFor={name}>{label}</label>
            <input 
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                className={classes.formInput}
                placeholder={placeholder}
            />
        </div>
    );
}