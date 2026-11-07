
import React, { useState } from 'react';
import { User } from '../types';

interface SettingsProps {
  user: User;
  onUpdate: (loginId: string, password: string) => void;
  onClose: () => void;
}

const Settings: React.FC<SettingsProps> = ({ user, onUpdate, onClose }) => {
  const [newLoginId, setNewLoginId] = useState(user.loginId);
  const [newPassword, setNewPassword] = useState(user.password || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(newLoginId, newPassword);
    onClose();
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Security Credentials</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-widest font-bold">Update terminal access credentials</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">Login ID</label>
          <input
            type="text"
            required
            value={newLoginId}
            onChange={(e) => setNewLoginId(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-slate-900 dark:text-white font-bold transition-all"
            placeholder="Choose new ID"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">Password</label>
          <input
            type="password"
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-slate-900 dark:text-white font-bold transition-all"
            placeholder="Choose new password"
          />
        </div>

        <div className="flex space-x-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 px-4 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all uppercase text-xs tracking-wider"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl shadow-lg shadow-emerald-600/20 transition-all active:scale-95 uppercase text-xs tracking-wider"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
