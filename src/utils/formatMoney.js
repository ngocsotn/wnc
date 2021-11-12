export const formatMoney = (value) => {
  return !value ? 0 : value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};
