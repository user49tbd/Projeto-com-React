import styles from './css/buttonSubmit.module.css'

function ButtonSubmitC({text}){
    return (
        <div className={styles.form_control}>
            <button className={styles.btn}>{text}</button>
        </div>
    )
}
export default ButtonSubmitC