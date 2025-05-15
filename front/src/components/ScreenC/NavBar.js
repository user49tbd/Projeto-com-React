import styles from './css/NavBar.module.css'
import { Link } from 'react-router-dom'
import { show$,showS$ } from '../../Observables/obsShow'
import { useNavigate } from 'react-router-dom'
export default function NavBar() {
    let nav = useNavigate()
    function logout() {
        console.log("logout ")
        localStorage.setItem("usrImg", "")
        localStorage.setItem("usrName", "")
        localStorage.setItem("type", "")
        nav("/")
    }
    function LoadL(){
        show$.next(!show$.getValue());
    }
    function LoadS(){
        showS$.next(!showS$.getValue());
    }
    function navMain(){
        nav("/")
    }
    return (
        <div className={styles.Container}>
            <div className={styles.navL}>
                <div className={styles.mainSH} onClick={navMain}><img src='/assets/icons/hospital.png' /><p>Agilidade na Saúde</p></div>
                <ul>
                    {
                        localStorage.getItem("usrName")&& <li><Link to="/services">Services</Link></li>
                    }
                    <li><Link to="/info">Info</Link></li>
                    {
                        localStorage.getItem("usrName")&& <li><Link to="/que">Queue</Link></li>
                    }
                    {
                        localStorage.getItem("usrName") ? <li onClick={logout}>logout</li> : <li onClick={LoadL}>Login</li>
                    }
                    {
                        localStorage.getItem("usrName")&& <li><Link to='/update'>Editar</Link></li>
                    }
                    {
                        localStorage.getItem("usrName") && localStorage.getItem("type") == 'admin' && <li><Link to='/servicedit'>Editar Servico</Link></li>
                    }
                    
                </ul>
            </div>
            <div className={styles.usrInfo}>
                {localStorage.getItem("usrImg") ? <img className={styles.usrImg}
                    src={`${localStorage.getItem("usrImg")}`}
                    alt='Icon'></img> : null}
                {localStorage.getItem("usrName") ? <p>{localStorage.getItem("usrName")}</p> : null}
            </div>
        </div>
    )
}