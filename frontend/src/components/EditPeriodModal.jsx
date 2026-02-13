import React, { useState } from 'react';
import dayjs from 'dayjs';

const EditPeriodModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    startDate: initialData?.startDate || dayjs().format('YYYY-MM-DD'),
    cycleLength: initialData?.cycleLength || 28,
    periodLength: initialData?.periodLength || 5
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Edit Period Information</h2>
          <button className="close-button" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="startDate">Last Period Start Date</label>
            <input
              type="date"
              id="startDate"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="cycleLength">Cycle Length (days)</label>
            <input
              type="number"
              id="cycleLength"
              min="21"
              max="35"
              value={formData.cycleLength}
              onChange={(e) => setFormData({ ...formData, cycleLength: parseInt(e.target.value) })}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="periodLength">Period Length (days)</label>
            <input
              type="number"
              id="periodLength"
              min="2"
              max="7"
              value={formData.periodLength}
              onChange={(e) => setFormData({ ...formData, periodLength: parseInt(e.target.value) })}
              required
            />
          </div>

          <div className="modal-footer">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save-button">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPeriodModal; 