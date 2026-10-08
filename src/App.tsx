import React, { useState } from 'react';
import { UserRole } from './types/previras';
import { FirstScreen } from './components/FirstScreen';
import { ProfessionalJourney } from './components/professional/ProfessionalJourney';
import { PatientJourney } from './components/patient/PatientJourney';

export default function App() {
  const [role, setRole] = useState<UserRole>('initial');

  if (role === 'initial') {
    return <FirstScreen onSelectRole={(selectedRole) => setRole(selectedRole)} />;
  }

  if (role === 'professional') {
    return (
      <ProfessionalJourney
        onBackToHome={() => setRole('initial')}
        onSwitchToPatient={() => setRole('patient')}
      />
    );
  }

  return (
    <PatientJourney
      onBackToHome={() => setRole('initial')}
      onSwitchToProfessional={() => setRole('professional')}
    />
  );
}
