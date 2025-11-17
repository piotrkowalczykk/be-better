import classes from "./AuthForm.module.css";

export const AuthForm = ({ onSubmit, title, fields, submitText, footer }) => {
    return (
        <form onSubmit={onSubmit} className={classes.formContainer}>
            <h2 className={classes.fomrTitle}>{title}</h2>
            {fields.map(({label, name, type, value, onChange, placeholder}) => (
                <div key={name} className={classes.formInputContainer}>
                    <label htmlFor={name}>{label}</label>
                    <input 
                    type={type}
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={classes.formInput}
                    />
                </div>
            ))}
            <button type="submit" className={classes.formBtn}>{submitText}</button>
            <footer className={classes.formFooter}>{footer}</footer>
        </form>
    );
}