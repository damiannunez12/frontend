import { useState, useEffect } from 'react'
import './App.css'

function App() {
  // --- ESTADO ---
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem('users');
    return savedUsers ? JSON.parse(savedUsers) : [];
  });
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [editId, setEditId] = useState(null);

  // --- EFECTOS ---
  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  // --- MANEJADORES DE EVENTOS ---
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    if (editId) {
      setUsers(users.map(user => 
        user.id === editId ? { ...user, name, email } : user
      ));
      setEditId(null);
    } else {
      const newUser = {
        id: Date.now().toString(),
        name,
        email
      };
      setUsers([...users, newUser]);
    }

    setName('');
    setEmail('');
  };

  const startEdit = (user) => {
    setEditId(user.id);
    setName(user.name);
    setEmail(user.email);
  };

  const cancelEdit = () => {
    setEditId(null);
    setName('');
    setEmail('');
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Seguro que deseas eliminar este usuario?')) {
      setUsers(users.filter(user => user.id !== id));
      if (editId === id) cancelEdit();
    }
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h2 style={styles.title}>Registro de Usuarios</h2>
        
        {/* Formulario */}
        <form onSubmit={handleSubmit} style={styles.form}>
          <input 
            type="text" 
            placeholder="Nombre completo" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={styles.input}
          />
          <input 
            type="email" 
            placeholder="Correo electrónico" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <div style={styles.buttonGroup}>
            <button 
              type="submit" 
              style={{
                ...styles.btnSubmit, 
                backgroundColor: editId ? '#10b981' : '#4f46e5'
              }}
            >
              {editId ? 'Actualizar' : 'Guardar'}
            </button>
            {editId && (
              <button 
                type="button" 
                onClick={cancelEdit} 
                style={styles.btnCancel}
              >
                Cancelar
              </button>
            )}
          </div>
        </form>

        {/* Tabla */}
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Nombre</th>
              <th style={styles.th}>Correo</th>
              <th style={styles.th}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="3" style={{ ...styles.td, textAlign: 'center', color: '#6b7280' }}>
                  No hay usuarios registrados.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id}>
                  <td style={styles.td}>{user.name}</td>
                  <td style={styles.td}>{user.email}</td>
                  <td style={styles.td}>
                    <div style={styles.actions}>
                      <button 
                        onClick={() => startEdit(user)} 
                        style={styles.btnEdit}
                      >
                        Editar
                      </button>
                      <button 
                        onClick={() => handleDelete(user.id)} 
                        style={styles.btnDelete}
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// --- ESTILOS EN LINEA ---
const styles = {
  body: {
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '40px 20px',
    boxSizing: 'border-box',
  },
  container: {
    width: '100%',
    maxWidth: '600px',
    backgroundColor: '#ffffff',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    color: '#1f2937'
  },
  title: {
    margin: '0 0 20px 0',
    textAlign: 'center',
    color: '#4f46e5',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '24px',
  },
  input: {
    padding: '10px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '16px',
    outline: 'none',
    color: '#1f2937',
    backgroundColor: '#fff'
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
  },
  btnSubmit: {
    flex: 1,
    padding: '10px',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    cursor: 'pointer',
    fontWeight: 'bold',
    color: 'white',
  },
  btnCancel: {
    padding: '10px 20px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#f3f4f6',
    color: '#374151',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '10px',
  },
  th: {
    padding: '12px',
    textAlign: 'left',
    borderBottom: '2px solid #e5e7eb',
    backgroundColor: '#f9fafb',
    color: '#374151',
    fontWeight: '600',
  },
  td: {
    padding: '12px',
    textAlign: 'left',
    borderBottom: '1px solid #e5e7eb',
    color: '#4b5563',
  },
  actions: {
    display: 'flex',
    gap: '8px',
  },
  btnEdit: {
    backgroundColor: '#10b981',
    color: 'white',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  btnDelete: {
    backgroundColor: '#ef4444',
    color: 'white',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  }
};

export default App;