'use client';

import { Plus, Minus, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

export type PanDirection = 'up' | 'down' | 'left' | 'right';

interface MapControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onPan: (direction: PanDirection) => void;
  onReset: () => void;
  canZoomIn?: boolean;
  canZoomOut?: boolean;
  className?: string;
}

interface ControlButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  title: string;
}

const ControlButton: React.FC<ControlButtonProps> = ({
  onClick,
  disabled = false,
  children,
  title,
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    title={title}
    className={cn(
      'w-8 h-8 flex items-center justify-center rounded-lg transition-all',
      'bg-white/10 hover:bg-white/20 active:bg-white/30',
      'text-white/70 hover:text-white',
      'disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white/10'
    )}
  >
    {children}
  </button>
);

export const MapControls: React.FC<MapControlsProps> = ({
  onZoomIn,
  onZoomOut,
  onPan,
  onReset,
  canZoomIn = true,
  canZoomOut = true,
  className,
}) => {
  return (
    <div
      className={cn(
        'fixed z-50 bg-slate-900/95 backdrop-blur-md rounded-xl shadow-2xl border border-white/10 p-2',
        className
      )}
    >
      <div className="flex flex-col gap-1">
        {/* Zoom Controls */}
        <div className="flex flex-col gap-0.5">
          <ControlButton onClick={onZoomIn} disabled={!canZoomIn} title="Zoom in">
            <Plus className="w-4 h-4" />
          </ControlButton>
          <ControlButton onClick={onZoomOut} disabled={!canZoomOut} title="Zoom out">
            <Minus className="w-4 h-4" />
          </ControlButton>
        </div>

        <div className="border-t border-white/10 my-1" />

        {/* Pan Controls - D-pad layout */}
        <div className="flex flex-col items-center gap-0.5">
          <ControlButton onClick={() => onPan('up')} title="Pan up">
            <ArrowUp className="w-4 h-4" />
          </ControlButton>
          <div className="flex gap-0.5">
            <ControlButton onClick={() => onPan('left')} title="Pan left">
              <ArrowLeft className="w-4 h-4" />
            </ControlButton>
            <ControlButton onClick={onReset} title="Reset view">
              <RotateCcw className="w-3.5 h-3.5" />
            </ControlButton>
            <ControlButton onClick={() => onPan('right')} title="Pan right">
              <ArrowRight className="w-4 h-4" />
            </ControlButton>
          </div>
          <ControlButton onClick={() => onPan('down')} title="Pan down">
            <ArrowDown className="w-4 h-4" />
          </ControlButton>
        </div>
      </div>
    </div>
  );
};
