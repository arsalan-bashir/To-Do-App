import React, { useState } from 'react'

export default function Home() {

  const [taskname, setTaskName] = useState('')
  const [tasklist, setTaskList] = useState({ todo: [], ongoing: [], completed: [] })

  const handleInputChange = (event) => {
    setTaskName(event.target.value)
  }


  const addTask = () => {
    if (taskname.trim() !== '') {
      setTaskList((prevTaskList) => ({
        ...prevTaskList,
        todo: [...prevTaskList.todo, taskname]
      }));
      setTaskName('');
    }
  };

  // Move task to another category
  const moveTask = (currentCategory, targetCategory, taskName) => {
    setTaskList((prevTaskList) => {

      // Remove task from current category
      const updatedCurrent = prevTaskList[currentCategory].filter(
        (task) => task !== taskName
      );

      // Add task to target category
      const updatedTarget = [...prevTaskList[targetCategory], taskName];
      return {...prevTaskList, [currentCategory]: updatedCurrent, [targetCategory]: updatedTarget};
    });
  };

  // Delete task from a category
  const deleteTask = (category, taskName) => {
    setTaskList((prevTaskList) => ({
      ...prevTaskList,
      [category]: prevTaskList[category].filter((task) => task !== taskName)
    }));
  }

  return (
    <>
      <div className="home">
        <form className="task-form" 
        onSubmit = {(event) => {
            event.preventDefault();
            addTask();
        }} 
        >
          <input type="text" 
            placeholder="Enter task..." 
            className="task-input" 
            value={taskname} 
            onChange={handleInputChange} 
            />

          <button type="submit" 
            className="add-task-button" 
            onClick={addTask}>
              ADD TASK
          </button>
        </form>

        <div className="task-sections">
          <div className="task-section">
            <h2>To-Do Tasks</h2>
            <ul className="task-list to-list">
              {tasklist.todo.map((task, index) => (
                <li key={index}>
                  {task}
                <span>
                  <button onClick={() => moveTask('todo', 'ongoing', task)}>
                    Start
                  </button>
                  <button onClick={() => moveTask('todo', 'completed', task)}>
                    Done
                  </button>
                  <button onClick={() => deleteTask('todo', task)}>
                      Delete
                    </button>
                </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="task-section">
            <h2>Ongoing Tasks</h2>
            <ul className="task-list on-list">
              {tasklist.ongoing.map((task, index) => (
                <li key={index}>
                  {task}
                  <span>
                    <button onClick={() => moveTask('ongoing', 'todo', task)}>
                      To Do
                    </button>
                    <button onClick={() => moveTask('ongoing', 'completed', task)}>
                      Done
                    </button>
                    <button onClick={() => moveTask('ongoing', task)}>
                      Delete
                    </button>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="task-section">
            <h2>Completed Tasks</h2>
            <ul className="task-list done-list">
              {tasklist.completed.map((task, index) => (
                <li key={index}>
                  {task}
                  <span>
                    <button onClick={() => moveTask('completed', 'todo', task)}>
                      To Do
                    </button>
                    <button onClick={() => moveTask('completed', 'ongoing', task)}>
                      Ongoing
                    </button>
                    <button onClick={() => moveTask('completed', task)}>
                      Delete
                    </button>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
    </div>
    </>
  )
}
