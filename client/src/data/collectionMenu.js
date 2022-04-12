import { FaBars, FaStar, FaSignal, FaPlus } from 'react-icons/fa';

const collectionMenu = [
  {
    icon: <FaBars />,
    name: 'Properties',
    description: 'Textual traits that show up as rectangles',
    modal: ['Type', 'Name'],
  },
  {
    icon: <FaStar />,
    name: 'Levels',
    description: 'Numerical traits that show as a progress bar',
    modal: ['Name', 'Value'],
  },
  {
    icon: <FaSignal />,
    name: 'Stats',
    description: 'Numerical traits that just show as numbers',
    modal: ['Name', 'Value'],
  },
];

export default collectionMenu;
