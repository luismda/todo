import style from './Header.module.css'

import todoLogo from '../assets/todo_logo.svg'

export function Header() {
    return (
        <header className={style.header}>
            <img 
                src={todoLogo} 
                alt="Logomarca do ToDo com um foguete no lado esquerdo" 
            />
        </header>
    )
}