export type DateType = {
  id: string;
  label: string;
};

export type DutyType = {
  id: string;
  label: string;
};

export type StaffType = Record<
  string,
  {
    id: string;
    name: string;
    shifts: { [key: string]: string[] };
  }
>;

export type ShiftType = Record<
  string,
  {
    activityId: string;
    activityLabel: string;
    dateId: string;
    dateLabel: string;
    staffId?: string;
    staffName?: string;
  }
>;
