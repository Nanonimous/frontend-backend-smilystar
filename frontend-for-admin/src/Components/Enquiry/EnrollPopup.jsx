import React, { useState } from "react";
import ep from "./EnrollPopup.module.css"; // Import CSS file

const EnrollPopup = ({ isOpen, onClose, enquiry,mode  }) => {
    const [formData, setFormData] = useState({
        student_name: enquiry?.name || "",
        father_name:"",
        mother_name: "",
        address: `${enquiry?.location || ""}, ${enquiry?.city || ""}, ${enquiry?.state || ""}, ${enquiry?.country || ""}, ${enquiry?.pincode || ""}`,
        email: enquiry?.email || "",
        age:  enquiry?.age ||"",
        phone_number: enquiry?.contact || "",
        gender: enquiry?.gender || "",
        monthly_fee:  "",
        registration_date: new Date().toISOString().split("T")[0] // Default to current date
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Enrolled Student Data:", formData);
        // API call to save data in database
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
            <p><strong>ID:</strong> {enquiry.id}</p>
            <p><strong>Name:</strong> {enquiry.name}</p>
            <p><strong>Contact:</strong> {enquiry.contact}</p>
            <p><strong>Program:</strong> {enquiry.program}</p>
            <p><strong>Date:</strong> {enquiry.date}</p>
            <p><strong>ID:</strong> {enquiry.location}</p>
            <p><strong>ID:</strong> {enquiry.gender}</p>
            <p><strong>ID:</strong> {enquiry.email}</p>
            
            <p><strong>Status:</strong> {enquiry.status}</p>
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

                    <button type="submit" className={ep.submitBtn}>Submit</button>
                </form>

                </>

)}
            </div>
        </div>
    );
};

export default EnrollPopup;
