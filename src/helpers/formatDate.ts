import { format } from "date-fns";

const formatDate = (date: string) => {
  const newDate = new Date(date);
  return format(newDate, "hh:mm aaa | dd MMM yyyy ");
};

export default formatDate;
