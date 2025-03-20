// src/utils/api.js
export async function apiRequest(endpoint, method = 'GET', data = null) {
    const options = {
      method,
      headers: { 'Content-Type': 'application/json' }
    };
  
    if (data) {
      options.body = JSON.stringify(data);
    }
  
    try {
      const res = await fetch(`http://localhost:3000/api/${endpoint}`, options);
      const result = await res.json();
      return { ok: res.ok, data: result };
    } catch (err) {
      console.error('API Request Error:', err);
      return { ok: false, data: { message: 'Network error' } };
    }
  }
  