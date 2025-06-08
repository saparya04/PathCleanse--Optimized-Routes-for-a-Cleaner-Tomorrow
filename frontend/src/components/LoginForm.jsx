import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BackgroundLines } from "./BackgroundLines";

// Reusing your cn function for class names
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

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

function CardContent({ className, children, ...props }) {
  return (
    <div data-slot="card-content" className={cn("px-6", className)} {...props}>
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

export default function LoginForm() {
  const { role } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`http://localhost:5000/api/auth/login/${role}`, form);

      if (res.data.token) {
        if (role === "parent") {
          navigate(`/${res.data.studentId}/dashboard`);
        } else if (role === "teacher") {
          localStorage.setItem("teacherId", res.data.teacher._id);
          navigate(`/dashboard/${role}`);
        } else {
          navigate(`/dashboard/${role}`);
        }
      }
    } catch (err) {
      const errorMsg = err.response?.data?.error || "Login failed";

      if (errorMsg === "User not found") {
        alert("No such student");
        if (role === "parent") {
          navigate("/signup/parent");
        }
      } else {
        alert(errorMsg);
      }
    }
  };

  return (
    <div>
      <div className="pointer-events-none absolute inset-0">
        <BackgroundLines />
      </div>

      <div className="relative pointer-events-auto flex items-center justify-center min-h-screen px-4">
        <Card className="max-w-md w-full mx-auto mt-10 bg-gray-900 text-white border-gray-700">
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>{role?.toUpperCase()} Login</CardTitle>
            </CardHeader>

            <CardContent>
              <input
                placeholder={role === "parent" ? "studentId" : "teacherId"}
                onChange={(e) =>
                  setForm({
                    ...form,
                    [role === "parent" ? "studentId" : "teacherId"]: e.target.value,
                  })
                }
                required
                className="w-full mb-4 p-2 border rounded text-white"
              />

              <input
                type="password"
                placeholder="password"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                className="w-full mb-4 p-2 border rounded text-white"
              />
            </CardContent>

            <CardFooter className={"justify-center"}>
              <button
                type="submit"
                className="bg-blue-600 text-black justify-center px-4 py-2 rounded hover:bg-white transition"
              >
                Login
              </button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
