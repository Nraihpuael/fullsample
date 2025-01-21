import React, { useEffect } from 'react';
import '../../styles/pages/login.css';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { LoginSchema } from '../../validations/authSchema';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import useAuthStore from '../../store/authStore';
import Logo from '../../assets/logo/Logo.svg';

const Login = () => {
  const { login, isLoading, error, clearError, isAuthenticated } =
    useAuthStore();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    reset,
  } = useForm({ resolver: zodResolver(LoginSchema) });

  useEffect(() => {
    if (isAuthenticated()) navigate('/notes');
  }, [isAuthenticated, navigate]);

  const handleInputChange = async (field) => {
    await trigger(field);
  };

  const onSubmit = async ({ email, password }) => {
    try {
      await login(email, password);
      reset();
      toast.success('Logging into the system');
      navigate('/notes');
    } catch (error) {
      toast.error(error.message);
    }
  };


  return (
    <div className='login-container'>
      <div className='login-card'>
        <Link to='/'>
          <img src={Logo} alt='Company Logo' className='logo' />
        </Link>
        <h1 className='login-title'>Login</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='input-group'>
            <Input
              label='Email'
              type='email'
              name='email'
              placeholder='ejemplo@gmail.com'
              {...register('email')}
              onBlur={() => handleInputChange('email')}
              isError={!!errors.email}
              errorMessage={errors.email?.message}
              required
            />
          </div>
          <div className='input-group'>
            <Input
              type='password'
              label='Contraseña'
              name='password'
              placeholder='********'
              {...register('password')}
              onBlur={() => handleInputChange('password')}
              isError={!!errors.password}
              errorMessage={errors.password?.message}
              required
            />
          </div>

          <Button
            variant='default'
            size='default'
            type='submit'
            className='register-button'
            disabled={isLoading}
          >
            Login
          </Button>
        </form>
        <p className='register-text'>
          You don't have an account?{' '}
          <a href='/auth/register' className='register-link'>
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
