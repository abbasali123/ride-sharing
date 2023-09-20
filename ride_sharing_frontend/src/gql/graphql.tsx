import {gql} from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends {[key: string]: unknown}> = {[K in keyof T]: T[K]};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<T extends {[key: string]: unknown}, K extends keyof T> = {
  [_ in K]?: never;
};
export type Incremental<T> =
  | T
  | {[P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never};
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: {input: string; output: string};
  String: {input: string; output: string};
  Boolean: {input: boolean; output: boolean};
  Int: {input: number; output: number};
  Float: {input: number; output: number};
  DateTime: {input: any; output: any};
};

export type AcceptRideInput = {
  driverId: Scalars['Int']['input'];
  rideId: Scalars['String']['input'];
};

export type CreateChatInput = {
  rideId: Scalars['String']['input'];
};

export type CreateMessageInput = {
  chatId: Scalars['String']['input'];
  content: Scalars['String']['input'];
  senderId: Scalars['String']['input'];
};

export type CreateRideInput = {
  customerId: Scalars['Int']['input'];
  departureTime: Scalars['String']['input'];
  destinationLat: Scalars['String']['input'];
  destinationLong: Scalars['String']['input'];
  distance?: InputMaybe<Scalars['String']['input']>;
  originLat: Scalars['String']['input'];
  originLong: Scalars['String']['input'];
  pricingTiersId: Scalars['String']['input'];
  status?: InputMaybe<RideStatus>;
  time: Scalars['String']['input'];
  vehicleId: Scalars['String']['input'];
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  first_name: Scalars['String']['input'];
  last_name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  role?: InputMaybe<UserRoles>;
  username: Scalars['String']['input'];
};

export type FeedbackInput = {
  feedback: Scalars['String']['input'];
  rating: Scalars['Int']['input'];
  rideId: Scalars['String']['input'];
};

export type GetAllRideInput = {
  id?: InputMaybe<Scalars['String']['input']>;
};

export type GetAllVehicleInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  iconUrl?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type LoginObject = {
  __typename?: 'LoginObject';
  accessToken: Scalars['String']['output'];
  user: Users;
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptRide: Ride;
  addFeedback: Ride;
  addPickupNotes: Ride;
  createChat: Chat;
  createMessage: Message;
  createRide: Ride;
  login: LoginObject;
  removeChat: Chat;
  removeMessage: Message;
  removeUser: Users;
  signUp: Users;
  updateUser: Users;
};

export type MutationAcceptRideArgs = {
  acceptRideInput: AcceptRideInput;
};

export type MutationAddFeedbackArgs = {
  feedbackInput: FeedbackInput;
};

export type MutationAddPickupNotesArgs = {
  pickupNotes: Scalars['String']['input'];
  rideId: Scalars['String']['input'];
};

export type MutationCreateChatArgs = {
  createChatInput: CreateChatInput;
};

export type MutationCreateMessageArgs = {
  createMessageInput: CreateMessageInput;
};

export type MutationCreateRideArgs = {
  createRideInput: CreateRideInput;
};

export type MutationLoginArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type MutationRemoveChatArgs = {
  id: Scalars['String']['input'];
};

export type MutationRemoveMessageArgs = {
  id: Scalars['String']['input'];
};

export type MutationRemoveUserArgs = {
  id: Scalars['Int']['input'];
};

export type MutationSignUpArgs = {
  createUserInput: CreateUserInput;
};

export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};

export type Query = {
  __typename?: 'Query';
  chat: Chat;
  chats: Array<Chat>;
  findAllRides: Array<Ride>;
  findAllUsers: Array<Users>;
  findAllVehicles: Array<Vehicle>;
  findByChatId: Array<Message>;
  findByRideId: Chat;
  message: Message;
  messages: Array<Message>;
  user: Users;
};

export type QueryChatArgs = {
  id: Scalars['String']['input'];
};

export type QueryFindAllRidesArgs = {
  getAllRideInput: GetAllRideInput;
};

export type QueryFindAllVehiclesArgs = {
  getAllVehicleInput?: InputMaybe<GetAllVehicleInput>;
};

export type QueryFindByChatIdArgs = {
  chatId: Scalars['String']['input'];
};

export type QueryFindByRideIdArgs = {
  rideId: Scalars['String']['input'];
};

export type QueryMessageArgs = {
  id: Scalars['String']['input'];
};

export type QueryUserArgs = {
  id: Scalars['Int']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  onNewMessageSent: Message;
};

