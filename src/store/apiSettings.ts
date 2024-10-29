import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEST_APP_API_URL, credentials: 'include' }),
    endpoints: () => ({}),
    tagTypes: ['File', 'Folder'],
});
