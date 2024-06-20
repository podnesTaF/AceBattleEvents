import { AboutArticle, Rules, Structure } from "@/src/features/about/ui";

const AboutPage = ({
  searchParams,
}: {
  searchParams?: {
    tab?: string;
  };
}) => {
  return (
    <main className="my-4 max-w-6xl mx-4 lg:mx-auto">
      {searchParams?.tab === "rules" && <Rules />}
      {searchParams?.tab === "structure" && <Structure />}
      {(searchParams?.tab === "about" || !searchParams?.tab) && (
        <AboutArticle />
      )}
    </main>
  );
};

export default AboutPage;
