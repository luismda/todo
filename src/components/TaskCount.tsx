import style from './TaskCount.module.css'

interface TaskCountProps {
  numberCreatedTasks: number;
  numberCompletedTasks: number;
}

export function TaskCount({ numberCreatedTasks, numberCompletedTasks }: TaskCountProps) {
    return (
        <div className={style.taskCount}>
            <strong className={style.createdTasks}>
              Tarefas criadas
              <span>{numberCreatedTasks}</span>
            </strong>

            <strong className={style.completedTasks}>
              Concluídas

              {numberCreatedTasks > 0 ? (
                <span>{numberCompletedTasks} de {numberCreatedTasks}</span>
              ) : (
                <span>0</span>
              )}
            </strong>
        </div>
    )
}