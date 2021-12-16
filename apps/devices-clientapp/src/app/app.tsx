import styles from './app.module.scss';
import { DashboardComponent } from '../app/dashboard/Dashboard';
import { store } from './store'
import { Provider } from 'react-redux'

export function App() {
  return (
    <Provider store={store}>
    <div className="container">
      <DashboardComponent />
    </div>
    </Provider>
  );
}

export default App;
