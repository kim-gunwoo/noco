import type { NextPage } from "next";
import Link from "next/link";
import { css } from "@emotion/react";

const Home: NextPage = () => {
  return (
    // <div className="container">
    <div css={container}>
      <p css={paragraph}>Some text.</p>
      <Link href="/">
        <a>home</a>
      </Link>
      <Link href="/counter">
        <a>couter</a>
      </Link>

      {/* <style jsx>{`
        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1rem;
          width: 500px;
          background-color: red;
        }
      `}</style> */}
    </div>
  );
};

const container = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  width: 500px;
  background-color: red;
`;

const paragraph = css`
  color: turquoise;

  &:hover {
    color: white;
  }
`;

export default Home;
