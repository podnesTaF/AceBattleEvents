import { LoaderArgs, json } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { Api } from "~/api/axiosInstance";
import { Pagination } from "~/components";
import { ExpandableTable } from "~/components/results";
import { adminAuthenticator, teamResultsTable } from "~/lib/utils";

export const loader = async ({ request }: LoaderArgs) => {
  const url = request.url;
  const params = url.split("?")[1];
  const currPage = new URL(url).searchParams.get("page") || "1";
  const teamResults = await Api().races.getAllResults(params);
  const me = await adminAuthenticator.isAuthenticated(request);

  if (!me) {
    throw new Response("Unauthorized");
  }

  if (!teamResults?.data) {
    return json({
      tableRows: [],
      totalPages: 1,
      currPage: parseInt(currPage),
      me,
    });
  }

  const tableRows = teamResultsTable(teamResults.data);
  return json({
    tableRows,
    totalPages: teamResults.totalPages,
    currPage: parseInt(currPage),
    me,
  });
};

const AdminResults = () => {
  const { tableRows, currPage, totalPages, me } =
    useLoaderData<typeof loader>();
  const navigate = useNavigate();

  const onChangePage = (pageNum: number) => {
    const url = new URL(window.location.href);
    url.searchParams.set("page", pageNum.toString());
    navigate(url.pathname + url.search);
  };
  return (
    <div className="mx-auto max-w-6xl my-8">
      <ExpandableTable me={me} headers={[]} rows={tableRows} />
      <div className="flex justify-center my-4">
        <Pagination
          pagesCount={totalPages}
          onChangePage={onChangePage}
          currPage={currPage}
        />
      </div>
    </div>
  );
};

export default AdminResults;
