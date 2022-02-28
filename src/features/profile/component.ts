import {createComponent} from '../../utils/component';
import {signOut} from './actions/signOut';
import {store} from '../store/store';
import {memo} from '../store/memo';
import {changeMarket} from './actions/changeMarket';
import {viewMarket} from './actions/viewMarket';
import {openMarket} from '../market/actions/openMarket';

const CONTRACT_LINK = 'https://explorer.testnet.near.org/accounts/app_2.spin_swap.testnet';

const onSelectMarket = (event: Event) => {
  const target = event.target as any;
  changeMarket(Number(target.value) ?? -1);
};

const onView = () => {
  viewMarket();
  openMarket();
};

const idSelector = memo();
const balanceSelector = memo();
const marketsSelector = memo();

export const Profile = createComponent({
  template: () => `
    <section class="profile">
      <p class="title title__gap">Hi! 👋</p>
      <div class="list list__gap-s">
        ${
          !!store.getState().user.id
            ? `<div class="list_item">
                <div class="list_head">Имя</div>
                <div class="list_tail">${store.getState().user.id}</div>
              </div>`
            : ''
        }
        ${
          !!store.getState().user.balance
            ? `<div class="list_item">
                <div class="list_head">Баланс</div>
                <div class="list_tail">${store.getState().user.balance}</div>
              </div>`
            : ''
        }
        <div class="list_item">
          <div class="list_head">Контракт</div>
          <div class="list_tail">
            <a href="${CONTRACT_LINK}">Перейти</a>
          </div>
        </div>
      </div>
      <button class="button profile_button list__gap">Signout</button>
      ${
        !!store.getState().markets.markets
          ? `<div class="list">
                <div class="list_item list__gap-s">
                  <div class="list_head">Маркет</div>
                  <div class="list_tail">
                    <select class="profile_select">
                      ${store.getState().markets.markets.map((market) => {
                        return `<option value="${market.id}" ${
                          market.id === store.getState().markets.currentId ? 'selected' : ''
                        } >${market.base.ticker} / ${market.quote.ticker}</option>`;
                      })}
                    </select>
                  </div>
                </div>
                <button class="button profile_view">View</button>
              </div>`
          : ''
      }
      <style>
        .list {
          display: flex;
          flex-direction: column;
          align-items: stretch;
        }

        .list__gap {
          margin-bottom: 2em;
        }

        .list__gap-s {
          margin-bottom: 1em;
        }

        .list_item {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          flex: 1;
        }

        .list_head {
          display: flex;
          flex-direction: column;
          flex: 1;
          justify-content: center;
          align-items: flex-start;
        }

        .list_tail {
          display: flex;
          flex-direction: column;
          flex: 2;
          justify-content: center;
          align-items: flex-end;
        }
      </style>
    </section>`,
  effect: (rerender) => {
    const signOutButton = document.getElementsByClassName('profile_button').item(0);
    signOutButton?.addEventListener('click', signOut);

    const marketSelector = document.getElementsByClassName('profile_select').item(0);
    marketSelector?.addEventListener('change', onSelectMarket);

    const viewButton = document.getElementsByClassName('profile_view').item(0);
    viewButton?.addEventListener('click', onView);

    const unlistenuUserId = store.listen(
      idSelector(
        (state) => state.user.id,
        (state) => {
          if (state.user.id) {
            rerender();
          }
        },
      ),
    );

    const unlistenBalance = store.listen(
      balanceSelector(
        (state) => state.user.balance,
        (state) => {
          if (state.user.balance) {
            rerender();
          }
        },
      ),
    );

    const unlistenMarkets = store.listen(
      marketsSelector(
        (state) => state.markets.markets.length,
        (state) => {
          if (state.markets.markets.length) {
            rerender();
          }
        },
      ),
    );

    return () => {
      unlistenuUserId?.();
      unlistenBalance?.();
      unlistenMarkets?.();
      signOutButton?.removeEventListener('click', signOut);
      marketSelector?.removeEventListener('change', onSelectMarket);
      viewButton?.removeEventListener('click', onView);
    };
  },
});
