'use client';

import { useState } from 'react';
import { X, Car } from 'lucide-react';

interface AddCarModalProps {
  onSave: (name: string, price: string, notes: string) => void;
  onClose: () => void;
}

const fieldStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '10px',
  color: '#e2e8f0',
  width: '100%',
  padding: '10px 14px',
  fontSize: '0.875rem',
  fontFamily: 'Plus Jakarta Sans, sans-serif',
  transition: 'all 0.2s',
};

export default function AddCarModal({ onSave, onClose }: AddCarModalProps) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [notes, setNotes] = useState('');

  const handleSave = () => {
    if (!name.trim()) return;
    onSave(name.trim(), price.trim(), notes.trim());
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(12px)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="modal-slide-up w-full max-w-md rounded-2xl p-6"
        style={{
          background: '#0f1829',
          border: '1px solid rgba(124,106,247,0.25)',
          boxShadow: '0 0 60px rgba(124,106,247,0.15), 0 30px 60px rgba(0,0,0,0.5)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(124,106,247,0.15)', border: '1px solid rgba(124,106,247,0.2)' }}
            >
              <Car size={16} color="#7c6af7" />
            </div>
            <h3 className="font-bold text-base" style={{ color: '#f1f5f9', fontFamily: 'Space Grotesk, sans-serif' }}>
              Add a Car
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors hover:bg-white/5"
          >
            <X size={15} color="#64748b" />
          </button>
        </div>

        {/* Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold mb-2" style={{ color: '#64748b', fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Car Name / Model *
            </label>
            <input
              type="text"
              placeholder="e.g. Volkswagen Golf 8 2023"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={fieldStyle}
              autoFocus
            />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-2" style={{ color: '#64748b', fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Price
            </label>
            <input
              type="text"
              placeholder="e.g. €18,500"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              style={fieldStyle}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-2" style={{ color: '#64748b', fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Notes <span style={{ color: '#334155', textTransform: 'none', letterSpacing: 0 }}>(optional)</span>
            </label>
            <textarea
              placeholder="Impressions, pros/cons, test drive notes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              style={{ ...fieldStyle, resize: 'none' }}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-6">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-white/5"
            style={{ border: '1px solid rgba(255,255,255,0.08)', color: '#64748b', fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!name.trim()}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            style={{
              background: name.trim() ? 'linear-gradient(135deg, #7c6af7, #6457e8)' : 'rgba(255,255,255,0.05)',
              color: name.trim() ? '#fff' : '#64748b',
              fontFamily: 'Space Grotesk, sans-serif',
              boxShadow: name.trim() ? '0 4px 16px rgba(124,106,247,0.35)' : 'none',
            }}
          >
            Save Car
          </button>
        </div>
      </div>
    </div>
  );
}
