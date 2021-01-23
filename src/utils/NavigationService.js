import { NavigationActions, StackActions } from 'react-navigation';

let navigator;

function pop(n) {
  navigator.dispatch(StackActions.pop({ n }));
}

function setTopLevelNavigator(navigatorRef) {
  navigator = navigatorRef;
}

function goBack() {
  navigator.dispatch(NavigationActions.back());
}

function navigate(routeName, params) {
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}

export default {
  pop,
  goBack,
  navigate,
  setTopLevelNavigator,
};
