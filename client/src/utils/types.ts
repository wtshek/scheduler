export type DateType = {
  id: string;
  label: string;
};

export type DutyType = {
  id: string;
  label: string;
  isDuty?: boolean;
  shiftTime?: "morning" | "afternoon";
  number?: number;
};

export type StaffType = Record<
  string,
  {
    id: string;
    name: string;
    shifts: { [key: string]: DutyType[] };
    totalShifts: number;
  }
>;

export type ShiftType = Record<
  string,
  {
    dutyId: string;
    dutyLabel: string;
    dateId: string;
    dateLabel: string;
    staffId?: string;
    staffName?: string;
  }
>;
