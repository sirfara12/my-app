import { useRouter } from "next/router";

const CategoryPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <div>
      <h1>Category Page</h1>

      <h3>Parameter URL:</h3>
      <ul>
        {slug &&
        (Array.isArray(slug) ? slug : [slug]).map((item, index) => (
            <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryPage;