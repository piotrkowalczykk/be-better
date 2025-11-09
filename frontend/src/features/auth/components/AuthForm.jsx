export const AuthForm = ({ onSubmit, title, fields, submitText, footer }) => {
    return (
        <form onSubmit={onSubmit}>
            <h2>{title}</h2>
            {fields.map(({label, name, type, value, onChange, placeholder}) => (
                <div key={name}>
                    <label htmlFor={name}>{label}</label>
                    <input 
                    type={type}
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    />
                </div>
            ))}
            <button type="submit">{submitText}</button>
            <footer>{footer}</footer>
        </form>
    );
}