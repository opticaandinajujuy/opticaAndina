import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Swal from 'sweetalert2';
import { authSchema } from '../../schemas/authSchema.js';
import { login as loginRequest } from '../../services/authService.js';
import { useAuthStore } from '../../store/useAuthStore.js';
import Logo from '../../components/ui/Logo.jsx';
import Input from '../../components/ui/Input.jsx';
import Button from '../../components/ui/Button.jsx';

function AdminLogin() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(authSchema) });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const { data: result } = await loginRequest(data);
      login(result.user, result.token);
      navigate('/admin');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'No pudimos iniciar sesión',
        text: error.response?.data?.message || 'Verificá tus credenciales.',
        confirmButtonColor: '#4f6b58',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-sage-50/40 px-6">
      <div className="w-full max-w-sm rounded-2xl border border-sage-100 bg-white p-8 shadow-sm">
        <div className="mb-8 flex flex-col items-center">
          <Logo className="h-14 w-14" />
          <h1 className="mt-3 font-heading text-lg font-bold text-sage-900">Panel admin</h1>
          <p className="text-sm text-sage-500">Óptica Andina</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-sage-700">Email</label>
            <Input type="email" {...register('email')} placeholder="admin@opticaandina.com" />
            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-sage-700">Contraseña</label>
            <Input type="password" {...register('password')} placeholder="••••••••" />
            {errors.password && (
              <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>
            )}
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Ingresando...' : 'Ingresar'}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
