import { print } from 'graphql';
import { GraphQLClient } from 'graphql-request';
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
  pacient_name: Scalars['String'];
  personal_number: Scalars['String'];
  sample_code: Scalars['String'];
  sample_collection_date?: Maybe<Scalars['timestamptz']>;
  sample_receive_date?: Maybe<Scalars['timestamptz']>;
  sender: Scalars['String'];
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
  sample_code?: Maybe<String_Comparison_Exp>;
  sample_collection_date?: Maybe<Timestamptz_Comparison_Exp>;
  sample_receive_date?: Maybe<Timestamptz_Comparison_Exp>;
  sender?: Maybe<String_Comparison_Exp>;
};

export enum Application_Constraint {
  ApplicationPkey = 'application_pkey'
}

export type Application_Insert_Input = {
  id?: Maybe<Scalars['uuid']>;
  pacient_name?: Maybe<Scalars['String']>;
  personal_number?: Maybe<Scalars['String']>;
  sample_code?: Maybe<Scalars['String']>;
  sample_collection_date?: Maybe<Scalars['timestamptz']>;
  sample_receive_date?: Maybe<Scalars['timestamptz']>;
  sender?: Maybe<Scalars['String']>;
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
  sample_code?: Maybe<Order_By>;
  sample_collection_date?: Maybe<Order_By>;
  sample_receive_date?: Maybe<Order_By>;
  sender?: Maybe<Order_By>;
};

export enum Application_Select_Column {
  Id = 'id',
  PacientName = 'pacient_name',
  PersonalNumber = 'personal_number',
  SampleCode = 'sample_code',
  SampleCollectionDate = 'sample_collection_date',
  SampleReceiveDate = 'sample_receive_date',
  Sender = 'sender'
}

export type Application_Set_Input = {
  id?: Maybe<Scalars['uuid']>;
  pacient_name?: Maybe<Scalars['String']>;
  personal_number?: Maybe<Scalars['String']>;
  sample_code?: Maybe<Scalars['String']>;
  sample_collection_date?: Maybe<Scalars['timestamptz']>;
  sample_receive_date?: Maybe<Scalars['timestamptz']>;
  sender?: Maybe<Scalars['String']>;
};

export enum Application_Update_Column {
  Id = 'id',
  PacientName = 'pacient_name',
  PersonalNumber = 'personal_number',
  SampleCode = 'sample_code',
  SampleCollectionDate = 'sample_collection_date',
  SampleReceiveDate = 'sample_receive_date',
  Sender = 'sender'
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
  id: Scalars['uuid'];
  json: Scalars['jsonb'];
  sample_arrival_date: Scalars['timestamptz'];
  sample_taken_date: Scalars['timestamptz'];
  test_finished_date?: Maybe<Scalars['timestamptz']>;
  test_initiation_date: Scalars['timestamptz'];
  title?: Maybe<Scalars['String']>;
  updated_at: Scalars['timestamptz'];
};


