import React, { useState } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { ChevronRight, Home } from 'lucide-react';

export const AppLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const getBreadcrumbs = () => {
    const pathnames = location.pathname.split('/').filter((x) => x);
    return pathnames.map((value, index) => {
      const to = `/${pathnames.slice(0, index + 1).join('/')}`;
      const isLast = index === pathnames.length - 1;
      const formatted = value.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

      return {
        to,
        label: formatted,
        isLast
      };
    });
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <div className="app-container">
      <div className="main-wrapper">
        <Header toggleMobileSidebar={() => setMobileOpen(!mobileOpen)} />
        <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
          <Sidebar mobileOpen={mobileOpen} closeMobileSidebar={() => setMobileOpen(false)} />
          <main className="page-content">
            {/* Breadcrumb Navigation Trail */}
            {breadcrumbs.length > 0 && (
              <nav
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  fontSize: '0.8125rem',
                  color: '#64748B',
                  marginBottom: '1rem',
                  padding: '0.375rem 0.75rem',
                  backgroundColor: '#ffffff',
                  borderRadius: '6px',
                  border: '1px solid #E2E8F0',
                  width: 'fit-content'
                }}
                aria-label="Breadcrumb"
              >
                <Link to="/" style={{ color: '#0F2C59', display: 'flex', alignItems: 'center' }}>
                  <Home size={14} />
                </Link>
                {breadcrumbs.map((crumb, idx) => (
                  <React.Fragment key={crumb.to}>
                    <ChevronRight size={12} style={{ color: '#CBD5E1' }} />
                    {crumb.isLast ? (
                      <span style={{ fontWeight: '600', color: '#0F172A' }}>{crumb.label}</span>
                    ) : (
                      <Link to={crumb.to} style={{ color: '#475569', textDecoration: 'none' }}>
                        {crumb.label}
                      </Link>
                    )}
                  </React.Fragment>
                ))}
              </nav>
            )}

            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};
