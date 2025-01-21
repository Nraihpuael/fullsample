import React, { useEffect } from 'react';
import '../../styles/pages/register.css';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import useAuthStore from '../../store/authStore';
import { RegisterSchema } from '../../validations/authSchema';
import Logo from '../../assets/logo/Logo.svg';


const Register = () => {
  const { register: registerUser, isLoading, error, clearError, isAuthenticated, } =
    useAuthStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    reset,
  } = useForm({ resolver: zodResolver(RegisterSchema) });

  useEffect(() => {
    if (isAuthenticated()) navigate('/notes');
  }, [isAuthenticated, navigate]);

  const handleInputChange = async (field) => {
    await trigger(field);
  };

  const onSubmit = async ({ name, email, password }) => {
    try {
      await registerUser({ name, email, password });
      reset();
      toast.success('Logging into the system');
      navigate('/notes');
    } catch (error) {
      toast.error(error.message);
      clearError();
    }
  };

  return (
    <div className='register-container'>
      <div className='register-card'>
        <Link to='/'>
          <img src={Logo} alt='Company Logo' className='logo' />
        </Link>
        <h1 className='register-title'>Register</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='input-group'>
            <Input label='Name' type='text' name='name'
              placeholder='Enter your name'
              {...register('name')}
              onBlur={() => handleInputChange('name')}
              isError={!!errors.name}
              errorMessage={errors.name?.message}
              required
            />
          </div>
          <div className='input-group'>
            <Input label='Email' type='email' name='email'
              placeholder='ejemplo@gmail.com'
              {...register('email')}
              onBlur={() => handleInputChange('email')}
              isError={!!errors.email}
              errorMessage={errors.email?.message}
              required
            />
          </div>
          <div className='input-group'>
            <Input type='password' label='Password' name='password'
              placeholder='********'
              {...register('password')}
              onBlur={() => handleInputChange('password')}
              isError={!!errors.password}
              errorMessage={errors.password?.message}
              required
            />
          </div>
          <div className='input-group'>
            <Input type='password' label='Confirm Password' name='confirmPassword'
              placeholder='********'
              {...register('confirmPassword')}
              onBlur={() => handleInputChange('confirmPassword')}
              isError={!!errors.confirmPassword}
              errorMessage={errors.confirmPassword?.message}
              required
            />
          </div>

          <Button type='submit' variant='default' size='default'
            className='register-button'
            disabled={isLoading}
          >
            Register
          </Button>
        </form>
        <p className='register-text'>
          Already have an account?{' '}
          <a href='/auth/login' className='register-link'>
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
