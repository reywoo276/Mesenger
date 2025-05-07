import React, { useState } from "react";

function SignIn() {
    const [form, setForm] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("📤 Надсилаємо запит на /auth/sign-in з даними:", form);

        try {
            const res = await fetch("/auth/sign-in", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            console.log("📥 Відповідь статус:", res.status);
            const text = await res.text();
            console.log("📥 Сировий текст відповіді:", text);

            let data;
            try {
                data = JSON.parse(text);
                console.log("✅ Розпарсена відповідь:", data);
            } catch {
                console.error("❌ Неможливо розпарсити JSON. Відповідь:", text);
                throw new Error("Сервер повернув не JSON");
            }

            if (res.ok) {
                // Сохраняем токен в cookie на 7 дней
                document.cookie = `token=${data.token}; path=/; max-age=${7 * 24 * 60 * 60}; Secure; SameSite=Strict`;

                alert("✅ Успішний вхід!");
                window.location.href = "/chat";
            } else {
                alert("❌ Помилка: " + (data.message || "Невідома помилка"));
            }
        } catch (err) {
            alert("❌ Сервер не відповідає або сталася помилка: " + err.message);
            console.error("❌ Помилка під час fetch:", err);
        }
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <h2 style={styles.title}>Вхід</h2>
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
                    Увійти
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

export default SignIn;