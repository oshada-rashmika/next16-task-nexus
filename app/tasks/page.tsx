import { PrismaClient } from "../generated/prisma/client";

const prisma = new PrismaClient();

export default async function TasksPage() {
  const tasks = await prisma.task.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px", fontFamily: "monospace" }}>
      <h1>COUNCIL TASKS</h1>
      <div style={{ border: "1px dashed #444", padding: "10px", marginBottom: "20px" }}>
        
      </div>
    </div>
  );
}