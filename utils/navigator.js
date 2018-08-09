
// Taken from https://github.com/react-community/react-navigation/issues/1439

import { NavigationActions, StackActions } from 'react-navigation';
import type { NavigationParams, NavigationRoute } from 'react-navigation';

let _container; // eslint-disable-line

function setContainer(container: Object) {
  _container = container;
}

function reset(routeName: string, params?: NavigationParams) {
  console.log('navigator: utils/navigator.js ---------------------->  Here');
  console.log('routeName = ' + routeName);
  _container.dispatch(
    StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          type: 'Navigation/NAVIGATE',
          routeName,
          params,
        }),
      ],
    }),
  );
}

function navigate(routeName: string, params?: NavigationParams) {
  _container.dispatch(
    NavigationActions.navigate({
      type: 'Navigation/NAVIGATE',
      routeName,
      params,
    }),
  );
}

function navigateDeep(actions: { routeName: string, params?: NavigationParams }[]) {
  _container.dispatch(
    actions.reduceRight(
      (prevAction, action): any =>
        NavigationActions.navigate({
          type: 'Navigation/NAVIGATE',
          routeName: action.routeName,
          params: action.params,
          action: prevAction,
        }),
      undefined,
    ),
  );
}

function getCurrentRoute(): NavigationRoute | null {
  if (!_container || !_container.state.nav) {
    return null;
  }

  return _container.state.nav.routes[_container.state.nav.index] || null;
}

export default {
  setContainer,
  navigateDeep,
  navigate,
  reset,
  getCurrentRoute,
};
