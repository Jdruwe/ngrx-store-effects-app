import { Injectable } from "@angular/core";

import { Effect, Actions } from "@ngrx/effects";
import * as toppingActions from "../actions/toppings.action";

import { switchMap, map, catchError } from "rxjs/operators";
import { of } from "rxjs/observable/of";
import * as fromServices from "../../services";

@Injectable()
export class ToppingsEffects {
  constructor(
    private actions$: Actions,
    private toppingService: fromServices.ToppingsService
  ) {}

  @Effect()
  loadToppings$ = this.actions$.ofType(toppingActions.LOAD_TOPPINGS).pipe(
    switchMap(() => {
      return this.toppingService
        .getToppings()
        .pipe(
          map(toppings => new toppingActions.LoadToppingsSuccess(toppings)),
          catchError(error => of(new toppingActions.LoadToppingsFail(error)))
        );
    })
  );
}
