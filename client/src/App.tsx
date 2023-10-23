import { useStore } from "@/hook/useStore";
import { ScheduleTable } from "@/components/ScheduleTable";
import { LoadTable } from "@/components/LoadTable";
import { Alert } from "./components/Alert";

function App() {
  const { staffs, shifts, dates, duties, onShiftsChange } = useStore();

  if (!dates || !duties || !shifts || !staffs) return <div>Error</div>;

  return (
    <div className="flex flex-col items-center p-4">
      <ScheduleTable
        dates={dates}
        duties={duties}
        shifts={shifts}
        onSelect={onShiftsChange}
        staffs={staffs}
      />
      <hr className="m-4 mt-8 w-full" />
      <LoadTable staffs={staffs} dates={dates} />
      <Alert />
    </div>
  );
}

export default App;
