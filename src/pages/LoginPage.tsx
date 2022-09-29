import React from 'react'

import { client } from '../pocketbase/PocketBaseHandler'

import { useNavigate } from 'react-router-dom'

import axios from 'axios'
import Button from '../components/Button'
import { useEffectOnce } from 'react-use'
import { handleError } from '../util/SnackbarHandler'
import { useSnackbar } from 'notistack'

const LoginPage = () => {
    const snackbar = useSnackbar()
    const navigate = useNavigate()
    
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')

    useEffectOnce(() => {
        if (client.authStore.isValid) {
            navigate('/')
        }
    })

    const handleLoginClick = async () => {
        try {
            const loginResult = await client.users.authViaEmail(username, password);

            // Set axios header
            axios.defaults.headers.common['Authorization'] = `User ${loginResult.token}`;

            navigate("/")
        } catch (error: any) {
            handleError(snackbar, error)
        }
    }

    return (
        <>
            <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    <div>
                        {/*
                        <img
                            className="mx-auto h-12 w-auto"
                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                            alt="Your Company"
                        />
                        */}
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                            Login
                        </h2>
                        {/*
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Or{' '}
                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                start your 14-day free trial
                            </a>
                        </p>
                        */}
                    </div>
                    <div className="mt-8 space-y-6">
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="-space-y-px rounded-md shadow-sm">
                            <div>
                                <label htmlFor="email-address" className="sr-only">
                                    Email address
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Email address"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <Button fullWidth onClick={handleLoginClick}>
                                Login
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginPage