import { useEffect, useState } from "react";
import Swal from 'sweetalert2'
import { Link } from "react-router-dom";
import { supabase } from "../supabase";


function Todo() {

  const [task, setTask] = useState("");
  const [list, setList] = useState([]);


  const addTask = async () => {
    if (task.trim() === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter a task."
      });
      return
    };

    const { data } = await supabase.auth.getUser();
    const user_id = data.user.id;

    try {
      const { error } = await supabase
        .from("user_todos")
        .insert({ user_id: user_id, text: task });

      if (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Added!",
          text: "Task added successfully",
          timer: 1500,
          showConfirmButton: false,
        });
        setTask("");
        getData();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message
      });
    }
  }

  const getData = async () => {
    const { data: userData } = await supabase.auth.getUser();
    const user_id = userData?.user?.id;

    try {
      const { data, error } = await supabase
        .from("user_todos")
        .select("*")
        .eq("user_id", user_id);

      if (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message
        });
      } else {
        setList(data);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message
      });
    }
  }


  useEffect(() => {
    getData();
  }, []);


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
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button className="add-btn" onClick={addTask}>+ Add task</button>
        </div>

        <div className="task-toolbar">
          <h2>Tasks <span>{list.length}</span></h2>

          <input
            className="search-input"
            type="text"
            placeholder="Search tasks..."
          />
        </div>

        <div className="task-list">

          {list.map((item) => {
            <div className="task-card" key={item.id}>
            <div className="task-checkbox"></div>

            <div className="task-content">
              <h3>{item.task}</h3>
              <span className="task-date">Task pending</span>
            </div>

            <div className="task-actions">
              <button title="Edit">✎</button>
              <button title="Delete">×</button>
            </div>
          </div>
          })}

          <div className="task-card">
            <div className="task-checkbox"></div>

            <div className="task-content">
              <h3>Build Todo App UI</h3>
              {/* <p>Create a clean and responsive interface</p> */}
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