import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import './userProfile.css';

function UserProfile({ initialData }) {
  const [user, setUser] = useState(() => ({
    name: initialData?.name ?? 'Invitado',
    age: Number(initialData?.age ?? 0),
  }));

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUserData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/user');

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      setUser({
        name: data?.name ?? 'Invitado',
        age: Number(data?.age ?? 0),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido al cargar datos');
      console.error('Error en fetchUserData:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const updateName = useCallback((newName) => {
    setUser((prevUser) => ({
      ...prevUser,
      name: String(newName),
    }));
  }, []);

  const doubleAge = useMemo(() => user.age * 2, [user.age]);

  if (loading) {
    return <section className="user-profile user-profile--loading">Cargando...</section>;
  }

  if (error) {
    return (
      <section className="user-profile user-profile--error" role="alert">
        <p className="user-profile__error-message">{error}</p>
        <button
          className="user-profile__button user-profile__button--retry"
          type="button"
          onClick={fetchUserData}
        >
          Reintentar
        </button>
      </section>
    );
  }

  return (
    <section className="user-profile">
      <header className="user-profile__header">
        <h1 className="user-profile__name">{user.name}</h1>
        <p className="user-profile__age">Edad: {user.age}</p>
      </header>

      <p className="user-profile__detail">El doble de tu edad es {doubleAge}</p>

      <button
        className="user-profile__button"
        type="button"
        onClick={() => updateName('Carlos')}
      >
        Cambiar nombre
      </button>
    </section>
  );
}

UserProfile.propTypes = {
  initialData: PropTypes.shape({
    name: PropTypes.string,
    age: PropTypes.number,
  }),
};

UserProfile.defaultProps = {
  initialData: {
    name: 'Invitado',
    age: 0,
  },
};

export default UserProfile;
