import { useStore } from "@/hook/useStore";
import { ScheduleTable } from "@/components/ScheduleTable";
import { LoadTable } from "@/components/LoadTable";

function App() {
  const { staffs, shifts, dates, activities, onShiftsChange } = useStore();

  if (!dates || !activities || !shifts || !staffs) return <div>Error</div>;

  return (
    <div className="flex flex-col items-center p-4">
      <ScheduleTable
        dates={dates}
        duties={activities}
        shifts={shifts}
        onSelect={onShiftsChange}
        staffs={staffs}
      />
      <hr className="m-4 mt-8 w-full" />
      <LoadTable staffs={staffs} dates={dates} />
    </div>
  );
}

export default App;
