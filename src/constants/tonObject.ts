import { TonConnectUI } from '@tonconnect/ui';

export const ton = new TonConnectUI({
    manifestUrl: 'https://host.yuriyzholtov.com/tonconnect-manifest.json',
    actionsConfiguration:{
        modals : ['before', 'success', 'error'],
        notifications: ['before', 'success', 'error']
    }
});
