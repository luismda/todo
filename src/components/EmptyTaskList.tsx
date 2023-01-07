import style from './EmptyTaskList.module.css'

import clipboard from '../assets/clipboard.svg'

export function EmptyTaskList() {
    return (
        <div className={style.emptyTaskList}>
            <img 
                src={clipboard}
                alt="Ícone de uma prancheta"
            />

            <strong>Você ainda não tem tarefas cadastradas</strong>
            <span>Crie tarefas e organize seus itens a fazer</span>
        </div>
    )
}