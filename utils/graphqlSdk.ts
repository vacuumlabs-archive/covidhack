import { GraphQLClient } from 'graphql-request';
import { print } from 'graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  uuid: any;
  timestamptz: any;
  jsonb: any;
};

export type Application = {
   __typename?: 'application';
  id: Scalars['uuid'];
  pacient_name?: Maybe<Scalars['String']>;
  personal_number?: Maybe<Scalars['String']>;
  referenced_in_grid_id?: Maybe<Scalars['uuid']>;
  sample_code: Scalars['String'];
  sample_collection_date?: Maybe<Scalars['timestamptz']>;
  sample_receive_date?: Maybe<Scalars['timestamptz']>;
  sender?: Maybe<Scalars['String']>;
  tested_positive?: Maybe<Scalars['Boolean']>;
};

export type Application_Aggregate = {
   __typename?: 'application_aggregate';
  aggregate?: Maybe<Application_Aggregate_Fields>;
  nodes: Array<Application>;
};

export type Application_Aggregate_Fields = {
   __typename?: 'application_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Application_Max_Fields>;
  min?: Maybe<Application_Min_Fields>;
};


export type Application_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Application_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

export type Application_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Application_Max_Order_By>;
  min?: Maybe<Application_Min_Order_By>;
};

export type Application_Arr_Rel_Insert_Input = {
  data: Array<Application_Insert_Input>;
  on_conflict?: Maybe<Application_On_Conflict>;
};

export type Application_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Application_Bool_Exp>>>;
  _not?: Maybe<Application_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Application_Bool_Exp>>>;
  id?: Maybe<Uuid_Comparison_Exp>;
  pacient_name?: Maybe<String_Comparison_Exp>;
  personal_number?: Maybe<String_Comparison_Exp>;
  referenced_in_grid_id?: Maybe<Uuid_Comparison_Exp>;
  sample_code?: Maybe<String_Comparison_Exp>;
  sample_collection_date?: Maybe<Timestamptz_Comparison_Exp>;
  sample_receive_date?: Maybe<Timestamptz_Comparison_Exp>;
  sender?: Maybe<String_Comparison_Exp>;
  tested_positive?: Maybe<Boolean_Comparison_Exp>;
};

export enum Application_Constraint {
  ApplicationPkey = 'application_pkey',
  ApplicationSampleCodeKey = 'application_sample_code_key'
}

export type Application_Insert_Input = {
  id?: Maybe<Scalars['uuid']>;
  pacient_name?: Maybe<Scalars['String']>;
  personal_number?: Maybe<Scalars['String']>;
  referenced_in_grid_id?: Maybe<Scalars['uuid']>;
  sample_code?: Maybe<Scalars['String']>;
  sample_collection_date?: Maybe<Scalars['timestamptz']>;
  sample_receive_date?: Maybe<Scalars['timestamptz']>;
  sender?: Maybe<Scalars['String']>;
  tested_positive?: Maybe<Scalars['Boolean']>;
};

export type Application_Max_Fields = {
   __typename?: 'application_max_fields';
  pacient_name?: Maybe<Scalars['String']>;
  personal_number?: Maybe<Scalars['String']>;
  sample_code?: Maybe<Scalars['String']>;
  sample_collection_date?: Maybe<Scalars['timestamptz']>;
  sample_receive_date?: Maybe<Scalars['timestamptz']>;
  sender?: Maybe<Scalars['String']>;
};

export type Application_Max_Order_By = {
  pacient_name?: Maybe<Order_By>;
  personal_number?: Maybe<Order_By>;
  sample_code?: Maybe<Order_By>;
  sample_collection_date?: Maybe<Order_By>;
  sample_receive_date?: Maybe<Order_By>;
  sender?: Maybe<Order_By>;
};

export type Application_Min_Fields = {
   __typename?: 'application_min_fields';
  pacient_name?: Maybe<Scalars['String']>;
  personal_number?: Maybe<Scalars['String']>;
  sample_code?: Maybe<Scalars['String']>;
  sample_collection_date?: Maybe<Scalars['timestamptz']>;
  sample_receive_date?: Maybe<Scalars['timestamptz']>;
  sender?: Maybe<Scalars['String']>;
};

export type Application_Min_Order_By = {
  pacient_name?: Maybe<Order_By>;
  personal_number?: Maybe<Order_By>;
  sample_code?: Maybe<Order_By>;
  sample_collection_date?: Maybe<Order_By>;
  sample_receive_date?: Maybe<Order_By>;
  sender?: Maybe<Order_By>;
};

