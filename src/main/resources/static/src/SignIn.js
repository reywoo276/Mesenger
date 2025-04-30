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
                alert("✅ Успішний вхід! JWT: " + data.token);
                window.location.href = "/"; // зміни при потребі на index.html
            } else {
                alert("❌ Помилка: " + (data.message || "Невідома помилка"));
            }
        } catch (err) {
            alert("❌ Сервер не відповідає або сталася помилка: " + err.message);
            console.error("❌ Помилка під час fetch:", err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Вхід</h2>
            <input
                name="email"
                type="email"
                placeholder="Email"
                onChange={handleChange}
                required
            /><br />
            <input
                name="password"
                type="password"
                placeholder="Пароль"
                onChange={handleChange}
                required
            /><br />
            <button type="submit">Увійти</button>
        </form>
    );
}

export default SignIn;
