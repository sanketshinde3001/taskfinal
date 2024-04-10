// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function AddTopic() {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [github, setGithub] = useState("");

//   const router = useRouter();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!title || !description || !github) {
//       alert("Title , description and github are required.");
//       return;
//     }

//     try {
//       const res = await fetch("http://localhost:3000/api/topics", {
//         method: "POST",
//         headers: {
//           "Content-type": "application/json",
//         },
//         body: JSON.stringify({ title, description, github }),
//       });

//       if (res.ok) {
//         router.push("/");
//       } else {
//         throw new Error("Failed to create a task");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center align-middle gap-3">
//       <input
//         onChange={(e) => setTitle(e.target.value)}
//         value={title}
//         className="border border-slate-500 px-8 py-2"
//         type="text"
//         placeholder="Project Title"
//       />

//       <input
//         onChange={(e) => setDescription(e.target.value)}
//         value={description}
//         className="border border-slate-500 px-8 py-2"
//         type="text"
//         placeholder="Project Description"
//       />
      
//       <input
//         onChange={(e) => setGithub(e.target.value)}
//         value={github}
//         className="border border-slate-500 px-8 py-2"
//         type="text"
//         placeholder="Project Github Link"
//       />

//       <button
//         type="submit"
//         className="bg-blue-800 font-bold text-white py-3 px-6 w-fit"
//       >
//         Add Task
//       </button>
//     </form>
//   );
// }


"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useSession } from "next-auth/react";

export default function AddTopic() {
  const { data: session } = useSession();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [github, setGithub] = useState("");
  const email = session?.user?.email;
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !github) {
      alert("Title , description and github are required.");
      return;
    }

    try {
      const res = await fetch("/api/topics", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ title, description, github , email }),
      });

      if (res.ok) {
        router.push("/seeTasks");
      } else {
        throw new Error("Failed to create a task");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full h-screen flex flex-col justify-center items-center align-middle gap-3">
      <input
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className="border border-slate-600 px-8 py-2 w-[36%]"
        type="text"
        placeholder="Project Title"
      />

      <input
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className="border border-slate-600 px-8 py-6 w-[36%]"
        type="text"
        placeholder="Project Description"
      />
      
      <input
        onChange={(e) => setGithub(e.target.value)}
        value={github}
        className="border border-slate-600 px-8 py-2 w-[36%]"
        type="text"
        placeholder="Project Github Link"
      />

      <button
        type="submit"
        className="bg-green-600 font-bold text-white py-3 px-6 w-fit rounded-md"
      >
        Add Task
      </button>
    </form>
  );
}
