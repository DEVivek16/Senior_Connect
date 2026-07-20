export default function StudentCard({ student, handleDelete, currentUser }) {
  const isOwner = currentUser && currentUser.email === student.ownerEmail;
  
  // NEW GAMIFICATION LOGIC: The user only gets verified if they fill out the important fields!
  const isVerified = student.skills && student.designation && student.phone && student.linkedIn;

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-7 flex flex-col h-full hover:shadow-2xl hover:shadow-indigo-100 hover:-translate-y-2 transition-all duration-300 group relative">
      
      {/* Decorative background element for verified users */}
      {isVerified && (
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-50 to-transparent rounded-tr-3xl opacity-50 pointer-events-none"></div>
      )}

      <div className="flex items-center gap-5 mb-6 relative z-10">
        <div className="relative">
          <div className={`absolute inset-0 rounded-full blur-[2px] transition-opacity duration-300 ${isVerified ? 'bg-gradient-to-tr from-blue-500 to-indigo-500 opacity-100' : 'bg-slate-300 opacity-50 group-hover:opacity-100'}`}></div>
          {student.photoUrl ? (
            <img 
              src={student.photoUrl} 
              alt={student.name} 
              className="relative w-16 h-16 rounded-full object-cover border-2 border-white"
            />
          ) : (
            <div className={`relative w-16 h-16 rounded-full text-white flex items-center justify-center font-bold text-2xl border-2 border-white ${isVerified ? 'bg-indigo-600' : 'bg-slate-400'}`}>
              {student.name ? student.name.charAt(0).toUpperCase() : "S"}
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center gap-1.5">
            <h3 className="text-xl font-extrabold text-slate-800 leading-tight group-hover:text-indigo-600 transition-colors">
              {student.name}
            </h3>
            
            {/* NEW: The Verified Blue Tick! */}
            {isVerified && (
              <svg className="w-5 h-5 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" title="Verified Mentor - Complete Profile">
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1.9 14.7L6 12.6l1.5-1.5 2.6 2.6 6.4-6.4 1.5 1.5-7.9 7.9z"/>
              </svg>
            )}
          </div>
          
          {student.designation && (
            <p className="text-sm font-bold text-slate-500 mt-1">{student.designation}</p>
          )}

          {student.club && (
            <span className="inline-block bg-indigo-50 text-indigo-700 border border-indigo-100 text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full mt-2">
              {student.club}
            </span>
          )}
        </div>
      </div>

      <div className="flex-1 relative z-10">
        {student.skills && (
          <div className="mb-5">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Tech Stack</p>
            <p className="text-sm font-semibold text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
              {student.skills}
            </p>
          </div>
        )}

        <div className="flex items-center justify-between mb-5 pb-5 border-b border-slate-100">
            <p className="text-slate-500 text-sm font-medium">Batch of <span className="font-bold text-slate-700">{student.graduationYear}</span></p>
        </div>
        
        <div className="space-y-3">
            {student.phone && (
            <a 
                href={`https://wa.me/91${student.phone}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-emerald-600 bg-emerald-50 hover:bg-emerald-100 hover:text-emerald-700 text-sm font-bold flex items-center justify-center gap-2 py-2.5 rounded-xl transition-all"
            >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.12.548 4.195 1.59 6.015L.328 23.673l5.772-1.514A11.972 11.972 0 0012.031 24c6.646 0 12.03-5.384 12.03-12.031C24.06 5.384 18.676 0 12.031 0zm3.842 17.292c-.164.464-.954.9-1.338.937-.367.035-1.025.13-2.937-.665-2.34-1.006-3.83-3.415-3.947-3.572-.117-.158-.942-1.253-.942-2.392 0-1.14.59-1.705.795-1.927.205-.223.451-.278.604-.278.152 0 .304 0 .44.006.14.006.327-.053.515.404.193.468.656 1.604.715 1.721.058.117.093.251.017.404-.076.152-.117.246-.234.386-.117.14-.246.304-.351.404-.117.117-.246.246-.105.486.14.24.632 1.042 1.352 1.685.93.831 1.71 1.088 1.956 1.206.246.117.386.094.527-.064.14-.158.609-.708.773-.954.164-.246.328-.205.55-.117.223.088 1.405.661 1.646.778.24.117.404.175.462.275.059.099.059.585-.105 1.049z"/>
                </svg>
                Chat on WhatsApp
            </a>
            )}

            {student.ownerEmail && (
            <a 
                href={`mailto:${student.ownerEmail}`} 
                className="text-slate-600 hover:text-indigo-600 text-sm font-semibold flex items-center gap-2 mb-2 transition-colors"
            >
                <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {student.ownerEmail}
            </a>
            )}

            {student.linkedIn && (
            <a 
                href={student.linkedIn} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-slate-600 hover:text-indigo-600 text-sm font-semibold flex items-center gap-2 mb-2 transition-colors"
            >
                <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                LinkedIn Profile
            </a>
            )}
        </div>
      </div>

      {isOwner && (
        <button 
          onClick={() => handleDelete(student.id)} 
          className="mt-6 w-full bg-white hover:bg-red-50 text-red-500 hover:text-red-600 font-bold py-2.5 px-4 rounded-xl border-2 border-red-100 hover:border-red-200 transition-all shadow-sm relative z-10"
        >
          Delete Profile
        </button>
      )}
    </div>
  );
}