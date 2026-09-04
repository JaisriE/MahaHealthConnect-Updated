import React, { createContext, useContext, useState } from 'react';
import { useEffect } from 'react';
import { api } from '../services/api';
import { clearOfflineRecords, getOfflineRecords, queueOfflineRecord } from '../services/offlineStore';

const OfflineContext = createContext();

export const OfflineProvider = ({ children }) => {
  const [isOnline, setIsOnline] = useState(() => navigator.onLine);
  const [pendingSyncCount, setPendingSyncCount] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncHistory, setSyncHistory] = useState([
    { id: 1, type: "Triage Record (PAT-10247)", timestamp: "2026-08-30 10:45 AM", status: "PENDING_SYNC" },
    { id: 2, type: "Medicine Stock Dispensed (Amlodipine)", timestamp: "2026-08-30 11:10 AM", status: "PENDING_SYNC" }
  ]);

  useEffect(() => {
    const syncCount = () => getOfflineRecords().then((items) => setPendingSyncCount(items.length)).catch(() => {});
    const goOnline = () => { setIsOnline(true); syncCount(); };
    const goOffline = () => setIsOnline(false);
    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);
    syncCount();
    return () => { window.removeEventListener('online', goOnline); window.removeEventListener('offline', goOffline); };
  }, []);

  const toggleNetworkStatus = () => setIsOnline((prev) => !prev);

  const addPendingRecord = (type) => {
    const newRecord = {
      id: Date.now(),
      local_id: `LOCAL-${Date.now()}`,
      type,
      timestamp: new Date().toLocaleString(),
      status: "PENDING_SYNC"
    };
    queueOfflineRecord(newRecord).catch(() => {});
    setSyncHistory((prev) => [newRecord, ...prev]);
    setPendingSyncCount((prev) => prev + 1);
  };

  const triggerSync = async () => {
    const queued = await getOfflineRecords().catch(() => []);
    if (queued.length === 0) return;
    setIsSyncing(true);
    try {
      const result = await api.sync(queued);
      await clearOfflineRecords(result.results.map((item) => item.local_id));
      setSyncHistory((prev) => prev.map((item) => ({ ...item, status: "SYNCED" })));
      setPendingSyncCount(0);
    } catch {
      setSyncHistory((prev) => prev.map((item) => item.status === 'PENDING_SYNC' ? { ...item, status: 'SYNC_FAILED' } : item));
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <OfflineContext.Provider
      value={{
        isOnline,
        toggleNetworkStatus,
        pendingSyncCount,
        isSyncing,
        syncHistory,
        triggerSync,
        addPendingRecord
      }}
    >
      {children}
    </OfflineContext.Provider>
  );
};

export const useOffline = () => useContext(OfflineContext);
