import React, { useState } from "react";
import { useNavigate } from "react-router";


export default function Add() {
    const [form, setForm] = useState({
        username: "",
        password: "",
    });
    const navigate = useNavigate();
    
    // These methods will update the state properties.
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }
    
    // This function will handle the submission.
    async function onSubmit(e) {
        e.preventDefault();
        console.log("in onsubmit\n");
        
        
        // When a post request is sent to the create url, we'll add a new record to the database.
        const newUser = { ...form };
        console.log(newUser);
        await fetch("http://localhost:3001/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
        })
            .catch(error => {
                window.alert(error);
                return;
            });
        
        setForm({ username: "", password: "" });
        navigate("/add");
    } 
    // This following section will display the form that takes the input from the user.
    return (
            <div>
            <h3>Create New Record</h3>
            <form onSubmit={onSubmit}>
            <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
        type="text"
        className="form-control"
        id="username"
        value={form.username}
        onChange={(e) => updateForm({ username: e.target.value })}
            />
            </div>
            <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
        type="text"
        className="form-control"
        id="password"
        value={form.password}
        onChange={(e) => updateForm({ password: e.target.value })}
            />
            </div>

            <div className="form-group">
            <input
        type="submit"
        value="Create person"
        className="btn btn-primary"
            />
            </div>
            </form>
            </div>
    );
}
