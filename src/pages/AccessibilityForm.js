import React, { useState } from "react";
import axios from "axios";
import "./AccessibilityForm.css";
import pttlogo from "../components/pttlogo.png";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AccessibilityForm = () => {
  const navigate = useNavigate();

  const [showNotice, setShowNotice] = useState(true);
  const [formData, setFormData] = useState({
    has_ramp: "",
    has_wheelchair_access: "",
    has_disable_parking: "",
    has_automatic_door: "",
    has_personel_support_physical: "",
    has_braille_signs: "",
    has_audio_guidance: "",
    has_audio_guidance_atm: "",
    has_personel_support_visual: "",
    has_personel_support_hearing: "",
    has_visual_guide: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const isFormComplete = Object.values(formData).every(value => value !== "");
    if (!isFormComplete) {
      toast.warning("Lütfen tüm alanları doldurun.");
      return;
    }

    try {
      await axios.post("http://localhost:8000/api/forms/", formData, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      toast.success("Form başarıyla gönderildi.");

      
      setTimeout(() => {
        navigate("/thanks");
      }, 1000);

    } catch (err) {
      console.error(err.response?.data || err);
      toast.error("Form gönderilirken bir hata oluştu.");
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />

      {showNotice && (
        <div className="notice-overlay">
          <div className="notice-box">
            <h3>Bilgilendirme</h3>
            <p>
              Bu form, PTT şubelerinin erişilebilirlik durumunu değerlendirmek amacıyla hazırlanmıştır.
              Lütfen her soruyu dikkatle yanıtlayınız.
            </p>
            <button onClick={() => setShowNotice(false)}>Tamam</button>
          </div>
        </div>
      )}

      <div className="form-container">
        <div className="form-header">
          <img src={pttlogo} alt="PTT Logo" className="ptt-logo" />
          <h2 className="form-title">Erişilebilirlik Değerlendirme Formu</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <h3 className="category-title">Bedensel Engelliler İçin</h3>
          <FormGroup label="Engelli Rampası" name="has_ramp" value={formData.has_ramp} onChange={handleChange} />
          <FormGroup label="Tekerlekli Sandalye Erişimi" name="has_wheelchair_access" value={formData.has_wheelchair_access} onChange={handleChange} />
          <FormGroup label="Engelli Otoparkı" name="has_disable_parking" value={formData.has_disable_parking} onChange={handleChange} />
          <FormGroup label="Otomatik Kapı" name="has_automatic_door" value={formData.has_automatic_door} onChange={handleChange} />
          <FormGroup label="Eğitimli Personel Desteği" name="has_personel_support_physical" value={formData.has_personel_support_physical} onChange={handleChange} />

          <h3 className="category-title">Görme Engelliler İçin</h3>
          <FormGroup label="Braille (Kabartmalı) Tabelalar ve Hissedilebilir Yürüme Yüzeyleri" name="has_braille_signs" value={formData.has_braille_signs} onChange={handleChange} />
          <FormGroup label="Sıra Alma ve Duyuru Sisteminde Sesli Yönlendirme" name="has_audio_guidance" value={formData.has_audio_guidance} onChange={handleChange} />
          <FormGroup label="ATM'lerde Sesli Yönlendirme" name="has_audio_guidance_atm" value={formData.has_audio_guidance_atm} onChange={handleChange} />
          <FormGroup label="Eğitimli Personel Desteği" name="has_personel_support_visual" value={formData.has_personel_support_visual} onChange={handleChange} />

          <h3 className="category-title">Duyma Engelliler İçin</h3>
          <FormGroup label="Eğitimli Personel Desteği" name="has_personel_support_hearing" value={formData.has_personel_support_hearing} onChange={handleChange} />
          <FormGroup label="Görsel Yönlendirme Sistemi" name="has_visual_guide" value={formData.has_visual_guide} onChange={handleChange} />

          <button type="submit" className="submit-button">Gönder</button>
        </form>
      </div>
    </>
  );
};

const FormGroup = ({ label, name, value, onChange }) => (
  <div className="form-group">
    <label>{label}</label>
    <div className="radio-options">
      <label>
        <input type="radio" name={name} value="yes" checked={value === "yes"} onChange={onChange} />
        Var ve yeterli
      </label>
      <label>
        <input type="radio" name={name} value="partial" checked={value === "partial"} onChange={onChange} />
        Var ama yetersiz
      </label>
      <label>
        <input type="radio" name={name} value="no" checked={value === "no"} onChange={onChange} />
        Yok
      </label>
    </div>
  </div>
);

export default AccessibilityForm;
