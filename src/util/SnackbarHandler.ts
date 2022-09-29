import { AxiosError } from 'axios';
import { ProviderContext } from 'notistack';

const handleError = (snackbar: ProviderContext, error: any) => {
    if (typeof error === 'string') {
        snackbar.enqueueSnackbar(error, { variant: 'error' });
    } else if (error instanceof AxiosError) {
        const errorResponse = error.response
        
        if (errorResponse) {
            const { data } = errorResponse
            const { message } = data

            // First character upper case, go wants lowercase in linting
            let formattedMessage = message.charAt(0).toUpperCase() + message.slice(1)

            snackbar.enqueueSnackbar(formattedMessage, { variant: 'error' })
        }

    } else {
        console.log(error)
        snackbar.enqueueSnackbar("Something went wrong, see console", { variant: 'error' })
    }
}

const handleSuccess = (snackbar: ProviderContext, message: string) => {
    snackbar.enqueueSnackbar(message, { variant: 'success' })
}

export { handleError, handleSuccess }