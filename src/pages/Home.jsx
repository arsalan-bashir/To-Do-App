import React, { useEffect, useState } from 'react'

export default function Home() {

  var [taskname, setTaskName] = useState('')
  const [tasklist, setTaskList] = useState(() => {
    // Load initial state from localStorage, or use default structure if no data exists
    const savedTaskList = localStorage.getItem('tasklist');
    return savedTaskList
      ? JSON.parse(savedTaskList)
      : { todo: [], ongoing: [], completed: [] };
  });

  // Save task list to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('tasklist', JSON.stringify(tasklist));
  }, [tasklist]);
  const handleInputChange = (event) => {
    setTaskName(event.target.value)
  }


  const addTask = () => {
    if (taskname.trim() !== '') {
        taskname = taskname.charAt(0).toUpperCase() + taskname.slice(1);
        setTaskList((prevTaskList) => {
          
        // Check if the task exists in any list (case-insensitive)
        const taskExists = 
        prevTaskList.todo.some(task => task.toLowerCase() === taskname.toLowerCase()) ||
        prevTaskList.ongoing.some(task => task.toLowerCase() === taskname.toLowerCase()) ||
        prevTaskList.completed.some(task => task.toLowerCase() === taskname.toLowerCase());

        if (taskExists) {
          alert('Task already exists!');
          return prevTaskList; 
        }
          return {
          ...prevTaskList,
          todo: [...prevTaskList.todo, taskname]
        };
      });
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
    setTaskList((prevTaskList) => {
      const updatedCurrent = prevTaskList[category].filter(
        (task) => task !== taskName
      );
      return {...prevTaskList, [category]: updatedCurrent};
    });
  }

  // Clear all tasks from a category
  const clearTasks = (category, tasks) => {
    setTaskList((prevTaskList) => {
      return {...prevTaskList, [category]: []};
    });
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
                  <button 
                  className='clear-button'
                  onClick={() => moveTask('todo', 'ongoing', task)}>
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
              {tasklist.todo.length !== 0 && 
              <button onClick={() => clearTasks('todo', tasklist.todo)}>
                Clear All
                </button>}
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
                    <button onClick={() => deleteTask('ongoing', task)}>
                      Delete
                    </button>
                  </span>
                </li>
              ))}
            </ul>
            {tasklist.ongoing.length !== 0 && 
            <button 
              className='clear-button'
              onClick={() => clearTasks('ongoing', tasklist.ongoing)}>
              Clear All
              </button>}
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
                    <button onClick={() => deleteTask('completed', task)}>
                      Delete
                    </button>
                  </span>
                </li>
              ))}
            </ul>
            {tasklist.completed.length !== 0 && 
            <button 
              className="clear-button"
              onClick={() => clearTasks('completed', tasklist.completed)}>
              Clear All
              </button>}
          </div>
        </div>
    </div>
    </>
  )
}
