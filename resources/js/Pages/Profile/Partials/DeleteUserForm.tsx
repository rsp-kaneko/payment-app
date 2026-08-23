import DangerButton from '@/Components/Default/DangerButton';
import InputError from '@/Components/Default/InputError';
import InputLabel from '@/Components/Default/InputLabel';
import Modal from '@/Components/Default/Modal';
import SecondaryButton from '@/Components/Default/SecondaryButton';
import TextInput from '@/Components/Default/TextInput';
import ProfileCard from '@/Components/ProfileContents/ProfileCard';
import { useForm } from '@inertiajs/react';
import { Typography } from '@mui/material';
import { FormEventHandler, useRef, useState } from 'react';

export default function DeleteUserForm({
    className = '',
}: {
    className?: string;
}) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef<HTMLInputElement>(null);

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        clearErrors();
        reset();
    };

    return (
        <>
            <ProfileCard
                title={
                    <>
                        <i className="fa-solid fa-user-slash mr-1"></i>
                        アカウント削除
                    </>
                }
            >
                <Typography component="p" sx={{mb: 2}}>
                    アカウントを削除すると、そのアカウントに含まれるすべてのリソースとデータは完全に削除されます。<br />
                    アカウントを削除する前に、保存しておきたいデータや情報はすべてダウンロードしてください。
                </Typography>
                <DangerButton onClick={confirmUserDeletion}>
                    アカウントを削除する
                </DangerButton>
            </ProfileCard>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        本当に削除しますか？
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        アカウントを削除すると、そのアカウントに含まれるすべてのリソースとデータは完全に削除されます。
                        アカウントを完全に削除することを確認するため、パスワードを入力してください。
                    </p>

                    <div className="mt-6">
                        <InputLabel
                            htmlFor="password"
                            value="Password"
                            className="sr-only"
                        />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                            className="mt-1 block w-3/4"
                            isFocused
                            placeholder="Password"
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            キャンセル
                        </SecondaryButton>

                        <DangerButton className="ms-3" disabled={processing}>
                            アカウントを削除する
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </>
    );
}
