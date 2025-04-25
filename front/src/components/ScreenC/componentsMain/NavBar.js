import styles from './css/NavBar.module.css'
import { Link, useNavigate } from 'react-router-dom'
export default function NavBar() {
    const nav = useNavigate()
    let val = '/'
    function navf() {
        nav(val)
    }
    function logout() {
        localStorage.setItem("usrImg", "")
        localStorage.setItem("usrName", "")
        localStorage.setItem("type", "")
    }
    return (
        <div className={styles.Container}>
            <div className={styles.navL}>
                <p>Agilidade na Saúde</p>
                <ul>
                    <li><Link to='/'>home</Link></li>
                    <li>
                        {
                            localStorage.getItem("usrName") ? <Link onClick={logout} to='/'>logout</Link> : <Link to='login'>login</Link>
                        }
                    </li>
                        {
                            localStorage.getItem("usrName")&& <li><Link to='edit'>Editar</Link></li>
                        }
                    <li><Link to='signUp'>signUp</Link></li>
                    <li><Link to='info'>Info</Link></li>
                    <li><Link to='contact'>Contato</Link></li>
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