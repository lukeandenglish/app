import {fetchBaseQuery} from '@reduxjs/toolkit/query';
import cred from '../../cred';

export const baseQuery = fetchBaseQuery({
  baseUrl: cred.URI,
  prepareHeaders: headers => {
    headers.set('x-api-key', cred.XAPI_KEY);
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set(
      'Authorization',
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmX25hbWUiOm51bGwsImxfbmFtZSI6bnVsbCwiaWQiOiJjOGQzOTg0Yy0xNGYxLTQxMWMtYTc5OC1kZTk3NTgzYTZkYmEiLCJlbWFpbCI6ImZpbnRlY2htdXN0cmVldHNAZ21haWwuY29tIiwiZW1haWxWZXJpZmllZCI6dHJ1ZSwibGV2ZWwiOm51bGwsInBob25lVmVyaWZpZWQiOmZhbHNlLCJwcm92aWRlcnMiOltdLCJpYXQiOjE2ODg2NzAzNTksImV4cCI6MTY4ODg0MzE1OX0.V0AT529M6oo_WXzrebVhR5aM-GRdcwd03w9iKYdQGXw',
    );

    return headers;
  },
});
