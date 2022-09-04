import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className="">
      <h1>
        <Link href="/api/login">
          <a>Login</a>
        </Link>
      </h1>
    </div>
  );
};

export default Home;
