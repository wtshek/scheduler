//

import { useState } from "react";

import {
  dates,
  duties,
  shifts as shiftsConfig,
  staffs as staffsConfig,
} from "@/utils/config";
import { ShiftType, StaffType } from "@/utils/types";
import { useAlertContext } from "./useAlertContext";

const MAX_SHIFT_PER_DAY = 2;
const MAX_SHIFT_PER_WEEK = 7;

export const useStore = () => {
  const [shifts, setShifts] = useState<ShiftType>(shiftsConfig);
  const [staffs, setStaffs] = useState<StaffType>(staffsConfig);
  const { setMessage, toggleAlert } = useAlertContext();

  const showAlert = (message: string) => {
    toggleAlert();
    setMessage(message);
  };

  const onShiftsChange = (dutyId: string, dateId: string, staffId: string) => {
    if (!shifts || !staffs) return;

    const staffShifts = staffs[staffId]?.shifts?.[dateId];
    const duty = duties?.find((duty) => duty.id === dutyId);

    // Check if staff is assigned to 2 consecutive lunch slots
    if (!duty?.isDuty) {
      const isConsecutiveLunch = staffShifts?.some(
        (shift) =>
          shift.number &&
          (duty?.number === shift.number + 1 ||
            duty?.number === shift.number - 1)
      );

      if (isConsecutiveLunch) {
        showAlert("Cannot set the same staff to two consecutive lunch slots.");
        return;
      }
    }

    // Check if staff is assigned to more than 7 shift per week
    if (duty?.isDuty && staffs[staffId].totalShifts >= MAX_SHIFT_PER_WEEK) {
      showAlert("Cannot assign more than 7 shifts to the same staff.");
      return;
    }

    // check if staff is assigned to more than 2 shift per day
    if (duty?.isDuty) {
      const shiftsOfTheDay = Object.values(shifts).filter(
        (shift) => shift.dateId === dateId
      );

      const numOfShiftsAssigned = shiftsOfTheDay.reduce(
        (sum, shift) => (sum += shift.staffId === staffId ? 1 : 0),
        0
      );

      if (numOfShiftsAssigned >= MAX_SHIFT_PER_DAY) {
        showAlert(
          "Cannot assign more than 2 shifts to the same staff per day."
        );
        return;
      }
    }

    const updatedShifts = {
      ...shifts,
      [`${dateId}-${dutyId}`]: {
        ...shifts?.[`${dateId}-${dutyId}`],
        staffId,
        staffName: staffs?.[staffId]?.name,
      },
    };

    const updatedStaffsData = {
      ...staffs,
      [staffId]: {
        ...staffs[staffId],
        shifts: {
          ...(staffs[staffId]?.shifts || {}),
          [dateId]: [
            ...(staffs[staffId]?.shifts?.[dateId] || []),
            { ...(duty || {}) },
          ],
        },
        totalShifts: duty?.isDuty ? (staffs[staffId].totalShifts || 0) + 1 : 0,
      },
    } as StaffType;

    const assignedStaff = shifts[`${dateId}-${dutyId}`]?.staffId;

    if (assignedStaff) {
      updatedStaffsData[assignedStaff] = {
        ...updatedStaffsData[assignedStaff],
        shifts: {
          ...staffs[assignedStaff].shifts,
          [dateId]: staffs[assignedStaff].shifts[dateId].filter(
            (duty) => dutyId !== duty.id
          ),
        },
        totalShifts: staffs[assignedStaff].totalShifts - 1,
      };
    }

    setShifts(updatedShifts);
    setStaffs(updatedStaffsData);
  };

  return {
    dates: dates,
    staffs: staffs,
    shifts: shifts,
    duties: duties,
    onShiftsChange,
  };
};
