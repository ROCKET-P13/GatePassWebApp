import './App.css';
import { CssBaseline } from '@mui/material';
import { VenueOnboarding } from './Components/Onboarding/VenueOnboarding';

function App () {
	return (
		<>
			<h1>GatePass</h1>
			<CssBaseline />
			<VenueOnboarding />
		</>
	);
}

export default App;