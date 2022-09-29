import PocketBase from 'pocketbase'
import Config from '../Config';

const client = new PocketBase(Config.pocketbase)

/*
For debugging:
client.authStore.onChange(() => {
    console.log(client.authStore.token)
});
*/

export {
    client
}