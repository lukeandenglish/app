import {fetchBaseQuery} from '@reduxjs/toolkit/query';
import cred from '../../cred';

export const baseQuery = fetchBaseQuery({
  baseUrl: cred.URI,
  prepareHeaders: headers => {
    headers.set('x-api-key', cred.XAPI_KEY);
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set(
      'Authorization',
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmX25hbWUiOm51bGwsImxfbmFtZSI6bnVsbCwiaWQiOiJjOGQzOTg0Yy0xNGYxLTQxMWMtYTc5OC1kZTk3NTgzYTZkYmEiLCJlbWFpbCI6ImZpbnRlY2htdXN0cmVldHNAZ21haWwuY29tIiwiZW1haWxWZXJpZmllZCI6dHJ1ZSwibGV2ZWwiOiJaRVJPIiwicGhvbmVWZXJpZmllZCI6ZmFsc2UsInByb3ZpZGVycyI6W10sImlhdCI6MTY4ODkxODA3NSwiZXhwIjoxNjg5MDkwODc1fQ.u_Iopxl_RLfAWN4Wi0Yio2bRERV1-Uw6zMXgCuaM31A',
    );

    return headers;
  },
});
