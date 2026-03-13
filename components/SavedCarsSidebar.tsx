'use client';

import { SavedCar } from '@/types';
import { Car, X, Plus, BookmarkCheck } from 'lucide-react';

interface SavedCarsSidebarProps {
  cars: SavedCar[];
  onRemove: (id: string) => void;
  onAddClick: () => void;
}

export default function SavedCarsSidebar({
  cars,
  onRemove,
  onAddClick,
}: SavedCarsSidebarProps) {
  return (
    <aside
      className="flex flex-col h-full rounded-2xl border overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.6)',
        borderColor: 'rgba(30,58,95,0.15)',
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b"
        style={{ borderColor: 'rgba(30,58,95,0.12)' }}
      >
        <div className="flex items-center gap-2">
          <BookmarkCheck size={18} style={{ color: '#d97706' }} />
          <h2 className="font-semibold text-sm" style={{ color: '#1e3a5f' }}>
            Saved Cars
          </h2>
        </div>
        <button
          onClick={onAddClick}
          className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-full font-medium transition-all hover:opacity-90 active:scale-95"
          style={{
            background: 'linear-gradient(135deg, #d97706, #b45309)',
            color: '#fff',
          }}
        >
          <Plus size={13} />
          Add Car
        </button>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar">
        {cars.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full py-10 gap-3 text-center">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(217,119,6,0.1)' }}
            >
              <Car size={22} style={{ color: '#d97706' }} />
            </div>
            <p className="text-xs leading-relaxed" style={{ color: '#64748b' }}>
              No saved cars yet.
              <br />
              Add cars you're interested in!
            </p>
          </div>
        ) : (
          cars.map((car) => (
            <div
              key={car.id}
              className="group relative p-3 rounded-xl border transition-all hover:shadow-sm"
              style={{
                background: 'rgba(255,255,255,0.8)',
                borderColor: 'rgba(30,58,95,0.12)',
              }}
            >
              <button
                onClick={() => onRemove(car.id)}
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity w-6 h-6 rounded-full flex items-center justify-center hover:bg-red-100"
                aria-label="Remove car"
              >
                <X size={13} style={{ color: '#ef4444' }} />
              </button>
              <p
                className="font-semibold text-sm pr-6 leading-tight"
                style={{ color: '#1e3a5f' }}
              >
                {car.name}
              </p>
              <p className="text-xs mt-0.5 font-medium" style={{ color: '#d97706' }}>
                {car.price}
              </p>
              {car.notes && (
                <p
                  className="text-xs mt-1.5 leading-relaxed line-clamp-2"
                  style={{ color: '#64748b' }}
                >
                  {car.notes}
                </p>
              )}
            </div>
          ))
        )}
      </div>

      {/* Footer count */}
      <div
        className="px-4 py-2 border-t text-xs"
        style={{
          borderColor: 'rgba(30,58,95,0.12)',
          color: '#94a3b8',
        }}
      >
        {cars.length} car{cars.length !== 1 ? 's' : ''} saved
      </div>
    </aside>
  );
}
