
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import App from './App.jsx'
import { persistor, store } from './Redux/Store.js'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store = {store}>
    <PersistGate persistor={persistor} loading={null}>
      <App />
    </PersistGate>
  </Provider>
);
