import { createFeatureSelector } from "@ngrx/store";
import { getSelectors, MinimalRouterStateSnapshot, RouterReducerState } from "@ngrx/router-store";

export const routerFeatureKey = 'router';

export const routerFeatureState =
  createFeatureSelector<RouterReducerState<MinimalRouterStateSnapshot>>(
    routerFeatureKey
  );

export const selectRouterParam = getSelectors(routerFeatureState).selectRouteParam;
