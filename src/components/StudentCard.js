export default function StudentCard({ student, handleDelete, currentUser }) {
  const isOwner = currentUser && currentUser.email === student.ownerEmail;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col h-full hover:shadow-md transition-shadow duration-200">
      
      
      <div className="flex items-center gap-4 mb-4">
        {student.photoUrl ? (
          <img 
            src={student.photoUrl} 
            alt={student.name} 
            className="w-14 h-14 rounded-full object-cover border-2 border-blue-500 shadow-sm"
          />
        ) : (
          <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl shadow-sm">
            {student.name ? student.name.charAt(0).toUpperCase() : "S"}
          </div>
        )}
        <div>
          <h3 className="text-xl font-bold text-gray-900 leading-tight">{student.name}</h3>
          <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full mt-1">
            {student.club}
          </span>
        </div>
      </div>

      <div className="flex-1">
        <p className="text-gray-600 text-sm mb-4">Batch of {student.graduationYear}</p>
        
        {student.ownerEmail && (
          <a 
            href={`mailto:${student.ownerEmail}`} 
            className="text-gray-600 hover:text-blue-600 text-sm font-medium flex items-center gap-2 mb-2 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
            className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-2 mb-2"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
            LinkedIn Profile
          </a>
        )}
      </div>

      {isOwner && (
        <button 
          onClick={() => handleDelete(student.id)} 
          className="mt-4 w-full bg-red-50 hover:bg-red-100 text-red-600 font-semibold py-2 px-4 rounded border border-red-200 transition-colors"
        >
          Delete Card
        </button>
      )}
    </div>
  );
}