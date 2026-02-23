import { use, useEffect, useMemo, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [debounceQuery, setDebounceQuery] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceQuery(search);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  useEffect(() => {
    getFetchData(debounceQuery);
  }, [debounceQuery]);

  const getFetchData = async (searchString:any) => {
    try {
      const response = await fetch(`https://dummyjson.com/users/search?q=${searchString}`);
      const data = await response.json();
      console.log("Fetched data:", data);
      const formattedUsers = data.users.map((user: any) => ({
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        age: user.age,
        gender: user.gender,
        company: user.company?.name,
        dob: user.birthDate,
      }));
      setUsers(formattedUsers);
    } catch (error) {
      console.error("Error fetching data:", error);
    }[debounceQuery]
  }

  return (
    <>
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-6">

        {/* Search Input */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by name, email, company, etc..."
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Gender</th>
                <th className="p-3 text-left">Company</th>
                <th className="p-3 text-left">Age</th>
                <th className="p-3 text-left">Date of Birth</th>
              </tr>
            </thead>

            <tbody>
              {users.length > 0 ? (
                users.map((user:any) => (
                  <tr
                    key={user.id}
                    className="border-b hover:bg-gray-100 transition"
                  >
                    <td className="p-3">{user.name}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">{user.gender}</td>
                    <td className="p-3">{user.company}</td>
                    <td className="p-3">{user.age}</td>
                    <td className="p-3">{user.dob}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    className="text-center py-6 text-gray-500"
                  >
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </>
  )
}

export default App