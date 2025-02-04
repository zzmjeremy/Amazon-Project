import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
export const deliveryOptions = [
  {
    id: "1",
    deliveryDays: 7,
    priceCents: 0,
  },
  {
    id: "2",
    deliveryDays: 3,
    priceCents: 499,
  },
  {
    id: "3",
    deliveryDays: 1,
    priceCents: 999,
  },
];

export function getDeliveryOption(deliveryOptionId) {
  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  });
  return deliveryOption || deliveryOptions[0];
}

export function calculateDeliveryDate(deliveryOption) {
  const today = dayjs();
  let deliveryDate = today;
  let remainingDays = deliveryOption.deliveryDays;
  function isWeekday(date) {
    if (date === "Saturday" || date === "Sunday") {
      return false;
    } else {
      return true;
    }
  }
  while (remainingDays > 0) {
    deliveryDate = deliveryDate.add(1, "days");
    const dateFormat = deliveryDate.format("dddd");
    if (isWeekday(dateFormat)) {
      remainingDays--;
    }
  }
  const dateString = deliveryDate.format("dddd, MMMM D");
  return dateString;
}