export type Application_Mutation_Response = {
   __typename?: 'application_mutation_response';
  affected_rows: Scalars['Int'];
  returning: Array<Application>;
};

export type Application_Obj_Rel_Insert_Input = {
  data: Application_Insert_Input;
  on_conflict?: Maybe<Application_On_Conflict>;
};

export type Application_On_Conflict = {
  constraint: Application_Constraint;
  update_columns: Array<Application_Update_Column>;
  where?: Maybe<Application_Bool_Exp>;
};

export type Application_Order_By = {
  id?: Maybe<Order_By>;
  pacient_name?: Maybe<Order_By>;
  personal_number?: Maybe<Order_By>;
  referenced_in_grid_id?: Maybe<Order_By>;
  sample_code?: Maybe<Order_By>;
  sample_collection_date?: Maybe<Order_By>;
  sample_receive_date?: Maybe<Order_By>;
  sender?: Maybe<Order_By>;
  tested_positive?: Maybe<Order_By>;
};

export enum Application_Select_Column {
  Id = 'id',
  PacientName = 'pacient_name',
  PersonalNumber = 'personal_number',
  ReferencedInGridId = 'referenced_in_grid_id',
  SampleCode = 'sample_code',
  SampleCollectionDate = 'sample_collection_date',
  SampleReceiveDate = 'sample_receive_date',
  Sender = 'sender',
  TestedPositive = 'tested_positive'
}

export type Application_Set_Input = {
  id?: Maybe<Scalars['uuid']>;
  pacient_name?: Maybe<Scalars['String']>;
  personal_number?: Maybe<Scalars['String']>;
  referenced_in_grid_id?: Maybe<Scalars['uuid']>;
  sample_code?: Maybe<Scalars['String']>;
  sample_collection_date?: Maybe<Scalars['timestamptz']>;
  sample_receive_date?: Maybe<Scalars['timestamptz']>;
  sender?: Maybe<Scalars['String']>;
  tested_positive?: Maybe<Scalars['Boolean']>;
};

export enum Application_Update_Column {
  Id = 'id',
  PacientName = 'pacient_name',
  PersonalNumber = 'personal_number',
  ReferencedInGridId = 'referenced_in_grid_id',
  SampleCode = 'sample_code',
  SampleCollectionDate = 'sample_collection_date',
  SampleReceiveDate = 'sample_receive_date',
  Sender = 'sender',
  TestedPositive = 'tested_positive'
}

export type Boolean_Comparison_Exp = {
  _eq?: Maybe<Scalars['Boolean']>;
  _gt?: Maybe<Scalars['Boolean']>;
  _gte?: Maybe<Scalars['Boolean']>;
  _in?: Maybe<Array<Scalars['Boolean']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['Boolean']>;
  _lte?: Maybe<Scalars['Boolean']>;
  _neq?: Maybe<Scalars['Boolean']>;
  _nin?: Maybe<Array<Scalars['Boolean']>>;
};

export type Grid = {
   __typename?: 'grid';
  created_at: Scalars['timestamptz'];
  finished: Scalars['Boolean'];
  grid: Scalars['jsonb'];
  id: Scalars['uuid'];
  sample_arrival_date: Scalars['timestamptz'];
  sample_taken_date: Scalars['timestamptz'];
  test_finished_date?: Maybe<Scalars['timestamptz']>;
  test_initiation_date: Scalars['timestamptz'];
  title?: Maybe<Scalars['String']>;
  updated_at: Scalars['timestamptz'];
};


export type GridGridArgs = {
  path?: Maybe<Scalars['String']>;
};

export type Grid_Aggregate = {
   __typename?: 'grid_aggregate';
  aggregate?: Maybe<Grid_Aggregate_Fields>;
  nodes: Array<Grid>;
};

export type Grid_Aggregate_Fields = {
   __typename?: 'grid_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Grid_Max_Fields>;
  min?: Maybe<Grid_Min_Fields>;
};


export type Grid_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Grid_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

export type Grid_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Grid_Max_Order_By>;
  min?: Maybe<Grid_Min_Order_By>;
};

export type Grid_Append_Input = {
  grid?: Maybe<Scalars['jsonb']>;
};

export type Grid_Arr_Rel_Insert_Input = {
  data: Array<Grid_Insert_Input>;
  on_conflict?: Maybe<Grid_On_Conflict>;
};

