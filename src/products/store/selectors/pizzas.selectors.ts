import {createSelector} from "@ngrx/store";

import * as fromRoot from '../../../app/store';
import * as fromFeature from "../reducers";
import * as fromPizzas from "../reducers/pizzas.reducer";
import {Pizza} from "../../models/pizza.model";
import {RouterStateUrl} from "../../../app/store/reducers";
import * as fromRouter from "@ngrx/router-store";

export const getPizzaState = createSelector(
  fromFeature.getProductsState,
  (state: fromFeature.ProductState) => state.pizzas
);

export const getPizzasEntities = createSelector(
  getPizzaState,
  fromPizzas.getPizzasEntities
);

export const getSelectedPizza = createSelector(
  getPizzasEntities,
  fromRoot.getRouterState,
  (entities, router: fromRouter.RouterReducerState<RouterStateUrl>): Pizza => {
    return router.state && entities[router.state.params.pizzaId];
  }
);

export const getAllPizzas = createSelector(
  getPizzasEntities,
  (entities) => {
    return Object.keys(entities).map(id => entities[parseInt(id, 10)])
  }
);

export const getPizzasLoaded = createSelector(
  getPizzaState,
  fromPizzas.getPizzasLoaded
);

export const getPizzasLoading = createSelector(
  getPizzaState,
  fromPizzas.getPizzasLoading
);
