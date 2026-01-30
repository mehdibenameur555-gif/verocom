import React from "react";

export default function Qalloum() {
  return (
    <>
      <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #eee', marginBottom: 18, display: 'flex', alignItems: 'center', padding: 0, boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', padding: '18px 24px' }}>
          <span style={{ fontWeight: 600, fontSize: 18, color: '#18181b', marginLeft: 12 }}>Variantes</span>
        </div>
        <div style={{ padding: '0 24px' }}>
          <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <input type="checkbox" style={{ display: 'none' }} />
            <span style={{ width: 40, height: 24, background: '#f3f4f6', borderRadius: 12, position: 'relative', display: 'inline-block', transition: 'background 0.2s' }}>
              <span style={{ position: 'absolute', left: 3, top: 3, width: 18, height: 18, background: '#fff', borderRadius: '50%', boxShadow: '0 1px 4px #bbb', transition: 'left 0.2s' }}></span>
            </span>
          </label>
        </div>
      </div>
      <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #eee', marginBottom: 8, display: 'flex', alignItems: 'center', padding: 0, boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', padding: '18px 24px' }}>
          <span style={{ fontWeight: 600, fontSize: 18, color: '#18181b', marginLeft: 12 }}>Produits connexes</span>
        </div>
        <div style={{ padding: '0 24px' }}>
          <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <input type="checkbox" style={{ display: 'none' }} />
            <span style={{ width: 40, height: 24, background: '#f3f4f6', borderRadius: 12, position: 'relative', display: 'inline-block', transition: 'background 0.2s' }}>
              <span style={{ position: 'absolute', left: 3, top: 3, width: 18, height: 18, background: '#fff', borderRadius: '50%', boxShadow: '0 1px 4px #bbb', transition: 'left 0.2s' }}></span>
            </span>
          </label>
        </div>
      </div>
    </>
  );
}