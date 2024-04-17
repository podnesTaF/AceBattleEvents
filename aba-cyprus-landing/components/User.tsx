import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const User = () => {
  const [user, setUser] = useState<any>(null);
  const token = Cookies.get("auth");

  const handleLogin = () => {
    const redirectUri = encodeURIComponent(
      `${window.location.origin}/api/auth/ott`
    );
    window.location.href = `http://localhost:3000/login?redirectUri=${redirectUri}`;
  };

  useEffect(() => {
    if (!token) return;
    const fetchUser = async () => {
      const token = Cookies.get("auth");
      console.log("token", token);
      if (!token) return;

      try {
        const response = await fetch("http://localhost:4000/api/v2/users/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Handle errors (e.g., by redirecting to login or showing a message)
      }
    };

    fetchUser();
  }, [token]);
  return user ? (
    <p>
      Hello, {user.name}!{" "}
      <button
        onClick={() => {
          Cookies.remove("auth");
          setUser(null);
          window.location.reload();
        }}
      >
        Logout
      </button>
    </p>
  ) : (
    <button
      className="text-xl font-semibold px-4 py-2 bg-black text-white rounded-md"
      onClick={handleLogin}
    >
      Login
    </button>
  );
};

export default User;
