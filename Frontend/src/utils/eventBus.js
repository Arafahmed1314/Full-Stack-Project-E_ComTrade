// Minimal event bus for UI components communication
const listeners = {};

export const on = (event, cb) => {
    if (!listeners[event]) listeners[event] = new Set();
    listeners[event].add(cb);
    return () => listeners[event].delete(cb);
};

export const emit = (event, payload) => {
    const set = listeners[event];
    if (!set) return;
    for (const cb of Array.from(set)) {
        try {
            cb(payload);
        } catch (err) {
            // ignore listener errors
            console.error('eventBus listener error', err);
        }
    }
};

export default { on, emit };
