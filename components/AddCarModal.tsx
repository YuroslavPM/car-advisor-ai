'use client';

import { useState } from 'react';
import { X, Car } from 'lucide-react';

interface AddCarModalProps {
  onSave: (name: string, price: string, notes: string) => void;
  onClose: () => void;
}

export default function AddCarModal({ onSave, onClose }: AddCarModalProps) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [notes, setNotes] = useState('');

  const handleSave = () => {
    if (!name.trim()) return;
    onSave(name.trim(), price.trim(), notes.trim());
    onClose();
  };

  const inputStyle = {
    background: 'rgba(255,255,255,0.8)',
    borderColor: 'rgba(30,58,95,0.2)',
    color: '#1e293b',
    outline: 'none',
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
      style={{ background: 'rgba(15,30,60,0.4)', backdropFilter: 'blur(8px)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="modal-slide-up w-full max-w-md rounded-2xl border p-6 shadow-2xl"
        style={{
          background: 'rgba(255,255,255,0.95)',
          borderColor: 'rgba(30,58,95,0.15)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(217,119,6,0.1)' }}
            >
              <Car size={16} style={{ color: '#d97706' }} />
            </div>
            <h3 className="font-bold text-base" style={{ color: '#1e3a5f' }}>
              Add a Car
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-100 transition-colors"
          >
            <X size={16} style={{ color: '#64748b' }} />
          </button>
        </div>

        {/* Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: '#1e3a5f' }}>
              Car Name / Model *
            </label>
            <input
              type="text"
              placeholder="e.g. Volkswagen Golf 8 2023"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border text-sm transition-all focus:ring-2"
              style={{
                ...inputStyle,
                '--tw-ring-color': 'rgba(217,119,6,0.3)',
              } as React.CSSProperties}
              autoFocus
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: '#1e3a5f' }}>
              Price
            </label>
            <input
              type="text"
              placeholder="e.g. €18,500"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border text-sm transition-all focus:ring-2"
              style={{
                ...inputStyle,
                '--tw-ring-color': 'rgba(217,119,6,0.3)',
              } as React.CSSProperties}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: '#1e3a5f' }}>
              Notes <span style={{ color: '#94a3b8', fontWeight: 400 }}>(optional)</span>
            </label>
            <textarea
              placeholder="Your impressions, pros/cons, test drive notes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full px-3 py-2.5 rounded-xl border text-sm transition-all focus:ring-2 resize-none"
              style={{
                ...inputStyle,
                '--tw-ring-color': 'rgba(217,119,6,0.3)',
              } as React.CSSProperties}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-5">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border text-sm font-medium transition-all hover:bg-slate-50"
            style={{ borderColor: 'rgba(30,58,95,0.2)', color: '#64748b' }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!name.trim()}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              background: name.trim()
                ? 'linear-gradient(135deg, #d97706, #b45309)'
                : '#e2e8f0',
              color: name.trim() ? '#fff' : '#94a3b8',
            }}
          >
            Save Car
          </button>
        </div>
      </div>
    </div>
  );
}
