import React, { useEffect, useState } from "react";
import { apiFetch } from "../utils/api";

export default function Requests() {
  const [incoming, setIncoming] = useState([]);
  const [outgoing, setOutgoing] = useState([]);

  useEffect(() => {
    refresh();
  }, []);

  function refresh() {
    apiFetch("/requests/incoming").then(setIncoming).catch(()=>setIncoming([]));
    apiFetch("/requests/outgoing").then(setOutgoing).catch(()=>setOutgoing([]));
  }

  async function respond(id, accept) {
    try {
      await apiFetch(`/swap-response/${id}`, { method: "POST", body: { accept }});
      refresh();
      alert(accept ? 'Accepted' : 'Rejected');
    } catch (err) { alert(err.error || 'Failed'); }
  }

  return (
    <div>
      <h2>Requests</h2>
      <div style={{ display: 'flex', gap: 40 }}>
        <div>
          <h3>Incoming</h3>
          <ul>
            {incoming.map(r => (
              <li key={r.id}>
                {r.id} — {r.status} — mySlot: {r.mySlotId} theirSlot: {r.theirSlotId}
                {r.status==='PENDING' && <>
                  <button onClick={()=>respond(r.id, true)}>Accept</button>
                  <button onClick={()=>respond(r.id, false)}>Reject</button>
                </>}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3>Outgoing</h3>
          <ul>
            {outgoing.map(r => (
              <li key={r.id}>{r.id} — {r.status} — to: {r.responderId}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
