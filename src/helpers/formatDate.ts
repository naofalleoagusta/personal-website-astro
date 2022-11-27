import { format } from "date-fns";

const formatDate = (date: string, withoutHour?: boolean) => {
  const newDate = new Date(date);
  return format(newDate, `${withoutHour ? "" : "hh:mm aaa |"} dd MMM yyyy`);
};

export default formatDate;
