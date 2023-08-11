import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout, setToken } from "../auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3500",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 403) {
    const refreshResult = await baseQuery("/refresh", api, extraOptions);

    if (refreshResult?.data) {
      api.dispatch(setToken({ ...refreshResult.data }));

      result = await baseQuery(args, api, extraOptions);
    } else {
      if (refreshResult?.error?.status === 403) {
        refreshResult.error.data.message = "Your login has expired";
      }
      return refreshResult;
    }
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: () => "/posts",
      providesTags: ["Post"],
    }),
    getPost: builder.query({
      query: (id) => `posts/${id}`,
    }),
    getUser: builder.query({
      query: (id) => ({
        url: `/user/${id}`,
      }),
    }),
    getUserPosts: builder.query({
      query: (userId) => `/posts/getUserPosts/${userId}`,
      providesTags: ["Post"],
    }),
    login: builder.mutation({
      query: (cridentials) => ({
        url: "/login",
        method: "POST",
        body: { ...cridentials },
      }),
    }),
    register: builder.mutation({
      query: (cridentials) => ({
        url: "/register",
        method: "POST",
        body: { ...cridentials },
      }),
    }),
    checkUsername: builder.mutation({
      query: (username) => ({
        url: "/register/checkUsername",
        method: "POST",
        body: { username },
      }),
    }),
    sendLogout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logout());
        } catch (error) {
          console.log(error);
        }
      },
    }),
    createNewPost: builder.mutation({
      query: (post) => ({
        url: "/posts",
        method: "POST",
        body: { ...post },
      }),
      invalidatesTags: ["Post"],
    }),
    deletePost: builder.mutation({
      query: (postId) => ({
        url: "/posts",
        method: "DELETE",
        body: { postId },
      }),
      invalidatesTags: ["Post"],
    }),
    refresh: builder.query({
      query: () => "/refresh",
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  useGetUserQuery,
  useGetPostQuery,
  useGetUserPostsQuery,
  useLoginMutation,
  useSendLogoutMutation,
  useRegisterMutation,
  useCheckUsernameMutation,
  useCreateNewPostMutation,
  useDeletePostMutation,
  useRefreshQuery,
} = apiSlice;
