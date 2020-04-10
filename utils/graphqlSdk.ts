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
  jsonb: any;
};

export type Grid = {
   __typename?: 'grid';
  id: Scalars['uuid'];
  json: Scalars['jsonb'];
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
};


export type Grid_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Grid_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

export type Grid_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
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
  id?: Maybe<Uuid_Comparison_Exp>;
  json?: Maybe<Jsonb_Comparison_Exp>;
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
  id?: Maybe<Scalars['uuid']>;
  json?: Maybe<Scalars['jsonb']>;
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
  id?: Maybe<Order_By>;
  json?: Maybe<Order_By>;
};

export type Grid_Prepend_Input = {
  json?: Maybe<Scalars['jsonb']>;
};

export enum Grid_Select_Column {
  Id = 'id',
  Json = 'json'
}

export type Grid_Set_Input = {
  id?: Maybe<Scalars['uuid']>;
  json?: Maybe<Scalars['jsonb']>;
};

export enum Grid_Update_Column {
  Id = 'id',
  Json = 'json'
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
  delete_grid?: Maybe<Grid_Mutation_Response>;
  insert_grid?: Maybe<Grid_Mutation_Response>;
  update_grid?: Maybe<Grid_Mutation_Response>;
};


export type Mutation_RootDelete_GridArgs = {
  where: Grid_Bool_Exp;
};


export type Mutation_RootInsert_GridArgs = {
  objects: Array<Grid_Insert_Input>;
  on_conflict?: Maybe<Grid_On_Conflict>;
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
  grid: Array<Grid>;
  grid_aggregate: Grid_Aggregate;
  grid_by_pk?: Maybe<Grid>;
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

export type Subscription_Root = {
   __typename?: 'subscription_root';
  grid: Array<Grid>;
  grid_aggregate: Grid_Aggregate;
  grid_by_pk?: Maybe<Grid>;
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
    }
  };
}