import gql from 'graphql-tag'
import * as Urql from 'urql'
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  getSubreddixs?: Maybe<Array<Subreddix>>;
  getSubreddix: Subreddix;
  me?: Maybe<User>;
  checkToken: TokenResponse;
  posts: PaginatedPosts;
  post?: Maybe<Post>;
};


export type QueryGetSubreddixArgs = {
  slug: Scalars['String'];
};


export type QueryCheckTokenArgs = {
  token: Scalars['String'];
};


export type QueryPostsArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryPostArgs = {
  id: Scalars['Int'];
};

export type Subreddix = {
  __typename?: 'Subreddix';
  id: Scalars['Float'];
  name: Scalars['String'];
  slug: Scalars['String'];
  rules: Array<Scalars['String']>;
  flairs: Array<Scalars['String']>;
  ownerId: Scalars['String'];
  owner: User;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  verified: Scalars['Boolean'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  isActive: Scalars['Boolean'];
};

export type TokenResponse = {
  __typename?: 'TokenResponse';
  error?: Maybe<FieldError>;
  success?: Maybe<Scalars['Boolean']>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type PaginatedPosts = {
  __typename?: 'PaginatedPosts';
  posts: Array<Post>;
  hasMore: Scalars['Boolean'];
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['String'];
  title: Scalars['String'];
  text: Scalars['String'];
  html: Scalars['String'];
  flair: Scalars['String'];
  type: Scalars['String'];
  linkPreview: Scalars['String'];
  points: Scalars['Float'];
  ownerId: Scalars['String'];
  owner: User;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  textSnippet: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createSubreddix: Subreddix;
  joinSubreddix: SubreddixJoinResponse;
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  changePassword: UserResponse;
  createPost: Post;
  updatePost?: Maybe<Post>;
  deletePost: Scalars['Boolean'];
  vote: Scalars['Boolean'];
  updateVote: Scalars['Boolean'];
};


export type MutationCreateSubreddixArgs = {
  name: Scalars['String'];
};


export type MutationJoinSubreddixArgs = {
  slug: Scalars['String'];
  join: Scalars['Boolean'];
};


export type MutationRegisterArgs = {
  args: UserInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationCreatePostArgs = {
  input: PostInput;
};


export type MutationUpdatePostArgs = {
  text?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  id: Scalars['Float'];
};


export type MutationDeletePostArgs = {
  id: Scalars['Float'];
};


export type MutationVoteArgs = {
  val: Scalars['Int'];
  postId: Scalars['Int'];
};


export type MutationUpdateVoteArgs = {
  val: Scalars['Int'];
  postId: Scalars['Int'];
};

export type SubreddixJoinResponse = {
  __typename?: 'SubreddixJoinResponse';
  errors?: Maybe<Array<Scalars['String']>>;
  success?: Maybe<Scalars['Boolean']>;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UserInput = {
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type PostInput = {
  title: Scalars['String'];
  text: Scalars['String'];
};

export type RegularErrorFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type RegularUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username'>
);

export type RegularUserResponseFragment = (
  { __typename?: 'UserResponse' }
  & { errors?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & RegularErrorFragment
  )>>, user?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type CreatePostMutationVariables = Exact<{
  input: PostInput;
}>;


export type CreatePostMutation = (
  { __typename?: 'Mutation' }
  & { createPost: (
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'title' | 'text' | 'points' | 'ownerId' | 'createdAt' | 'updatedAt'>
  ) }
);

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPassword'>
);

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & RegularUserFragment
    )> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  options: UserInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & RegularUserFragment
    )> }
  ) }
);

export type UpdatePostMutationVariables = Exact<{
  id: Scalars['Float'];
  title: Scalars['String'];
  text: Scalars['String'];
}>;


export type UpdatePostMutation = (
  { __typename?: 'Mutation' }
  & { updatePost?: Maybe<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'title' | 'text' | 'points' | 'ownerId' | 'createdAt'>
  )> }
);

