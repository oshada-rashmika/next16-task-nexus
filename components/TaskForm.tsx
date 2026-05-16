"use client";

import { createTask } from "../app/actions/tasks";
import { useState } from "react";

export default function TaskForm() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim()) {
            alert("Title is required.");
            return;
        }

        await createTask({ title, description });
        setTitle("");
        setDescription("");
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <div>
                <label style={{ display: "block", fontSize: "12px" }}>TASK TITLE</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{ width: "100%", padding: "8px", background: "#111", color: "#fff", border: "1px solid #333" }}
                />
            </div>

            <div>
                <label style={{ display: "block", fontSize: "12px" }}>DESCRIPTION</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    style={{ width: "100%", padding: "8px", background: "#111", color: "#fff", border: "1px solid #333", height: "60px" }}
                />
            </div>

            <button type="submit" style={{ padding: "10px", background: "#fff", color: "#000", fontWeight: "bold", cursor: "pointer" }}>
                CREATE TASK
            </button>
        </form>
    )
}