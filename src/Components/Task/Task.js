export default function Task({ task, index, completeTask, removeTask }) {
  return (
    <div
      className="task"
      style={{ textDecoration: task.completed ? "line-through" : "" }}
    >
      {task.title}
      <button style={{ background: "red" }} onClick={() => removeTask(index)}>
        <box-icon name="trash"></box-icon>
      </button>
      <button
        style={{ background: "green" }}
        onClick={() => completeTask(index)}
      >
        <box-icon name="check-double"></box-icon>
      </button>
    </div>
  );
}
