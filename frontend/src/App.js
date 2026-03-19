import React, { useState } from 'react';
import Home from './pages/Home';
import AddSessionButton from './components/AddSessionButton';
import Login from './pages/Login';

function App() {
  const [user, setUser] = useState(null)
  if (user == null) {
    return <Login onLogin={setUser}></Login>
  }
  return (
    <div className="App">
      <Home user={user} />
      <AddSessionButton />
    </div>
  );
}

export default App;