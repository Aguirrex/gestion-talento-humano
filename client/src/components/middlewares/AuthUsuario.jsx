import React from 'react';
import { useUsuarioContext } from '../../customHooks/UsuarioProvider';
import { useNavigate } from 'react-router-dom';
import { fetchApi, getTokenUsuario, setTokenUsuario } from '../../tools/connectionApi';

const MODE = process.env.REACT_APP_MODE;

const AuthUsuario = ({ children, tipoUsuario }) => {

  const { usuario, setUsuario } = useUsuarioContext();
  const navigate = useNavigate();

  React.useEffect(() => {
    const auth = async () => {
      if (!getTokenUsuario() || (tipoUsuario instanceof Array && !tipoUsuario.includes(usuario?.tipo))) {
        navigate('/login', { replace: true });
        return;
      }

      try {
        const response = await fetchApi(getTokenUsuario()).post('/autenticarToken');
        console.log(response.data.usuario);
        if (response.data.usuario) {
          setUsuario(response.data.usuario);
        } else {
          navigate('/login', { replace: true });
        }
      } catch (err) {
        console.log(err);
        setTokenUsuario(null);
        navigate('/login', { replace: true });
      }
    };

    if (MODE === 'development') {
      setUsuario({ dni: '12345', tipo: 'RH' });
      console.log('Usuario autenticado');
    } else {
      auth();
    }
  }, []);

  
  return (
    <>
      {usuario ? children : null}
    </>
  );
};

export default AuthUsuario;