import Link from 'next/link';

function LoginTopbar() {
  return (
    <Link href='/'>
      <button className='fixed left-0 top-0 p-5'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='28'
          height='28'
          fill='currentColor'
          className='bi bi-arrow-left text-[#5F7A85]'
          viewBox='0 0 16 16'
        >
          <path
            fill-rule='evenodd'
            d='M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8'
          />
        </svg>
      </button>
    </Link>
  );
}

export default LoginTopbar;
