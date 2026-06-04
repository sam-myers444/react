import './App.css'
import { useState, useEffect } from 'react';

function App() {
  
  const [pets, setPets] = useState(() => {
  const savedPets = localStorage.getItem('pets');

  if (savedPets) {
    return JSON.parse(savedPets);
  }

  return ['Maverick', 'Hershey', 'Milo', 'Moose'];
});
  const [newPet, setNewPet] = useState('');
  
  const [currentView, setCurrentView] = useState('home');

  const [formData, setFormData] = useState({
  pet: '',
  category: '',
  confidence: '',
  success: '',
  notes: ''
});

  const [sessions, setSessions] = useState([]);

  useEffect(() => {
  const savedSessions = localStorage.getItem('sessions');

  if (savedSessions) {
    setSessions(JSON.parse(savedSessions));
  }
}, []);

useEffect(() => {
  localStorage.setItem('pets', JSON.stringify(pets));
}, [pets]);


function clearLog() {
  const confirmed = window.confirm(
    'Are you sure you want to clear all training sessions?'
  );

  if (confirmed) {
    setSessions([]);
    localStorage.removeItem('sessions');
  }
}


  function handleSubmit(event) {
  event.preventDefault();

  const newSession = { ...formData,
  date: new Date().toISOString()
  };

  setSessions([...sessions, newSession]);

  const updatedSessions = [...sessions, newSession];

  setSessions(updatedSessions);

  localStorage.setItem(
  'sessions',
  JSON.stringify(updatedSessions)
);
}

function addPet(event) {
  event.preventDefault();

  if (newPet.trim() === '') return;

  setPets([...pets, newPet]);
  setNewPet('');
}

  return (
    <>
    
    <header> 
    <h1>dog training tracker</h1>
    <div className='hero'>
    <img className='mascot' src='hersheysketch2.png'/> 
    </div>
     </header> 
     
     <div className='greeting'>
     <h2>🐾 hi there, i'm hershey! what are you working on today? 🐾</h2>
     </div>
    
    <div className='btns'>
      
      <button 
      className='btn' 
      onClick={() => setCurrentView('new-session')}
      >
        New Training Session
      </button>

      <button className='btn'
        onClick={() => setCurrentView('log')}
      >
        View Log
        </button>
      <button className='btn'>Add Pets</button>
      <button
       className='btn'
       onClick={() => setCurrentView('home')}
       >Home</button>
    </div>

    {currentView === 'new-session' && (
        <div>
          <h2 className='form-start'>New Training Session</h2>
            <form onSubmit={handleSubmit}>
               
              <input
                type='text'
                value={newPet}
                onChange={(event) =>setNewPet(event.target.value)}
              />

              <button
              type='button'
              onClick={addPet}
              >
                Add Pet
              </button> 
              
              <br /> <br />
              <label htmlFor="pets">Choose a pet:</label>
                <select
                  value={formData.pet}
                  onChange={(event) =>
                    setFormData({ ...formData, pet: event.target.value })
                  }
                >
                  {pets.map((pet, index) => (
                    <option key={index} value={pet}>
                      {pet}
                    </option>
                  ))}
                </select>
                  
                  <br />
              
              <label htmlFor='training category'>Choose a Training Category:</label>
                <select 
                value={formData.category} 
                onChange={(event) => setFormData({...formData, category: event.target.value})} name='category' id='categories'>
                  <option value="leash walking">Leash Walking</option>
                  <option value="recall">Recall</option>
                  <option value="create training">Crate Training</option>
                  <option value="tricks">Tricks</option>
                  <option value="handling/grooming">Handling/Grooming</option>
                  <option value="people socialization">People Socialization</option>
                  <option value="dog socialization">Dog Socialization</option>
                  <option value="confidence/agility">Confidence/Agility</option>
                  <option value="vet/medical practice">Vet/Medical Practice</option>
                </select>

                <p>How confident was your pet today?</p>

                <input type="radio" id="difficult" name="confidence" value="difficult"
                onChange={(event) => setFormData({...formData, confidence: event.target.value})}
                />
                <label htmlFor="difficult">Difficult</label><br />

                <input type="radio" id="mixed" name="confidence" value="mixed"
                onChange={(event) => setFormData({...formData, confidence: event.target.value})}
                />
                <label htmlFor="mixed">Mixed</label><br />

                <input type="radio" id="good" name="confidence" value="good"
                onChange={(event) => setFormData({...formData, confidence: event.target.value})}
                />
                <label htmlFor="good">good</label><br />

                <input type="radio" id="excellent" name="confidence" value="excellent"
                onChange={(event) => setFormData({...formData, confidence: event.target.value})}
                />
                <label htmlFor="excellent">excellent</label>

                <p>How successful was the training?</p>

                <input type="radio" id="needs more practice" name="success" value="needs more practice"
                onChange={(event) => setFormData({...formData, success: event.target.value})}
                />
                <label htmlFor="needs more practice">needs more practice</label><br />

                <input type="radio" id="partial success" name="success" value="partial success"
                onChange={(event) => setFormData({...formData, success: event.target.value})}
                />
                <label htmlFor="partial success">partial success</label><br />

                <input type="radio" id="big-win" name="success" value="big win"
                onChange={(event) => setFormData({...formData, success: event.target.value})}
                />
                <label htmlFor="big win">big win</label><br />

                <p>Notes</p>
                  <textarea
                    value={formData.notes}
                    onChange={(event) =>
                      setFormData({ ...formData, notes: event.target.value })
                    }
                    id="message"
                    name="message"
                    rows="5"
                    cols="50"
                  ></textarea>
                  <br />


              <input type='submit' id='submit' value='submit'/>
            </form>
          </div>
          )}

          {currentView === 'log' && (
  <div>
    <h2 className='log-start'>Training Log</h2>
    <button className='btn-clear'
    onClick={() => clearLog()}
    >Clear Log</button>

      {sessions.map((session, index) => (
        <div className='log-card' key={index}>
        <p>
          <strong>📆 Date: {session.date}</strong> <br />
          <strong>🐾 Pet: </strong>{session.pet} <br /> 
          <strong>💪 Confidence: </strong>{session.confidence} <br />
          <strong>🦮 Training Category: </strong>{session.category} <br />
          <strong>🙌 Success: </strong>{session.success} <br /> 
         <strong>📝 Notes: </strong>{session.notes}
        </p>
        </div>
      ))}

  </div>
)}

    </>
  )
}

export default App
