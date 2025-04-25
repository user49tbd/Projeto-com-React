import styles from './css/Input.module.css'

function InputC({type,text,name,placeholder,handleOnChange,value,HonBlur}){
    return (
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}</label>
            <input 
                type={type} 
                name={name} 
                id={name} 
                placeholder={placeholder} 
                onInput={handleOnChange}
                value={value}
                onBlur={HonBlur}
            />
        </div>
    )
}
export default InputC