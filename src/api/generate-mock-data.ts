const firstNames = [
  'Nguyễn',
  'Trần',
  'Lê',
  'Phạm',
  'Hoàng',
  'Huỳnh',
  'Phan',
  'Vũ',
  'Võ',
  'Đặng',
];
const middleNames = [
  'Văn',
  'Thị',
  'Hoàng',
  'Đức',
  'Minh',
  'Thành',
  'Quang',
  'Hữu',
  'Công',
];
const lastNames = [
  'An',
  'Bình',
  'Cường',
  'Dũng',
  'Em',
  'Phúc',
  'Hải',
  'Hùng',
  'Khang',
  'Long',
];

const generateRandomPhoneNumber = () => {
  const prefix = '09';
  const remainingDigits = Array(8)
    .fill(0)
    .map(() => Math.floor(Math.random() * 10))
    .join('');
  return `${prefix}${remainingDigits}`;
};

const generateRandomName = () => {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const middleName =
    middleNames[Math.floor(Math.random() * middleNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${firstName} ${middleName} ${lastName}`;
};

export const generateMockCustomers = (count: number) => {
  return Array(count)
    .fill(null)
    .map((_, index) => ({
      id: (index + 1).toString(),
      name: generateRandomName(),
      phone: generateRandomPhoneNumber(),
      selected: index === 0, // First item is selected by default
    }));
};
