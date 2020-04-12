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
  ApplicationPkey = 'application_pkey',
  ApplicationSampleCodeKey = 'application_sample_code_key'
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
  sample_arrival_date: Scalars['timestamptz'];
  sample_taken_date: Scalars['timestamptz'];
  test_finished_date?: Maybe<Scalars['timestamptz']>;
  test_initiation_date: Scalars['timestamptz'];
  title?: Maybe<Scalars['String']>;
  updated_at: Scalars['timestamptz'];
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

export type Grid_Insert_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  finished?: Maybe<Scalars['Boolean']>;
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
  id?: Maybe<Order_By>;
  sample_arrival_date?: Maybe<Order_By>;
  sample_taken_date?: Maybe<Order_By>;
  test_finished_date?: Maybe<Order_By>;
  test_initiation_date?: Maybe<Order_By>;
  title?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

export enum Grid_Select_Column {
  CreatedAt = 'created_at',
  Finished = 'finished',
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
  Id = 'id',
  SampleArrivalDate = 'sample_arrival_date',
  SampleTakenDate = 'sample_taken_date',
  TestFinishedDate = 'test_finished_date',
  TestInitiationDate = 'test_initiation_date',
  Title = 'title',
  UpdatedAt = 'updated_at'
}

export type Int_Comparison_Exp = {
  _eq?: Maybe<Scalars['Int']>;
  _gt?: Maybe<Scalars['Int']>;
  _gte?: Maybe<Scalars['Int']>;
  _in?: Maybe<Array<Scalars['Int']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['Int']>;
  _lte?: Maybe<Scalars['Int']>;
  _neq?: Maybe<Scalars['Int']>;
  _nin?: Maybe<Array<Scalars['Int']>>;
};

export type Lab_Result = {
   __typename?: 'lab_result';
  column: Scalars['Int'];
  created_at: Scalars['timestamptz'];
  id: Scalars['uuid'];
  positive?: Maybe<Scalars['Boolean']>;
  referenced_in_grid_id: Scalars['uuid'];
  row: Scalars['Int'];
  sample_code: Scalars['String'];
  updated_at: Scalars['timestamptz'];
};

export type Lab_Result_Aggregate = {
   __typename?: 'lab_result_aggregate';
  aggregate?: Maybe<Lab_Result_Aggregate_Fields>;
  nodes: Array<Lab_Result>;
};

export type Lab_Result_Aggregate_Fields = {
   __typename?: 'lab_result_aggregate_fields';
  avg?: Maybe<Lab_Result_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Lab_Result_Max_Fields>;
  min?: Maybe<Lab_Result_Min_Fields>;
  stddev?: Maybe<Lab_Result_Stddev_Fields>;
  stddev_pop?: Maybe<Lab_Result_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Lab_Result_Stddev_Samp_Fields>;
  sum?: Maybe<Lab_Result_Sum_Fields>;
  var_pop?: Maybe<Lab_Result_Var_Pop_Fields>;
  var_samp?: Maybe<Lab_Result_Var_Samp_Fields>;
  variance?: Maybe<Lab_Result_Variance_Fields>;
};


export type Lab_Result_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Lab_Result_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

export type Lab_Result_Aggregate_Order_By = {
  avg?: Maybe<Lab_Result_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Lab_Result_Max_Order_By>;
  min?: Maybe<Lab_Result_Min_Order_By>;
  stddev?: Maybe<Lab_Result_Stddev_Order_By>;
  stddev_pop?: Maybe<Lab_Result_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Lab_Result_Stddev_Samp_Order_By>;
  sum?: Maybe<Lab_Result_Sum_Order_By>;
  var_pop?: Maybe<Lab_Result_Var_Pop_Order_By>;
  var_samp?: Maybe<Lab_Result_Var_Samp_Order_By>;
  variance?: Maybe<Lab_Result_Variance_Order_By>;
};

export type Lab_Result_Arr_Rel_Insert_Input = {
  data: Array<Lab_Result_Insert_Input>;
  on_conflict?: Maybe<Lab_Result_On_Conflict>;
};

