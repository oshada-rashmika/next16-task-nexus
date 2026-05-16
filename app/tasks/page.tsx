import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export default async function TasksPage() {
  const tasks = await prisma.task.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px", fontFamily: "monospace" }}>
      <h1>COUNCIL TASKS</h1>
      <div style={{ border: "1px dashed #444", padding: "10px", marginBottom: "20px" }}>
        [Task Form Will Go Here]
      </div>

      <h2>ACTIVE RECORDS ({tasks.length})</h2>

      {tasks.length === 0 ? (
        <p>No tasks found. Create a new task to get started!</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {tasks.map((task) => (
            <li key={task.id} style={{ borderBottom: "1px solid #ccc", padding: "10px 0" }}>
              <strong>{task.title}</strong> - {task.status}
              <br />
              <small>{new Date(task.createdAt).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}