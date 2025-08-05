import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);

  // This is the crucial server-side check
  if (!session) {
    redirect('/admin/login');
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">Welcome, Admin!</h1>
      <p className="mt-2 text-gray-600">
        You are logged in as: <strong>{session.user?.email}</strong>
      </p>
      <p className="mt-2 text-gray-600">
        Select an option from the sidebar to manage your website content.
      </p>
    </div>
  );
}