export type GridJsonArgs = {
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
  json?: Maybe<Scalars['jsonb']>;
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
  id?: Maybe<Uuid_Comparison_Exp>;
  json?: Maybe<Jsonb_Comparison_Exp>;
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
  json?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type Grid_Delete_Elem_Input = {
  json?: Maybe<Scalars['Int']>;
};

export type Grid_Delete_Key_Input = {
  json?: Maybe<Scalars['String']>;
};

export type Grid_Insert_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  finished?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['uuid']>;
  json?: Maybe<Scalars['jsonb']>;
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
  id?: Maybe<Order_By>;
  json?: Maybe<Order_By>;
  sample_arrival_date?: Maybe<Order_By>;
  sample_taken_date?: Maybe<Order_By>;
  test_finished_date?: Maybe<Order_By>;
  test_initiation_date?: Maybe<Order_By>;
  title?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

export type Grid_Prepend_Input = {
  json?: Maybe<Scalars['jsonb']>;
};

export enum Grid_Select_Column {
  CreatedAt = 'created_at',
  Finished = 'finished',
  Id = 'id',
  Json = 'json',
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
  id?: Maybe<Scalars['uuid']>;
  json?: Maybe<Scalars['jsonb']>;
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
  Id = 'id',
  Json = 'json',
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
  delete_sample?: Maybe<Sample_Mutation_Response>;
  insert_application?: Maybe<Application_Mutation_Response>;
  insert_grid?: Maybe<Grid_Mutation_Response>;
  insert_sample?: Maybe<Sample_Mutation_Response>;
  update_application?: Maybe<Application_Mutation_Response>;
  update_grid?: Maybe<Grid_Mutation_Response>;
  update_sample?: Maybe<Sample_Mutation_Response>;
};


export type Mutation_RootDelete_ApplicationArgs = {
  where: Application_Bool_Exp;
};


export type Mutation_RootDelete_GridArgs = {
  where: Grid_Bool_Exp;
};


export type Mutation_RootDelete_SampleArgs = {
  where: Sample_Bool_Exp;
};


export type Mutation_RootInsert_ApplicationArgs = {
  objects: Array<Application_Insert_Input>;
  on_conflict?: Maybe<Application_On_Conflict>;
};


export type Mutation_RootInsert_GridArgs = {
  objects: Array<Grid_Insert_Input>;
  on_conflict?: Maybe<Grid_On_Conflict>;
};


export type Mutation_RootInsert_SampleArgs = {
  objects: Array<Sample_Insert_Input>;
  on_conflict?: Maybe<Sample_On_Conflict>;
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


export type Mutation_RootUpdate_SampleArgs = {
  _set?: Maybe<Sample_Set_Input>;
  where: Sample_Bool_Exp;
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
  sample: Array<Sample>;
  sample_aggregate: Sample_Aggregate;
  sample_by_pk?: Maybe<Sample>;
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


export type Query_RootSampleArgs = {
  distinct_on?: Maybe<Array<Sample_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Sample_Order_By>>;
  where?: Maybe<Sample_Bool_Exp>;
};


export type Query_RootSample_AggregateArgs = {
  distinct_on?: Maybe<Array<Sample_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Sample_Order_By>>;
  where?: Maybe<Sample_Bool_Exp>;
};


export type Query_RootSample_By_PkArgs = {
  id: Scalars['uuid'];
};

export type Sample = {
   __typename?: 'sample';
  created_at: Scalars['timestamptz'];
  id: Scalars['uuid'];
  name?: Maybe<Scalars['String']>;
  positive?: Maybe<Scalars['Boolean']>;
  rc?: Maybe<Scalars['String']>;
  requestor?: Maybe<Scalars['String']>;
  sample_id: Scalars['String'];
  updated_at: Scalars['timestamptz'];
};

export type Sample_Aggregate = {
   __typename?: 'sample_aggregate';
  aggregate?: Maybe<Sample_Aggregate_Fields>;
  nodes: Array<Sample>;
};

export type Sample_Aggregate_Fields = {
   __typename?: 'sample_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Sample_Max_Fields>;
  min?: Maybe<Sample_Min_Fields>;
};


export type Sample_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Sample_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

export type Sample_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Sample_Max_Order_By>;
  min?: Maybe<Sample_Min_Order_By>;
};

export type Sample_Arr_Rel_Insert_Input = {
  data: Array<Sample_Insert_Input>;
  on_conflict?: Maybe<Sample_On_Conflict>;
};

export type Sample_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Sample_Bool_Exp>>>;
  _not?: Maybe<Sample_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Sample_Bool_Exp>>>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
  positive?: Maybe<Boolean_Comparison_Exp>;
  rc?: Maybe<String_Comparison_Exp>;
  requestor?: Maybe<String_Comparison_Exp>;
  sample_id?: Maybe<String_Comparison_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
};

export enum Sample_Constraint {
  SamplePkey = 'sample_pkey'
}

export type Sample_Insert_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  positive?: Maybe<Scalars['Boolean']>;
  rc?: Maybe<Scalars['String']>;
  requestor?: Maybe<Scalars['String']>;
  sample_id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

export type Sample_Max_Fields = {
   __typename?: 'sample_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  name?: Maybe<Scalars['String']>;
  rc?: Maybe<Scalars['String']>;
  requestor?: Maybe<Scalars['String']>;
  sample_id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

export type Sample_Max_Order_By = {
  created_at?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  rc?: Maybe<Order_By>;
  requestor?: Maybe<Order_By>;
  sample_id?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

export type Sample_Min_Fields = {
   __typename?: 'sample_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  name?: Maybe<Scalars['String']>;
  rc?: Maybe<Scalars['String']>;
  requestor?: Maybe<Scalars['String']>;
  sample_id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

export type Sample_Min_Order_By = {
  created_at?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  rc?: Maybe<Order_By>;
  requestor?: Maybe<Order_By>;
  sample_id?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

export type Sample_Mutation_Response = {
   __typename?: 'sample_mutation_response';
  affected_rows: Scalars['Int'];
  returning: Array<Sample>;
};

export type Sample_Obj_Rel_Insert_Input = {
  data: Sample_Insert_Input;
  on_conflict?: Maybe<Sample_On_Conflict>;
};

export type Sample_On_Conflict = {
  constraint: Sample_Constraint;
  update_columns: Array<Sample_Update_Column>;
  where?: Maybe<Sample_Bool_Exp>;
};

export type Sample_Order_By = {
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  positive?: Maybe<Order_By>;
  rc?: Maybe<Order_By>;
  requestor?: Maybe<Order_By>;
  sample_id?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

export enum Sample_Select_Column {
  CreatedAt = 'created_at',
  Id = 'id',
  Name = 'name',
  Positive = 'positive',
  Rc = 'rc',
  Requestor = 'requestor',
  SampleId = 'sample_id',
  UpdatedAt = 'updated_at'
}

export type Sample_Set_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  positive?: Maybe<Scalars['Boolean']>;
  rc?: Maybe<Scalars['String']>;
  requestor?: Maybe<Scalars['String']>;
  sample_id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

export enum Sample_Update_Column {
  CreatedAt = 'created_at',
  Id = 'id',
  Name = 'name',
  Positive = 'positive',
  Rc = 'rc',
  Requestor = 'requestor',
  SampleId = 'sample_id',
  UpdatedAt = 'updated_at'
}

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
  sample: Array<Sample>;
  sample_aggregate: Sample_Aggregate;
  sample_by_pk?: Maybe<Sample>;
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


export type Subscription_RootSampleArgs = {
  distinct_on?: Maybe<Array<Sample_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Sample_Order_By>>;
  where?: Maybe<Sample_Bool_Exp>;
};


export type Subscription_RootSample_AggregateArgs = {
  distinct_on?: Maybe<Array<Sample_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Sample_Order_By>>;
  where?: Maybe<Sample_Bool_Exp>;
};


export type Subscription_RootSample_By_PkArgs = {
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

export type InsertGridMutationMutationVariables = {
  objects: Array<Grid_Insert_Input>;
};


export type InsertGridMutationMutation = (
  { __typename?: 'mutation_root' }
  & { insert_grid: Maybe<(
    { __typename?: 'grid_mutation_response' }
    & { returning: Array<(
      { __typename?: 'grid' }
      & Pick<Grid, 'id'>
    )> }
  )> }
);

export type UpdateGridMutationMutationVariables = {
  id: Scalars['uuid'];
  json: Scalars['jsonb'];
};


export type UpdateGridMutationMutation = (
  { __typename?: 'mutation_root' }
  & { update_grid: Maybe<(
    { __typename?: 'grid_mutation_response' }
    & { returning: Array<(
      { __typename?: 'grid' }
      & Pick<Grid, 'id' | 'json'>
    )> }
  )> }
);

export type GridQueryQueryVariables = {
  id: Scalars['uuid'];
};


export type GridQueryQuery = (
  { __typename?: 'query_root' }
  & { grid_by_pk: Maybe<(
    { __typename?: 'grid' }
    & Pick<Grid, 'id' | 'json'>
  )> }
);

export type ApplicationsQueryQueryVariables = {};


export type ApplicationsQueryQuery = (
  { __typename?: 'query_root' }
  & { application: Array<(
    { __typename?: 'application' }
    & Pick<Application, 'id' | 'pacient_name' | 'personal_number' | 'sample_code' | 'sample_collection_date' | 'sample_receive_date' | 'sender'>
  )> }
);


export const InsertGridMutationDocument = gql`
    mutation InsertGridMutation($objects: [grid_insert_input!]!) {
  insert_grid(objects: $objects) {
    returning {
      id
    }
  }
}
    `;
export const UpdateGridMutationDocument = gql`
    mutation UpdateGridMutation($id: uuid!, $json: jsonb!) {
  update_grid(_set: {json: $json}, where: {id: {_eq: $id}}) {
    returning {
      id
      json
    }
  }
}
    `;
export const GridQueryDocument = gql`
    query GridQuery($id: uuid!) {
  grid_by_pk(id: $id) {
    id
    json
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
  }
}
    `;
export function getSdk(client: GraphQLClient) {
  return {
    InsertGridMutation(variables: InsertGridMutationMutationVariables): Promise<InsertGridMutationMutation> {
      return client.request<InsertGridMutationMutation>(print(InsertGridMutationDocument), variables);
    },
    UpdateGridMutation(variables: UpdateGridMutationMutationVariables): Promise<UpdateGridMutationMutation> {
      return client.request<UpdateGridMutationMutation>(print(UpdateGridMutationDocument), variables);
    },
    GridQuery(variables: GridQueryQueryVariables): Promise<GridQueryQuery> {
      return client.request<GridQueryQuery>(print(GridQueryDocument), variables);
    },
    ApplicationsQuery(variables?: ApplicationsQueryQueryVariables): Promise<ApplicationsQueryQuery> {
      return client.request<ApplicationsQueryQuery>(print(ApplicationsQueryDocument), variables);
    }
  };
}