import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { apiUrl } from "../../services/ApiConfig";

const LoginPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [loadError, setLoadError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(apiUrl("/users"))
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load users");
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
      })
      .catch(() => {
        setLoadError("Could not load users. Please check backend server.");
      })
      .finally(() => {
        setIsLoadingUsers(false);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const selectedUser = users.find(
      (user) => String(user.id) === String(selectedUserId)
    );
    if (!selectedUser) {
      return;
    }
    login(selectedUser);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-950 dark:to-gray-950">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 p-8">
        <div className="flex items-center justify-center gap-3 mb-5">
          <div className="h-11 w-11 rounded-xl bg-gradient-orange text-white flex items-center justify-center text-xl shadow-sm-glow">
            🐛
          </div>
          <div className="text-left">
            <p className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400">
              Welcome to
            </p>
            <p className="text-2xl font-extrabold text-gray-900 dark:text-white">
              BugTracker
            </p>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
          Login
        </h1>
        <p className="mt-3 text-gray-600 dark:text-gray-400 text-center">
          Choose a user to continue.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label
            htmlFor="userSelect"
            className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
          >
            User
          </label>
          <select
            id="userSelect"
            className="form-select w-full"
            value={selectedUserId}
            onChange={(event) => setSelectedUserId(event.target.value)}
            disabled={isLoadingUsers || Boolean(loadError)}
            required
          >
            <option value="">Select a user...</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} ({user.role})
              </option>
            ))}
          </select>

          {loadError ? (
            <p className="text-sm text-red-500">{loadError}</p>
          ) : null}

          <button
            type="submit"
            className="button-primary w-full"
            disabled={isLoadingUsers || !selectedUserId || Boolean(loadError)}
          >
            {isLoadingUsers ? "Loading users..." : "Continue"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
