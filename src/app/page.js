"use client"; 

import { useEffect, useState } from "react";
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import { signInWithPopup, signOut } from "firebase/auth";
import { db, auth, provider } from "./firebase"; 
import emailjs from '@emailjs/browser'; // NEW: Imported EmailJS

import AddStudentForm from "../components/AddStudentForm";
import StudentCard from "../components/StudentCard";
import Login from "../components/Login";

export default function Home() {
  const [showLanding, setShowLanding] = useState(true);

  const [seniors, setSeniors] = useState([]);
  const [name, setName] = useState("");
  const [club, setClub] = useState("");
  const [year, setYear] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [designation, setDesignation] = useState("");
  const [phone, setPhone] = useState("");
  const [skills, setSkills] = useState("");
  
  const [selectedClub, setSelectedClub] = useState(null);
  const [user, setUser] = useState(null);
  const [loginError, setLoginError] = useState("");

  // NEW: States for the Email Invite System
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteStatus, setInviteStatus] = useState(""); // "sending", "success", "error", or error message

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
      setShowLanding(false); 
    } catch (error) {
      console.error("Error signing in: ", error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    setShowLanding(true); 
  };

  // NEW: Function to handle sending the automated email
  const handleSendInvite = async (e) => {
    e.preventDefault();
    
    // Quick validation to ensure it's an IITJ email
    if (!inviteEmail.includes("@iitj.ac.in")) {
      setInviteStatus("Please enter a valid @iitj.ac.in email address.");
      return;
    }

    setInviteStatus("sending");

    try {
          await emailjs.send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
         { to_email: inviteEmail },
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
          );
      
      setInviteStatus("success");
      setInviteEmail("");
      
      // Clear the success message after 3 seconds
      setTimeout(() => setInviteStatus(""), 3000);
    } catch (error) {
      console.error("EmailJS Error:", error);
      setInviteStatus("error");
    }
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
      ownerEmail: user.email,
      designation: designation,
      phone: phone,
      skills: skills 
    });
    
    setName("");
    setClub("");
    setYear("");
    setLinkedIn("");
    setPhotoUrl("");
    setDesignation("");
    setPhone("");
    setSkills("");
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
    <main className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-200 overflow-hidden relative">
      
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-200/40 rounded-full blur-3xl mix-blend-multiply animate-[pulse_8s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] bg-blue-200/40 rounded-full blur-3xl mix-blend-multiply animate-[pulse_10s_ease-in-out_infinite]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 px-4 sm:px-6 lg:px-8 py-12">
        
        {showLanding ? (
          <div className="min-h-[80vh] flex flex-col justify-center items-center text-center px-4 animate-[fadeIn_0.5s_ease-out]">
            <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 shadow-sm">
              <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">IIT Jodhpur Platform</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-slate-900 via-indigo-900 to-blue-800 mb-6 tracking-tight drop-shadow-sm leading-tight pb-2">
              Senior Connect
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 font-medium max-w-2xl mx-auto mb-12 leading-relaxed">
              Bridge the gap. Find mentors, explore tech stacks, and connect with seniors who have been exactly where you are.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
              <button 
                onClick={() => setShowLanding(false)}
                className="group relative px-8 py-4 bg-slate-900 text-white font-bold text-lg rounded-2xl overflow-hidden shadow-xl shadow-slate-900/20 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                <span className="flex items-center justify-center gap-2">
                  Explore Directory
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>
              <button 
                onClick={() => {
                  if(!user) {
                    handleLogin();
                  } else {
                    setShowLanding(false);
                  }
                }}
                className="px-8 py-4 bg-white text-indigo-600 font-bold text-lg rounded-2xl border-2 border-indigo-100 hover:border-indigo-600 hover:shadow-lg hover:shadow-indigo-100 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
              >
                {user ? "Go to Dashboard" : "Join as Mentor"}
              </button>
            </div>
          </div>
        ) : (
          <div className="animate-[fadeIn_0.5s_ease-out]">
            <div className="flex justify-between items-center mb-12 bg-white/60 backdrop-blur-md p-4 rounded-2xl border border-white shadow-sm">
              <button 
                onClick={() => {
                  setShowLanding(true);
                  setSelectedClub(null);
                }}
                className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Home
              </button>

              {user ? (
                <button onClick={handleLogout} className="text-sm text-red-500 hover:text-red-700 font-bold bg-red-50 hover:bg-red-100 px-5 py-2 rounded-xl transition-colors">
                  Logout ({user.email})
                </button>
              ) : (
                <button onClick={handleLogin} className="text-sm text-indigo-600 hover:text-indigo-700 font-bold bg-indigo-50 hover:bg-indigo-100 px-5 py-2 rounded-xl transition-colors">
                  Mentor Login
                </button>
              )}
            </div>

            {loginError && (
              <div className="mb-8 max-w-2xl mx-auto p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-bold flex items-center justify-center gap-2 shadow-sm">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                {loginError}
              </div>
            )}

            {user && (
              <div className="max-w-3xl mx-auto mb-16 space-y-8">
                {/* NEW: Automated Email Invite Box */}
                <div className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-xl shadow-blue-100/50 border border-white/60 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-400 to-teal-500"></div>
                  <h2 className="text-2xl font-extrabold text-slate-800 mb-2 mt-2">Invite a Senior</h2>
                  <p className="text-sm text-slate-500 font-medium mb-6">Send an automated email inviting a mentor to join the platform.</p>
                  
                  <form onSubmit={handleSendInvite} className="flex flex-col sm:flex-row gap-4">
                    <input 
                      type="email" 
                      value={inviteEmail} 
                      onChange={(e) => setInviteEmail(e.target.value)} 
                      className="flex-1 border-2 border-slate-200 rounded-xl p-3 text-slate-900 placeholder-slate-400 focus:ring-0 focus:border-teal-500 outline-none transition-colors bg-slate-50 focus:bg-white"
                      placeholder="e.g. b22xxxx@iitj.ac.in"
                      required 
                    />
                    <button 
                      type="submit" 
                      disabled={inviteStatus === "sending"}
                      className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 shadow-md shadow-teal-200 disabled:opacity-70 flex items-center justify-center min-w-[140px]"
                    >
                      {inviteStatus === "sending" ? "Sending..." : "Send Invite"}
                    </button>
                  </form>
                  
                  {inviteStatus === "success" && <p className="mt-4 text-emerald-600 font-bold text-sm">✅ Invitation sent successfully!</p>}
                  {inviteStatus === "error" && <p className="mt-4 text-red-500 font-bold text-sm">❌ Failed to send email. Check console.</p>}
                  {inviteStatus !== "" && inviteStatus !== "sending" && inviteStatus !== "success" && inviteStatus !== "error" && (
                    <p className="mt-4 text-red-500 font-bold text-sm">{inviteStatus}</p>
                  )}
                </div>

                <AddStudentForm 
                  name={name} setName={setName} 
                  club={club} setClub={setClub} 
                  year={year} setYear={setYear} 
                  linkedIn={linkedIn} setLinkedIn={setLinkedIn}
                  photoUrl={photoUrl} setPhotoUrl={setPhotoUrl}
                  designation={designation} setDesignation={setDesignation}
                  phone={phone} setPhone={setPhone}
                  skills={skills} setSkills={setSkills}
                  handleAddStudent={handleAddStudent} 
                />
              </div>
            )}

            {!selectedClub ? (
              <div>
                <h2 className="text-3xl font-black text-slate-800 mb-8 text-center tracking-tight">Select a Domain</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {clubCategories.map((category) => (
                    <div
                      key={category.id}
                      onClick={() => setSelectedClub(category.id)}
                      className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-sm border border-white/60 hover:shadow-2xl hover:shadow-indigo-200/50 hover:-translate-y-2 transition-all duration-300 cursor-pointer flex flex-col items-center text-center group relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="text-6xl mb-5 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 relative z-10">
                        {category.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-slate-800 mb-2 relative z-10">{category.name}</h3>
                      <p className="text-sm text-slate-500 relative z-10 font-medium">{category.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-xl shadow-indigo-100/50 border border-white/60">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-10 border-b border-indigo-100 pb-6">
                  <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-indigo-800 mb-4 sm:mb-0">
                    {selectedClub === "All" ? "All Seniors Directory" : `${selectedClub} Mentors`}
                  </h2>
                  <button 
                    onClick={() => setSelectedClub(null)}
                    className="bg-slate-100 text-slate-700 hover:bg-indigo-600 hover:text-white font-bold py-2.5 px-6 rounded-full transition-all duration-300 flex items-center gap-2 shadow-sm"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    Back to Domains
                  </button>
                </div>

                {filteredSeniors.length === 0 ? (
                  <div className="text-center text-indigo-400 font-medium text-lg py-16 bg-indigo-50/50 rounded-2xl border-2 border-dashed border-indigo-200">
                    No seniors have registered for this category yet. Be the first!
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
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
        )}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </main>
  );
}