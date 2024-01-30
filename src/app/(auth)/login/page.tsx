"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const username = formData.get("username");
    console.log(username);
    const password = formData.get("password");
    console.log(password);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
    // console.log(object);
    const { accessToken } = await res.json();
    console.log(accessToken);
    if (accessToken) {
      // const nextUrl = searchParams.get('next')
      // @see: https://github.com/vercel/next.js/discussions/44149
      router.push("/");
    } else {
      // Make your shiny error handling with a great user experience
      alert("Login failed");
    }
  };

  return (
    <div className="text-white flex flex-cols h-screen justify-between items-center">
      <div className="rounded-2xl m-auto bg-slate-900 shadow-2xl p-5 glassmorphism">
        <Image
          src="/logo.png"
          alt="logo"
          width={100}
          height={100}
          className="mx-auto mb-10"
        />
        <h1 className="text-5xl font-extrabold mb-5 text-center">
          Welcome Back
        </h1>
        <h1 className="mb-5 text-center">
          Please Enter your id and password
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-8 justify-center items-center"
        >
          <label>
            Username:
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="text-white bg-slate-800 outline-none border border-gray-900 ml-2 rounded-lg px-2"
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="text-white bg-slate-800 outline-none border border-gray-900 ml-2 rounded-lg px-2"
            />
          </label>
          <button
            type="submit"
            className="border bg-violet-500 px-3 py-1 rounded-xl text-white hover:bg-violet-600 hover:text-white ease-in duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
