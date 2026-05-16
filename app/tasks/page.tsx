import { PrismaClient } from "../generated/prisma/client";

const prisma = new PrismaClient();

export default async function TasksPage() {
  const tasks = await prisma.task.findMany({
    orderBy: { createdAt: "desc" },
  });
}