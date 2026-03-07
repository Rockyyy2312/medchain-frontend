import { redirect } from 'next/navigation';

export default function Home() {
  // For the purpose of this prototype, we immediately redirect to the dashboard
  // In a full implementation, you could build out a landing page here!
  redirect('/dashboard/patient');
}
