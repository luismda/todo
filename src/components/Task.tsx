import { Trash } from 'phosphor-react'

import style from './Task.module.css'

export interface TaskDataProps {
    id: string;
    title: string;
    isCompleted: boolean;
}

interface TaskProps extends TaskDataProps {
    onChangeCompleteTask: (taskId: string) => void;
    onDeleteTask: (taskId: string) => void;
}

export function Task({ id, title, isCompleted, onChangeCompleteTask, onDeleteTask }: TaskProps) {
    return (
        <article className={`${style.task} ${isCompleted ? style.completeTask : ''}`}>
            <div className={style.checkboxRoot}>
                <input 
                    type="checkbox" 
                    aria-label="Concluir tarefa"
                    id={id}  
                    checked={isCompleted}
                    onChange={() => onChangeCompleteTask(id)}
                />
                <label htmlFor={id} />
            </div>

            <p>{title}</p>
        
            <button 
                className={style.deleteTaskButton} 
                aria-label="Deletar tarefa"
                onClick={() => onDeleteTask(id)}
            >
                <Trash size={20} />
            </button>
        </article>
    )
}