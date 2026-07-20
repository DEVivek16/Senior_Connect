export default function AddStudentForm({ 
  name, setName, 
  club, setClub, 
  year, setYear, 
  linkedIn, setLinkedIn,
  photoUrl, setPhotoUrl,
  handleAddStudent 
}) {
  return (
    <form onSubmit={handleAddStudent} className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Register New Profile</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            className="w-full border border-gray-300 rounded-lg p-2.5 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            placeholder="e.g. John Doe"
            required 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Club/Society</label>
          <select 
            value={club} 
            onChange={(e) => setClub(e.target.value)} 
            className="w-full border border-gray-300 rounded-lg p-2.5 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            required
          >
            <option value="" disabled className="text-gray-400">Select a Club</option>
            <option value="Robotics Club">Robotics Club</option>
            <option value="AI Club">AI Club</option>
            <option value="Dev Club">Dev Club</option>
            <option value="Space Club">Space Club</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Batch Year</label>
          <input 
            type="number" 
            value={year} 
            onChange={(e) => setYear(e.target.value)} 
            className="w-full border border-gray-300 rounded-lg p-2.5 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            placeholder="e.g. 2025"
            required 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL (Optional)</label>
          <input 
            type="url" 
            value={linkedIn} 
            onChange={(e) => setLinkedIn(e.target.value)} 
            className="w-full border border-gray-300 rounded-lg p-2.5 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            placeholder="https://linkedin.com/in/..."
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Profile Picture URL (Optional - defaults to Google Photo)</label>
          <input 
            type="url" 
            value={photoUrl} 
            onChange={(e) => setPhotoUrl(e.target.value)} 
            className="w-full border border-gray-300 rounded-lg p-2.5 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            placeholder="https://example.com/my-photo.jpg"
          />
        </div>
      </div>
      <button 
        type="submit" 
        className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 shadow-sm"
      >
        Add to Directory
      </button>
    </form>
  );
}