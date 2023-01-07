import { ChangeEvent, FormEvent, InvalidEvent, useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { Header } from './components/Header'
import { NewTaskForm } from './components/NewTaskForm'
import { EmptyTaskList } from './components/EmptyTaskList'
import { Task, TaskDataProps } from './components/Task'
import { TaskCount } from './components/TaskCount'

import style from './App.module.css'
import './global.css'

export function App() {
  const tasksInLocalStorageFormatedInJSON = localStorage.getItem('tasks') ?? '[]'
  const tasksInLocalStorage: TaskDataProps[] = JSON.parse(tasksInLocalStorageFormatedInJSON)

  const [tasks, setTasks] = useState<TaskDataProps[]>(tasksInLocalStorage)
  const [taskTitle, setTaskTitle] = useState('')

  useEffect(() => {
    const tasksFormatedToJSON = JSON.stringify(tasks)

    localStorage.setItem('tasks', tasksFormatedToJSON)
  }, [tasks])

  function handleNewTaskTitleChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('')

    setTaskTitle(event.target.value)
  }

  function handleNewTaskTitleInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity('Informe o título da sua tarefa.')
  }

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault()

    const isNewTaskTitleNotEmpty = taskTitle.trim().length > 0

    if (isNewTaskTitleNotEmpty) {
      const newTask: TaskDataProps = {
        id: uuidv4(),
        title: taskTitle,
        isCompleted: false
      }
  
      setTasks([newTask, ...tasks])
  
      setTaskTitle('')
    }
  }

  function handleCompletedTaskChange(taskId: string) {
    const taskListWithOneTaskChanged = tasks.map(task => {
      if (task.id === taskId) {
        return {...task, isCompleted: !task.isCompleted}
      }

      return task
    })

    const taskListOrdenateByPropertyIsCompleted = taskListWithOneTaskChanged.sort((taskOne, taskTwo) => {
      if (taskOne.isCompleted && !taskTwo.isCompleted) {
        return 1
      }

      if (!taskOne.isCompleted && taskTwo.isCompleted) {
        return -1
      }

      return 0
    })

    setTasks(taskListOrdenateByPropertyIsCompleted)
  }

  function handleDeleteTask(taskId: string) {
    const taskListWithoutOneTask = tasks.filter(({ id }) => id !== taskId)

    setTasks(taskListWithoutOneTask)
  }

  const numberCreatedTasks = tasks.length
  
  const numberCompletedTasks = tasks.reduce((acc, task) => {
    return task.isCompleted ? acc + 1 : acc
  }, 0)

  return (
    <div>
      <Header />

      <main className={style.main}>
        <NewTaskForm 
          taskTitle={taskTitle}
          onSubmit={handleCreateNewTask}
          onChangeTaskTitle={handleNewTaskTitleChange}
          onInvalidTaskTitle={handleNewTaskTitleInvalid}
        />

        <div className={style.tasks}>
          <TaskCount 
            numberCreatedTasks={numberCreatedTasks} 
            numberCompletedTasks={numberCompletedTasks}
          />

          <div className={style.taskList}>
            {tasks.map(({ id, title, isCompleted }) => {
              return (
                <Task 
                  key={id}
                  id={id}
                  title={title}
                  isCompleted={isCompleted}
                  onChangeCompleteTask={handleCompletedTaskChange}
                  onDeleteTask={handleDeleteTask}
                />
              )
            })}

            {tasks.length === 0 && (
              <EmptyTaskList />
            )}
          </div>
        </div>
      </main>
    </div>
  )
}