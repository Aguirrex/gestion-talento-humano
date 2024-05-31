import React from 'react';

const UsuarioContext = React.createContext();

function UsuarioProvider({ children }) {

  const [usuario, setUsuario] = React.useState(null);

  // const value = React.useMemo(() => ({ usuario, setUsuario }), [usuario]);

  const value = { usuario, setUsuario };

  return (
    <UsuarioContext.Provider value={value}>
      {
        React.useMemo(() => (
          <>
            {children}
          </>
        ), [children])
      }
    </UsuarioContext.Provider>
  )
}

export const useUsuarioContext = () => React.useContext(UsuarioContext);

export default UsuarioProvider;