export type CheckTokenQueryVariables = Exact<{
  token: Scalars['String'];
}>;


export type CheckTokenQuery = (
  { __typename?: 'Query' }
  & { checkToken: (
    { __typename?: 'TokenResponse' }
    & Pick<TokenResponse, 'success'>
    & { error?: Maybe<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )> }
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type PostQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type PostQuery = (
  { __typename?: 'Query' }
  & { post?: Maybe<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'title' | 'text' | 'points' | 'ownerId' | 'createdAt' | 'updatedAt'>
  )> }
);

export type PostsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type PostsQuery = (
  { __typename?: 'Query' }
  & { posts: (
    { __typename?: 'PaginatedPosts' }
    & Pick<PaginatedPosts, 'hasMore'>
    & { posts: Array<(
      { __typename?: 'Post' }
      & Pick<Post, 'id' | 'title' | 'textSnippet' | 'points' | 'createdAt'>
      & { owner: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'username'>
      ) }
    )> }
  ) }
);

export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  field
  message
}
    `
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  username
}
    `
export const RegularUserResponseFragmentDoc = gql`
    fragment RegularUserResponse on UserResponse {
  errors {
    ...RegularError
  }
  user {
    ...RegularUser
  }
}
    ${RegularErrorFragmentDoc}
${RegularUserFragmentDoc}`
export const ChangePasswordDocument = gql`
    mutation ChangePassword($token: String!, $newPassword: String!) {
  changePassword(token: $token, newPassword: $newPassword) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`

export function useChangePasswordMutation() {
  return Urql.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument)
}
export const CreatePostDocument = gql`
    mutation CreatePost($input: PostInput!) {
  createPost(input: $input) {
    id
    title
    text
    points
    ownerId
    createdAt
    updatedAt
  }
}
    `

export function useCreatePostMutation() {
  return Urql.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument)
}
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `

export function useForgotPasswordMutation() {
  return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument)
}
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    errors {
      field
      message
    }
    user {
      ...RegularUser
    }
  }
}
${RegularUserFragmentDoc}`

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument)
}

export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument)
}
export const RegisterDocument = gql`
    mutation Register($options: UserInput!) {
  register(args: $options) {
    errors {
      field
      message
    }
    user {
      ...RegularUser
    }
  }
}
${RegularUserFragmentDoc}`

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument)
}

export const UpdatePostDocument = gql`
    mutation UpdatePost($id: Float!, $title: String!, $text: String!) {
  updatePost(id: $id, title: $title, text: $text) {
    id
    title
    text
    points
    ownerId
    createdAt
  }
}
`

export function useUpdatePostMutation() {
  return Urql.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument)
}

export const CheckTokenDocument = gql`
  query CheckToken($token: String!) {
    checkToken(token: $token) {
      error {
        field
        message
      }
      success
    }
  }
`

export function useCheckTokenQuery(options: Omit<Urql.UseQueryArgs<CheckTokenQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CheckTokenQuery>({ query: CheckTokenDocument, ...options })
}

export const MeDocument = gql`
  query Me {
    me {
      ...RegularUser
    }
  }
${RegularUserFragmentDoc}`

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options })
}

export const PostDocument = gql`
  query Post($id: Int!) {
    post(id: $id) {
      id
      title
      text
      points
      ownerId
      createdAt
      updatedAt
    }
  }
`

export function usePostQuery(options: Omit<Urql.UseQueryArgs<PostQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PostQuery>({ query: PostDocument, ...options })
}

export const PostsDocument = gql`
  query Posts($limit: Int!, $cursor: String) {
    posts(limit: $limit, cursor: $cursor) {
      hasMore
      posts {
        id
        title
        textSnippet
        points
        createdAt
        owner {
          id
          username
        }
      }
    }
  }
`

export function usePostsQuery(options: Omit<Urql.UseQueryArgs<PostsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PostsQuery>({ query: PostsDocument, ...options })
}