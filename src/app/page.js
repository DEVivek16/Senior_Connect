"use client"; 

import { useEffect, useState } from "react";
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import { signInWithPopup, signOut } from "firebase/auth";
import { db, auth, provider } from "./firebase"; 

import AddStudentForm from "../components/AddStudentForm";
import StudentCard from "../components/StudentCard";
import Login from "../components/Login";

export default function Home() {
  const [seniors, setSeniors] = useState([]);
  const [name, setName] = useState("");
  const [club, setClub] = useState("");
  const [year, setYear] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  
  
  const [photoUrl, setPhotoUrl] = useState("");
  
  const [selectedClub, setSelectedClub] = useState(null);
  const [user, setUser] = useState(null);
  const [loginError, setLoginError] = useState("");

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

  const handleLogin = async () => {
    setLoginError(""); 
    try {
      const result = await signInWithPopup(auth, provider);
      const email = result.user.email;

      if (!email.endsWith("@iitj.ac.in")) {
        await signOut(auth);
        setLoginError("Access Denied. You must use an official @iitj.ac.in email address.");
        return;
      }

      const batchYear = email.substring(1, 3);
      if (batchYear === "26") {
        await signOut(auth);
        setLoginError("Welcome, First-Year! You are free to view the directory, but only Seniors can register profiles here.");
        return;
      }

      setUser(result.user);
    } catch (error) {
      console.error("Error signing in: ", error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  const handleAddStudent = async (e) => {
    e.preventDefault(); 
    
    
    const finalPhotoUrl = photoUrl.trim() !== "" ? photoUrl : (user.photoURL || "");

    await addDoc(collection(db, "seniors"), {
      name: name,
      club: club,
      graduationYear: Number(year),
      linkedIn: linkedIn,
      photoUrl: finalPhotoUrl,
      ownerEmail: user.email 
    });
    
    setName("");
    setClub("");
    setYear("");
    setLinkedIn("");
    setPhotoUrl("");
    fetchSeniors();
  };

  const handleDeleteStudent = async (studentId) => {
    const studentDocRef = doc(db, "seniors", studentId);
    await deleteDoc(studentDocRef);
    fetchSeniors();
  };

  const clubCategories = [
    { id: "All", name: "All Seniors", icon: "🎓", desc: "View the complete directory of all mentors." },
    { id: "Robotics Club", name: "Robotics Club", icon: "🤖", desc: "Hardware, automation, and bot building." },
    { id: "AI Club", name: "AI Club", icon: "🧠", desc: "Machine learning and data science enthusiasts." },
    { id: "Dev Club", name: "Dev Club", icon: "💻", desc: "Software, web, and mobile app development." },
    { id: "Space Club", name: "Space Club", icon: "🚀", desc: "Astronomy, aerospace, and rocketry." }
  ];

  const filteredSeniors = selectedClub === "All" 
    ? seniors 
    : seniors.filter(student => student.club === selectedClub);

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-3 tracking-tight">
            Senior Connect
          </h1>
          <p className="text-lg text-blue-600 font-semibold uppercase tracking-widest">
            IIT Jodhpur
          </p>
          <div className="w-16 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {user ? (
          <div className="max-w-2xl mx-auto mb-12">
            <div className="flex justify-end mb-2">
              <button onClick={handleLogout} className="text-sm text-red-500 hover:text-red-700 font-semibold">
                Logout ({user.email})
              </button>
            </div>
            <AddStudentForm 
              name={name} setName={setName} 
              club={club} setClub={setClub} 
              year={year} setYear={setYear} 
              linkedIn={linkedIn} setLinkedIn={setLinkedIn}
              photoUrl={photoUrl} setPhotoUrl={setPhotoUrl}
              handleAddStudent={handleAddStudent} 
            />
          </div>
        ) : (
          <Login handleLogin={handleLogin} loginError={loginError} />
        )}

        {!selectedClub ? (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Select a Club to Find Mentors</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clubCategories.map((category) => (
                <div
                  key={category.id}
                  onClick={() => setSelectedClub(category.id)}
                  className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col items-center text-center group"
                >
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{category.name}</h3>
                  <p className="text-sm text-gray-500">{category.desc}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 border-b pb-4">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0">
                {selectedClub === "All" ? "All Seniors Directory" : `${selectedClub} Mentors`}
              </h2>
              <button 
                onClick={() => setSelectedClub(null)}
                className="bg-gray-100 text-gray-700 hover:bg-gray-200 font-semibold py-2.5 px-5 rounded-lg transition flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Clubs
              </button>
            </div>

            {filteredSeniors.length === 0 ? (
              <div className="text-center text-gray-500 text-lg py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                No seniors have registered for this club yet. Be the first!
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSeniors.map((student) => (
                  <StudentCard 
                    key={student.id} 
                    student={student} 
                    handleDelete={handleDeleteStudent} 
                    currentUser={user} 
                  />
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </main>
  );
}