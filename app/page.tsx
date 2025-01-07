import Link from 'next/link';

export default async function Home() {

    return (
        <div className="m-2">
            <h1>Studace.live</h1>
            <Link href="/login">Enter</Link>
        </div>
    );
}
