import { CustomTable } from "~/components/shared";

const LastRacesSection = ({ tableData }: { tableData?: any[] }) => {
  return (
    <div className="px-4">
      <h2 className="text-3xl font-semibold my-4 text-center">Last Races</h2>
      <div className="mb-4">
        {tableData?.length ? (
          <CustomTable
            itemsName="races"
            rows={tableData}
            isLoading={false}
            titleColor="bg-black"
            isTitleStraight={true}
          />
        ) : (
          <p>Your club haven't finished any races yet</p>
        )}
      </div>
    </div>
  );
};

export default LastRacesSection;
