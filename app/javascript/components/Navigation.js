import React from 'react'

const Navigation = () => {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-4">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <div className="font-semibold text-xl tracking-tight p-4"><span href="#"
          className="bg-black text-white font-bold text-xl p-4">schmooze</span></div>
      </div>
      <div className="block lg:hidden">
        <button
          className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
          <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <a href="https://github.com/Jer-Sch/schmooze"
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
            GitHub Repo
            </a>
        </div>
        <a className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
          rel="nofollow" data-method="delete" href="/users/sign_out">
          Log out
        </a>
      </div>
    </nav>
  );
}

export default Navigation