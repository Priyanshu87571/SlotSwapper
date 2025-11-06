import React, { useEffect, useState } from "react";
import { apiFetch } from "../utils/api";

export default function Marketplace() {
  const [slots, setSlots] = useState([]);
  const [mySlots, setMySlots] = useState([]);
  const [selectedTheir, setSelectedTheir] = useState(null);
  const [selectedMy, setSelectedMy] = useState(null);

  useEffect(() => {
    apiFetch("/swappable-slots").then(setSlots).catch(()=>setSlots([]));
    apiFetch("/events").then(setMySlots).catch(()=>setMySlots([]));
  }, []);

  async function requestSwap() {
    if (!selectedMy || !selectedTheir) return alert("Choose both slots");
    try {
      const res = await apiFetch("/swap-request", { method: "POST", body: { mySlotId: selectedMy, theirSlotId: selectedTheir } });
      alert("Swap requested");
      // remove these from view (they become pending)
      setSlots(s => s.filter(x => x.id !== selectedTheir));
      setMySlots(s => s.map(x => x.id===selectedMy ? {...x, status:'SWAP_PENDING'}:x));
      setSelectedMy(null); setSelectedTheir(null);
    } catch (err) { alert(err.error || "Failed"); }
  }

  return (
    <div>
      <h2>Marketplace</h2>
      <div style={{ display: 'flex', gap: 20 }}>
        <div>
          <h4>Available slots</h4>
          <ul>
            {slots.map(s => (
              <li key={s.id}>
                <label>
                  <input type="radio" name="their" checked={selectedTheir===s.id} onChange={()=>setSelectedTheir(s.id)} />
                  {s.title} — {new Date(s.start_time).toLocaleString()} — owner {s.ownerId}
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4>Your swappable slots</h4>
          <ul>
            {mySlots.filter(s=>s.status==='SWAPPABLE').map(m => (
              <li key={m.id}>
                <label>
                  <input type="radio" name="my" checked={selectedMy===m.id} onChange={()=>setSelectedMy(m.id)} />
                  {m.title} — {new Date(m.startTime).toLocaleString()}
                </label>
              </li>
            ))}
          </ul>
          <div><button onClick={requestSwap}>Request Swap</button></div>
        </div>
      </div>
    </div>
  );
}