export type SubscriptionOnNewMessageSentArgs = {
  chatId: Scalars['String']['input'];
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  first_name?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  last_name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<UserRoles>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type Chat = {
  __typename?: 'chat';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  messages?: Maybe<Array<Message>>;
  ride?: Maybe<Ride>;
  rideId?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type Message = {
  __typename?: 'message';
  chat?: Maybe<Chat>;
  chatId?: Maybe<Scalars['String']['output']>;
  content?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  senderId?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type PricingTiers = {
  __typename?: 'pricingTiers';
  basePrice: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  perMileRate: Scalars['String']['output'];
  perMinuteRate: Scalars['String']['output'];
  ridePricing: Array<RidePricing>;
  updatedAt: Scalars['DateTime']['output'];
};

export type Ride = {
  __typename?: 'ride';
  availableSeats: Scalars['String']['output'];
  chat?: Maybe<Chat>;
  createdAt: Scalars['DateTime']['output'];
  customer?: Maybe<Users>;
  customerId?: Maybe<Scalars['String']['output']>;
  departureTime: Scalars['String']['output'];
  destination: Scalars['String']['output'];
  distance?: Maybe<Scalars['String']['output']>;
  driver?: Maybe<Users>;
  driverId?: Maybe<Scalars['String']['output']>;
  feedback: Scalars['String']['output'];
  id: Scalars['String']['output'];
  origin: Scalars['String']['output'];
  passengers: Scalars['String']['output'];
  pickupNotes: Scalars['String']['output'];
  price: Scalars['String']['output'];
  rating: Scalars['Int']['output'];
  rideCode: Scalars['String']['output'];
  ridePricing: Array<RidePricing>;
  status: RideStatus;
  updatedAt: Scalars['DateTime']['output'];
};

export type RidePricing = {
  __typename?: 'ridePricing';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  pricingTiers: PricingTiers;
  pricingTiersId?: Maybe<Scalars['String']['output']>;
  ride?: Maybe<Ride>;
  rideId?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  vehicle: Vehicle;
  vehicleId?: Maybe<Scalars['String']['output']>;
};

/** The supported ride status. */
export enum RideStatus {
  Canceled = 'CANCELED',
  Completed = 'COMPLETED',
  InProgress = 'IN_PROGRESS',
  Scheduled = 'SCHEDULED',
}

/** The supported roles. */
export enum UserRoles {
  Admin = 'ADMIN',
  Customer = 'CUSTOMER',
  Driver = 'DRIVER',
  User = 'USER',
}

export type Users = {
  __typename?: 'users';
  customerRides?: Maybe<Array<Ride>>;
  driverRides?: Maybe<Array<Ride>>;
  email: Scalars['String']['output'];
  first_name: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  last_name: Scalars['String']['output'];
  password: Scalars['String']['output'];
  role: UserRoles;
  username: Scalars['String']['output'];
};

export type Vehicle = {
  __typename?: 'vehicle';
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  iconUrl: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  ridePricing: Array<RidePricing>;
  updatedAt: Scalars['DateTime']['output'];
};

export type LoginMutationVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;

export type LoginMutation = {
  __typename?: 'Mutation';
  login: {
    __typename?: 'LoginObject';
    accessToken: string;
    user: {
      __typename?: 'users';
      id: number;
      username: string;
      email: string;
      password: string;
    };
  };
};

export type SignUpMutationVariables = Exact<{
  createUserInput: CreateUserInput;
}>;

export type SignUpMutation = {
  __typename?: 'Mutation';
  signUp: {
    __typename?: 'users';
    id: number;
    username: string;
    email: string;
    password: string;
  };
};

export const LoginDocument = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      user {
        id
        username
        email
        password
      }
      accessToken
    }
  }
`;
export type LoginMutationFn = Apollo.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    options,
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const SignUpDocument = gql`
  mutation SignUp($createUserInput: CreateUserInput!) {
    signUp(createUserInput: $createUserInput) {
      id
      username
      email
      password
    }
  }
`;
export type SignUpMutationFn = Apollo.MutationFunction<
  SignUpMutation,
  SignUpMutationVariables
>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      createUserInput: // value for 'createUserInput'
 *   },
 * });
 */
export function useSignUpMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SignUpMutation,
    SignUpMutationVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useMutation<SignUpMutation, SignUpMutationVariables>(
    SignUpDocument,
    options,
  );
}
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<
  SignUpMutation,
  SignUpMutationVariables
>;
