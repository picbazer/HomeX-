'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Property, User, Report, Inquiry, ToastMessage, UserRole } from '../types';
import { INITIAL_PROPERTIES, DEMO_USERS } from '../data/demoData';
import { auth, googleProvider, db } from '../lib/firebase';
import { signInWithPopup, signOut, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { collection, doc, setDoc, getDocs, deleteDoc, updateDoc, Firestore } from 'firebase/firestore';

interface AppContextType {
  properties: Property[];
  currentUser: User | null;
  favorites: string[];
  compareList: string[];
  reports: Report[];
  inquiries: Inquiry[];
  toasts: ToastMessage[];
  unreadNotificationsCount: number;
  addToast: (message: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;
  toggleFavorite: (propertyId: string) => void;
  isFavorite: (propertyId: string) => boolean;
  toggleCompare: (propertyId: string) => void;
  isInCompare: (propertyId: string) => boolean;
  clearCompare: () => void;
  addProperty: (property: Omit<Property, 'id' | 'createdAt' | 'updatedAt' | 'views' | 'inquiries'>) => string;
  updateProperty: (id: string, updates: Partial<Property>) => void;
  deleteProperty: (id: string) => void;
  approveProperty: (id: string) => void;
  rejectProperty: (id: string) => void;
  togglePropertyPause: (id: string) => void;
  submitReport: (report: Omit<Report, 'id' | 'createdAt' | 'status'>) => void;
  submitInquiry: (inquiry: Omit<Inquiry, 'id' | 'createdAt' | 'status'>) => void;
  loginDemoUser: (role: UserRole) => void;
  loginAsAdmin: () => void;
  loginAsUser: () => void;
  loginWithGoogle: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  dismissReport: (reportId: string) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PROPERTIES: 'homex_properties',
  CURRENT_USER: 'homex_current_user',
  FAVORITES: 'homex_favorites',
  COMPARE: 'homex_compare',
  REPORTS: 'homex_reports',
  INQUIRIES: 'homex_inquiries',
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [compareList, setCompareList] = useState<string[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Toast Helper
  const addToast = useCallback((message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Initialize from LocalStorage & sync with demo data
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const timer = setTimeout(() => {
      try {
        // 1. Properties
        const storedProps = localStorage.getItem(STORAGE_KEYS.PROPERTIES);
        if (storedProps) {
          try {
            const parsed = JSON.parse(storedProps);
            if (Array.isArray(parsed) && parsed.length > 0) {
              setProperties(parsed);
            } else {
              setProperties(INITIAL_PROPERTIES);
              localStorage.setItem(STORAGE_KEYS.PROPERTIES, JSON.stringify(INITIAL_PROPERTIES));
            }
          } catch {
            setProperties(INITIAL_PROPERTIES);
            localStorage.setItem(STORAGE_KEYS.PROPERTIES, JSON.stringify(INITIAL_PROPERTIES));
          }
        } else {
          setProperties(INITIAL_PROPERTIES);
          localStorage.setItem(STORAGE_KEYS.PROPERTIES, JSON.stringify(INITIAL_PROPERTIES));
        }

        // 2. Favorites
        const storedFavs = localStorage.getItem(STORAGE_KEYS.FAVORITES);
        if (storedFavs) {
          try {
            setFavorites(JSON.parse(storedFavs));
          } catch {
            setFavorites([]);
          }
        }

        // 3. Compare List
        const storedComp = localStorage.getItem(STORAGE_KEYS.COMPARE);
        if (storedComp) {
          try {
            setCompareList(JSON.parse(storedComp));
          } catch {
            setCompareList([]);
          }
        }

        // 4. Reports
        const storedReports = localStorage.getItem(STORAGE_KEYS.REPORTS);
        if (storedReports) {
          try {
            setReports(JSON.parse(storedReports));
          } catch {
            setReports([]);
          }
        }

        // 5. Inquiries
        const storedInquiries = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
        if (storedInquiries) {
          try {
            setInquiries(JSON.parse(storedInquiries));
          } catch {
            setInquiries([]);
          }
        }

        // 6. Current User from LocalStorage fallback
        const storedUser = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
        if (storedUser) {
          try {
            setCurrentUser(JSON.parse(storedUser));
          } catch {
            // Default to demo user
            setCurrentUser(DEMO_USERS[0]);
          }
        } else {
          // Default to admin user for rich testing experience
          setCurrentUser(DEMO_USERS[0]);
          localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(DEMO_USERS[0]));
        }

        setIsInitialized(true);
      } catch (e) {
        console.warn('LocalStorage error:', e);
        setProperties(INITIAL_PROPERTIES);
        setCurrentUser(DEMO_USERS[0]);
        setIsInitialized(true);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // Firebase Auth State Listener
  useEffect(() => {
    if (!auth) return;

    const unsubscribe = onAuthStateChanged(auth, (fbUser: FirebaseUser | null) => {
      if (fbUser) {
        const isAdmin = fbUser.email === 'picbazer@gmail.com';
        const userObj: User = {
          id: fbUser.uid,
          name: fbUser.displayName || fbUser.email?.split('@')[0] || 'User',
          email: fbUser.email || '',
          phone: fbUser.phoneNumber || undefined,
          role: isAdmin ? 'ADMIN' : 'USER',
          avatar: fbUser.photoURL || undefined,
          createdAt: new Date().toISOString(),
        };
        setCurrentUser(userObj);
        if (typeof window !== 'undefined') {
          localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(userObj));
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // Save changes to LocalStorage whenever state updates
  useEffect(() => {
    if (!isInitialized || typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.PROPERTIES, JSON.stringify(properties));
  }, [properties, isInitialized]);

  useEffect(() => {
    if (!isInitialized || typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
  }, [favorites, isInitialized]);

  useEffect(() => {
    if (!isInitialized || typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.COMPARE, JSON.stringify(compareList));
  }, [compareList, isInitialized]);

  useEffect(() => {
    if (!isInitialized || typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(reports));
  }, [reports, isInitialized]);

  useEffect(() => {
    if (!isInitialized || typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
  }, [inquiries, isInitialized]);

  // Sync with Firestore in background if configured
  useEffect(() => {
    if (!db || !isInitialized) return;
    const firestore = db as Firestore;
    const syncFirestore = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'properties'));
        if (querySnapshot.empty && properties.length > 0) {
          // Seed firestore with initial properties
          for (const prop of properties) {
            await setDoc(doc(firestore, 'properties', prop.id), prop);
          }
        }
      } catch (err) {
        // Safe silent fail for offline / demo mode
        console.log('Firestore sync notice:', err);
      }
    };
    syncFirestore();
  }, [isInitialized, properties]);

  // Favorites logic
  const toggleFavorite = useCallback((propertyId: string) => {
    setFavorites((prev) => {
      const exists = prev.includes(propertyId);
      if (exists) {
        addToast('Property removed from favorites.', 'info');
        return prev.filter((id) => id !== propertyId);
      } else {
        addToast('Property saved successfully.', 'success');
        return [...prev, propertyId];
      }
    });
  }, [addToast]);

  const isFavorite = useCallback(
    (propertyId: string) => favorites.includes(propertyId),
    [favorites]
  );

  // Compare logic
  const toggleCompare = useCallback(
    (propertyId: string) => {
      setCompareList((prev) => {
        const exists = prev.includes(propertyId);
        if (exists) {
          addToast('Property removed from comparison.', 'info');
          return prev.filter((id) => id !== propertyId);
        } else {
          if (prev.length >= 3) {
            addToast('You can compare up to 3 properties at a time.', 'warning');
            return prev;
          }
          addToast('Property added to comparison.', 'success');
          return [...prev, propertyId];
        }
      });
    },
    [addToast]
  );

  const isInCompare = useCallback(
    (propertyId: string) => compareList.includes(propertyId),
    [compareList]
  );

  const clearCompare = useCallback(() => {
    setCompareList([]);
    addToast('Comparison list cleared.', 'info');
  }, [addToast]);

  // Add Property (Pending review by default, verified: false)
  const addProperty = useCallback(
    (propertyData: Omit<Property, 'id' | 'createdAt' | 'updatedAt' | 'views' | 'inquiries'>): string => {
      const id = 'prop-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 6);
      const newProperty: Property = {
        ...propertyData,
        id,
        slug: propertyData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        verified: false, // strictly false until admin approval!
        status: 'pending', // pending review
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        views: 0,
        inquiries: 0,
      };

      setProperties((prev) => [newProperty, ...prev]);
      addToast('Listing submitted for review.', 'success');

      // Attempt Firestore write
      if (db) {
        try {
          setDoc(doc(db, 'properties', id), newProperty).catch(() => {});
        } catch {}
      }

      return id;
    },
    [addToast]
  );

  const updateProperty = useCallback(
    (id: string, updates: Partial<Property>) => {
      setProperties((prev) =>
        prev.map((prop) => {
          if (prop.id === id) {
            const updated = { ...prop, ...updates, updatedAt: new Date().toISOString() };
            if (db) {
              try {
                updateDoc(doc(db, 'properties', id), updates).catch(() => {});
              } catch {}
            }
            return updated;
          }
          return prop;
        })
      );
      addToast('Property updated successfully.', 'success');
    },
    [addToast]
  );

  const deleteProperty = useCallback(
    (id: string) => {
      setProperties((prev) => prev.filter((p) => p.id !== id));
      setFavorites((prev) => prev.filter((favId) => favId !== id));
      setCompareList((prev) => prev.filter((cmpId) => cmpId !== id));
      addToast('Property listing deleted.', 'info');

      if (db) {
        try {
          deleteDoc(doc(db as Firestore, 'properties', id)).catch(() => {});
        } catch {}
      }
    },
    [addToast]
  );

  // Admin Actions
  const approveProperty = useCallback(
    (id: string) => {
      setProperties((prev) =>
        prev.map((prop) =>
          prop.id === id ? { ...prop, verified: true, status: 'active', updatedAt: new Date().toISOString() } : prop
        )
      );
      addToast('Listing approved and marked Verified.', 'success');

      if (db) {
        try {
          updateDoc(doc(db as Firestore, 'properties', id), { verified: true, status: 'active' }).catch(() => {});
        } catch {}
      }
    },
    [addToast]
  );

  const rejectProperty = useCallback(
    (id: string) => {
      setProperties((prev) =>
        prev.map((prop) =>
          prop.id === id ? { ...prop, status: 'rejected', updatedAt: new Date().toISOString() } : prop
        )
      );
      addToast('Listing rejected.', 'warning');

      if (db) {
        try {
          updateDoc(doc(db as Firestore, 'properties', id), { status: 'rejected' }).catch(() => {});
        } catch {}
      }
    },
    [addToast]
  );

  const togglePropertyPause = useCallback(
    (id: string) => {
      setProperties((prev) =>
        prev.map((prop) => {
          if (prop.id === id) {
            const newStatus = prop.status === 'paused' ? 'active' : 'paused';
            return { ...prop, status: newStatus, updatedAt: new Date().toISOString() };
          }
          return prop;
        })
      );
      addToast('Listing status toggled.', 'info');
    },
    [addToast]
  );

  // Submit Report
  const submitReport = useCallback(
    (reportData: Omit<Report, 'id' | 'createdAt' | 'status'>) => {
      const id = 'rep-' + Date.now().toString(36);
      const newReport: Report = {
        ...reportData,
        id,
        createdAt: new Date().toISOString(),
        status: 'pending',
      };
      setReports((prev) => [newReport, ...prev]);
      addToast('Report submitted. Our moderation team will investigate.', 'success');

      if (db) {
        try {
          setDoc(doc(db as Firestore, 'reports', id), newReport).catch(() => {});
        } catch {}
      }
    },
    [addToast]
  );

  // Submit Inquiry
  const submitInquiry = useCallback(
    (inquiryData: Omit<Inquiry, 'id' | 'createdAt' | 'status'>) => {
      const id = 'inq-' + Date.now().toString(36);
      const newInq: Inquiry = {
        ...inquiryData,
        id,
        createdAt: new Date().toISOString(),
        status: 'new',
      };
      setInquiries((prev) => [newInq, ...prev]);
      // Also increment property inquiry count
      setProperties((prev) =>
        prev.map((p) => (p.id === inquiryData.propertyId ? { ...p, inquiries: p.inquiries + 1 } : p))
      );
      addToast('Inquiry sent successfully to the property owner.', 'success');

      if (db) {
        try {
          setDoc(doc(db as Firestore, 'inquiries', id), newInq).catch(() => {});
        } catch {}
      }
    },
    [addToast]
  );

  // Dismiss Report
  const dismissReport = useCallback(
    (reportId: string) => {
      setReports((prev) => prev.filter((r) => r.id !== reportId));
      addToast('Report dismissed.', 'info');
      if (db) {
        try {
          deleteDoc(doc(db as Firestore, 'reports', reportId)).catch(() => {});
        } catch {}
      }
    },
    [addToast]
  );

  // Demo Login switch
  const loginDemoUser = useCallback(
    (role: UserRole) => {
      let user: User;
      if (role === 'ADMIN') {
        user = DEMO_USERS[0];
      } else if (role === 'AGENT') {
        user = {
          id: 'agent-101',
          name: 'Tanvir Ahmed',
          email: 'tanvir.ahmed@homex.com.bd',
          phone: '+880 1711-234567',
          role: 'AGENT',
          avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80',
          createdAt: '2026-02-14T00:00:00.000Z',
        };
      } else {
        user = DEMO_USERS[1];
      }
      setCurrentUser(user);
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
      }
      addToast(`Logged in as ${user.name} (${role})`, 'success');
    },
    [addToast]
  );

  const loginAsAdmin = useCallback(() => loginDemoUser('ADMIN'), [loginDemoUser]);
  const loginAsUser = useCallback(() => loginDemoUser('USER'), [loginDemoUser]);

  // Google Sign-In with Firebase Auth
  const signInWithGoogle = useCallback(async () => {
    if (!auth || !googleProvider) {
      addToast('Firebase Auth not available. Using demo login.', 'info');
      loginDemoUser('USER');
      return;
    }
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const fbUser = result.user;
      const isAdmin = fbUser.email === 'picbazer@gmail.com';
      const userObj: User = {
        id: fbUser.uid,
        name: fbUser.displayName || 'Google User',
        email: fbUser.email || '',
        role: isAdmin ? 'ADMIN' : 'USER',
        avatar: fbUser.photoURL || undefined,
        createdAt: new Date().toISOString(),
      };
      setCurrentUser(userObj);
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(userObj));
      }
      addToast(`Welcome back, ${userObj.name}!`, 'success');
    } catch (err: unknown) {
      console.warn('Google sign-in error:', err);
      // Fallback for iframe / popup blocked environments
      addToast('Popup sign-in was blocked or cancelled. Switched to demo session.', 'info');
      loginDemoUser('USER');
    }
  }, [addToast, loginDemoUser]);

  // Logout
  const logout = useCallback(() => {
    if (auth) {
      signOut(auth).catch(() => {});
    }
    setCurrentUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    }
    addToast('Logged out successfully.', 'info');
  }, [addToast]);

  const unreadNotificationsCount = reports.filter((r) => r.status === 'pending').length;

  return (
    <AppContext.Provider
      value={{
        properties,
        currentUser,
        favorites,
        compareList,
        reports,
        inquiries,
        toasts,
        unreadNotificationsCount,
        addToast,
        removeToast,
        toggleFavorite,
        isFavorite,
        toggleCompare,
        isInCompare,
        clearCompare,
        addProperty,
        updateProperty,
        deleteProperty,
        approveProperty,
        rejectProperty,
        togglePropertyPause,
        submitReport,
        submitInquiry,
        loginDemoUser,
        loginAsAdmin,
        loginAsUser,
        loginWithGoogle: signInWithGoogle,
        signInWithGoogle,
        dismissReport,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
