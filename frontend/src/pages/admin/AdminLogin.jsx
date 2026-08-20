import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { toastSuccess, toastError, toastWarning } from '../../lib/toast.js';
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
  const [showPassword, setShowPassword] = useState(false);

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
      toastSuccess('¡Bienvenida!');
      navigate('/admin');
    } catch (error) {
      toastError(error.response?.data?.message || 'No pudimos iniciar sesión. Verificá tus credenciales.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center gap-8 overflow-hidden bg-gradient-to-b from-sage-900 via-sage-800 to-sage-700 px-6 py-16">
      <div className="hidden -translate-x-[6vw] select-none flex-col items-center uppercase md:flex">
        <span className="font-heading text-[7vw] font-extrabold leading-[0.85] text-white/[0.06]">
          Óptica
        </span>
        <span className="translate-x-1/2 font-heading text-[7vw] font-extrabold leading-[0.85] text-white/[0.06]">
          Andina
        </span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative w-full max-w-sm rounded-3xl border border-white/15 bg-white/10 p-8 shadow-2xl shadow-black/30 backdrop-blur-xl"
      >
        <div className="mb-8 flex flex-col items-center">
          <Logo className="h-14 w-auto" />
          <h1 className="mt-3 font-heading text-lg font-bold text-bone">Panel admin</h1>
          <p className="text-sm text-sage-200/80">Óptica Andina</p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit, () =>
            toastWarning('Completá los campos obligatorios')
          )}
          className="space-y-4"
        >
          <div>
            <label className="mb-1.5 block text-sm font-medium text-sage-100">Email</label>
            <Input type="email" {...register('email')} placeholder="admin@opticaandina.com" />
            {errors.email && <p className="mt-1 text-xs text-red-300">{errors.email.message}</p>}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-sage-100">Contraseña</label>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                placeholder="••••••••"
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sage-400 transition-colors hover:text-sage-700"
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-xs text-red-300">{errors.password.message}</p>
            )}
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Ingresando...' : 'Ingresar'}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}

export default AdminLogin;
