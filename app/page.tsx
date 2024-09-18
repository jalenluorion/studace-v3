import AuthButton from '@/components/auth/AuthButton';
import { Module } from '@/components/space/control/modules';
import timerModule from '@/config/modules/timer';

export default function Home() {
    return (
        <div className="m-2">
            <h1>main</h1>
            <AuthButton />
            <Module name="timer" data={timerModule.default} />
        </div>
    );
}
