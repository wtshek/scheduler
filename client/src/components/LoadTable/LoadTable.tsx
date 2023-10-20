import { FC } from "react";
import { H2 } from "@/components/ui/typography";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DateType, StaffType } from "@/utils/types";

type LoadTableProps = {
  dates: DateType[];
  staffs: StaffType;
};

const calculateTotal = (shifts: string[][]) =>
  shifts.reduce((sum, curr) => (sum += curr.length), 0);

export const LoadTable: FC<LoadTableProps> = ({ dates, staffs }) => {
  return (
    <div className="w-full">
      <H2>Load</H2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold">Staff Member</TableHead>
            {dates?.map((date) => (
              <TableHead key={date.id} className="font-bold">
                {date.label}
              </TableHead>
            ))}
            <TableHead className="font-bold">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.values(staffs)?.map((staff) => {
            const { id, shifts, name } = staff;
            return (
              <TableRow key={id}>
                <TableCell className="font-bold">{name}</TableCell>
                {dates?.map((date) => (
                  <TableCell>{shifts[date.id]?.length || 0}</TableCell>
                ))}
                <TableCell>{calculateTotal(Object.values(shifts))}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
