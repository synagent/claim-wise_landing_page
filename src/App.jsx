import React, { useState } from 'react'
import axios from 'axios'

const ClaimForm = () => {
  const [status, setStatus] = useState("")
  const [reportUrl, setReportUrl] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.target
    const formData = new FormData(form)

    try {
      const res = await axios.post("https://cwa-iyuj.onrender.com/intake", formData)
      console.log("✅ API response:", res)
      if (res.data && res.data.report_url) {
        setStatus("✅ Report generated!")
        setReportUrl("https://cwa-iyuj.onrender.com" + res.data.report_url)
      } else {
        setStatus("⚠️ Report created, but URL missing.")
      }
    } catch (err) {
      console.error("❌ Error generating report:", err)
      if (err.response) {
        console.error("💥 Server responded with:", err.response.data)
      }
      setStatus("❌ Failed to generate report.")
    }
  }

  return (
    <div className="max-w-xl mx-auto bg-white shadow p-6 rounded">
      <h1 className="text-xl font-bold mb-4">Claimwise Intake Form</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" required placeholder="Full Name" className="w-full p-2 border" />
        <input type="email" name="email" required placeholder="Email" className="w-full p-2 border" />
        <input type="text" name="phone" required placeholder="Phone" className="w-full p-2 border" />
        <textarea name="damage_description" required placeholder="Describe the damage" className="w-full p-2 border"></textarea>
        <label className="block">Declaration Page (PDF):</label>
        <input type="file" name="declaration_file" accept=".pdf" required className="w-full" />
        <label className="block">Photos of Damage:</label>
        <input type="file" name="photo_files" accept="image/*" multiple required className="w-full" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
      </form>
      {status && <p className="mt-4">{status}</p>}
      {reportUrl && (
        <p className="mt-2 text-blue-700 underline">
          <a href={reportUrl} target="_blank" rel="noopener noreferrer">View Report</a>
        </p>
      )}
    </div>
  )
}

export default ClaimForm
