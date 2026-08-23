import InputError from '@/Components/Default/InputError';
import InputLabel from '@/Components/Default/InputLabel';
import PrimaryButton from '@/Components/Default/PrimaryButton';
import TextInput from '@/Components/Default/TextInput';
import ProfileCard from '@/Components/ProfileContents/ProfileCard';
import RootContext from '@/Contexts/RootContext';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useContext } from 'react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}: {
    mustVerifyEmail: boolean;
    status?: string;
    className?: string;
}) {
    const user = usePage().props.auth.user;
    const { SET_ALERT } = useContext(RootContext);

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
            max_total_price: user.max_total_price,
            max_page_count: user.max_page_count
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('profile.update'), {
            preserveScroll: true,
            onSuccess: () => {
                SET_ALERT({
                    open: true,
                    type: 'success',
                    message: 'ユーザー情報を更新しました',
                });
            },
        });
    };

    return (
        <ProfileCard
            title={
                <>
                    <i className="fa-solid fa-user mr-1"></i>
                    ユーザー情報
                </>
            }
            subTitle="ユーザー情報の更新"
        >
            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="ユーザー名" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-sm font-medium text-green-600">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </div>
                )}

                <div>
                    <InputLabel htmlFor="max_total_price" value="月ごとの限度額(最大￥999,999,999)" />

                    <TextInput
                        id="max_total_price"
                        type="number"
                        className="mt-1 block w-full"
                        value={data.max_total_price}
                        onChange={(e) => setData('max_total_price', Number(e.target.value))}
                        required
                        autoComplete="maxTotalPrice"
                    />

                    <InputError className="mt-2" message={errors.max_total_price} />
                </div>

                <div>
                    <InputLabel htmlFor="max_page_count" value="1ページ毎のデータ表示数(最大100件)" />

                    <TextInput
                        id="max_page_count"
                        type="number"
                        className="mt-1 block w-full"
                        value={data.max_page_count}
                        onChange={(e) => setData('max_page_count', Number(e.target.value))}
                        required
                        autoComplete="maxTotalPrice"
                    />

                    <InputError className="mt-2" message={errors.max_page_count} />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>ユーザー情報変更</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">
                            Saved.
                        </p>
                    </Transition>
                </div>
            </form>
        </ProfileCard>
    );
}
