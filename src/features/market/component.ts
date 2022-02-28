import {createComponent} from '../../utils/component';
import {store} from '../store/store';
import {memo} from '../store/memo';
import {closeMarket} from './actions/closeMarket';

const marketOpenSelector = memo();
const viewMarketSelector = memo();

const currentViewTitle = () => {
  const currentId = store.getState().markets.currentId;
  const market = store.getState().markets.markets.find((market) => market.id === currentId);
  if (!market) return 'View';
  return `${market.base.ticker} / ${market.quote.ticker}`;
};

const spredDiff = () => {
  const view = store.getState().markets.view;
  if (!view) return 'None';
  const bidHead = view.bid_orders[0];
  const askLast = view.ask_orders[view.ask_orders.length - 1];
  if (!bidHead || !askLast) return 'None';
  return Math.abs(bidHead.price - askLast.price);
};

const onEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    closeMarket();
  }
};

export const Market = createComponent({
  template: () =>
    store.getState().markets.isMarketOpen
      ? `
    <div class="market">
      <div class="market_backgrop"></div>
      <div class="market_close">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
          <path d="M0 0h24v24H0V0z" fill="none"/>
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
        </svg>
      </div>
      <div class="market_content">
        ${
          store.getState().markets.isViewMarketsLoading
            ? `
          <div class="market_loader">
            <div class="market_indicator">
          </div>
        `
            : `${
                store.getState().markets.view
                  ? `
                  <div class="market_title">
                    ${currentViewTitle()}
                  </div>
                  <div class="market_body">
                      <div class="market_item">
                        <div class="market_price market_item_title">
                          Price
                        </div>
                        <div class="market_quantity market_item_title">
                          Quantity
                        </div>
                      </div>
                      <div class="market_ask">
                        ${store
                          .getState()
                          .markets.view?.ask_orders.map((item) => {
                            return `
                            <div class="market_item">
                              <div class="market_price market_price__ask">
                                ${BigInt(item.price)}
                              </div>
                              <div class="market_quantity">
                                ${BigInt(item.quantity)}
                              </div>
                            </div>
                          `;
                          })
                          .join('')}
                      </div>
                      <div class="market_item market_spread">
                        <div class="market_price market_spread_title">
                          Spread
                        </div>
                        <div class="market_quantity market_spread_title">
                          ${BigInt(spredDiff())}
                        </div>
                      </div>
                      <div class="market_bid">
                        ${store
                          .getState()
                          .markets.view?.bid_orders.map((item) => {
                            return `
                            <div class="market_item">
                              <div class="market_price market_price__bid">
                                ${BigInt(item.price)}
                              </div>
                              <div class="market_quantity">
                                ${BigInt(item.quantity)}
                              </div>
                            </div>
                          `;
                          })
                          .join('')}
                      </div>
                    </div>
                  `
                  : `
                    <div class="market_empty">No data 😔</div>
                  `
              }`
        }
      </div>
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
          width: 70vw;
          border-radius: 4px;
          max-height: 80vh;
          overflow: auto;
        }

        .market_loader {
          display: flex;
          flex: 1;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 2em;
        }

        .market_indicator {
          border: 2px solid #f3f3f3;
          border-top: 2px solid rgb(37, 90, 163);
          border-radius: 50%;
          width: 100px;
          height: 100px;
          animation: spin 1s linear infinite;
          align-self: center;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .market_empty {
          color: black;
          font-size: 2em;
          text-align: center;
          padding: 2em;
        }

        .market_body {
          padding: 2em;
        }

        .market_item {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.3em;
        }

        .market_item_title {
          font-weight: bold;
          font-size: 1.3em;
        }

        .market_price {}

        .market_price__ask {
          color: tomato;
        }

        .market_price__bid {
          color: green;
        }

        .market_quantity {}

        .market_title {
          text-align: center;
          padding: 0.5em;
          font-size: 2em;
        }

        .market_spread {
          margin: 1em 0;
        }

        .market_spread_title {
          font-weight: bold;
          font-size: 1.1em;
        }

        @media (max-width: 768px) {
          .market_item {
            flex-direction: column;
          }
        }

        .market_close {
          position: absolute;
          right: 0;
          top: 0;
          cursor: pointer;
          padding: 1em;
        }
      </style>
    </div>
  `
      : '',
  effect: (rerender) => {
    const backdrop = document.getElementsByClassName('market_backgrop').item(0);
    backdrop?.addEventListener('click', closeMarket);

    const close = document.getElementsByClassName('market_close').item(0);
    close?.addEventListener('click', closeMarket);

    document.addEventListener('keydown', onEscape);

    const marketOpenUnlisten = store.listen(
      marketOpenSelector(
        (state) => state.markets.isMarketOpen,
        () => {
          rerender();
        },
      ),
    );

    const viewMarketUnlisten = store.listen(
      viewMarketSelector(
        (state) => state.markets.isViewMarketsLoading,
        () => {
          rerender();
        },
      ),
    );

    return () => {
      marketOpenUnlisten?.();
      viewMarketUnlisten?.();
      backdrop?.removeEventListener('click', closeMarket);
      close?.removeEventListener('click', closeMarket);
      document.removeEventListener('keydown', onEscape);
    };
  },
});
