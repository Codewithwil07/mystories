// src/api/api.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }), // Point to json-server
  tagTypes: ['Story', 'Chapter'],
  endpoints: (builder) => ({
    getStories: builder.query({
      query: () => '/stories',
      providesTags: ['Story'],
    }),
    getStoryById: builder.query({
      query: (id) => `/stories/${id}`,
      providesTags: (result, error, id) => [{ type: 'Story', id }],
    }),
    addStory: builder.mutation({
      query: (newStory) => ({
        url: '/stories',
        method: 'POST',
        body: newStory,
      }),
      invalidatesTags: ['Story'],
    }),
    updateStory: builder.mutation({
      query: ({ id, ...updatedStory }) => ({
        url: `/stories/${id}`,
        method: 'PUT',
        body: updatedStory,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Story', id }],
    }),
    deleteStory: builder.mutation({
      query: (id) => ({
        url: `/stories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Story'],
    }),
    getChapters: builder.query({
      query: () => '/chapters',
      providesTags: ['Chapter'],
    }),
    addChapter: builder.mutation({
      query: (newChapter) => ({
        url: '/chapters',
        method: 'POST',
        body: newChapter,
      }),
      invalidatesTags: ['Chapter'],
    }),
    updateChapter: builder.mutation({
      query: ({ id, ...updatedChapter }) => ({
        url: `/chapters/${id}`,
        method: 'PUT',
        body: updatedChapter,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Chapter', id }],
    }),
    deleteChapter: builder.mutation({
      query: (id) => ({
        url: `/chapters/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Chapter'],
    }),
  }),
});

export const {
  useGetStoriesQuery,
  useGetStoryByIdQuery,
  useAddStoryMutation,
  useUpdateStoryMutation,
  useDeleteStoryMutation,
  useGetChaptersQuery,
  useAddChapterMutation,
  useUpdateChapterMutation,
  useDeleteChapterMutation,
} = api;
