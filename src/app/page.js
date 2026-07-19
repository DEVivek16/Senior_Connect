"use client"; 

import { useEffect, useState } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore"; 
import { db } from "./firebase"; 

export default function Home() {
  const [seniors, setSeniors] = useState([]);
  const [name, setName] = useState("");
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");

  const fetchSeniors = async () => {
    const querySnapshot = await getDocs(collection(db, "seniors"));
    const studentData = [];
    querySnapshot.forEach((doc) => {
      studentData.push({ id: doc.id, ...doc.data() });
    });
    setSeniors(studentData);
  };

  useEffect(() => {
    fetchSeniors();
  }, []);

  const handleAddStudent = async (e) => {
    e.preventDefault(); 
    
    await addDoc(collection(db, "seniors"), {
      name: name,
      branch: branch,
      graduationYear: Number(year) 
    });

    setName("");
    setBranch("");
    setYear("");
    fetchSeniors();
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        <h1 className="text-4xl font-extrabold text-center text-blue-900 mb-10">
          Senior Student Directory
        </h1>
        
        {/* THE STYLED FORM */}
        <form 
          onSubmit={handleAddStudent} 
          className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md mb-12 flex flex-col gap-4"
        >
          <h2 className="text-xl font-semibold text-gray-700 mb-2 border-b pb-2">Add New Student</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              type="text" 
              placeholder="Student Name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input 
              type="text" 
              placeholder="Branch/Major" 
              value={branch} 
              onChange={(e) => setBranch(e.target.value)} 
              required
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <input 
            type="number" 
            placeholder="Graduation Year" 
            value={year} 
            onChange={(e) => setYear(e.target.value)} 
            required
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
          <button 
            type="submit" 
            className="mt-4 bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Add Student
          </button>
        </form>

        {/* THE STYLED GRID OF CARDS */}
        {seniors.length === 0 ? (
          <div className="text-center text-gray-500 text-lg">Loading students from the cloud...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {seniors.map((student) => (
              <div 
                key={student.id} 
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition duration-200 border-t-4 border-blue-500 flex flex-col"
              >
                <h3 className="text-2xl font-bold text-gray-800 mb-1">{student.name}</h3>
                <p className="text-blue-600 font-medium mb-3">{student.branch}</p>
                <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500">
                  <span>Class of {student.graduationYear}</span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}