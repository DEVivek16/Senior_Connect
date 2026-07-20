export default function AddStudentForm({ 
  name, setName, 
  club, setClub, 
  year, setYear, 
  linkedIn, setLinkedIn,
  photoUrl, setPhotoUrl,
  designation, setDesignation,
  phone, setPhone,
  skills, setSkills,
  handleAddStudent 
}) {
  return (
    // UPGRADED: Glassmorphism and softer shadows
    <form onSubmit={handleAddStudent} className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-xl shadow-indigo-100/50 border border-white/60 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
      
      <h2 className="text-2xl font-extrabold text-slate-800 mb-6 mt-2">Register New Profile</h2>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1.5">Full Name</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            className="w-full border-2 border-slate-200 rounded-xl p-3 text-slate-900 placeholder-slate-400 focus:ring-0 focus:border-indigo-500 outline-none transition-colors bg-slate-50 focus:bg-white"
            placeholder="e.g. John Doe"
            required 
          />
        </div>
        
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1.5">Designation / Role</label>
          <input 
            type="text" 
            value={designation} 
            onChange={(e) => setDesignation(e.target.value)} 
            className="w-full border-2 border-slate-200 rounded-xl p-3 text-slate-900 placeholder-slate-400 focus:ring-0 focus:border-indigo-500 outline-none transition-colors bg-slate-50 focus:bg-white"
            placeholder="e.g. SDE Intern, ML Researcher"
            required 
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-bold text-slate-700 mb-1.5">Top Skills / Tech Stack</label>
          <input 
            type="text" 
            value={skills} 
            onChange={(e) => setSkills(e.target.value)} 
            className="w-full border-2 border-slate-200 rounded-xl p-3 text-slate-900 placeholder-slate-400 focus:ring-0 focus:border-indigo-500 outline-none transition-colors bg-slate-50 focus:bg-white"
            placeholder="e.g. React, Python, Machine Learning, UI/UX"
            required 
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1.5">Club/Society (Optional)</label>
          <select 
            value={club} 
            onChange={(e) => setClub(e.target.value)} 
            className="w-full border-2 border-slate-200 rounded-xl p-3 text-slate-900 focus:ring-0 focus:border-indigo-500 outline-none transition-colors bg-slate-50 focus:bg-white"
          >
            <option value="">None / Independent Mentor</option>
            <option value="Robotics Club">Robotics Club</option>
            <option value="AI Club">AI Club</option>
            <option value="Dev Club">Dev Club</option>
            <option value="Space Club">Space Club</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1.5">Batch Year</label>
          <input 
            type="number" 
            value={year} 
            onChange={(e) => setYear(e.target.value)} 
            className="w-full border-2 border-slate-200 rounded-xl p-3 text-slate-900 placeholder-slate-400 focus:ring-0 focus:border-indigo-500 outline-none transition-colors bg-slate-50 focus:bg-white"
            placeholder="e.g. 2025"
            required 
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1.5">WhatsApp Number</label>
          <div className="flex">
            <span className="inline-flex items-center px-4 text-sm text-slate-700 bg-slate-100 border-2 border-r-0 border-slate-200 rounded-l-xl font-bold">
              +91
            </span>
            <input 
              type="tel" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
              className="rounded-none rounded-r-xl w-full border-2 border-slate-200 p-3 text-slate-900 placeholder-slate-400 focus:ring-0 focus:border-indigo-500 outline-none transition-colors bg-slate-50 focus:bg-white"
              placeholder="10-digit number"
              pattern="[0-9]{10}"
              required 
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1.5">LinkedIn URL (Optional)</label>
          <input 
            type="url" 
            value={linkedIn} 
            onChange={(e) => setLinkedIn(e.target.value)} 
            className="w-full border-2 border-slate-200 rounded-xl p-3 text-slate-900 placeholder-slate-400 focus:ring-0 focus:border-indigo-500 outline-none transition-colors bg-slate-50 focus:bg-white"
            placeholder="https://linkedin.com/in/..."
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-bold text-slate-700 mb-1.5">Profile Picture URL (Optional - defaults to Google Photo)</label>
          <input 
            type="url" 
            value={photoUrl} 
            onChange={(e) => setPhotoUrl(e.target.value)} 
            className="w-full border-2 border-slate-200 rounded-xl p-3 text-slate-900 placeholder-slate-400 focus:ring-0 focus:border-indigo-500 outline-none transition-colors bg-slate-50 focus:bg-white"
            placeholder="https://example.com/my-photo.jpg"
          />
        </div>
      </div>
      
     
      <button 
        type="submit" 
        className="mt-8 w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-4 rounded-xl transition-all duration-300 shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transform hover:-translate-y-0.5"
      >
        Add to Directory
      </button>
    </form>
  );
}