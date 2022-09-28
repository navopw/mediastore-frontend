import PocketBase from 'pocketbase'

const client = new PocketBase("http://localhost:8090")

client.authStore.onChange(() => {
    console.log(client.authStore.token)
});

export {
    client
}