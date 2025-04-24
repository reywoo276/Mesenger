import React, { useState } from "react";

function SignUp() {
    const [form, setForm] = useState({ username: "", email: "", password: "" });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("/auth/sign-up", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await res.json();
            if (res.ok) {
                alert("✅ Успешная регистрация! JWT: " + data.token);
            } else {
                alert("❌ Ошибка: " + data.message);
            }
        } catch (err) {
            alert("❌ Сервер не отвечает.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Регистрация</h2>
            <input name="username" placeholder="Username" onChange={handleChange} required /><br />
            <input name="email" type="email" placeholder="Email" onChange={handleChange} required /><br />
            <input name="password" type="password" placeholder="Password" onChange={handleChange} required /><br />
            <button type="submit">Зарегистрироваться</button>
        </form>
    );
}

export default SignUp;
