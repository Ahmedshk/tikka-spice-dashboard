import { useState, useEffect } from 'react';
import { locationService } from '../../services/location.service';
import type { Location } from '../../types';

export interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
  editLocation: Location | null;
}

export const LocationModal = ({ isOpen, onClose, onSaved, editLocation }: LocationModalProps) => {
  const [storeName, setStoreName] = useState('');
  const [address, setAddress] = useState('');
  const [squareLocationId, setSquareLocationId] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const isEdit = Boolean(editLocation);

  useEffect(() => {
    if (editLocation) {
      setStoreName(editLocation.storeName);
      setAddress(editLocation.address);
      setSquareLocationId(editLocation.squareLocationId);
    } else {
      setStoreName('');
      setAddress('');
      setSquareLocationId('');
    }
    setError('');
  }, [editLocation, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      if (isEdit && editLocation) {
        await locationService.update(editLocation._id, { storeName, address, squareLocationId });
      } else {
        await locationService.create({ storeName, address, squareLocationId });
      }
      onSaved();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} aria-hidden />
      <div className="relative w-full max-w-md bg-card-background rounded-xl shadow-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-text-secondary mb-4">
          {isEdit ? 'Edit Location' : 'Add Location'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg" role="alert">
              {error}
            </p>
          )}
          <div>
            <label htmlFor="storeName" className="block text-sm font-medium text-text-primary mb-1">
              Store name
            </label>
            <input
              id="storeName"
              type="text"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              required
              className="w-full px-4 py-3 bg-[#F9F9F9] border border-[#DBDBDB] rounded-xl text-sm md:text-base 2xl:text-lg placeholder:text-sm md:placeholder:text-base 2xl:placeholder:text-lg"
              placeholder="Store name"
            />
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-text-primary mb-1">
              Address
            </label>
            <input
              id="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="w-full px-4 py-3 bg-[#F9F9F9] border border-[#DBDBDB] rounded-xl text-sm md:text-base 2xl:text-lg placeholder:text-sm md:placeholder:text-base 2xl:placeholder:text-lg"
              placeholder="Address"
            />
          </div>
          <div>
            <label htmlFor="squareLocationId" className="block text-sm font-medium text-text-primary mb-1">
              Square location ID
            </label>
            <input
              id="squareLocationId"
              type="text"
              value={squareLocationId}
              onChange={(e) => setSquareLocationId(e.target.value)}
              required
              className="w-full px-4 py-3 bg-[#F9F9F9] border border-[#DBDBDB] rounded-xl text-sm md:text-base 2xl:text-lg placeholder:text-sm md:placeholder:text-base 2xl:placeholder:text-lg"
              placeholder="Square location ID"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium text-text-primary hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 px-4 py-3 bg-button-primary text-white rounded-xl text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-60 cursor-pointer"
            >
              {(() => {
                if (submitting) return 'Saving...';
                return isEdit ? 'Update' : 'Add Location';
              })()}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
