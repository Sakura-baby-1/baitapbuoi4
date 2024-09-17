// dummy-data.js
export const DANH_MUC = [
  {
    id: 'c1',
    tieuDe: 'Món Ý',
    hinhAnhUrl: require('../assets/my y.jpg'),  // Đảm bảo tên tệp chính xác
  },
  {
    id: 'c2',
    tieuDe: 'Món Mỹ',
    hinhAnhUrl: require('../assets/my.jpg'),  // Đảm bảo tên tệp chính xác
  },
  {
    id: 'c3',
    tieuDe: 'Món Đức',
    hinhAnhUrl: require('../assets/duc.jpg'),  // Đảm bảo tên tệp chính xác
  },
  {
    id: 'c4',
    tieuDe: 'Món Việt',
    hinhAnhUrl: require('../assets/buncha.jpg'),  // Đảm bảo tên tệp chính xác
  },
  {
    id: 'c5',
    tieuDe: 'Món Trung Quốc',
    hinhAnhUrl: require('../assets/trungquoc1.jpg'),  // Đảm bảo tên tệp chính xác
  },
];

export const MON_AN = [
  {
    id: 'm1',
    danhMucIds: ['c1', 'c2'],
    tieuDe: 'Spaghetti với sốt cà chua',
    hinhAnhUrl: require('../assets/my y.jpg'),  // Đảm bảo tên tệp chính xác
    moTa: 'Món spaghetti ngon miệng với cà chua tươi và húng quế.',
  },
  {
    id: 'm2',
    danhMucIds: ['c2'],
    tieuDe: 'Hamburger cổ điển',
    hinhAnhUrl: require('../assets/banhmi.jpg'),  // Đảm bảo tên tệp chính xác
    moTa: 'Hamburger cổ điển với thịt bò nướng và rau tươi.',
  },
  {
    id: 'm3',
    danhMucIds: ['c3'],
    tieuDe: 'Schnitzel',
    hinhAnhUrl: require('../assets/trungquoc1.jpg'),  // Đảm bảo tên tệp chính xác
    moTa: 'Schnitzel giòn tan làm từ thịt tươi ngon.',
  },
  {
    id: 'm4',
    danhMucIds: ['c4'],
    tieuDe: 'Phở bò',
    hinhAnhUrl: require('../assets/phobo.jpg'),  // Đảm bảo tên tệp chính xác
    moTa: 'Món phở bò truyền thống với nước dùng thơm ngon và thịt bò mềm.',
  },
  {
    id: 'm5',
    danhMucIds: ['c4'],
    tieuDe: 'Bún chả',
    hinhAnhUrl: require('../assets/buncha.jpg'),  // Đảm bảo tên tệp chính xác
    moTa: 'Bún chả với thịt nướng và nước mắm chua ngọt.',
  },
  {
    id: 'm6',
    danhMucIds: ['c5'],
    tieuDe: 'Dim Sum',
    hinhAnhUrl: require('../assets/dimsum.jpg'),  // Đảm bảo tên tệp chính xác
    moTa: 'Các món dim sum hấp dẫn với nhân thịt và rau.',
  },
  {
    id: 'm7',
    danhMucIds: ['c5'],
    tieuDe: 'Mì xào Trung Quốc',
    hinhAnhUrl: require('../assets/mi xao.jpg'),  // Đảm bảo tên tệp chính xác
    moTa: 'Mì xào với rau và thịt tươi, gia vị đậm đà.',
  },
];
