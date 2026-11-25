
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";

function Todo() {
  const [task, setTask] = useState("");
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Fetch tasks
  const getData = async (user_id) => {
    try {
      const { data, error } = await supabase
        .from("user_todos")
        .select("*")
        .eq("user_id", user_id)
        .order("id", { ascending: false });

      if (error) throw error;

      setList(data);
    } catch (error) {
      Swal.fire("Oops...", error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  // Authentication check
  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();

        console.log("Logged-in user:", data?.user);
        console.log("Authentication error:", error);

        if (error || !data.user) {
          navigate("/login", { replace: true });
          setLoading(false);
          return;
        }

        await getData(data.user.id);
      } catch (error) {
        console.log(error);
        navigate("/login", { replace: true });
        setLoading(false);
      }
    };

    checkUser();
  }, [navigate]);

  // Add task
  const addTask = async () => {
    if (task.trim() === "") {
      Swal.fire("Oops...", "Please enter a task.", "error");
      return;
    }

    try {
      const { data, error: userError } = await supabase.auth.getUser();

      if (userError || !data.user) {
        navigate("/login", { replace: true });
        return;
      }

      const { error } = await supabase
        .from("user_todos")
        .insert({
          user_id: data.user.id,
          text: task.trim()
        });

      if (error) throw error;

      setTask("");
      await getData(data.user.id);

      Swal.fire({
        icon: "success",
        title: "Added!",
        text: "Task added successfully.",
        timer: 1500,
        showConfirmButton: false
      });
    } catch (error) {
      Swal.fire("Oops...", error.message, "error");
    }
  };

  // Edit task
  const editTask = async (item) => {
    const result = await Swal.fire({
      title: "Edit Task",
      input: "text",
      inputValue: item.text,
      inputPlaceholder: "Enter your task",
      showCancelButton: true,
      confirmButtonText: "Save",
      inputValidator: (value) => {
        if (!value.trim()) {
          return "Task cannot be empty!";
        }
      }
    });

    if (!result.isConfirmed) return;

    try {
      const { data, error: userError } = await supabase.auth.getUser();

      if (userError || !data.user) {
        navigate("/login", { replace: true });
        return;
      }

      const { error } = await supabase
        .from("user_todos")
        .update({ text: result.value.trim() })
        .eq("id", item.id)
        .eq("user_id", data.user.id);

      if (error) throw error;

      await getData(data.user.id);

      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Task updated successfully.",
        timer: 1500,
        showConfirmButton: false
      });
    } catch (error) {
      Swal.fire("Oops...", error.message, "error");
    }
  };

  // Delete task
  const deleteTask = async (item) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This task will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel"
    });

    if (!result.isConfirmed) return;

    try {
      const { data, error: userError } = await supabase.auth.getUser();

      if (userError || !data.user) {
        navigate("/login", { replace: true });
        return;
      }

      const { error } = await supabase
        .from("user_todos")
        .delete()
        .eq("id", item.id)
        .eq("user_id", data.user.id);

      if (error) throw error;

      await getData(data.user.id);

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Task deleted successfully.",
        timer: 1500,
        showConfirmButton: false
      });
    } catch (error) {
      Swal.fire("Oops...", error.message, "error");
    }
  };

  return (
    <div className="todo-page">
      <main className="todo-container">

        <div className="todo-brand">
          <div className="brand-icon">✓</div>
          <span>Taskly</span>
        </div>

        <div className="todo-heading">
          <span className="eyebrow">YOUR WORKSPACE</span>
          <h1>My Tasks</h1>
          <p>Stay focused and get things done.</p>
        </div>

        <div className="task-input-card">
          <input
            type="text"
            placeholder="What needs to be done?"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addTask();
            }}
          />

          <button className="add-btn" onClick={addTask}>
            + Add task
          </button>
        </div>

        <div className="task-toolbar">
          <h2>
            Your Tasks <span>{list.length}</span>
          </h2>
        </div>

        <div className="task-list">
          {loading ? (
            <p className="empty-message">Loading tasks...</p>
          ) : list.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">✦</div>
              <h3>No tasks yet</h3>
              <p>Add your first task and get started!</p>
            </div>
          ) : (
            list.map((item) => (
              <div className="task-card" key={item.id}>
                <div className="task-content">
                  <h3>{item.text}</h3>
                  <span className="task-date">Your task</span>
                </div>

                <div className="task-actions">
                  <button
                    className="edit-btn"
                    title="Edit"
                    onClick={() => editTask(item)}
                  >
                    ✎
                  </button>

                  <button
                    className="delete-btn"
                    title="Delete"
                    onClick={() => deleteTask(item)}
                  >
                    ×
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="todo-bottom">
          Made for a more productive day.
        </div>

      </main>
    </div>
  );
}

export default Todo;
