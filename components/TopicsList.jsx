// "use client"
// import Link from "next/link";
// import { useEffect, useState } from 'react';
// import RemoveBtn from "./RemoveBtn";
// import { HiPencilAlt } from "react-icons/hi";
// import { FaGithub } from "react-icons/fa";
// import { useSession } from "next-auth/react";

// const getTopics = async () => {
//   try {
//     const res = await fetch(`http://localhost:3000/api/topics`, {
//       cache: "no-store",
//     });

//     if (!res.ok) {
//       throw new Error("Failed to fetch topics");
//     }

//     return res.json();
//   } catch (error) {
//     console.log("Error loading topics: ", error);
//     throw error;
//   }
// };



// const filterTopics = (topics, email) => {
//   if (!topics || !Array.isArray(topics)) {
//     return []; // Return empty array if topics are not available or not an array
//   }
//   return topics.filter((t) => t.email === email);
// };

// export default async function TopicsList() {
//   const { data: session, status } = useSession();
//   const [filteredTopics, setFilteredTopics] = useState([]);
//   const [loading, setLoading] = useState(true);
//   // const email = session?.user?.email;
//   // const { topics } = await getTopics();

//   // const filters = topics.filter(obj => obj.email === "ss@gmail.com");
//   // console.log(filters)
//   // const filters = await filterTopics(topics,email);
//   // const { data: session } = useSession();
//   // const email = session?.user?.email;
//   useEffect(() => {
//     if (status === 'authenticated') {
//       const fetchData = async () => {
//         try {
//           console.log("Fetching topics...");
//           const { topics } = await getTopics();
//           console.log("Fetched topics:", topics);
//           const email = session?.user?.email;
//           console.log("User email:", email);
//           const filtered = filterTopics(topics, email);
//           console.log("Filtered topics:", filtered);
//           setFilteredTopics(filtered);
//           setLoading(false);
//         } catch (error) {
//           console.error("Error fetching or filtering topics: ", error);
//           setLoading(false); // Ensure loading state is set to false even in case of errors
//         }
//       };
  
//       fetchData();
//     }
//   }, [session, status]);
//   // // Log filteredTopics to ensure it contains data
//   // console.log(filteredTopics);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <>
//       {filteredTopics.length > 0 ? ( // Conditionally render if filteredTopics has data
//         filteredTopics.map((t) => (
//           <div
//             key={t._id}
//             className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
//           >
//             <div>
//               <h2 className="font-bold text-2xl">{t.title}</h2>
//               <div>{t.description}</div>
//               <div>
//                 <a
//                   href={t.github}
//                   className="flex justify-center items-center text-3xl w-full"
//                 >
//                   <FaGithub />
//                 </a>
//               </div>
//             </div>

//             <div className="flex gap-2">
//               <RemoveBtn id={t._id} />
//               <Link href={`/editTopic/${t._id}`}>
//                 <HiPencilAlt size={24} />
//               </Link>
//             </div>
//           </div>
//         ))
//       ) : (
//         <div>No topics found</div> // Display a message if no topics are found
//       )}
//     </>
//   );
// }
"use client"
import { useEffect, useState } from 'react';
import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";
import { FaGithub } from "react-icons/fa";
import { useSession } from "next-auth/react";

const getTopics = async () => {
  try {
    const res = await fetch(`/api/topics`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading topics: ", error);
    throw error;
  }
};

const filterTopics = (topics, email) => {
  if (!topics || !Array.isArray(topics)) {
    return [];
  }
  if (email === "admin@gmail.com") {
    return topics;
  }
  return topics.filter((t) => t.email === email);
};

export default function TopicsList() {
  const { data: session, status } = useSession();
  const [filteredTopics, setFilteredTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'authenticated') {
      const fetchData = async () => {
        try {
          const { topics } = await getTopics();
          const email = session?.user?.email;
          const filtered = filterTopics(topics, email);
          setFilteredTopics(filtered);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching or filtering topics: ", error);
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [session, status]);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {filteredTopics.length > 0 ? (
            filteredTopics.map((t) => (
              <div
              key={t._id}
              className="p-4 border border-slate-300 my-3 flex justify-between items-start rounded-md bg-gray-100 shadow-md"
            >
              <div className="flex-1">
                <h2 className="font-bold text-2xl text-gray-800">{t.title}</h2>
                <div className="text-gray-600">{t.description}</div>
                <div>
                  <a
                    href={t.github}
                    className="flex justify-center items-center text-3xl w-full text-gray-600 hover:text-gray-800"
                  >
                    <FaGithub />
                  </a>
                </div>
              </div>
            
              <div className="flex gap-2 items-center">
                <RemoveBtn id={t._id} />
                <Link href={`/editTopic/${t._id}`}>
                  <HiPencilAlt size={24} className="text-gray-600 hover:text-gray-800 cursor-pointer" />
                </Link>
              </div>
            </div>
            
            ))
          ) : (
            <div>No topics found</div>
          )}
        </div>
      )}
    </>
  );
}
