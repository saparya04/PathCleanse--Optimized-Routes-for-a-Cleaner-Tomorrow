// import { useParams, useNavigate } from 'react-router-dom';
// import { useState } from 'react';
// import axios from 'axios';

// export default function SignupForm() {
//   const { role } = useParams();
//   const [form, setForm] = useState({});
//   const navigate = useNavigate();

//   const fields = {
//     admin: ['name', 'teacherId', 'password'],
//     teacher: ['name', 'subject', 'teacherId', 'password'],
//     parent: ['name', 'studentId', 'address', 'phone', 'password'],
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post(`http://localhost:5000/api/auth/signup/${role}`, form);

//       alert(`${role} signup successful! Please login.`);
//       navigate(`/login/${role}`);

//     } catch (err) {
//       if (err.response && err.response.data && err.response.data.error === 'No such student') {
//         alert('No such student');
//         navigate('/signup/parent');  // Redirect back to parent signup page
//       } else {
//         alert(err.response?.data?.error || 'Signup failed');
//       }
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>{role.toUpperCase()} Sign Up</h2>
//       {fields[role].map((f) => (
//         <input
//           key={f}
//           placeholder={f}
//           onChange={(e) => setForm({ ...form, [f]: e.target.value })}
//           required
//         />
//       ))}
//       <button type="submit">Sign Up</button>
//     </form>
//   );
// }

import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

// Utility function cn for joining class names
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

// Card components with correct JSX (no self-closing divs with children)

function Card({ className, children, ...props }) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function CardHeader({ className, children, ...props }) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function CardTitle({ className, children, ...props }) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    >
      {children}
    </div>
  );
}

function CardDescription({ className, children, ...props }) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    >
      {children}
    </div>
  );
}

function CardAction({ className, children, ...props }) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function CardContent({ className, children, ...props }) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    >
      {children}
    </div>
  );
}

function CardFooter({ className, children, ...props }) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    >
      {children}
    </div>
  );
}

// SignupForm component using the Card components

export default function SignupForm() {
  const { role } = useParams();
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const fields = {
    admin: ["name", "teacherId", "password"],
    teacher: ["name", "subject", "teacherId", "password"],
    parent: ["name", "studentId", "address", "phone", "password"],
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`http://localhost:5000/api/auth/signup/${role}`, form);

      alert(`${role} signup successful! Please login.`);
      navigate(`/login/${role}`);
    } catch (err) {
      if (
        err.response &&
        err.response.data &&
        err.response.data.error === "No such student"
      ) {
        alert("No such student");
        navigate("/signup/parent"); // Redirect back to parent signup page
      } else {
        alert(err.response?.data?.error || "Signup failed");
      }
    }
  };

  if (!role || !fields[role]) {
    return <div>Invalid role</div>;
  }

  return (
    <Card className="max-w-md mx-auto mt-10">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>{role.toUpperCase()} Sign Up</CardTitle>
        </CardHeader>

        <CardContent>
          {fields[role].map((f) => (
            <input
              key={f}
              placeholder={f}
              onChange={(e) => setForm({ ...form, [f]: e.target.value })}
              required
              className="w-full mb-4 p-2 border rounded"
              type={f === "password" ? "password" : "text"}
            />
          ))}
        </CardContent>

        <CardFooter>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </CardFooter>
      </form>
    </Card>
  );
}
