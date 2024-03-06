import dayjs, { Dayjs } from "dayjs";
import { DateRange, LocalizationProvider, PickersShortcutsItem, SingleInputDateRangeField } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";

interface DateRangePickerProps {
  dateRangePickerValueChanged: Function;
  value: DateRange<Dayjs>;
  disabled?: boolean;
}
const shortcutsItems: PickersShortcutsItem<DateRange<Dayjs>>[] = [
  {
    label: "This Week",
    getValue: () => {
      const today = dayjs();
      return [today.startOf("week"), today.endOf("week")];
    },
  },
  {
    label: "Last Week",
    getValue: () => {
      const today = dayjs();
      const prevWeek = today.subtract(7, "day");
      return [prevWeek.startOf("week"), prevWeek.endOf("week")];
    },
  },
  {
    label: "Last 7 Days",
    getValue: () => {
      const today = dayjs();
      return [today.subtract(7, "day"), today];
    },
  },
  {
    label: "Current Month",
    getValue: () => {
      const today = dayjs();
      return [today.startOf("month"), today.endOf("month")];
    },
  },
  {
    label: "Next Month",
    getValue: () => {
      const today = dayjs();
      const startOfNextMonth = today.endOf("month").add(1, "day");
      return [startOfNextMonth, startOfNextMonth.endOf("month")];
    },
  },
  { label: "Reset", getValue: () => [null, null] },
];
export default function DateRangePickerComponent(props: DateRangePickerProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateRangePicker
        disabled={props?.disabled}
        format={"DD-MM-YYYY"}
        value={props.value}
        slots={{ field: SingleInputDateRangeField }}
        onChange={(newValue) => {
          props.dateRangePickerValueChanged(newValue);
        }}
        slotProps={{
          textField: { size: "small", title: "test", label: "Date range" },
          shortcuts: {
            items: shortcutsItems,
          },
        }}
        // localeText={{ start: "Date From", end: "Date To" }}
      />
    </LocalizationProvider>
  );
}