export type Lab_Result_Avg_Fields = {
   __typename?: 'lab_result_avg_fields';
  column?: Maybe<Scalars['Float']>;
  row?: Maybe<Scalars['Float']>;
};

export type Lab_Result_Avg_Order_By = {
  column?: Maybe<Order_By>;
  row?: Maybe<Order_By>;
};

export type Lab_Result_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Lab_Result_Bool_Exp>>>;
  _not?: Maybe<Lab_Result_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Lab_Result_Bool_Exp>>>;
  column?: Maybe<Int_Comparison_Exp>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  positive?: Maybe<Boolean_Comparison_Exp>;
  referenced_in_grid_id?: Maybe<Uuid_Comparison_Exp>;
  row?: Maybe<Int_Comparison_Exp>;
  sample_code?: Maybe<String_Comparison_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
};

export enum Lab_Result_Constraint {
  LabResultPkey = 'lab_result_pkey'
}

export type Lab_Result_Inc_Input = {
  column?: Maybe<Scalars['Int']>;
  row?: Maybe<Scalars['Int']>;
};

export type Lab_Result_Insert_Input = {
  column?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  positive?: Maybe<Scalars['Boolean']>;
  referenced_in_grid_id?: Maybe<Scalars['uuid']>;
  row?: Maybe<Scalars['Int']>;
  sample_code?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

export type Lab_Result_Max_Fields = {
   __typename?: 'lab_result_max_fields';
  column?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  row?: Maybe<Scalars['Int']>;
  sample_code?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

export type Lab_Result_Max_Order_By = {
  column?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  row?: Maybe<Order_By>;
  sample_code?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

export type Lab_Result_Min_Fields = {
   __typename?: 'lab_result_min_fields';
  column?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  row?: Maybe<Scalars['Int']>;
  sample_code?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

export type Lab_Result_Min_Order_By = {
  column?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  row?: Maybe<Order_By>;
  sample_code?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

export type Lab_Result_Mutation_Response = {
   __typename?: 'lab_result_mutation_response';
  affected_rows: Scalars['Int'];
  returning: Array<Lab_Result>;
};

export type Lab_Result_Obj_Rel_Insert_Input = {
  data: Lab_Result_Insert_Input;
  on_conflict?: Maybe<Lab_Result_On_Conflict>;
};

export type Lab_Result_On_Conflict = {
  constraint: Lab_Result_Constraint;
  update_columns: Array<Lab_Result_Update_Column>;
  where?: Maybe<Lab_Result_Bool_Exp>;
};

export type Lab_Result_Order_By = {
  column?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  positive?: Maybe<Order_By>;
  referenced_in_grid_id?: Maybe<Order_By>;
  row?: Maybe<Order_By>;
  sample_code?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

export enum Lab_Result_Select_Column {
  Column = 'column',
  CreatedAt = 'created_at',
  Id = 'id',
  Positive = 'positive',
  ReferencedInGridId = 'referenced_in_grid_id',
  Row = 'row',
  SampleCode = 'sample_code',
  UpdatedAt = 'updated_at'
}

export type Lab_Result_Set_Input = {
  column?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  positive?: Maybe<Scalars['Boolean']>;
  referenced_in_grid_id?: Maybe<Scalars['uuid']>;
  row?: Maybe<Scalars['Int']>;
  sample_code?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

export type Lab_Result_Stddev_Fields = {
   __typename?: 'lab_result_stddev_fields';
  column?: Maybe<Scalars['Float']>;
  row?: Maybe<Scalars['Float']>;
};

export type Lab_Result_Stddev_Order_By = {
  column?: Maybe<Order_By>;
  row?: Maybe<Order_By>;
};

export type Lab_Result_Stddev_Pop_Fields = {
   __typename?: 'lab_result_stddev_pop_fields';
  column?: Maybe<Scalars['Float']>;
  row?: Maybe<Scalars['Float']>;
};

export type Lab_Result_Stddev_Pop_Order_By = {
  column?: Maybe<Order_By>;
  row?: Maybe<Order_By>;
};

export type Lab_Result_Stddev_Samp_Fields = {
   __typename?: 'lab_result_stddev_samp_fields';
  column?: Maybe<Scalars['Float']>;
  row?: Maybe<Scalars['Float']>;
};

export type Lab_Result_Stddev_Samp_Order_By = {
  column?: Maybe<Order_By>;
  row?: Maybe<Order_By>;
};

export type Lab_Result_Sum_Fields = {
   __typename?: 'lab_result_sum_fields';
  column?: Maybe<Scalars['Int']>;
  row?: Maybe<Scalars['Int']>;
};

export type Lab_Result_Sum_Order_By = {
  column?: Maybe<Order_By>;
  row?: Maybe<Order_By>;
};

export enum Lab_Result_Update_Column {
  Column = 'column',
  CreatedAt = 'created_at',
  Id = 'id',
  Positive = 'positive',
  ReferencedInGridId = 'referenced_in_grid_id',
  Row = 'row',
  SampleCode = 'sample_code',
  UpdatedAt = 'updated_at'
}

export type Lab_Result_Var_Pop_Fields = {
   __typename?: 'lab_result_var_pop_fields';
  column?: Maybe<Scalars['Float']>;
  row?: Maybe<Scalars['Float']>;
};

export type Lab_Result_Var_Pop_Order_By = {
  column?: Maybe<Order_By>;
  row?: Maybe<Order_By>;
};

export type Lab_Result_Var_Samp_Fields = {
   __typename?: 'lab_result_var_samp_fields';
  column?: Maybe<Scalars['Float']>;
  row?: Maybe<Scalars['Float']>;
};

export type Lab_Result_Var_Samp_Order_By = {
  column?: Maybe<Order_By>;
  row?: Maybe<Order_By>;
};

export type Lab_Result_Variance_Fields = {
   __typename?: 'lab_result_variance_fields';
  column?: Maybe<Scalars['Float']>;
  row?: Maybe<Scalars['Float']>;
};

export type Lab_Result_Variance_Order_By = {
  column?: Maybe<Order_By>;
  row?: Maybe<Order_By>;
};

export type Mutation_Root = {
   __typename?: 'mutation_root';
  delete_application?: Maybe<Application_Mutation_Response>;
  delete_grid?: Maybe<Grid_Mutation_Response>;
  delete_lab_result?: Maybe<Lab_Result_Mutation_Response>;
  insert_application?: Maybe<Application_Mutation_Response>;
  insert_grid?: Maybe<Grid_Mutation_Response>;
  insert_lab_result?: Maybe<Lab_Result_Mutation_Response>;
  update_application?: Maybe<Application_Mutation_Response>;
  update_grid?: Maybe<Grid_Mutation_Response>;
  update_lab_result?: Maybe<Lab_Result_Mutation_Response>;
};


export type Mutation_RootDelete_ApplicationArgs = {
  where: Application_Bool_Exp;
};


export type Mutation_RootDelete_GridArgs = {
  where: Grid_Bool_Exp;
};


export type Mutation_RootDelete_Lab_ResultArgs = {
  where: Lab_Result_Bool_Exp;
};


export type Mutation_RootInsert_ApplicationArgs = {
  objects: Array<Application_Insert_Input>;
  on_conflict?: Maybe<Application_On_Conflict>;
};


export type Mutation_RootInsert_GridArgs = {
  objects: Array<Grid_Insert_Input>;
  on_conflict?: Maybe<Grid_On_Conflict>;
};


export type Mutation_RootInsert_Lab_ResultArgs = {
  objects: Array<Lab_Result_Insert_Input>;
  on_conflict?: Maybe<Lab_Result_On_Conflict>;
};


export type Mutation_RootUpdate_ApplicationArgs = {
  _set?: Maybe<Application_Set_Input>;
  where: Application_Bool_Exp;
};


export type Mutation_RootUpdate_GridArgs = {
  _set?: Maybe<Grid_Set_Input>;
  where: Grid_Bool_Exp;
};


export type Mutation_RootUpdate_Lab_ResultArgs = {
  _inc?: Maybe<Lab_Result_Inc_Input>;
  _set?: Maybe<Lab_Result_Set_Input>;
  where: Lab_Result_Bool_Exp;
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
  lab_result: Array<Lab_Result>;
  lab_result_aggregate: Lab_Result_Aggregate;
  lab_result_by_pk?: Maybe<Lab_Result>;
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


export type Query_RootLab_ResultArgs = {
  distinct_on?: Maybe<Array<Lab_Result_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Lab_Result_Order_By>>;
  where?: Maybe<Lab_Result_Bool_Exp>;
};


export type Query_RootLab_Result_AggregateArgs = {
  distinct_on?: Maybe<Array<Lab_Result_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Lab_Result_Order_By>>;
  where?: Maybe<Lab_Result_Bool_Exp>;
};


export type Query_RootLab_Result_By_PkArgs = {
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
  lab_result: Array<Lab_Result>;
  lab_result_aggregate: Lab_Result_Aggregate;
  lab_result_by_pk?: Maybe<Lab_Result>;
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


export type Subscription_RootLab_ResultArgs = {
  distinct_on?: Maybe<Array<Lab_Result_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Lab_Result_Order_By>>;
  where?: Maybe<Lab_Result_Bool_Exp>;
};


export type Subscription_RootLab_Result_AggregateArgs = {
  distinct_on?: Maybe<Array<Lab_Result_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Lab_Result_Order_By>>;
  where?: Maybe<Lab_Result_Bool_Exp>;
};


export type Subscription_RootLab_Result_By_PkArgs = {
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
  gridObjects: Array<Grid_Insert_Input>;
  labResultsObjects: Array<Lab_Result_Insert_Input>;
};


export type InsertGridMutationMutation = (
  { __typename?: 'mutation_root' }
  & { insert_grid: Maybe<(
    { __typename?: 'grid_mutation_response' }
    & Pick<Grid_Mutation_Response, 'affected_rows'>
  )>, insert_lab_result: Maybe<(
    { __typename?: 'lab_result_mutation_response' }
    & Pick<Lab_Result_Mutation_Response, 'affected_rows'>
  )> }
);

export type InsertApplicationMutationMutationVariables = {
  application: Array<Application_Insert_Input>;
};


export type InsertApplicationMutationMutation = (
  { __typename?: 'mutation_root' }
  & { insert_application: Maybe<(
    { __typename?: 'application_mutation_response' }
    & Pick<Application_Mutation_Response, 'affected_rows'>
  )> }
);

export type UpdateLabResultMutationMutationVariables = {
  gridId: Scalars['uuid'];
  column: Scalars['Int'];
  row: Scalars['Int'];
};


export type UpdateLabResultMutationMutation = (
  { __typename?: 'mutation_root' }
  & { update_lab_result: Maybe<(
    { __typename?: 'lab_result_mutation_response' }
    & Pick<Lab_Result_Mutation_Response, 'affected_rows'>
  )> }
);

export type GridQueryQueryVariables = {
  id: Scalars['uuid'];
};


export type GridQueryQuery = (
  { __typename?: 'query_root' }
  & { grid_by_pk: Maybe<(
    { __typename?: 'grid' }
    & Pick<Grid, 'id'>
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

export type ApplicationsBySampleCodeQeryQueryVariables = {
  codes: Array<Scalars['String']>;
};


export type ApplicationsBySampleCodeQeryQuery = (
  { __typename?: 'query_root' }
  & { application: Array<(
    { __typename?: 'application' }
    & Pick<Application, 'id'>
  )> }
);


export type GridsQuery = {__typename?: 'query_root'} & {
  grid: Array<
    {__typename?: 'grid'} & Pick<
      Grid,
      | 'id'
      | 'title'
      | 'sample_arrival_date'
      | 'sample_taken_date'
      | 'test_finished_date'
      | 'test_initiation_date'
      | 'finished'
    >
  >
}

export type GridWithLabResultsQueryQueryVariables = {
  id: Scalars['uuid'];
};


export type GridWithLabResultsQueryQuery = (
  { __typename?: 'query_root' }
  & { grid_by_pk: Maybe<(
    { __typename?: 'grid' }
    & Pick<Grid, 'created_at' | 'finished' | 'id' | 'sample_arrival_date' | 'sample_taken_date' | 'test_finished_date' | 'test_initiation_date' | 'title' | 'updated_at'>
  )>, lab_result: Array<(
    { __typename?: 'lab_result' }
    & Pick<Lab_Result, 'column' | 'created_at' | 'id' | 'referenced_in_grid_id' | 'row' | 'sample_code' | 'updated_at'>
  )> }
);


export const InsertGridMutationDocument = gql`
    mutation InsertGridMutation($gridObjects: [grid_insert_input!]!, $labResultsObjects: [lab_result_insert_input!]!) {
  insert_grid(objects: $gridObjects) {
    affected_rows
  }
  insert_lab_result(objects: $labResultsObjects) {
    affected_rows
  }
}
    `;
export const InsertApplicationMutationDocument = gql`
    mutation InsertApplicationMutation($application: [application_insert_input!]!) {
  insert_application(objects: $application) {
    affected_rows
  }
}
    `;
export const UpdateLabResultMutationDocument = gql`
    mutation UpdateLabResultMutation($gridId: uuid!, $column: Int!, $row: Int!) {
  update_lab_result(where: {referenced_in_grid_id: {_eq: $gridId}, _and: {column: {_eq: $column}, _and: {row: {_eq: $row}}}}) {
    affected_rows
  }
}
    `;
export const GridQueryDocument = gql`
    query GridQuery($id: uuid!) {
  grid_by_pk(id: $id) {
    id
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
export const ApplicationsBySampleCodeQeryDocument = gql`
    query ApplicationsBySampleCodeQery($codes: [String!]!) {
  application(where: {sample_code: {_in: $codes}}) {
    id
  }
}
    `;
export const GridWithLabResultsQueryDocument = gql`
    query GridWithLabResultsQuery($id: uuid!) {
  grid_by_pk(id: $id) {
    created_at
    finished
    id
    sample_arrival_date
    sample_taken_date
    test_finished_date
    test_initiation_date
    title
    updated_at
  }
  lab_result(where: {referenced_in_grid_id: {_eq: $id}}) {
    column
    created_at
    id
    referenced_in_grid_id
    row
    sample_code
    updated_at
  }
}
    `;

export const GridsQueryDocument = gql`
  query GridsQuery {
    grid {
      id
      title
      sample_arrival_date
      sample_taken_date
      test_finished_date
      test_initiation_date
      finished
    }
  }
`
export function getSdk(client: GraphQLClient) {
  return {
    InsertGridMutation(variables: InsertGridMutationMutationVariables): Promise<InsertGridMutationMutation> {
      return client.request<InsertGridMutationMutation>(print(InsertGridMutationDocument), variables);
    },
    InsertApplicationMutation(variables: InsertApplicationMutationMutationVariables): Promise<InsertApplicationMutationMutation> {
      return client.request<InsertApplicationMutationMutation>(print(InsertApplicationMutationDocument), variables);
    },
    UpdateLabResultMutation(variables: UpdateLabResultMutationMutationVariables): Promise<UpdateLabResultMutationMutation> {
      return client.request<UpdateLabResultMutationMutation>(print(UpdateLabResultMutationDocument), variables);
    },
    GridQuery(variables: GridQueryQueryVariables): Promise<GridQueryQuery> {
      return client.request<GridQueryQuery>(print(GridQueryDocument), variables);
    },
    GridsQuery(variables?: {}): Promise<GridsQuery> {
      return client.request<GridsQuery>(print(GridsQueryDocument), variables)
    },
    ApplicationsQuery(variables?: ApplicationsQueryQueryVariables): Promise<ApplicationsQueryQuery> {
      return client.request<ApplicationsQueryQuery>(print(ApplicationsQueryDocument), variables);
    },
    ApplicationsBySampleCodeQery(variables: ApplicationsBySampleCodeQeryQueryVariables): Promise<ApplicationsBySampleCodeQeryQuery> {
      return client.request<ApplicationsBySampleCodeQeryQuery>(print(ApplicationsBySampleCodeQeryDocument), variables);
    },
    GridWithLabResultsQuery(variables: GridWithLabResultsQueryQueryVariables): Promise<GridWithLabResultsQueryQuery> {
      return client.request<GridWithLabResultsQueryQuery>(print(GridWithLabResultsQueryDocument), variables);
    }
  };
}