export type Grid_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Grid_Bool_Exp>>>;
  _not?: Maybe<Grid_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Grid_Bool_Exp>>>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  finished?: Maybe<Boolean_Comparison_Exp>;
  grid?: Maybe<Jsonb_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  sample_arrival_date?: Maybe<Timestamptz_Comparison_Exp>;
  sample_taken_date?: Maybe<Timestamptz_Comparison_Exp>;
  test_finished_date?: Maybe<Timestamptz_Comparison_Exp>;
  test_initiation_date?: Maybe<Timestamptz_Comparison_Exp>;
  title?: Maybe<String_Comparison_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
};

export enum Grid_Constraint {
  GridPkey = 'grid_pkey'
}

export type Grid_Delete_At_Path_Input = {
  grid?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type Grid_Delete_Elem_Input = {
  grid?: Maybe<Scalars['Int']>;
};

export type Grid_Delete_Key_Input = {
  grid?: Maybe<Scalars['String']>;
};

export type Grid_Insert_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  finished?: Maybe<Scalars['Boolean']>;
  grid?: Maybe<Scalars['jsonb']>;
  id?: Maybe<Scalars['uuid']>;
  sample_arrival_date?: Maybe<Scalars['timestamptz']>;
  sample_taken_date?: Maybe<Scalars['timestamptz']>;
  test_finished_date?: Maybe<Scalars['timestamptz']>;
  test_initiation_date?: Maybe<Scalars['timestamptz']>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

export type Grid_Max_Fields = {
   __typename?: 'grid_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  sample_arrival_date?: Maybe<Scalars['timestamptz']>;
  sample_taken_date?: Maybe<Scalars['timestamptz']>;
  test_finished_date?: Maybe<Scalars['timestamptz']>;
  test_initiation_date?: Maybe<Scalars['timestamptz']>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

export type Grid_Max_Order_By = {
  created_at?: Maybe<Order_By>;
  sample_arrival_date?: Maybe<Order_By>;
  sample_taken_date?: Maybe<Order_By>;
  test_finished_date?: Maybe<Order_By>;
  test_initiation_date?: Maybe<Order_By>;
  title?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

export type Grid_Min_Fields = {
   __typename?: 'grid_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  sample_arrival_date?: Maybe<Scalars['timestamptz']>;
  sample_taken_date?: Maybe<Scalars['timestamptz']>;
  test_finished_date?: Maybe<Scalars['timestamptz']>;
  test_initiation_date?: Maybe<Scalars['timestamptz']>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

export type Grid_Min_Order_By = {
  created_at?: Maybe<Order_By>;
  sample_arrival_date?: Maybe<Order_By>;
  sample_taken_date?: Maybe<Order_By>;
  test_finished_date?: Maybe<Order_By>;
  test_initiation_date?: Maybe<Order_By>;
  title?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

export type Grid_Mutation_Response = {
   __typename?: 'grid_mutation_response';
  affected_rows: Scalars['Int'];
  returning: Array<Grid>;
};

export type Grid_Obj_Rel_Insert_Input = {
  data: Grid_Insert_Input;
  on_conflict?: Maybe<Grid_On_Conflict>;
};

export type Grid_On_Conflict = {
  constraint: Grid_Constraint;
  update_columns: Array<Grid_Update_Column>;
  where?: Maybe<Grid_Bool_Exp>;
};

export type Grid_Order_By = {
  created_at?: Maybe<Order_By>;
  finished?: Maybe<Order_By>;
  grid?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  sample_arrival_date?: Maybe<Order_By>;
  sample_taken_date?: Maybe<Order_By>;
  test_finished_date?: Maybe<Order_By>;
  test_initiation_date?: Maybe<Order_By>;
  title?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

export type Grid_Prepend_Input = {
  grid?: Maybe<Scalars['jsonb']>;
};

export enum Grid_Select_Column {
  CreatedAt = 'created_at',
  Finished = 'finished',
  Grid = 'grid',
  Id = 'id',
  SampleArrivalDate = 'sample_arrival_date',
  SampleTakenDate = 'sample_taken_date',
  TestFinishedDate = 'test_finished_date',
  TestInitiationDate = 'test_initiation_date',
  Title = 'title',
  UpdatedAt = 'updated_at'
}

export type Grid_Set_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  finished?: Maybe<Scalars['Boolean']>;
  grid?: Maybe<Scalars['jsonb']>;
  id?: Maybe<Scalars['uuid']>;
  sample_arrival_date?: Maybe<Scalars['timestamptz']>;
  sample_taken_date?: Maybe<Scalars['timestamptz']>;
  test_finished_date?: Maybe<Scalars['timestamptz']>;
  test_initiation_date?: Maybe<Scalars['timestamptz']>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

export enum Grid_Update_Column {
  CreatedAt = 'created_at',
  Finished = 'finished',
  Grid = 'grid',
  Id = 'id',
  SampleArrivalDate = 'sample_arrival_date',
  SampleTakenDate = 'sample_taken_date',
  TestFinishedDate = 'test_finished_date',
  TestInitiationDate = 'test_initiation_date',
  Title = 'title',
  UpdatedAt = 'updated_at'
}


export type Jsonb_Comparison_Exp = {
  _contained_in?: Maybe<Scalars['jsonb']>;
  _contains?: Maybe<Scalars['jsonb']>;
  _eq?: Maybe<Scalars['jsonb']>;
  _gt?: Maybe<Scalars['jsonb']>;
  _gte?: Maybe<Scalars['jsonb']>;
  _has_key?: Maybe<Scalars['String']>;
  _has_keys_all?: Maybe<Array<Scalars['String']>>;
  _has_keys_any?: Maybe<Array<Scalars['String']>>;
  _in?: Maybe<Array<Scalars['jsonb']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['jsonb']>;
  _lte?: Maybe<Scalars['jsonb']>;
  _neq?: Maybe<Scalars['jsonb']>;
  _nin?: Maybe<Array<Scalars['jsonb']>>;
};

export type Mutation_Root = {
   __typename?: 'mutation_root';
  delete_application?: Maybe<Application_Mutation_Response>;
  delete_grid?: Maybe<Grid_Mutation_Response>;
  insert_application?: Maybe<Application_Mutation_Response>;
  insert_grid?: Maybe<Grid_Mutation_Response>;
  update_application?: Maybe<Application_Mutation_Response>;
  update_grid?: Maybe<Grid_Mutation_Response>;
};


export type Mutation_RootDelete_ApplicationArgs = {
  where: Application_Bool_Exp;
};


export type Mutation_RootDelete_GridArgs = {
  where: Grid_Bool_Exp;
};


export type Mutation_RootInsert_ApplicationArgs = {
  objects: Array<Application_Insert_Input>;
  on_conflict?: Maybe<Application_On_Conflict>;
};


export type Mutation_RootInsert_GridArgs = {
  objects: Array<Grid_Insert_Input>;
  on_conflict?: Maybe<Grid_On_Conflict>;
};


export type Mutation_RootUpdate_ApplicationArgs = {
  _set?: Maybe<Application_Set_Input>;
  where: Application_Bool_Exp;
};


export type Mutation_RootUpdate_GridArgs = {
  _append?: Maybe<Grid_Append_Input>;
  _delete_at_path?: Maybe<Grid_Delete_At_Path_Input>;
  _delete_elem?: Maybe<Grid_Delete_Elem_Input>;
  _delete_key?: Maybe<Grid_Delete_Key_Input>;
  _prepend?: Maybe<Grid_Prepend_Input>;
  _set?: Maybe<Grid_Set_Input>;
  where: Grid_Bool_Exp;
};

export enum Order_By {
  Asc = 'asc',
  AscNullsFirst = 'asc_nulls_first',
  AscNullsLast = 'asc_nulls_last',
  Desc = 'desc',
  DescNullsFirst = 'desc_nulls_first',
  DescNullsLast = 'desc_nulls_last'
}

export type Query_Root = {
   __typename?: 'query_root';
  application: Array<Application>;
  application_aggregate: Application_Aggregate;
  application_by_pk?: Maybe<Application>;
  grid: Array<Grid>;
  grid_aggregate: Grid_Aggregate;
  grid_by_pk?: Maybe<Grid>;
};


export type Query_RootApplicationArgs = {
  distinct_on?: Maybe<Array<Application_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Application_Order_By>>;
  where?: Maybe<Application_Bool_Exp>;
};


export type Query_RootApplication_AggregateArgs = {
  distinct_on?: Maybe<Array<Application_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Application_Order_By>>;
  where?: Maybe<Application_Bool_Exp>;
};


export type Query_RootApplication_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootGridArgs = {
  distinct_on?: Maybe<Array<Grid_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Grid_Order_By>>;
  where?: Maybe<Grid_Bool_Exp>;
};


export type Query_RootGrid_AggregateArgs = {
  distinct_on?: Maybe<Array<Grid_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Grid_Order_By>>;
  where?: Maybe<Grid_Bool_Exp>;
};


export type Query_RootGrid_By_PkArgs = {
  id: Scalars['uuid'];
};

export type String_Comparison_Exp = {
  _eq?: Maybe<Scalars['String']>;
  _gt?: Maybe<Scalars['String']>;
  _gte?: Maybe<Scalars['String']>;
  _ilike?: Maybe<Scalars['String']>;
  _in?: Maybe<Array<Scalars['String']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _like?: Maybe<Scalars['String']>;
  _lt?: Maybe<Scalars['String']>;
  _lte?: Maybe<Scalars['String']>;
  _neq?: Maybe<Scalars['String']>;
  _nilike?: Maybe<Scalars['String']>;
  _nin?: Maybe<Array<Scalars['String']>>;
  _nlike?: Maybe<Scalars['String']>;
  _nsimilar?: Maybe<Scalars['String']>;
  _similar?: Maybe<Scalars['String']>;
};

export type Subscription_Root = {
   __typename?: 'subscription_root';
  application: Array<Application>;
  application_aggregate: Application_Aggregate;
  application_by_pk?: Maybe<Application>;
  grid: Array<Grid>;
  grid_aggregate: Grid_Aggregate;
  grid_by_pk?: Maybe<Grid>;
};


export type Subscription_RootApplicationArgs = {
  distinct_on?: Maybe<Array<Application_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Application_Order_By>>;
  where?: Maybe<Application_Bool_Exp>;
};


export type Subscription_RootApplication_AggregateArgs = {
  distinct_on?: Maybe<Array<Application_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Application_Order_By>>;
  where?: Maybe<Application_Bool_Exp>;
};


export type Subscription_RootApplication_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootGridArgs = {
  distinct_on?: Maybe<Array<Grid_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Grid_Order_By>>;
  where?: Maybe<Grid_Bool_Exp>;
};


export type Subscription_RootGrid_AggregateArgs = {
  distinct_on?: Maybe<Array<Grid_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Grid_Order_By>>;
  where?: Maybe<Grid_Bool_Exp>;
};


export type Subscription_RootGrid_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Timestamptz_Comparison_Exp = {
  _eq?: Maybe<Scalars['timestamptz']>;
  _gt?: Maybe<Scalars['timestamptz']>;
  _gte?: Maybe<Scalars['timestamptz']>;
  _in?: Maybe<Array<Scalars['timestamptz']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['timestamptz']>;
  _lte?: Maybe<Scalars['timestamptz']>;
  _neq?: Maybe<Scalars['timestamptz']>;
  _nin?: Maybe<Array<Scalars['timestamptz']>>;
};


export type Uuid_Comparison_Exp = {
  _eq?: Maybe<Scalars['uuid']>;
  _gt?: Maybe<Scalars['uuid']>;
  _gte?: Maybe<Scalars['uuid']>;
  _in?: Maybe<Array<Scalars['uuid']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['uuid']>;
  _lte?: Maybe<Scalars['uuid']>;
  _neq?: Maybe<Scalars['uuid']>;
  _nin?: Maybe<Array<Scalars['uuid']>>;
};

export type UpdateGridMutationMutationVariables = {
  id: Scalars['uuid'];
  grid: Scalars['jsonb'];
};


export type UpdateGridMutationMutation = (
  { __typename?: 'mutation_root' }
  & { update_grid: Maybe<(
    { __typename?: 'grid_mutation_response' }
    & { returning: Array<(
      { __typename?: 'grid' }
      & Pick<Grid, 'id' | 'grid'>
    )> }
  )> }
);

export type UpdateApplicationBySampleCodePositiveMutationVariables = {
  sample_code: Scalars['String'];
  positive: Scalars['Boolean'];
};


export type UpdateApplicationBySampleCodePositiveMutation = (
  { __typename?: 'mutation_root' }
  & { update_application: Maybe<(
    { __typename?: 'application_mutation_response' }
    & Pick<Application_Mutation_Response, 'affected_rows'>
  )> }
);

export type InsertGridMutationMutationVariables = {
  gridObjects: Array<Grid_Insert_Input>;
  applicationsObjects: Array<Application_Insert_Input>;
};


export type InsertGridMutationMutation = (
  { __typename?: 'mutation_root' }
  & { insert_grid: Maybe<(
    { __typename?: 'grid_mutation_response' }
    & Pick<Grid_Mutation_Response, 'affected_rows'>
  )>, insert_application: Maybe<(
    { __typename?: 'application_mutation_response' }
    & Pick<Application_Mutation_Response, 'affected_rows'>
  )> }
);

export type GridQueryQueryVariables = {
  id: Scalars['uuid'];
};


export type GridQueryQuery = (
  { __typename?: 'query_root' }
  & { grid_by_pk: Maybe<(
    { __typename?: 'grid' }
    & Pick<Grid, 'id' | 'grid'>
  )> }
);

export type ApplicationsQueryQueryVariables = {};


export type ApplicationsQueryQuery = (
  { __typename?: 'query_root' }
  & { application: Array<(
    { __typename?: 'application' }
    & Pick<Application, 'id' | 'pacient_name' | 'personal_number' | 'sample_code' | 'sample_collection_date' | 'sample_receive_date' | 'sender' | 'referenced_in_grid_id'>
  )> }
);

export type ApplicationsBySampleCodeQeryQueryVariables = {
  codes: Array<Scalars['String']>;
};


export type ApplicationsBySampleCodeQeryQuery = (
  { __typename?: 'query_root' }
  & { application: Array<(
    { __typename?: 'application' }
    & Pick<Application, 'id' | 'tested_positive'>
  )> }
);


export const UpdateGridMutationDocument = gql`
    mutation UpdateGridMutation($id: uuid!, $grid: jsonb!) {
  update_grid(_set: {grid: $grid}, where: {id: {_eq: $id}}) {
    returning {
      id
      grid
    }
  }
}
    `;
export const UpdateApplicationBySampleCodePositiveDocument = gql`
    mutation UpdateApplicationBySampleCodePositive($sample_code: String!, $positive: Boolean!) {
  update_application(where: {sample_code: {_eq: $sample_code}}, _set: {tested_positive: $positive}) {
    affected_rows
  }
}
    `;
export const InsertGridMutationDocument = gql`
    mutation InsertGridMutation($gridObjects: [grid_insert_input!]!, $applicationsObjects: [application_insert_input!]!) {
  insert_grid(objects: $gridObjects) {
    affected_rows
  }
  insert_application(objects: $applicationsObjects, on_conflict: {constraint: application_sample_code_key, update_columns: referenced_in_grid_id}) {
    affected_rows
  }
}
    `;
export const GridQueryDocument = gql`
    query GridQuery($id: uuid!) {
  grid_by_pk(id: $id) {
    id
    grid
  }
}
    `;
export const ApplicationsQueryDocument = gql`
    query ApplicationsQuery {
  application {
    id
    pacient_name
    personal_number
    sample_code
    sample_collection_date
    sample_receive_date
    sender
    referenced_in_grid_id
  }
}
    `;
export const ApplicationsBySampleCodeQeryDocument = gql`
    query ApplicationsBySampleCodeQery($codes: [String!]!) {
  application(where: {sample_code: {_in: $codes}}) {
    id
    tested_positive
  }
}
    `;
export function getSdk(client: GraphQLClient) {
  return {
    UpdateGridMutation(variables: UpdateGridMutationMutationVariables): Promise<UpdateGridMutationMutation> {
      return client.request<UpdateGridMutationMutation>(print(UpdateGridMutationDocument), variables);
    },
    UpdateApplicationBySampleCodePositive(variables: UpdateApplicationBySampleCodePositiveMutationVariables): Promise<UpdateApplicationBySampleCodePositiveMutation> {
      return client.request<UpdateApplicationBySampleCodePositiveMutation>(print(UpdateApplicationBySampleCodePositiveDocument), variables);
    },
    InsertGridMutation(variables: InsertGridMutationMutationVariables): Promise<InsertGridMutationMutation> {
      return client.request<InsertGridMutationMutation>(print(InsertGridMutationDocument), variables);
    },
    GridQuery(variables: GridQueryQueryVariables): Promise<GridQueryQuery> {
      return client.request<GridQueryQuery>(print(GridQueryDocument), variables);
    },
    ApplicationsQuery(variables?: ApplicationsQueryQueryVariables): Promise<ApplicationsQueryQuery> {
      return client.request<ApplicationsQueryQuery>(print(ApplicationsQueryDocument), variables);
    },
    ApplicationsBySampleCodeQery(variables: ApplicationsBySampleCodeQeryQueryVariables): Promise<ApplicationsBySampleCodeQeryQuery> {
      return client.request<ApplicationsBySampleCodeQeryQuery>(print(ApplicationsBySampleCodeQeryDocument), variables);
    }
  };
}