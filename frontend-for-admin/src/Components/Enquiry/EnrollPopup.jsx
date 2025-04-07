import React, { useState } from "react";
import ep from "./EnrollPopup.module.css"; // Import CSS file
import { useLocation, useSearchParams } from "react-router-dom"; // Import useLocation



const EnrollPopup = ({ isOpen, onClose, enquiry,mode  }) => {
      const [searchParams] = useSearchParams(); // Get URL parameters
    
      const program = searchParams.get("program") || "dayCare";

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

    try {
      const response = await fetch(`http://localhost:5000/api/stu_enq/${program}/students`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage("Enrollment successful!");
      } else {
        setMessage("Failed to enroll. Try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

    if (!isOpen) return null;

    return (
        <div className={ep.popupOverlay}>
            <div className={ep.popupContent}>
                <span className={ep.closeIcon} onClick={onClose}>&times;</span>
                {mode === "view" ? (
          // View mode: Show student details
          <>
            <h2>Student Details</h2>
           
            <p><strong>Name:</strong> {enquiry?.first_name || ""} {enquiry?.last_name || ""}</p>
            <p><strong>Contact:</strong> {enquiry.mobile}</p>
            <p><strong>Program:</strong> {enquiry.programs}</p>
            <p><strong>Date:</strong> {new Date(enquiry.created_at).toISOString().split("T")[0]}</p>
            <p><strong>ID:</strong> {enquiry.location}</p>
            <p><strong>ID:</strong> {enquiry.gender}</p>
            <p><strong>ID:</strong> {enquiry.email}</p>
            
            <p><strong>Status:</strong> {enquiry.checkit}</p>
          </>
        ) : (
          // Enroll mode: Show enrollment form
          <>
                <h2>Enroll Student</h2>
                <form onSubmit={handleSubmit}>
                    <label>Student Name:</label>
                    <input type="text" name="student_name" value={formData.student_name} onChange={handleChange} required />

                    <label>Father's Name:</label>
                    <input type="text" name="father_name" value={formData.father_name} onChange={handleChange} required />

                    <label>Mother's Name:</label>
                    <input type="text" name="mother_name" value={formData.mother_name} onChange={handleChange} required />

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

                    <label>Registration Date:</label>
                    <input type="date" name="registration_date" value={formData.registration_date} onChange={handleChange} />

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
