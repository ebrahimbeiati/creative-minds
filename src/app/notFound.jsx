import Link from "next/link";
const notFound = () => {
  return (
    <div>
          <h1>Page not Found</h1>
          <p>
            Sorry, we could not find this page.
            
          </p>
          <Link href="/">Back to Home</Link>
    </div>
  );
}

export default notFound