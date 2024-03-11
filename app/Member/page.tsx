import { getServerSession } from 'next-auth';
import { options } from '../api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation';

export default async function Member() {
  const session = await getServerSession(options);
  if (!session) redirect('api/auth/signin?callbackUrl=/Member');
  console.log({ session });

  return (
    <div>
      <h1>Member Server Session</h1>
      <p>{session?.user?.email}</p>
      <p>{session?.user?.role}</p>
    </div>
  );
}
