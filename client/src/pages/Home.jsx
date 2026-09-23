import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="min-h-screen bg-slate-100 px-4 py-12 text-slate-900 sm:py-20">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
          User management
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          Backend Learning Project
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-slate-600">
          Create and view users from one simple dashboard.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/create-user"
            className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200"
          >
            Create user
          </Link>
          <Link
            to="/users"
            className="rounded-lg border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-200"
          >
            View users
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Home;