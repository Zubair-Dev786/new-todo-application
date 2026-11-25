import { jsPDF } from "jspdf";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";

function Todo() {
  const [task, setTask] = useState("");
  const [list, setList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [buttonLoader, setButtonLoader] = useState(false);

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
    }
  };

  // Authentication check
  useEffect(() => {
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error || !data.session) {
        navigate("/login", { replace: true });
        return;
      }

      getData(data.session.user.id);
    };

    checkUser();
  }, [navigate]);

  // Add or Update task
  const addTask = async () => {
    if (task.trim() === "") {
      Swal.fire("Oops...", "Please enter a task.", "error");
      return;
    }

    try {
      const { data, error: userError } = await supabase.auth.getSession();

      if (userError || !data.session) {
        navigate("/login", { replace: true });
        return;
      }

      const user_id = data.session.user.id;

      setButtonLoader(true);

      if (editingId === null) {
        setButtonLoader(true);
        const { error } = await supabase
          .from("user_todos")
          .insert({
            user_id: user_id,
            text: task.trim()
          });

        if (error) throw error;

        Swal.fire({
          icon: "success",
          title: "Task Added!",
          text: "Your task has been added successfully.",
          timer: 1500,
          showConfirmButton: false
        });

      } else {
        // Update task
        const { error } = await supabase
          .from("user_todos")
          .update({ text: task.trim() })
          .eq("id", editingId)
          .eq("user_id", user_id);

        if (error) throw error;

        Swal.fire({
          icon: "success",
          title: "Changes Saved!",
          text: "Your task has been updated successfully.",
          timer: 1500,
          showConfirmButton: false
        });
      }

      setTask("");
      setButtonLoader(false);
      setEditingId(null);

      getData(user_id);

    } catch (error) {
      setButtonLoader(true);
      Swal.fire("Oops...", error.message, "error");
    }
  };

  // Edit task
  const editTask = (item) => {
    setTask(item.text);
    setEditingId(item.id);
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
      const { data, error: userError } = await supabase.auth.getSession();

      if (userError || !data.session) {
        navigate("/login", { replace: true });
        return;
      }

      const { error } = await supabase
        .from("user_todos")
        .delete()
        .eq("id", item.id)
        .eq("user_id", data.session.user.id);

      if (error) throw error;

      getData(data.session.user.id);

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


  // Delete All Tasks
  const deleteAllTasks = async () => {
    if (list.length === 0) {
      Swal.fire("No Tasks", "There are no tasks to delete.", "info");
      return;
    }

    const result = await Swal.fire({
      title: "Delete All Tasks?",
      text: "All your tasks will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete all",
      cancelButtonText: "Cancel"
    });

    if (!result.isConfirmed) return;

    try {
      const { data, error: userError } = await supabase.auth.getSession();

      if (userError || !data.session) {
        navigate("/login", { replace: true });
        return;
      }

      const { error } = await supabase
        .from("user_todos")
        .delete()
        .eq("user_id", data.session.user.id);

      if (error) throw error;

      setList([]);
      setTask("");
      setEditingId(null);

      Swal.fire("Deleted!", "All tasks have been deleted.", "success");

    } catch (error) {
      Swal.fire("Oops...", error.message, "error");
    }
  };

  const downloadPDF = () => {

    if (list.length === 0) {
      Swal.fire("No Tasks", "There are no tasks to download.", "info");
      return;
    }

    // Create PDF
    const doc = new jsPDF();

    // PDF Heading
    doc.setFontSize(20);
    doc.text("Taskly - My Tasks", 20, 20);

    // Task list
    doc.setFontSize(12);

    let y = 40;

    list.forEach((item, index) => {
      const taskText = doc.splitTextToSize(
        `${index + 1}. ${item.text}`,
        170
      );

      doc.text(taskText, 20, y);
      y = y + 10;
    });

    // Download PDF
    doc.save("My-Tasks.pdf");

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

          <button className="add-btn" onClick={addTask} disabled={buttonLoader}>
            {buttonLoader
              ? "Adding..."
              : editingId === null
                ? "+ Add Task"
                : "Save Changes"}
          </button>

          {editingId !== null && (
            <button
              onClick={() => {
                setTask("");
                setEditingId(null);
              }}
            >
              Cancel
            </button>
          )}
        </div>

        <div className="task-toolbar">
          <h2>
            Your Tasks <span>{list.length}</span>
          </h2>
        </div>

        <div className="task-list">
          {list.length === 0 ? (
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

        <div className="task-buttons">
          <button onClick={downloadPDF}>
            Download PDF
          </button>

          <button onClick={deleteAllTasks}>
            Delete All
          </button>
        </div>

        <div className="todo-bottom">
          Made for a more productive day.
        </div>

      </main>
    </div>
  );
}

export default Todo;
