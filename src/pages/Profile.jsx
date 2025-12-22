export default function Profile() {
    return (
      <div className="min-h-screen bg-gray-50 font-sans">
        <div className="max-w-3xl mx-auto px-8 py-10">
          <h2 className="text-3xl font-bold mb-6">
            Participant Profile
          </h2>
  
          <div className="bg-white rounded-2xl shadow p-8 space-y-4">
            <input className="w-full border p-3 rounded-lg" placeholder="Age" />
            <input className="w-full border p-3 rounded-lg" placeholder="Gender" />
            <input className="w-full border p-3 rounded-lg" placeholder="Education Level" />
            <input className="w-full border p-3 rounded-lg" placeholder="Region" />
  
            <button className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700">
              Save Profile
            </button>
          </div>
        </div>
      </div>
    );
  }
  