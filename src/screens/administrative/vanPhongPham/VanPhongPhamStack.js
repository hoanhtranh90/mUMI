import { createStackNavigator } from 'react-navigation';

import VanPhongPhamMain from './MainIndex';
import VanPhongPhamCreateEdit from './create-edit/CreateEditScreen';
import VanPhongPhamDetail from './detail/DetailScreen';

const VanPhongPhamStack = createStackNavigator(
  {
    VanPhongPhamMain,
    VanPhongPhamCreateEdit,
    VanPhongPhamDetail
  },
  {
    initialRouteName: 'VanPhongPhamMain',
    headerMode: 'none',
  }
);

export default VanPhongPhamStack;
