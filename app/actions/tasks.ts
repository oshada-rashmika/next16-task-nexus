'use server';

import { PrismaClient, Status } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { revalidatePath } from "next/cache";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

interface ActionResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
}

export async function createTask(formData:{
    title: string;
    description?: string;
    status?: Status;
}): Promise<ActionResponse> {

    try {
        if (!formData.title || formData.title.trim() === "") {
            return { success: false, error: "Title is required." };
        }

        const task = await prisma.task.create({
            data: {
                title: formData.title,
                description: formData.description || "",
                status: formData.status || Status.TODO,
            }
        });

        revalidatePath("/tasks");
        return { success: true, data: task };
    } catch (error) {
        console.error("Error creating task:", error);
        return { success: false, error: "Failed to create task." };
    }
}

export async function updatedTaskStatus(
    id: string,
    newStatus: Status
): Promise<ActionResponse> {
    try {
        if (!id) return { success: false, error: "Task ID is required." };

        const updatedTask = await prisma.task.update({
            where: { id },
            data: { status: newStatus },
        });

        revalidatePath("/tasks");
        return { success: true, data: updatedTask };
    } catch (error) {
        console.error("Error updating task status:", error);
        return { success: false, error: "Failed to update task status." };
    }
}