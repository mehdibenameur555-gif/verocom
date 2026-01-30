import React from "react";

const ThemeCustomizeAlert = () => (
  <div style={{
    background: '#FFF8E1',
    color: '#8D6E63',
    border: '1px solid #FFD54F',
    borderRadius: '6px',
    padding: '8px 14px',
    fontSize: '0.95rem',
    marginBottom: '18px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  }}>
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#FFD54F"/><path d="M12 8v4" stroke="#8D6E63" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="16" r="1" fill="#8D6E63"/></svg>
    <span>التعديلات التي تقوم بها هنا ستؤثر فقط على هذا القالب، وليس على جميع القوالب.</span>
  </div>
);

export default ThemeCustomizeAlert;
