'use client';

import { SavedCar } from '@/types';
import { Car, X, Plus, Bookmark } from 'lucide-react';

interface SavedCarsSidebarProps {
  cars: SavedCar[];
  onRemove: (id: string) => void;
  onAddClick: () => void;
}

export default function SavedCarsSidebar({ cars, onRemove, onAddClick }: SavedCarsSidebarProps) {
  return (
    <aside
      className="flex flex-col h-full rounded-xl overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="flex items-center gap-2">
          <Bookmark size={15} style={{ color: '#7c6af7' }} />
          <span className="text-sm font-semibold" style={{ color: '#e2e8f0', fontFamily: 'Space Grotesk, sans-serif' }}>
            Saved Cars
          </span>
        </div>
        <button
          onClick={onAddClick}
          className="btn-violet flex items-center gap-1 text-xs px-3 py-1.5"
          style={{ borderRadius: '8px' }}
        >
          <Plus size={12} /> Add
        </button>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar">
        {cars.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full py-10 gap-3 text-center">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(124,106,247,0.1)', border: '1px solid rgba(124,106,247,0.15)' }}
            >
              <Car size={20} style={{ color: '#7c6af7' }} />
            </div>
            <p className="text-xs leading-relaxed" style={{ color: '#475569' }}>
              No saved cars yet.<br />Add cars you&apos;re interested in!
            </p>
          </div>
        ) : (
          cars.map((car) => (
            <div
              key={car.id}
              className="group relative p-3 rounded-xl transition-all"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <button
                onClick={() => onRemove(car.id)}
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity w-5 h-5 rounded-md flex items-center justify-center"
                style={{ background: 'rgba(239,68,68,0.15)' }}
                aria-label="Remove"
              >
                <X size={11} color="#ef4444" />
              </button>
              <p className="font-semibold text-xs pr-6 truncate" style={{ color: '#e2e8f0', fontFamily: 'Space Grotesk, sans-serif' }}>
                {car.name}
              </p>
              {car.price && (
                <p className="text-xs mt-0.5 font-medium" style={{ color: '#7c6af7' }}>{car.price}</p>
              )}
              {car.notes && (
                <p className="text-xs mt-1.5 leading-relaxed line-clamp-2" style={{ color: '#475569' }}>
                  {car.notes}
                </p>
              )}
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div
        className="px-4 py-2 text-xs"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)', color: '#334155' }}
      >
        {cars.length} car{cars.length !== 1 ? 's' : ''} saved
      </div>
    </aside>
  );
}
