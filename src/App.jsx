import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [status, setStatus] = useState("");
  const [reportUrl, setReportUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      const res = await axios.post("https://cwa-iyuj.onrender.com/intake", formData);
      setStatus("✅ Report generated!");
      setReportUrl("https://cwa-iyuj.onrender.com" + res.data.report_url);
    } catch (err) {
      console.error(err);
      setStatus("❌ Failed to generate report.");
    }
  };

  return (
    <main className="text-white">
      <header className="text-center py-12 bg-[#111827]">
        <h1 className="text-4xl font-bold text-[#facc15]">Claimwise Adjuster</h1>
        <p className="text-lg mt-2 text-gray-300">Smart Claims. Fast Results. Cutting Edge Technology.</p>
      </header>

      <section className="py-10 px-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-[#3b82f6]">What's Included</h2>
        <ul className="grid md:grid-cols-3 gap-4 text-sm text-gray-200">
          <li>✅ Policy Declaration Review</li>
          <li>✅ Damage Photo Analysis</li>
          <li>✅ Drone Roof Inspection</li>
          <li>✅ Preliminary Claim Report</li>
          <li>✅ Healthy Home Summary</li>
          <li>✅ Ongoing Claim Support</li>
        </ul>
      </section>

      <section className="bg-[#111827] py-8 px-6">
        <h2 className="text-2xl font-semibold text-center text-[#facc15] mb-4">Submit Your Claim</h2>
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4 bg-[#1f2937] p-6 rounded shadow">
          <input type="text" name="name" required placeholder="Full Name" className="w-full p-2 rounded bg-gray-800 text-white" />
          <input type="email" name="email" required placeholder="Email" className="w-full p-2 rounded bg-gray-800 text-white" />
          <input type="text" name="phone" required placeholder="Phone" className="w-full p-2 rounded bg-gray-800 text-white" />
          <textarea name="damage_description" required placeholder="Describe the damage..." className="w-full p-2 rounded bg-gray-800 text-white" />
          <label>Declaration Page (PDF):</label>
          <input type="file" name="declaration_file" accept=".pdf" required className="w-full" />
          <label>Photos of Damage:</label>
          <input type="file" name="photo_files" accept="image/*" multiple required className="w-full" />
          <button type="submit" className="bg-[#3b82f6] hover:bg-blue-700 text-white px-4 py-2 rounded w-full">Submit</button>
        </form>
        {status && <p className="text-center mt-4">{status}</p>}
        {reportUrl && (
          <p className="text-center mt-2 underline text-blue-400">
            <a href={reportUrl} target="_blank" rel="noopener noreferrer">View Report</a>
          </p>
        )}
      </section>

      <footer className="text-center text-sm text-gray-400 py-6 bg-[#111827]">
        &copy; 2025 Claimwise Adjuster. All rights reserved. | <a href="#" className="underline">Privacy Policy</a>
      </footer>
    </main>
  );
};

export default App;