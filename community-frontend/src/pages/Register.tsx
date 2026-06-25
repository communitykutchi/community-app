import { useState, type ChangeEvent, type FormEvent } from 'react';
import api from '../api/axios.js';

export default function Register() {
  const [form, setForm] = useState({
    fullName: '',
    fatherName: '',
    motherName: '',
    familyMembers: '',
    cast: '',
    dob: '',
    cnic: '',
    mobile: '',
    email: '',
    password: '',       // ⭐ NEW
    homeStatus: 'Owner',
    occupation: 'Employee',
    businessName: '',
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value: rawValue } = e.target;
    let value = rawValue as string;

    if (name === 'cnic') {
      const digits = value.replace(/\D/g, '').slice(0, 13);
      if (digits.length <= 5) value = digits;
      else if (digits.length <= 12) value = digits.slice(0, 5) + '-' + digits.slice(5);
      else value = digits.slice(0, 5) + '-' + digits.slice(5, 12) + '-' + digits.slice(12);
    }

    if (name === 'mobile') {
      const digits = value.replace(/\D/g, '').slice(0, 11);
      if (digits.length <= 4) value = digits;
      else value = digits.slice(0, 4) + '-' + digits.slice(4);
    }

    setForm((f) => ({ ...f, [name]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!form.fullName || !form.mobile) {
      setMessage('Please fill required fields: Full name and Mobile number');
      return;
    }

    if (!/^\d{4}-\d{7}$/.test(form.mobile)) {
      setMessage('Mobile must be 11 digits in format: 03XX-XXXXXXX');
      return;
    }

    if (form.cnic && !/^\d{5}-\d{7}-\d{1}$/.test(form.cnic)) {
      setMessage('CNIC must be 13 digits in format: 12345-1234567-1');
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const res = await api.post("/auth/register", form);

      if (res.data.success) {
        setMessage("Registration successful!");
        console.log("Registered user:", res);
      } else {
        setMessage(res.data.message || "Something went wrong.");
      }

    } catch (err: any) {
      setMessage(err.response?.data?.message || "Server error.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Member Register</h2>

      {message && (
        <div className="mb-4 text-sm text-gray-700">{message}</div>
      )}

      <form className="flex flex-col gap-4 text-gray-700" onSubmit={handleSubmit}>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <div className="flex flex-col">
            <label className="mb-1">Full Name</label>
            <input name="fullName" value={form.fullName} onChange={handleChange}
              placeholder="Full name"
              className="border border-gray-300 rounded px-3 py-2 text-gray-700 placeholder-gray-400" required />
          </div>

          <div className="flex flex-col">
            <label className="mb-1">Father Name</label>
            <input name="fatherName" value={form.fatherName} onChange={handleChange}
              placeholder="Father full name"
              className="border border-gray-300 rounded px-3 py-2 text-gray-700 placeholder-gray-400" />
          </div>

          <div className="flex flex-col">
            <label className="mb-1">Mother Name</label>
            <input name="motherName" value={form.motherName} onChange={handleChange}
              placeholder="Mother full name"
              className="border border-gray-300 rounded px-3 py-2 text-gray-700 placeholder-gray-400" />
          </div>

          <div className="flex flex-col">
            <label className="mb-1">Number of Family Members</label>
            <input name="familyMembers" value={form.familyMembers} onChange={handleChange}
              type="number" min="1" placeholder="e.g. 4"
              className="border border-gray-300 rounded px-3 py-2 text-gray-700 placeholder-gray-400" />
          </div>

          <div className="flex flex-col">
            <label className="mb-1">Cast</label>
            <input name="cast" value={form.cast} onChange={handleChange}
              placeholder="Your cast"
              className="border border-gray-300 rounded px-3 py-2 text-gray-700 placeholder-gray-400" />
          </div>

          <div className="flex flex-col">
            <label className="mb-1">Date of Birth</label>
            <input name="dob" value={form.dob} onChange={handleChange}
              type="date"
              className="border border-gray-300 rounded px-3 py-2 text-gray-700" />
          </div>

          <div className="flex flex-col">
            <label className="mb-1">CNIC Number</label>
            <input name="cnic" value={form.cnic} onChange={handleChange}
              placeholder="XXXXX-XXXXXXX-X"
              className="border border-gray-300 rounded px-3 py-2 text-gray-700 placeholder-gray-400" />
          </div>

          <div className="flex flex-col">
            <label className="mb-1">Mobile Number</label>
            <input name="mobile" value={form.mobile} onChange={handleChange}
              placeholder="03XX-XXXXXXX"
              className="border border-gray-300 rounded px-3 py-2 text-gray-700 placeholder-gray-400" required />
          </div>

          <div className="flex flex-col">
            <label className="mb-1">Email Address</label>
            <input name="email" value={form.email} onChange={handleChange}
              type="email" placeholder="you@example.com"
              className="border border-gray-300 rounded px-3 py-2 text-gray-700 placeholder-gray-400" />
          </div>

          {/* ⭐ Added Password Field Same Design ⭐ */}
          <div className="flex flex-col">
            <label className="mb-1">Password</label>
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              type="password"
              placeholder="Enter password"
              className="border border-gray-300 rounded px-3 py-2 text-gray-700 placeholder-gray-400"
              required
            />
          </div>

        </div>

        <div className="flex flex-col items-center gap-4 md:flex-row md:items-start md:gap-4">
          <div className="flex items-center gap-3">
            <label className="mr-2">Home Status</label>
            <select name="homeStatus" value={form.homeStatus} onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 text-gray-700">
              <option>Owner</option>
              <option>Rent</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <label className="mr-2">Occupation</label>
            <select name="occupation" value={form.occupation} onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 text-gray-700">
              <option>Employee</option>
              <option>Business Man</option>
            </select>
          </div>
        </div>

        {form.occupation === 'Business Man' && (
          <div className="w-full mt-2">
            <label className="mb-1">Business Name</label>
            <input name="businessName" value={form.businessName} onChange={handleChange}
              placeholder="Your business name"
              className="border border-gray-300 rounded px-3 py-2 w-full text-gray-700 placeholder-gray-400" />
          </div>
        )}

        <div className="flex flex-col items-center mt-4">
          <button type="submit"
            disabled={loading}
            className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-400 w-48 text-center">
            {loading ? "Submitting..." : "Register"}
          </button>

          <div className="text-sm mt-3 text-center">
            <span className="text-gray-600 mr-2">Already have an account?</span>
            <a href="/login" className="text-blue-500 hover:underline">Login</a>
          </div>
        </div>
      </form>
    </div>
  );
}
