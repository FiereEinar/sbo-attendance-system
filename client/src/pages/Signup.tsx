import { useForm } from 'react-hook-form';
import InputField from '../components/InputField';
import { signupSchema } from '../lib/validations/signupSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { Button } from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

export type SignupFormValues = z.infer<typeof signupSchema>;

export default function Signup() {
	const navigate = useNavigate();

	const {
		handleSubmit,
		register,
		setError,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: zodResolver(signupSchema),
	});

	const onSubmit = async (formData: SignupFormValues) => {
		try {
			const { data } = await axiosInstance.post('/auth/signup', formData);

			navigate('/login');
		} catch (error: any) {
			setError('root', { message: error.message });
		}
	};

	return (
		<div className='min-h-screen flex items-center justify-center'>
			<form onSubmit={handleSubmit(onSubmit)} className='space-y-2 w-[400px]'>
				<InputField<SignupFormValues>
					name='firstname'
					id='firstname'
					label='Firstname:'
					registerFn={register}
					errors={errors}
				/>
				<InputField<SignupFormValues>
					name='lastname'
					id='lastname'
					label='Lastname:'
					registerFn={register}
					errors={errors}
				/>
				<InputField<SignupFormValues>
					name='email'
					id='email'
					label='Email:'
					type='email'
					registerFn={register}
					errors={errors}
				/>
				<InputField<SignupFormValues>
					name='password'
					id='password'
					label='Password:'
					type='password'
					registerFn={register}
					errors={errors}
				/>
				<InputField<SignupFormValues>
					name='confirmPassword'
					id='confirmPassword'
					label='Confirm Password:'
					type='password'
					registerFn={register}
					errors={errors}
				/>
				{errors.root && (
					<p className='text-xs text-red-500'>{errors.root.message}</p>
				)}
				<div className='flex justify-end gap-2'>
					<Link to='/login'>
						<Button disabled={isSubmitting} type='button' variant='subtle'>
							Login
						</Button>
					</Link>
					<Button disabled={isSubmitting} type='submit'>
						Submit
					</Button>
				</div>
			</form>
		</div>
	);
}
