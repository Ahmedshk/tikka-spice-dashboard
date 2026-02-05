import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { Layout } from '../../components/common/Layout';
import { Spinner } from '../../components/common/Spinner';
import { goalService } from '../../services/goal.service';
import type { Goal } from '../../types';
import { RootState } from '../../store/store';
import AdminAndSettingsIcon from '@assets/icons/admin_and_settings.svg?react';

const defaultForm: Omit<Goal, '_id' | 'locationId' | 'createdAt' | 'updatedAt'> = {
  salesGoal: 0,
  laborCostGoal: 0,
  hoursGoal: 0,
  spmhGoal: 0,
  foodCostGoal: 0,
};

const fields: { key: keyof typeof defaultForm; label: string }[] = [
  { key: 'salesGoal', label: 'Sales Goal' },
  { key: 'laborCostGoal', label: 'Labor cost % Goal' },
  { key: 'hoursGoal', label: 'Hours Goal' },
  { key: 'spmhGoal', label: 'SPMH Goal' },
  { key: 'foodCostGoal', label: 'Food cost % Goal' },
];

export const GoalSetting = () => {
  const currentLocation = useSelector((state: RootState) => state.location.currentLocation);
  const [form, setForm] = useState(defaultForm);
  const [saved, setSaved] = useState(defaultForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!currentLocation?._id) {
      setLoading(false);
      setForm(defaultForm);
      setSaved(defaultForm);
      return;
    }
    let cancelled = false;
    setLoading(true);
    setError('');
    goalService
      .getByLocationId(currentLocation._id)
      .then((goals) => {
        if (cancelled) return;
        const values = {
          salesGoal: goals.salesGoal ?? 0,
          laborCostGoal: goals.laborCostGoal ?? 0,
          hoursGoal: goals.hoursGoal ?? 0,
          spmhGoal: goals.spmhGoal ?? 0,
          foodCostGoal: goals.foodCostGoal ?? 0,
        };
        setForm(values);
        setSaved(values);
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Failed to load goals');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [currentLocation?._id]);

  const handleChange = (key: keyof typeof defaultForm, value: string) => {
    const num = value === '' ? 0 : Number(value);
    setForm((prev) => ({ ...prev, [key]: Number.isNaN(num) ? prev[key] : num }));
  };

  const handleReset = () => {
    setForm(saved);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentLocation?._id) {
      setError('Please select a location first.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      const updated = await goalService.upsert({
        locationId: currentLocation._id,
        ...form,
      });
      const values = {
        salesGoal: updated.salesGoal ?? 0,
        laborCostGoal: updated.laborCostGoal ?? 0,
        hoursGoal: updated.hoursGoal ?? 0,
        spmhGoal: updated.spmhGoal ?? 0,
        foodCostGoal: updated.foodCostGoal ?? 0,
      };
      setSaved(values);
      setForm(values);
      toast.success('Goals saved successfully');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to save goals';
      setError(message);
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Layout>
      <div className="p-6">
        {/* Page header - outside white container */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <h2 className="flex items-center gap-2 text-base md:text-lg 2xl:text-xl font-semibold text-text-primary">
            <AdminAndSettingsIcon className="w-4 h-4 md:w-5 md:h-5 2xl:w-6 2xl:h-6 text-text-primary" aria-hidden />
            Goal Setting
          </h2>
        </div>

        {/* White container */}
        <div className="bg-card-background rounded-xl overflow-hidden">
          {/* Gray top bar */}
          <div className="h-4 rounded-t-xl bg-text-primary" aria-hidden />
          <div className="p-6">
            {(() => {
              if (!currentLocation?._id) {
                return (
                  <p className="text-text-primary">
                    Select a location from the navbar to view and edit goals. Each location has its own goals.
                  </p>
                );
              }
              if (loading) {
                return <p className="text-text-primary">Loading goals...</p>;
              }
              return (
                <form onSubmit={handleSubmit} className="max-w-2xl">
                  <p className="mb-8 text-text-primary">
                    <span className="font-semibold text-text-secondary text-sm md:text-base 2xl:text-lg ">{currentLocation.storeName}</span>
                    {currentLocation.address && (
                      <span className="block text-text-primary mt-0.5 truncate text-xs md:text-sm 2xl:text-base " title={currentLocation.address}>
                        {currentLocation.address}
                      </span>
                    )}
                  </p>
                  {error && (
                    <p className="mb-4 text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg" role="alert">
                      {error}
                    </p>
                  )}
                  <div className="space-y-4">
                    {fields.map(({ key, label }) => {
                      const step = key === 'laborCostGoal' || key === 'foodCostGoal' ? 0.1 : 1;
                      return (
                        <div key={key} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                          <label htmlFor={key} className="text-sm md:text-base 2xl:text-lg font-medium text-text-primary sm:w-48 shrink-0">
                            {label}
                          </label>
                          <input
                            id={key}
                            type="number"
                            min={0}
                            step={step}
                            value={form[key] === 0 ? '' : form[key]}
                            onChange={(e) => handleChange(key, e.target.value)}
                            className="flex-1 max-w-md px-4 py-3 bg-[#F9F9F9] border border-[#DBDBDB] rounded-xl text-sm md:text-base 2xl:text-lg text-text-primary"
                          />
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-6 md:mt-12 flex gap-3 max-w-xs">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="flex-1 min-w-0 flex items-center justify-center px-4 py-3 border border-gray-200 rounded-xl text-sm md:text-base 2xl:text-lg font-medium text-text-primary hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      Reset
                    </button>
                    <button
                      type="submit"
                      disabled={saving}
                      className="flex-1 min-w-0 flex items-center justify-center gap-2 px-4 py-3 bg-button-primary text-white rounded-xl text-sm md:text-base 2xl:text-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-60 cursor-pointer"
                    >
                      {saving ? (
                        <>
                          <Spinner size="sm" className="h-4 w-4 text-white" />
                          Saving...
                        </>
                      ) : (
                        'Save Goals'
                      )}
                    </button>
                  </div>
                </form>
              );
            })()}
          </div>
        </div>
      </div>
    </Layout>
  );
};
