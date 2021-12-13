import styles from './app.module.scss';
//import NxWelcome from './nx-welcome'; <NxWelcome title="devices-clientapp" />
import { DashboardComponent } from '../app/dashboard/Dashboard';

export function App() {
  return (
    <div className="container">
      <DashboardComponent />
    </div>
  );
}

export default App;
