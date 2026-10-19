import Checkbox from '@/Components/Default/Checkbox';
import InputError from '@/Components/Default/InputError';
import InputLabel from '@/Components/Default/InputLabel';
import PrimaryButton from '@/Components/Default/PrimaryButton';
import TextInput from '@/Components/Default/TextInput';
import RootContext from '@/Contexts/RootContext';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@mui/material';
import { FormEventHandler, useContext } from 'react';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false as boolean,
    });

    const {SET_ALERT} = useContext(RootContext)

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            onError: () => {
                SET_ALERT({open: true, type: "error", message: "入力内容に誤りがあります"})
            },
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout title="ログイン">
            <Head title="ログイン" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4 block">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData(
                                    'remember',
                                    (e.target.checked || false) as false,
                                )
                            }
                        />
                        <span className="ms-2 text-sm text-gray-600">
                            ログインしたままにする
                        </span>
                    </label>
                </div>

                <div className="mt-4 flex items-center justify-end">
                    {/* {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Forgot your password?
                        </Link>
                    )} */}
                    <Button type="submit" variant="contained" color="secondary" loading={processing}>
                        <i className="fa-solid fa-right-to-bracket mr-2"></i>
                        ログイン
                    </Button>
                </div>
            </form>
        </GuestLayout>
    );
}
