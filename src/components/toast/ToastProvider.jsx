/* eslint-disable react/prop-types */
import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './ToastProvider.scss';

const ToastContext = createContext({
  showToast: () => {},
});

const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(item => item.id !== id));
  }, []);

  const closeToast = useCallback((id) => {
    setToasts(prev => prev.map(item => (
      item.id === id ? { ...item, isClosing: true } : item
    )));
    window.setTimeout(() => {
      removeToast(id);
    }, 260);
  }, [removeToast]);

  const showToast = useCallback(({ title, description }) => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts(prev => [...prev, {
      id,
      title,
      description,
      isClosing: false,
    }]);
    window.setTimeout(() => {
      closeToast(id);
    }, 4000);
  }, [closeToast]);

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ol className="app-toast-viewport" tabIndex={-1}>
        {toasts.map(toast => (
          <li className={`app-toast ${toast.isClosing ? 'is-closing' : ''}`} key={toast.id} role="status">
            <div>
              <p className="app-toast__title">{toast.title}</p>
              <p className="app-toast__description">{toast.description}</p>
            </div>
            <button type="button" className="app-toast__close" aria-label="Close" onClick={() => closeToast(toast.id)}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </li>
        ))}
      </ol>
    </ToastContext.Provider>
  );
};

const useToast = () => useContext(ToastContext);

export {
  ToastProvider,
  useToast,
};
