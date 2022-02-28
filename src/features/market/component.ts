import {createComponent} from '../../utils/component';
import {store} from '../store/store';
import {memo} from '../store/memo';
import {closeMarket} from './actions/closeMarket';

const selector = memo();

export const Market = createComponent({
  template: () =>
    store.getState().markets.isMarketOpen
      ? `
    <div class="market">
      <div class="market_backgrop"></div>
      <div class="market_content"></div>
      <style>
        .market {
          position: fixed;
          left: 0;
          top: 0;
          width: 100vw;
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          flex: 1;
        }

        .market_backgrop {
          position: absolute;
          left: 0;
          top: 0;
          width: 100vw;
          height: 100vh;
          background-color: rgba(0, 0, 0, 0.4);
        }

        .market_content {
          position: relative;
          background-color: white;
          width: 50vw;
          padding: 2em;
          border-radius: 4px;
        }
      </style>
    </div>
  `
      : '',
  effect: (rerender) => {
    const backdrop = document.getElementsByClassName('market_backgrop').item(0);
    backdrop?.addEventListener('click', closeMarket);

    const unlisten = store.listen(
      selector(
        (state) => state.markets.isMarketOpen,
        () => {
          rerender();
        },
      ),
    );

    return () => {
      unlisten?.();
      backdrop?.removeEventListener('click', closeMarket);
    };
  },
});
