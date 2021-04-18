import * as H from 'history';
import * as react from 'react';
export interface UmiRouterProps {
  location: H.Location;
  match: {
    isExact: boolean;
    params: Object;
    path: string;
    url: string;
  };
  history: H.History;
  route: {
    location: H.Location;

    routes: Array<{
      path: string;
      exact: boolean;
      title: string;
      component: react.Component;
    }>;
  };
}
