import React, { useState } from "react";

function SignUp() {
    const [form, setForm] = useState({ username: "", email: "", password: "" });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("auth/sign-up", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await res.json();
            if (res.ok) {
                // Сохраняем токен в cookie
                document.cookie = `token=${data.token}; path=/; max-age=${7 * 24 * 60 * 60}; Secure; SameSite=Strict`;

                alert("✅ Успішна реєстрація!");
                window.location.href = "/";
            }
            else {
                alert("❌ Помилка: " + data.message);
            }
        } catch (err) {
            alert("❌ Сервер не відповідає.");
        }
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <h2 style={styles.title}>Реєстрація</h2>

                <input
                    style={styles.input}
                    name="username"
                    placeholder="Нікнейм"
                    value={form.username}
                    onChange={handleChange}
                    required
                />

                <input
                    style={styles.input}
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />

                <input
                    style={styles.input}
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    value={form.password}
                    onChange={handleChange}
                    required
                />

                <button type="submit" style={styles.button}>
                    Зареєструватися
                </button>
            </form>
        </div>
    );
}

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #74ebd5, #9face6)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    form: {
        backgroundColor: "rgba(255, 255, 255, 0.85)",
        padding: "2rem",
        borderRadius: "12px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
        display: "flex",
        flexDirection: "column",
        width: "320px",
        backdropFilter: "blur(10px)",
    },
    title: {
        textAlign: "center",
        marginBottom: "1.5rem",
        fontSize: "1.5rem",
        color: "#333",
    },
    input: {
        marginBottom: "1rem",
        padding: "0.75rem",
        fontSize: "1rem",
        borderRadius: "6px",
        border: "1px solid #ccc",
    },
    button: {
        padding: "0.75rem",
        fontSize: "1rem",
        backgroundColor: "#5b73e8",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        transition: "background-color 0.3s",
    },
};

export default SignUp;