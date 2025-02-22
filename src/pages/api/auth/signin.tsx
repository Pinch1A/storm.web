
import { signIn } from 'next-auth/react';

const SignInPage = () => {
  return (
    <div>
      <h1>Session expired!</h1>
      <button onClick={() => signIn('keycloak')}>Sign In</button>
    </div>
  )
}

export default SignInPage;
