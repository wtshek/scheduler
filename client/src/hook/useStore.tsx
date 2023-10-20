//

import { useEffect, useState } from "react";

import {
  mockActivities,
  mockDate,
  mockShifts,
  mockStaffs,
} from "@/utils/mockData";
import { DutyType, DateType, ShiftType, StaffType } from "@/utils/types";

export const useStore = () => {
  const [dates, setDates] = useState<DateType[]>();
  const [shifts, setShifts] = useState<ShiftType>();
  const [staffs, setStaffs] = useState<StaffType>();
  const [activities, setActivities] = useState<DutyType[]>();

  useEffect(() => {
    const fetchData = async () => {
      /**
       * data: activities/ shift, staffs, dates, date-shift
       * what about if it is not empty?
       */

      // TODO: fetching

      // return { shifts: shifts, dates: dates, staff: staffs };

      setDates(mockDate);
      setShifts(mockShifts);
      setStaffs(mockStaffs);
      setActivities(mockActivities);
    };

    fetchData();
  }, []);

  const onShiftsChange = (
    activityId: string,
    dateId: string,
    staffId: string
  ): void => {
    if (!shifts || !staffs) return;

    const newShifts = {
      ...shifts,
      [`${dateId}-${activityId}`]: {
        ...shifts?.[`${dateId}-${activityId}`],
        staffId,
        staffName: staffs?.[staffId].name,
      },
    };
    const newStaffsData = {
      ...staffs,
      [staffId]: {
        ...staffs[staffId],
        shifts: {
          [dateId]: [...(staffs[staffId]?.shifts?.[dateId] || []), activityId],
        },
      },
    };

    setShifts(newShifts);
    setStaffs(newStaffsData);
  };

  return {
    dates: dates,
    staffs: staffs,
    shifts: shifts,
    activities: activities,
    onShiftsChange,
  };
};
