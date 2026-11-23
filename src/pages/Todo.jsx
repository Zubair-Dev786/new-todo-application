import { useState } from "react";

function Todo() {

  const [task, setTask] = useState("");

  const 
  return (
    <div className="todo-page">
      <main className="todo-container">

        <div className="todo-brand">
          <div className="brand-icon">✓</div>
          <span>Taskly</span>
        </div>

        <div className="todo-heading">
          <div>
            <span className="eyebrow">YOUR WORKSPACE</span>
            <h1>My Tasks</h1>
            <p>Stay focused and get things done.</p>
          </div>
        </div>

        <div className="task-input-card">
          <input
            type="text"
            placeholder="What needs to be done?"
          />
          <button className="add-btn">+ Add task</button>
        </div>

        <div className="task-toolbar">
          <h2>Tasks <span>04</span></h2>

          <input
            className="search-input"
            type="text"
            placeholder="Search tasks..."
          />
        </div>

        <div className="task-list">

          <div className="task-card">
            <div className="task-checkbox"></div>

            <div className="task-content">
              <h3>Complete React practice</h3>
              <p>Practice components and props</p>
              <span className="task-date">Task pending</span>
            </div>

            <div className="task-actions">
              <button title="Edit">✎</button>
              <button title="Delete">×</button>
            </div>
          </div>

          <div className="task-card">
            <div className="task-checkbox"></div>

            <div className="task-content">
              <h3>Build Todo App UI</h3>
              <p>Create a clean and responsive interface</p>
              <span className="task-date">Task pending</span>
            </div>

            <div className="task-actions">
              <button title="Edit">✎</button>
              <button title="Delete">×</button>
            </div>
          </div>

          <div className="task-card">
            <div className="task-checkbox"></div>

            <div className="task-content">
              <h3>Read JavaScript documentation</h3>
              <p>Review array methods and objects</p>
              <span className="task-date">Task pending</span>
            </div>

            <div className="task-actions">
              <button title="Edit">✎</button>
              <button title="Delete">×</button>
            </div>
          </div>

          <div className="task-card completed-task">
            <div className="task-checkbox checked">✓</div>

            <div className="task-content">
              <h3>Update GitHub repository</h3>
              <p>Push latest project changes</p>
              <span className="task-date">Task completed</span>
            </div>

            <div className="task-actions">
              <button title="Edit">✎</button>
              <button title="Delete">×</button>
            </div>
          </div>

        </div>

        <div className="todo-bottom">
          Made for a more productive day.
        </div>

      </main>
    </div>
  );
}

export default Todo;