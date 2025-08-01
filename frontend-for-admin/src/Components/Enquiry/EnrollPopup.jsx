import React, { useState } from "react";
import ep from "./EnrollPopup.module.css"; // Import CSS file
import { useLocation, useSearchParams } from "react-router-dom"; // Import useLocation
import axios from "axios";

const Domain = process.env.REACT_APP_BACKEND_URL;

const EnrollPopup = ({enquiry,mode ,onClose, onEnroll ,onAdd}) => {
          const location = useLocation(); // Get the current location
      const [formData, setFormData] = useState({
        student_name: `${enquiry?.first_name || ""} ${enquiry?.last_name || ""}`.trim(),
        father_name: "",
        mother_name: "",
        address: `${enquiry?.location || ""}, ${enquiry?.city || ""}, ${enquiry?.state || ""}, ${enquiry?.country || ""}, ${enquiry?.pincode || ""}`.trim(),
        email: enquiry?.email || "",
        age: enquiry?.age || "",
        phone_number: enquiry?.mobile || "",
        gender: enquiry?.gender || "",
        monthly_fee: "",
       
    });
    

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

     const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    setLoading(true);
    formData.age = parseInt(formData.age)
    formData.monthly_fee = parseInt(formData.monthly_fee)
      let prog = (mode == "addstudent") ? location.pathname.split("/").filter(Boolean)[0] : enquiry.programs
    try { 
      
      const res = await axios.post(`${Domain}api/stu_enq/${prog}/students`,formData,{
    withCredentials: true, // ✅ This tells the browser to send cookies
  })
      const result = res.data;
      onClose()
      {mode == "addstudent" ? onAdd(formData) : onEnroll() }
      
    } catch (error) {
      console.error("Error:", error);
      setMessage("Something went wrong!");
    } finally {
      setLoading(false);  
    }
  };

    // if (!isOpen) return null;

    return (
        <div className={ep.popupOverlay}>
            <div className={ep.popupContent}>
                <span className={ep.closeIcon} onClick={onClose}>&times;</span>
{mode === "view" && (
  <>
    <h2>Student Details</h2>
    <p><strong>Name:</strong> {enquiry?.first_name || ""} {enquiry?.last_name || ""}</p>
    <p><strong>Contact:</strong> {enquiry.mobile}</p>
    <p><strong>Program:</strong> {enquiry.programs}</p>
    <p><strong>Date:</strong> {new Date(enquiry.created_at).toISOString().split("T")[0]}</p>
    <p><strong>Location:</strong> {enquiry.location}</p>
    <p><strong>Gender:</strong> {enquiry.gender}</p>
    <p><strong>Email:</strong> {enquiry.email}</p>
    <p><strong>Status:</strong> {enquiry.checkit}</p>
  </>
)}

{mode === "addstudent" && (
  <>
    <h2>Add New Student (No Prefilled Data)</h2>
    <form onSubmit={handleSubmit}>
      <label>Student Name:</label>
      <input type="text" name="student_name" value={formData.student_name} onChange={handleChange} required />

      <label>Father's Name:</label>
      <input type="text" name="father_name" value={formData.father_name} onChange={handleChange} />

      <label>Mother's Name:</label>
      <input type="text" name="mother_name" value={formData.mother_name} onChange={handleChange} />

      <label>Address:</label>
      <textarea name="address" value={formData.address} onChange={handleChange} required></textarea>

      <label>Email:</label>
      <input type="email" name="email" value={formData.email} onChange={handleChange} required />

      <label>Age:</label>
      <input type="number" name="age" value={formData.age} onChange={handleChange} required />

      <label>Phone Number:</label>
      <input type="text" name="phone_number" value={formData.phone_number} onChange={handleChange} required />

      <label>Gender:</label>
      <select name="gender" value={formData.gender} onChange={handleChange} required>
        <option value="">Select</option>
        <option value="M">Male</option>
        <option value="F">Female</option>
      </select>

      <label>Monthly Fee:</label>
      <input type="number" step="0.01" name="monthly_fee" value={formData.monthly_fee} onChange={handleChange} required />

      <button type="submit" className={ep.submitBtn} disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  </>
)}

{mode === "enroll" && (
  <>
    <h2>Enroll Student</h2>
    <form onSubmit={handleSubmit}>
      <label>Student Name:</label>
      <input type="text" name="student_name" value={formData.student_name} onChange={handleChange} required />

      <label>Father's Name:</label>
      <input type="text" name="father_name" value={formData.father_name} onChange={handleChange} />

      <label>Mother's Name:</label>
      <input type="text" name="mother_name" value={formData.mother_name} onChange={handleChange} />

      <label>Address:</label>
      <textarea name="address" value={formData.address} onChange={handleChange} required></textarea>

      <label>Email:</label>
      <input type="email" name="email" value={formData.email} onChange={handleChange} required />

      <label>Age:</label>
      <input type="number" name="age" value={formData.age} onChange={handleChange} required />

      <label>Phone Number:</label>
      <input type="text" name="phone_number" value={formData.phone_number} onChange={handleChange} required />

      <label>Gender:</label>
      <select name="gender" value={formData.gender} onChange={handleChange} required>
        <option value="">Select</option>
        <option value="M">Male</option>
        <option value="F">Female</option>
      </select>

      <label>Monthly Fee:</label>
      <input type="number" step="0.01" name="monthly_fee" value={formData.monthly_fee} onChange={handleChange} required />

      <button type="submit" className={ep.submitBtn} disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  </>
)}

            </div>
        </div>
    );
};

export default EnrollPopup;
