import { FC } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { H2 } from "@/components/ui/typography";
import { DateType, DutyType, ShiftType, StaffType } from "@/utils/types";

type ScheduleTableProps = {
  dates: DateType[];
  duties: DutyType[];
  staffs: StaffType;
  shifts: ShiftType;
  onSelect: (dutyId: string, dateId: string, staffId: string) => void;
};

export const ScheduleTable: FC<ScheduleTableProps> = ({
  dates,
  duties,
  staffs,
  shifts,
  onSelect,
}) => {
  const onStaffSelect =
    (dutyId: string, dateId: string) => (staffId: string) => {
      onSelect(dutyId, dateId, staffId);
    };

  return (
    <div className="w-full">
      <H2>Schedule</H2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]"></TableHead>
            {dates.map((day) => (
              <TableHead key={day.id} className="font-bold">
                {day.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {duties.map((duty) => (
            <TableRow key={duty.id}>
              <TableCell className="font-bold">{duty.label}</TableCell>
              {dates.map((date) => (
                <TableCell key={`${duty}-${date.id}-cell`}>
                  <Select onValueChange={onStaffSelect(duty.id, date.id)}>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          shifts?.[`${date.id}-${duty.id}`].staffName
                        }
                      />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {staffs &&
                        Object.values(staffs)?.map((staff) => (
                          <SelectItem
                            className="hover:bg-gray-400"
                            value={staff.id}
                            key={`${date.id}-${duty.id}-${staff.id}`}
                          >
                            {staff.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
