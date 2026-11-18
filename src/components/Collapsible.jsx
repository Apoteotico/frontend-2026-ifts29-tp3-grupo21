import { useId, useState } from 'react';

export default function Collapsible({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();

  return (
    <div className="collapsible">
      <button
        type="button"
        className="collapsible-trigger"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        <span>{title}</span>
        <span className="chev" aria-hidden="true">▶</span>
      </button>
      <div id={panelId} className="collapsible-panel" hidden={!open}>
        {children}
      </div>
    </div>
  );
}
