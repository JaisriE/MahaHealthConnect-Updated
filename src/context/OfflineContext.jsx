import React, { createContext, useContext, useState } from 'react';

const OfflineContext = createContext();

export const OfflineProvider = ({ children }) => {
  const [isOnline, setIsOnline] = useState(true);
  const [pendingSyncCount, setPendingSyncCount] = useState(2); // Initial pending local records
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncHistory, setSyncHistory] = useState([
    { id: 1, type: "Triage Record (PAT-10247)", timestamp: "2026-08-30 10:45 AM", status: "PENDING_SYNC" },
    { id: 2, type: "Medicine Stock Dispensed (Amlodipine)", timestamp: "2026-08-30 11:10 AM", status: "PENDING_SYNC" }
  ]);

  const toggleNetworkStatus = () => {
    setIsOnline((prev) => !prev);
  };

  const addPendingRecord = (type) => {
    const newRecord = {
      id: Date.now(),
      type,
      timestamp: new Date().toLocaleString(),
      status: "PENDING_SYNC"
    };
    setSyncHistory((prev) => [newRecord, ...prev]);
    setPendingSyncCount((prev) => prev + 1);
  };

  const triggerSync = () => {
    if (pendingSyncCount === 0) return;
    setIsSyncing(true);
    setTimeout(() => {
      setSyncHistory((prev) =>
        prev.map((item) => ({ ...item, status: "SYNCED" }))
      );
      setPendingSyncCount(0);
      setIsSyncing(false);
    }, 1500);
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
