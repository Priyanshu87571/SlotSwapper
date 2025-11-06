import React, { useEffect, useState } from "react";
import { apiFetch } from "../utils/api";

export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({ title: "", startTime: "", endTime: "" });

  useEffect(() => { apiFetch("/events").then(setEvents).catch(()=>setEvents([])); }, []);

  async function create(e) {
    e.preventDefault();
    try {
      const ev = await apiFetch("/events", { method: "POST", body: form });
      setEvents(prev => [...prev, ev]);
      setForm({ title: "", startTime: "", endTime: "" });
    } catch (err) { alert(err.error || "Failed"); }
  }

  async function makeSwappable(id) {
    await apiFetch(`/events/${id}/make-swappable`, { method: 'PATCH' });
    setEvents(ev => ev.map(x => x.id===id ? { ...x, status: 'SWAPPABLE' } : x));
  }

  async function makeBusy(id) {
    await apiFetch(`/events/${id}/make-busy`, { method: 'PATCH' });
    setEvents(ev => ev.map(x => x.id===id ? { ...x, status: 'BUSY' } : x));
  }

  return (
    <div>
      <h2>Your Events</h2>
      <form onSubmit={create}>
        <input placeholder="Title" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} required />
        <input placeholder="Start ISO" value={form.startTime} onChange={e=>setForm({...form, startTime:e.target.value})} required />
        <input placeholder="End ISO" value={form.endTime} onChange={e=>setForm({...form, endTime:e.target.value})} required />
        <button>Create</button>
      </form>

      <ul>
        {events.map(ev => (
          <li key={ev.id}>
            {ev.title} — {ev.status} — {new Date(ev.startTime).toLocaleString()} to {new Date(ev.endTime).toLocaleString()}
            {ev.status === 'BUSY' && <button onClick={()=>makeSwappable(ev.id)}>Make Swappable</button>}
            {ev.status === 'SWAPPABLE' && <button onClick={()=>makeBusy(ev.id)}>Make Busy</button>}
          </li>
        ))}
      </ul>
    </div>
  );
}
