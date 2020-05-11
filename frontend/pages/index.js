import Link from 'next/link';


const Index = () => (
    <div>
    <h1>WELCOME to HOME page</h1>
    
        <Link href='/about'>
            <button>About</button>
        </Link>
        <Link href='/signup'>
            <button>Start</button>
        </Link>

    </div>
);


export default Index
