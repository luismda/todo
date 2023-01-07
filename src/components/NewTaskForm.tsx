import { FormEvent, ChangeEvent, InvalidEvent } from 'react'

import { PlusCircle } from 'phosphor-react'

import style from './NewTaskForm.module.css'

interface NewTaskFormProps {
  taskTitle: string;
  onSubmit: (event: FormEvent) => void;
  onChangeTaskTitle: (event: ChangeEvent<HTMLInputElement>) => void;
  onInvalidTaskTitle: (event: InvalidEvent<HTMLInputElement>) => void;
}

export function NewTaskForm({ taskTitle, onChangeTaskTitle, onSubmit, onInvalidTaskTitle }: NewTaskFormProps) {
  const isNewTaskTitleEmpty = taskTitle.trim().length === 0

  return (
    <form onSubmit={onSubmit} className={style.newTaskForm}>
      <input
        type="text"
        placeholder="Adicione uma nova tarefa"
        aria-label="Título da nova tarefa"
        value={taskTitle}
        onChange={onChangeTaskTitle}
        onInvalid={onInvalidTaskTitle}
        required
      />

      <button 
        type="submit" 
        disabled={isNewTaskTitleEmpty}
      >
        Criar
        <PlusCircle size={16} weight="bold" />
      </button>
    </form>
  )
}