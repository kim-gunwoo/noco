import Seo from "../../components/Seo";

export default function Detail({ movie }) {
  return (
    <div>
      <Seo title={movie.original_title} />
      <h4>{movie.original_title}</h4>
    </div>
  );
}

export async function getServerSideProps({ query: { id } }) {
  const results = await (
    await fetch(`http://localhost:3000/api/movies/${id}`)
  ).json();

  return {
    props: {
      movie: results,
    },
  };
}
