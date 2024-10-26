
import { SignUp, useUser } from '@clerk/nextjs';
import { useEffect } from 'react';

export default function Page() {
  // const { isLoaded, user } = useUser();

  // useEffect(() => {
  //   if (isLoaded && user) {
  //     fetch('/api/auth', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ userId: user.id, email: user.primaryEmailAddress.emailAddress }),
  //     });
  //     }
  //     console.log(isLoaded, user);

  // }, [isLoaded, user]);

  return <SignUp />;
}