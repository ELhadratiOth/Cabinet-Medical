import {Link} from "react-router-dom"
const ErrorPage = () => {
  return (
    <div className="grid h-screen place-content-center pl-40 bg-white px-4">
      <div className="text-center">
        <h1 className="text-[12rem] font-black text-gray-200  ">404</h1>

        <p className="text-2xl ml-3 font-bold tracking-tight text-gray-900 sm:text-4xl">
          Uh-oh!
        </p>

        <p className="mt-4 ml-3 text-gray-500">We can&apos;t find that page.</p>

        <Link
          to="/"
          className="mt-6  ml-3 inline-block rounded bg-blue-200 px-5 py-3 text-sm font-medium text-black ring hover:bg-blue-300 focus:outline-none focus:ring"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}

export default ErrorPage
