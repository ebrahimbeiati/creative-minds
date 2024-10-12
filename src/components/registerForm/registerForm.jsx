"use client"
import styles from './registerForm.module.css'
import { register } from '@/lib/action';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useFormState } from 'react-dom'
import Link from 'next/link';

const RegisterForm = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
    const [state, formAction] = useFormState(register, undefined);
    const router = useRouter();
    useEffect(() => {
        state?.success && router.push('/login');
        
    },[state?.success, router])
    
  return (
    <form className={styles.form} action={formAction}>
      <input type="text" placeholder="Username" name="username" />
      <input type="email" placeholder="Email" name="email" />
      <input type="password" placeholder="Password" name="password" />
      <input type="password" placeholder="Confirm Password" name="confirmPassword"/>
      <button>Register</button>  
      {state?.error}          
          <Link href='/login'>
            Already have an account? <b>Login</b>
          </Link>
    </form>
  );
};

export default RegisterForm