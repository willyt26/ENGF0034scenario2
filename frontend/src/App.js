import React, { useState } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
  const [user, setUser] = useState(null)
  if (user == null) {
    return <Login onLogin={setUser}></Login>
  }
  return (
    <div className="App">
      <Home user={user} />
    </div>
  );
}

export default App;