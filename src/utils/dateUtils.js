export const addOneDay = (date) => {
  const result = new Date(date);
  result.setDate(result.getDate() + 1);
  const year = result.getFullYear();
  const month = String(result.getMonth() + 1).padStart(2, '0');
  const day = String(result.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};