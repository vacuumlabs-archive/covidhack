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

export type Invoice = {
   __typename?: 'invoice';
  id: Scalars['Int'];
  registration_request_id: Scalars['uuid'];
  year: Scalars['Int'];
};

export type Invoice_Aggregate = {
   __typename?: 'invoice_aggregate';
  aggregate?: Maybe<Invoice_Aggregate_Fields>;
  nodes: Array<Invoice>;
};

export type Invoice_Aggregate_Fields = {
   __typename?: 'invoice_aggregate_fields';
  avg?: Maybe<Invoice_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Invoice_Max_Fields>;
  min?: Maybe<Invoice_Min_Fields>;
  stddev?: Maybe<Invoice_Stddev_Fields>;
  stddev_pop?: Maybe<Invoice_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Invoice_Stddev_Samp_Fields>;
  sum?: Maybe<Invoice_Sum_Fields>;
  var_pop?: Maybe<Invoice_Var_Pop_Fields>;
  var_samp?: Maybe<Invoice_Var_Samp_Fields>;
  variance?: Maybe<Invoice_Variance_Fields>;
};


export type Invoice_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Invoice_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

export type Invoice_Aggregate_Order_By = {
  avg?: Maybe<Invoice_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Invoice_Max_Order_By>;
  min?: Maybe<Invoice_Min_Order_By>;
  stddev?: Maybe<Invoice_Stddev_Order_By>;
  stddev_pop?: Maybe<Invoice_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Invoice_Stddev_Samp_Order_By>;
  sum?: Maybe<Invoice_Sum_Order_By>;
  var_pop?: Maybe<Invoice_Var_Pop_Order_By>;
  var_samp?: Maybe<Invoice_Var_Samp_Order_By>;
  variance?: Maybe<Invoice_Variance_Order_By>;
};

export type Invoice_Arr_Rel_Insert_Input = {
  data: Array<Invoice_Insert_Input>;
  on_conflict?: Maybe<Invoice_On_Conflict>;
};

export type Invoice_Avg_Fields = {
   __typename?: 'invoice_avg_fields';
  id?: Maybe<Scalars['Float']>;
  year?: Maybe<Scalars['Float']>;
};

export type Invoice_Avg_Order_By = {
  id?: Maybe<Order_By>;
  year?: Maybe<Order_By>;
};

export type Invoice_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Invoice_Bool_Exp>>>;
  _not?: Maybe<Invoice_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Invoice_Bool_Exp>>>;
  id?: Maybe<Int_Comparison_Exp>;
  registration_request_id?: Maybe<Uuid_Comparison_Exp>;
  year?: Maybe<Int_Comparison_Exp>;
};

export enum Invoice_Constraint {
  InvoicePkey = 'invoice_pkey'
}

export type Invoice_Inc_Input = {
  id?: Maybe<Scalars['Int']>;
  year?: Maybe<Scalars['Int']>;
};

export type Invoice_Insert_Input = {
  id?: Maybe<Scalars['Int']>;
  registration_request_id?: Maybe<Scalars['uuid']>;
  year?: Maybe<Scalars['Int']>;
};

export type Invoice_Max_Fields = {
   __typename?: 'invoice_max_fields';
  id?: Maybe<Scalars['Int']>;
  year?: Maybe<Scalars['Int']>;
};

export type Invoice_Max_Order_By = {
  id?: Maybe<Order_By>;
  year?: Maybe<Order_By>;
};

export type Invoice_Min_Fields = {
   __typename?: 'invoice_min_fields';
  id?: Maybe<Scalars['Int']>;
  year?: Maybe<Scalars['Int']>;
};

export type Invoice_Min_Order_By = {
  id?: Maybe<Order_By>;
  year?: Maybe<Order_By>;
};

export type Invoice_Mutation_Response = {
   __typename?: 'invoice_mutation_response';
  affected_rows: Scalars['Int'];
  returning: Array<Invoice>;
};

export type Invoice_Obj_Rel_Insert_Input = {
  data: Invoice_Insert_Input;
  on_conflict?: Maybe<Invoice_On_Conflict>;
};

export type Invoice_On_Conflict = {
  constraint: Invoice_Constraint;
  update_columns: Array<Invoice_Update_Column>;
  where?: Maybe<Invoice_Bool_Exp>;
};

export type Invoice_Order_By = {
  id?: Maybe<Order_By>;
  registration_request_id?: Maybe<Order_By>;
  year?: Maybe<Order_By>;
};

export enum Invoice_Select_Column {
  Id = 'id',
  RegistrationRequestId = 'registration_request_id',
  Year = 'year'
}

export type Invoice_Set_Input = {
  id?: Maybe<Scalars['Int']>;
  registration_request_id?: Maybe<Scalars['uuid']>;
  year?: Maybe<Scalars['Int']>;
};

export type Invoice_Stddev_Fields = {
   __typename?: 'invoice_stddev_fields';
  id?: Maybe<Scalars['Float']>;
  year?: Maybe<Scalars['Float']>;
};

export type Invoice_Stddev_Order_By = {
  id?: Maybe<Order_By>;
  year?: Maybe<Order_By>;
};

export type Invoice_Stddev_Pop_Fields = {
   __typename?: 'invoice_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
  year?: Maybe<Scalars['Float']>;
};

export type Invoice_Stddev_Pop_Order_By = {
  id?: Maybe<Order_By>;
  year?: Maybe<Order_By>;
};

export type Invoice_Stddev_Samp_Fields = {
   __typename?: 'invoice_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
  year?: Maybe<Scalars['Float']>;
};

export type Invoice_Stddev_Samp_Order_By = {
  id?: Maybe<Order_By>;
  year?: Maybe<Order_By>;
};

export type Invoice_Sum_Fields = {
   __typename?: 'invoice_sum_fields';
  id?: Maybe<Scalars['Int']>;
  year?: Maybe<Scalars['Int']>;
};

export type Invoice_Sum_Order_By = {
  id?: Maybe<Order_By>;
  year?: Maybe<Order_By>;
};

export enum Invoice_Update_Column {
  Id = 'id',
  RegistrationRequestId = 'registration_request_id',
  Year = 'year'
}

export type Invoice_Var_Pop_Fields = {
   __typename?: 'invoice_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
  year?: Maybe<Scalars['Float']>;
};

export type Invoice_Var_Pop_Order_By = {
  id?: Maybe<Order_By>;
  year?: Maybe<Order_By>;
};

export type Invoice_Var_Samp_Fields = {
   __typename?: 'invoice_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
  year?: Maybe<Scalars['Float']>;
};

export type Invoice_Var_Samp_Order_By = {
  id?: Maybe<Order_By>;
  year?: Maybe<Order_By>;
};

export type Invoice_Variance_Fields = {
   __typename?: 'invoice_variance_fields';
  id?: Maybe<Scalars['Float']>;
  year?: Maybe<Scalars['Float']>;
};

export type Invoice_Variance_Order_By = {
  id?: Maybe<Order_By>;
  year?: Maybe<Order_By>;
};


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
  delete_invoice?: Maybe<Invoice_Mutation_Response>;
  delete_registration_request?: Maybe<Registration_Request_Mutation_Response>;
  delete_verification_request?: Maybe<Verification_Request_Mutation_Response>;
  insert_invoice?: Maybe<Invoice_Mutation_Response>;
  insert_registration_request?: Maybe<Registration_Request_Mutation_Response>;
  insert_verification_request?: Maybe<Verification_Request_Mutation_Response>;
  update_invoice?: Maybe<Invoice_Mutation_Response>;
  update_registration_request?: Maybe<Registration_Request_Mutation_Response>;
  update_verification_request?: Maybe<Verification_Request_Mutation_Response>;
};


export type Mutation_RootDelete_InvoiceArgs = {
  where: Invoice_Bool_Exp;
};


export type Mutation_RootDelete_Registration_RequestArgs = {
  where: Registration_Request_Bool_Exp;
};


export type Mutation_RootDelete_Verification_RequestArgs = {
  where: Verification_Request_Bool_Exp;
};


export type Mutation_RootInsert_InvoiceArgs = {
  objects: Array<Invoice_Insert_Input>;
  on_conflict?: Maybe<Invoice_On_Conflict>;
};


export type Mutation_RootInsert_Registration_RequestArgs = {
  objects: Array<Registration_Request_Insert_Input>;
  on_conflict?: Maybe<Registration_Request_On_Conflict>;
};


export type Mutation_RootInsert_Verification_RequestArgs = {
  objects: Array<Verification_Request_Insert_Input>;
  on_conflict?: Maybe<Verification_Request_On_Conflict>;
};


export type Mutation_RootUpdate_InvoiceArgs = {
  _inc?: Maybe<Invoice_Inc_Input>;
  _set?: Maybe<Invoice_Set_Input>;
  where: Invoice_Bool_Exp;
};


export type Mutation_RootUpdate_Registration_RequestArgs = {
  _append?: Maybe<Registration_Request_Append_Input>;
  _delete_at_path?: Maybe<Registration_Request_Delete_At_Path_Input>;
  _delete_elem?: Maybe<Registration_Request_Delete_Elem_Input>;
  _delete_key?: Maybe<Registration_Request_Delete_Key_Input>;
  _prepend?: Maybe<Registration_Request_Prepend_Input>;
  _set?: Maybe<Registration_Request_Set_Input>;
  where: Registration_Request_Bool_Exp;
};


export type Mutation_RootUpdate_Verification_RequestArgs = {
  _append?: Maybe<Verification_Request_Append_Input>;
  _delete_at_path?: Maybe<Verification_Request_Delete_At_Path_Input>;
  _delete_elem?: Maybe<Verification_Request_Delete_Elem_Input>;
  _delete_key?: Maybe<Verification_Request_Delete_Key_Input>;
  _prepend?: Maybe<Verification_Request_Prepend_Input>;
  _set?: Maybe<Verification_Request_Set_Input>;
  where: Verification_Request_Bool_Exp;
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
  invoice: Array<Invoice>;
  invoice_aggregate: Invoice_Aggregate;
  invoice_by_pk?: Maybe<Invoice>;
  registration_request: Array<Registration_Request>;
  registration_request_aggregate: Registration_Request_Aggregate;
  registration_request_by_pk?: Maybe<Registration_Request>;
  verification_request: Array<Verification_Request>;
  verification_request_aggregate: Verification_Request_Aggregate;
  verification_request_by_pk?: Maybe<Verification_Request>;
};


export type Query_RootInvoiceArgs = {
  distinct_on?: Maybe<Array<Invoice_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Invoice_Order_By>>;
  where?: Maybe<Invoice_Bool_Exp>;
};


export type Query_RootInvoice_AggregateArgs = {
  distinct_on?: Maybe<Array<Invoice_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Invoice_Order_By>>;
  where?: Maybe<Invoice_Bool_Exp>;
};


export type Query_RootInvoice_By_PkArgs = {
  id: Scalars['Int'];
  year: Scalars['Int'];
};


export type Query_RootRegistration_RequestArgs = {
  distinct_on?: Maybe<Array<Registration_Request_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Registration_Request_Order_By>>;
  where?: Maybe<Registration_Request_Bool_Exp>;
};


export type Query_RootRegistration_Request_AggregateArgs = {
  distinct_on?: Maybe<Array<Registration_Request_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Registration_Request_Order_By>>;
  where?: Maybe<Registration_Request_Bool_Exp>;
};


export type Query_RootRegistration_Request_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootVerification_RequestArgs = {
  distinct_on?: Maybe<Array<Verification_Request_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Verification_Request_Order_By>>;
  where?: Maybe<Verification_Request_Bool_Exp>;
};


export type Query_RootVerification_Request_AggregateArgs = {
  distinct_on?: Maybe<Array<Verification_Request_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Verification_Request_Order_By>>;
  where?: Maybe<Verification_Request_Bool_Exp>;
};


export type Query_RootVerification_Request_By_PkArgs = {
  id: Scalars['uuid'];
};

export type Registration_Request = {
   __typename?: 'registration_request';
  address_city: Scalars['String'];
  address_country?: Maybe<Scalars['String']>;
  address_number: Scalars['String'];
  address_psc: Scalars['String'];
  address_street: Scalars['String'];
  applicant_person_type: Scalars['String'];
  contact_email: Scalars['String'];
  contact_first_name: Scalars['String'];
  contact_last_name: Scalars['String'];
  contact_phone: Scalars['String'];
  created_at: Scalars['timestamptz'];
  id: Scalars['uuid'];
  lawyer_services_help_required: Scalars['Boolean'];
  legal_person_bussiness_name?: Maybe<Scalars['String']>;
  legal_person_dic?: Maybe<Scalars['String']>;
  legal_person_dph?: Maybe<Scalars['Boolean']>;
  legal_person_ic_dph?: Maybe<Scalars['String']>;
  legal_person_ico?: Maybe<Scalars['String']>;
  legal_person_official_first_name?: Maybe<Scalars['String']>;
  legal_person_official_function?: Maybe<Scalars['String']>;
  legal_person_official_last_name?: Maybe<Scalars['String']>;
  physical_person_first_name?: Maybe<Scalars['String']>;
  physical_person_identification_number?: Maybe<Scalars['String']>;
  physical_person_last_name?: Maybe<Scalars['String']>;
  services: Scalars['jsonb'];
  status: Scalars['String'];
  updated_at: Scalars['timestamptz'];
  verification_request_id: Scalars['uuid'];
};


export type Registration_RequestServicesArgs = {
  path?: Maybe<Scalars['String']>;
};

export type Registration_Request_Aggregate = {
   __typename?: 'registration_request_aggregate';
  aggregate?: Maybe<Registration_Request_Aggregate_Fields>;
  nodes: Array<Registration_Request>;
};

export type Registration_Request_Aggregate_Fields = {
   __typename?: 'registration_request_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Registration_Request_Max_Fields>;
  min?: Maybe<Registration_Request_Min_Fields>;
};


export type Registration_Request_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Registration_Request_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

export type Registration_Request_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Registration_Request_Max_Order_By>;
  min?: Maybe<Registration_Request_Min_Order_By>;
};

export type Registration_Request_Append_Input = {
  services?: Maybe<Scalars['jsonb']>;
};

export type Registration_Request_Arr_Rel_Insert_Input = {
  data: Array<Registration_Request_Insert_Input>;
  on_conflict?: Maybe<Registration_Request_On_Conflict>;
};

export type Registration_Request_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Registration_Request_Bool_Exp>>>;
  _not?: Maybe<Registration_Request_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Registration_Request_Bool_Exp>>>;
  address_city?: Maybe<String_Comparison_Exp>;
  address_country?: Maybe<String_Comparison_Exp>;
  address_number?: Maybe<String_Comparison_Exp>;
  address_psc?: Maybe<String_Comparison_Exp>;
  address_street?: Maybe<String_Comparison_Exp>;
  applicant_person_type?: Maybe<String_Comparison_Exp>;
  contact_email?: Maybe<String_Comparison_Exp>;
  contact_first_name?: Maybe<String_Comparison_Exp>;
  contact_last_name?: Maybe<String_Comparison_Exp>;
  contact_phone?: Maybe<String_Comparison_Exp>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  lawyer_services_help_required?: Maybe<Boolean_Comparison_Exp>;
  legal_person_bussiness_name?: Maybe<String_Comparison_Exp>;
  legal_person_dic?: Maybe<String_Comparison_Exp>;
  legal_person_dph?: Maybe<Boolean_Comparison_Exp>;
  legal_person_ic_dph?: Maybe<String_Comparison_Exp>;
  legal_person_ico?: Maybe<String_Comparison_Exp>;
  legal_person_official_first_name?: Maybe<String_Comparison_Exp>;
  legal_person_official_function?: Maybe<String_Comparison_Exp>;
  legal_person_official_last_name?: Maybe<String_Comparison_Exp>;
  physical_person_first_name?: Maybe<String_Comparison_Exp>;
  physical_person_identification_number?: Maybe<String_Comparison_Exp>;
  physical_person_last_name?: Maybe<String_Comparison_Exp>;
  services?: Maybe<Jsonb_Comparison_Exp>;
  status?: Maybe<String_Comparison_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
  verification_request_id?: Maybe<Uuid_Comparison_Exp>;
};

export enum Registration_Request_Constraint {
  RegistrationRequestPkey = 'registration_request_pkey'
}

export type Registration_Request_Delete_At_Path_Input = {
  services?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type Registration_Request_Delete_Elem_Input = {
  services?: Maybe<Scalars['Int']>;
};

export type Registration_Request_Delete_Key_Input = {
  services?: Maybe<Scalars['String']>;
};

export type Registration_Request_Insert_Input = {
  address_city?: Maybe<Scalars['String']>;
  address_country?: Maybe<Scalars['String']>;
  address_number?: Maybe<Scalars['String']>;
  address_psc?: Maybe<Scalars['String']>;
  address_street?: Maybe<Scalars['String']>;
  applicant_person_type?: Maybe<Scalars['String']>;
  contact_email?: Maybe<Scalars['String']>;
  contact_first_name?: Maybe<Scalars['String']>;
  contact_last_name?: Maybe<Scalars['String']>;
  contact_phone?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  lawyer_services_help_required?: Maybe<Scalars['Boolean']>;
  legal_person_bussiness_name?: Maybe<Scalars['String']>;
  legal_person_dic?: Maybe<Scalars['String']>;
  legal_person_dph?: Maybe<Scalars['Boolean']>;
  legal_person_ic_dph?: Maybe<Scalars['String']>;
  legal_person_ico?: Maybe<Scalars['String']>;
  legal_person_official_first_name?: Maybe<Scalars['String']>;
  legal_person_official_function?: Maybe<Scalars['String']>;
  legal_person_official_last_name?: Maybe<Scalars['String']>;
  physical_person_first_name?: Maybe<Scalars['String']>;
  physical_person_identification_number?: Maybe<Scalars['String']>;
  physical_person_last_name?: Maybe<Scalars['String']>;
  services?: Maybe<Scalars['jsonb']>;
  status?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  verification_request_id?: Maybe<Scalars['uuid']>;
};

export type Registration_Request_Max_Fields = {
   __typename?: 'registration_request_max_fields';
  address_city?: Maybe<Scalars['String']>;
  address_country?: Maybe<Scalars['String']>;
  address_number?: Maybe<Scalars['String']>;
  address_psc?: Maybe<Scalars['String']>;
  address_street?: Maybe<Scalars['String']>;
  applicant_person_type?: Maybe<Scalars['String']>;
  contact_email?: Maybe<Scalars['String']>;
  contact_first_name?: Maybe<Scalars['String']>;
  contact_last_name?: Maybe<Scalars['String']>;
  contact_phone?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  legal_person_bussiness_name?: Maybe<Scalars['String']>;
  legal_person_dic?: Maybe<Scalars['String']>;
  legal_person_ic_dph?: Maybe<Scalars['String']>;
  legal_person_ico?: Maybe<Scalars['String']>;
  legal_person_official_first_name?: Maybe<Scalars['String']>;
  legal_person_official_function?: Maybe<Scalars['String']>;
  legal_person_official_last_name?: Maybe<Scalars['String']>;
  physical_person_first_name?: Maybe<Scalars['String']>;
  physical_person_identification_number?: Maybe<Scalars['String']>;
  physical_person_last_name?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

export type Registration_Request_Max_Order_By = {
  address_city?: Maybe<Order_By>;
  address_country?: Maybe<Order_By>;
  address_number?: Maybe<Order_By>;
  address_psc?: Maybe<Order_By>;
  address_street?: Maybe<Order_By>;
  applicant_person_type?: Maybe<Order_By>;
  contact_email?: Maybe<Order_By>;
  contact_first_name?: Maybe<Order_By>;
  contact_last_name?: Maybe<Order_By>;
  contact_phone?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  legal_person_bussiness_name?: Maybe<Order_By>;
  legal_person_dic?: Maybe<Order_By>;
  legal_person_ic_dph?: Maybe<Order_By>;
  legal_person_ico?: Maybe<Order_By>;
  legal_person_official_first_name?: Maybe<Order_By>;
  legal_person_official_function?: Maybe<Order_By>;
  legal_person_official_last_name?: Maybe<Order_By>;
  physical_person_first_name?: Maybe<Order_By>;
  physical_person_identification_number?: Maybe<Order_By>;
  physical_person_last_name?: Maybe<Order_By>;
  status?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

export type Registration_Request_Min_Fields = {
   __typename?: 'registration_request_min_fields';
  address_city?: Maybe<Scalars['String']>;
  address_country?: Maybe<Scalars['String']>;
  address_number?: Maybe<Scalars['String']>;
  address_psc?: Maybe<Scalars['String']>;
  address_street?: Maybe<Scalars['String']>;
  applicant_person_type?: Maybe<Scalars['String']>;
  contact_email?: Maybe<Scalars['String']>;
  contact_first_name?: Maybe<Scalars['String']>;
  contact_last_name?: Maybe<Scalars['String']>;
  contact_phone?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  legal_person_bussiness_name?: Maybe<Scalars['String']>;
  legal_person_dic?: Maybe<Scalars['String']>;
  legal_person_ic_dph?: Maybe<Scalars['String']>;
  legal_person_ico?: Maybe<Scalars['String']>;
  legal_person_official_first_name?: Maybe<Scalars['String']>;
  legal_person_official_function?: Maybe<Scalars['String']>;
  legal_person_official_last_name?: Maybe<Scalars['String']>;
  physical_person_first_name?: Maybe<Scalars['String']>;
  physical_person_identification_number?: Maybe<Scalars['String']>;
  physical_person_last_name?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

export type Registration_Request_Min_Order_By = {
  address_city?: Maybe<Order_By>;
  address_country?: Maybe<Order_By>;
  address_number?: Maybe<Order_By>;
  address_psc?: Maybe<Order_By>;
  address_street?: Maybe<Order_By>;
  applicant_person_type?: Maybe<Order_By>;
  contact_email?: Maybe<Order_By>;
  contact_first_name?: Maybe<Order_By>;
  contact_last_name?: Maybe<Order_By>;
  contact_phone?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  legal_person_bussiness_name?: Maybe<Order_By>;
  legal_person_dic?: Maybe<Order_By>;
  legal_person_ic_dph?: Maybe<Order_By>;
  legal_person_ico?: Maybe<Order_By>;
  legal_person_official_first_name?: Maybe<Order_By>;
  legal_person_official_function?: Maybe<Order_By>;
  legal_person_official_last_name?: Maybe<Order_By>;
  physical_person_first_name?: Maybe<Order_By>;
  physical_person_identification_number?: Maybe<Order_By>;
  physical_person_last_name?: Maybe<Order_By>;
  status?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

export type Registration_Request_Mutation_Response = {
   __typename?: 'registration_request_mutation_response';
  affected_rows: Scalars['Int'];
  returning: Array<Registration_Request>;
};

export type Registration_Request_Obj_Rel_Insert_Input = {
  data: Registration_Request_Insert_Input;
  on_conflict?: Maybe<Registration_Request_On_Conflict>;
};

export type Registration_Request_On_Conflict = {
  constraint: Registration_Request_Constraint;
  update_columns: Array<Registration_Request_Update_Column>;
  where?: Maybe<Registration_Request_Bool_Exp>;
};

export type Registration_Request_Order_By = {
  address_city?: Maybe<Order_By>;
  address_country?: Maybe<Order_By>;
  address_number?: Maybe<Order_By>;
  address_psc?: Maybe<Order_By>;
  address_street?: Maybe<Order_By>;
  applicant_person_type?: Maybe<Order_By>;
  contact_email?: Maybe<Order_By>;
  contact_first_name?: Maybe<Order_By>;
  contact_last_name?: Maybe<Order_By>;
  contact_phone?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  lawyer_services_help_required?: Maybe<Order_By>;
  legal_person_bussiness_name?: Maybe<Order_By>;
  legal_person_dic?: Maybe<Order_By>;
  legal_person_dph?: Maybe<Order_By>;
  legal_person_ic_dph?: Maybe<Order_By>;
  legal_person_ico?: Maybe<Order_By>;
  legal_person_official_first_name?: Maybe<Order_By>;
  legal_person_official_function?: Maybe<Order_By>;
  legal_person_official_last_name?: Maybe<Order_By>;
  physical_person_first_name?: Maybe<Order_By>;
  physical_person_identification_number?: Maybe<Order_By>;
  physical_person_last_name?: Maybe<Order_By>;
  services?: Maybe<Order_By>;
  status?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  verification_request_id?: Maybe<Order_By>;
};

export type Registration_Request_Prepend_Input = {
  services?: Maybe<Scalars['jsonb']>;
};

export enum Registration_Request_Select_Column {
  AddressCity = 'address_city',
  AddressCountry = 'address_country',
  AddressNumber = 'address_number',
  AddressPsc = 'address_psc',
  AddressStreet = 'address_street',
  ApplicantPersonType = 'applicant_person_type',
  ContactEmail = 'contact_email',
  ContactFirstName = 'contact_first_name',
  ContactLastName = 'contact_last_name',
  ContactPhone = 'contact_phone',
  CreatedAt = 'created_at',
  Id = 'id',
  LawyerServicesHelpRequired = 'lawyer_services_help_required',
  LegalPersonBussinessName = 'legal_person_bussiness_name',
  LegalPersonDic = 'legal_person_dic',
  LegalPersonDph = 'legal_person_dph',
  LegalPersonIcDph = 'legal_person_ic_dph',
  LegalPersonIco = 'legal_person_ico',
  LegalPersonOfficialFirstName = 'legal_person_official_first_name',
  LegalPersonOfficialFunction = 'legal_person_official_function',
  LegalPersonOfficialLastName = 'legal_person_official_last_name',
  PhysicalPersonFirstName = 'physical_person_first_name',
  PhysicalPersonIdentificationNumber = 'physical_person_identification_number',
  PhysicalPersonLastName = 'physical_person_last_name',
  Services = 'services',
  Status = 'status',
  UpdatedAt = 'updated_at',
  VerificationRequestId = 'verification_request_id'
}

export type Registration_Request_Set_Input = {
  address_city?: Maybe<Scalars['String']>;
  address_country?: Maybe<Scalars['String']>;
  address_number?: Maybe<Scalars['String']>;
  address_psc?: Maybe<Scalars['String']>;
  address_street?: Maybe<Scalars['String']>;
  applicant_person_type?: Maybe<Scalars['String']>;
  contact_email?: Maybe<Scalars['String']>;
  contact_first_name?: Maybe<Scalars['String']>;
  contact_last_name?: Maybe<Scalars['String']>;
  contact_phone?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  lawyer_services_help_required?: Maybe<Scalars['Boolean']>;
  legal_person_bussiness_name?: Maybe<Scalars['String']>;
  legal_person_dic?: Maybe<Scalars['String']>;
  legal_person_dph?: Maybe<Scalars['Boolean']>;
  legal_person_ic_dph?: Maybe<Scalars['String']>;
  legal_person_ico?: Maybe<Scalars['String']>;
  legal_person_official_first_name?: Maybe<Scalars['String']>;
  legal_person_official_function?: Maybe<Scalars['String']>;
  legal_person_official_last_name?: Maybe<Scalars['String']>;
  physical_person_first_name?: Maybe<Scalars['String']>;
  physical_person_identification_number?: Maybe<Scalars['String']>;
  physical_person_last_name?: Maybe<Scalars['String']>;
  services?: Maybe<Scalars['jsonb']>;
  status?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  verification_request_id?: Maybe<Scalars['uuid']>;
};

export enum Registration_Request_Update_Column {
  AddressCity = 'address_city',
  AddressCountry = 'address_country',
  AddressNumber = 'address_number',
  AddressPsc = 'address_psc',
  AddressStreet = 'address_street',
  ApplicantPersonType = 'applicant_person_type',
  ContactEmail = 'contact_email',
  ContactFirstName = 'contact_first_name',
  ContactLastName = 'contact_last_name',
  ContactPhone = 'contact_phone',
  CreatedAt = 'created_at',
  Id = 'id',
  LawyerServicesHelpRequired = 'lawyer_services_help_required',
  LegalPersonBussinessName = 'legal_person_bussiness_name',
  LegalPersonDic = 'legal_person_dic',
  LegalPersonDph = 'legal_person_dph',
  LegalPersonIcDph = 'legal_person_ic_dph',
  LegalPersonIco = 'legal_person_ico',
  LegalPersonOfficialFirstName = 'legal_person_official_first_name',
  LegalPersonOfficialFunction = 'legal_person_official_function',
  LegalPersonOfficialLastName = 'legal_person_official_last_name',
  PhysicalPersonFirstName = 'physical_person_first_name',
  PhysicalPersonIdentificationNumber = 'physical_person_identification_number',
  PhysicalPersonLastName = 'physical_person_last_name',
  Services = 'services',
  Status = 'status',
  UpdatedAt = 'updated_at',
  VerificationRequestId = 'verification_request_id'
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
  invoice: Array<Invoice>;
  invoice_aggregate: Invoice_Aggregate;
  invoice_by_pk?: Maybe<Invoice>;
  registration_request: Array<Registration_Request>;
  registration_request_aggregate: Registration_Request_Aggregate;
  registration_request_by_pk?: Maybe<Registration_Request>;
  verification_request: Array<Verification_Request>;
  verification_request_aggregate: Verification_Request_Aggregate;
  verification_request_by_pk?: Maybe<Verification_Request>;
};


export type Subscription_RootInvoiceArgs = {
  distinct_on?: Maybe<Array<Invoice_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Invoice_Order_By>>;
  where?: Maybe<Invoice_Bool_Exp>;
};


export type Subscription_RootInvoice_AggregateArgs = {
  distinct_on?: Maybe<Array<Invoice_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Invoice_Order_By>>;
  where?: Maybe<Invoice_Bool_Exp>;
};


export type Subscription_RootInvoice_By_PkArgs = {
  id: Scalars['Int'];
  year: Scalars['Int'];
};


export type Subscription_RootRegistration_RequestArgs = {
  distinct_on?: Maybe<Array<Registration_Request_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Registration_Request_Order_By>>;
  where?: Maybe<Registration_Request_Bool_Exp>;
};


export type Subscription_RootRegistration_Request_AggregateArgs = {
  distinct_on?: Maybe<Array<Registration_Request_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Registration_Request_Order_By>>;
  where?: Maybe<Registration_Request_Bool_Exp>;
};


export type Subscription_RootRegistration_Request_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootVerification_RequestArgs = {
  distinct_on?: Maybe<Array<Verification_Request_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Verification_Request_Order_By>>;
  where?: Maybe<Verification_Request_Bool_Exp>;
};


export type Subscription_RootVerification_Request_AggregateArgs = {
  distinct_on?: Maybe<Array<Verification_Request_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Verification_Request_Order_By>>;
  where?: Maybe<Verification_Request_Bool_Exp>;
};


export type Subscription_RootVerification_Request_By_PkArgs = {
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

export type Verification_Request = {
   __typename?: 'verification_request';
  category: Scalars['String'];
  created_at: Scalars['timestamptz'];
  email: Scalars['String'];
  first_name: Scalars['String'];
  id: Scalars['uuid'];
  international_countries_validity?: Maybe<Scalars['jsonb']>;
  last_name: Scalars['String'];
  phone: Scalars['String'];
  service_description: Scalars['String'];
  status: Scalars['String'];
  type: Scalars['String'];
  updated_at: Scalars['timestamptz'];
  value: Scalars['String'];
};


export type Verification_RequestInternational_Countries_ValidityArgs = {
  path?: Maybe<Scalars['String']>;
};

export type Verification_Request_Aggregate = {
   __typename?: 'verification_request_aggregate';
  aggregate?: Maybe<Verification_Request_Aggregate_Fields>;
  nodes: Array<Verification_Request>;
};

export type Verification_Request_Aggregate_Fields = {
   __typename?: 'verification_request_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Verification_Request_Max_Fields>;
  min?: Maybe<Verification_Request_Min_Fields>;
};


export type Verification_Request_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Verification_Request_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

export type Verification_Request_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Verification_Request_Max_Order_By>;
  min?: Maybe<Verification_Request_Min_Order_By>;
};

export type Verification_Request_Append_Input = {
  international_countries_validity?: Maybe<Scalars['jsonb']>;
};

export type Verification_Request_Arr_Rel_Insert_Input = {
  data: Array<Verification_Request_Insert_Input>;
  on_conflict?: Maybe<Verification_Request_On_Conflict>;
};

export type Verification_Request_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Verification_Request_Bool_Exp>>>;
  _not?: Maybe<Verification_Request_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Verification_Request_Bool_Exp>>>;
  category?: Maybe<String_Comparison_Exp>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  email?: Maybe<String_Comparison_Exp>;
  first_name?: Maybe<String_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  international_countries_validity?: Maybe<Jsonb_Comparison_Exp>;
  last_name?: Maybe<String_Comparison_Exp>;
  phone?: Maybe<String_Comparison_Exp>;
  service_description?: Maybe<String_Comparison_Exp>;
  status?: Maybe<String_Comparison_Exp>;
  type?: Maybe<String_Comparison_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
  value?: Maybe<String_Comparison_Exp>;
};

export enum Verification_Request_Constraint {
  OrderPkey = 'order_pkey'
}

export type Verification_Request_Delete_At_Path_Input = {
  international_countries_validity?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type Verification_Request_Delete_Elem_Input = {
  international_countries_validity?: Maybe<Scalars['Int']>;
};

export type Verification_Request_Delete_Key_Input = {
  international_countries_validity?: Maybe<Scalars['String']>;
};

export type Verification_Request_Insert_Input = {
  category?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  first_name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  international_countries_validity?: Maybe<Scalars['jsonb']>;
  last_name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  service_description?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  value?: Maybe<Scalars['String']>;
};

export type Verification_Request_Max_Fields = {
   __typename?: 'verification_request_max_fields';
  category?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  first_name?: Maybe<Scalars['String']>;
  last_name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  service_description?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  value?: Maybe<Scalars['String']>;
};

export type Verification_Request_Max_Order_By = {
  category?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  email?: Maybe<Order_By>;
  first_name?: Maybe<Order_By>;
  last_name?: Maybe<Order_By>;
  phone?: Maybe<Order_By>;
  service_description?: Maybe<Order_By>;
  status?: Maybe<Order_By>;
  type?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  value?: Maybe<Order_By>;
};

export type Verification_Request_Min_Fields = {
   __typename?: 'verification_request_min_fields';
  category?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  first_name?: Maybe<Scalars['String']>;
  last_name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  service_description?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  value?: Maybe<Scalars['String']>;
};

export type Verification_Request_Min_Order_By = {
  category?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  email?: Maybe<Order_By>;
  first_name?: Maybe<Order_By>;
  last_name?: Maybe<Order_By>;
  phone?: Maybe<Order_By>;
  service_description?: Maybe<Order_By>;
  status?: Maybe<Order_By>;
  type?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  value?: Maybe<Order_By>;
};

export type Verification_Request_Mutation_Response = {
   __typename?: 'verification_request_mutation_response';
  affected_rows: Scalars['Int'];
  returning: Array<Verification_Request>;
};

export type Verification_Request_Obj_Rel_Insert_Input = {
  data: Verification_Request_Insert_Input;
  on_conflict?: Maybe<Verification_Request_On_Conflict>;
};

export type Verification_Request_On_Conflict = {
  constraint: Verification_Request_Constraint;
  update_columns: Array<Verification_Request_Update_Column>;
  where?: Maybe<Verification_Request_Bool_Exp>;
};

export type Verification_Request_Order_By = {
  category?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  email?: Maybe<Order_By>;
  first_name?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  international_countries_validity?: Maybe<Order_By>;
  last_name?: Maybe<Order_By>;
  phone?: Maybe<Order_By>;
  service_description?: Maybe<Order_By>;
  status?: Maybe<Order_By>;
  type?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  value?: Maybe<Order_By>;
};

export type Verification_Request_Prepend_Input = {
  international_countries_validity?: Maybe<Scalars['jsonb']>;
};

export enum Verification_Request_Select_Column {
  Category = 'category',
  CreatedAt = 'created_at',
  Email = 'email',
  FirstName = 'first_name',
  Id = 'id',
  InternationalCountriesValidity = 'international_countries_validity',
  LastName = 'last_name',
  Phone = 'phone',
  ServiceDescription = 'service_description',
  Status = 'status',
  Type = 'type',
  UpdatedAt = 'updated_at',
  Value = 'value'
}

export type Verification_Request_Set_Input = {
  category?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  first_name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  international_countries_validity?: Maybe<Scalars['jsonb']>;
  last_name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  service_description?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  value?: Maybe<Scalars['String']>;
};

export enum Verification_Request_Update_Column {
  Category = 'category',
  CreatedAt = 'created_at',
  Email = 'email',
  FirstName = 'first_name',
  Id = 'id',
  InternationalCountriesValidity = 'international_countries_validity',
  LastName = 'last_name',
  Phone = 'phone',
  ServiceDescription = 'service_description',
  Status = 'status',
  Type = 'type',
  UpdatedAt = 'updated_at',
  Value = 'value'
}

export type InsertRegistrationRequestMutationMutationVariables = {
  objects: Array<Registration_Request_Insert_Input>;
};


export type InsertRegistrationRequestMutationMutation = (
  { __typename?: 'mutation_root' }
  & { insert_registration_request: Maybe<(
    { __typename?: 'registration_request_mutation_response' }
    & { returning: Array<(
      { __typename?: 'registration_request' }
      & Pick<Registration_Request, 'id' | 'contact_email'>
    )> }
  )> }
);

export type InsertVerificationRequestMutationMutationVariables = {
  objects: Array<Verification_Request_Insert_Input>;
};


export type InsertVerificationRequestMutationMutation = (
  { __typename?: 'mutation_root' }
  & { insert_verification_request: Maybe<(
    { __typename?: 'verification_request_mutation_response' }
    & { returning: Array<(
      { __typename?: 'verification_request' }
      & Pick<Verification_Request, 'id' | 'email'>
    )> }
  )> }
);

export type UpdateVerificationRequestStatusMutationMutationVariables = {
  id: Scalars['uuid'];
  status: Scalars['String'];
};


export type UpdateVerificationRequestStatusMutationMutation = (
  { __typename?: 'mutation_root' }
  & { update_verification_request: Maybe<(
    { __typename?: 'verification_request_mutation_response' }
    & { returning: Array<(
      { __typename?: 'verification_request' }
      & Pick<Verification_Request, 'status'>
    )> }
  )> }
);

export type UpdateRegistrationRequestStatusMutationMutationVariables = {
  id: Scalars['uuid'];
  status: Scalars['String'];
};


export type UpdateRegistrationRequestStatusMutationMutation = (
  { __typename?: 'mutation_root' }
  & { update_registration_request: Maybe<(
    { __typename?: 'registration_request_mutation_response' }
    & { returning: Array<(
      { __typename?: 'registration_request' }
      & Pick<Registration_Request, 'status'>
    )> }
  )> }
);

export type InsertInvoiceMutationMutationVariables = {
  id: Scalars['Int'];
  year: Scalars['Int'];
  registration_request_id: Scalars['uuid'];
};


export type InsertInvoiceMutationMutation = (
  { __typename?: 'mutation_root' }
  & { insert_invoice: Maybe<(
    { __typename?: 'invoice_mutation_response' }
    & { returning: Array<(
      { __typename?: 'invoice' }
      & Pick<Invoice, 'id'>
    )> }
  )> }
);

export type VerificationEmailRequestQueryQueryVariables = {
  id: Scalars['uuid'];
};


export type VerificationEmailRequestQueryQuery = (
  { __typename?: 'query_root' }
  & { verification_request: Array<(
    { __typename?: 'verification_request' }
    & Pick<Verification_Request, 'first_name' | 'last_name' | 'email'>
  )> }
);

export type VerificationRequestValidationQueryQueryVariables = {
  id: Scalars['uuid'];
};


export type VerificationRequestValidationQueryQuery = (
  { __typename?: 'query_root' }
  & { verification_request_by_pk: Maybe<(
    { __typename?: 'verification_request' }
    & Pick<Verification_Request, 'id' | 'first_name' | 'last_name' | 'phone' | 'status' | 'email' | 'value' | 'type' | 'category'>
  )> }
);

export type VerificationRequestCategoryQueryQueryVariables = {
  id: Scalars['uuid'];
};


export type VerificationRequestCategoryQueryQuery = (
  { __typename?: 'query_root' }
  & { verification_request_by_pk: Maybe<(
    { __typename?: 'verification_request' }
    & Pick<Verification_Request, 'category'>
  )> }
);

export type VerificationRequestQueryQueryVariables = {
  id: Scalars['uuid'];
};


export type VerificationRequestQueryQuery = (
  { __typename?: 'query_root' }
  & { verification_request_by_pk: Maybe<(
    { __typename?: 'verification_request' }
    & Pick<Verification_Request, 'category' | 'created_at' | 'email' | 'first_name' | 'id' | 'international_countries_validity' | 'last_name' | 'phone' | 'service_description' | 'status' | 'type' | 'updated_at' | 'value'>
  )> }
);

export type RegistrationRequestQueryQueryVariables = {
  id: Scalars['uuid'];
};


export type RegistrationRequestQueryQuery = (
  { __typename?: 'query_root' }
  & { registration_request_by_pk: Maybe<(
    { __typename?: 'registration_request' }
    & Pick<Registration_Request, 'id' | 'address_city' | 'address_country' | 'address_number' | 'address_street' | 'address_psc' | 'applicant_person_type' | 'contact_email' | 'contact_first_name' | 'contact_last_name' | 'contact_phone' | 'created_at' | 'lawyer_services_help_required' | 'legal_person_bussiness_name' | 'legal_person_dic' | 'legal_person_dph' | 'legal_person_ico' | 'legal_person_ic_dph' | 'legal_person_official_first_name' | 'legal_person_official_function' | 'legal_person_official_last_name' | 'physical_person_first_name' | 'physical_person_identification_number' | 'physical_person_last_name' | 'services' | 'status' | 'updated_at' | 'verification_request_id'>
  )> }
);

export type RegistrationRequestSuccessQueryQueryVariables = {
  id: Scalars['uuid'];
};


export type RegistrationRequestSuccessQueryQuery = (
  { __typename?: 'query_root' }
  & { registration_request_by_pk: Maybe<(
    { __typename?: 'registration_request' }
    & Pick<Registration_Request, 'id' | 'contact_email' | 'verification_request_id'>
  )> }
);

export type MaximumInvoiceIdQueryQueryVariables = {
  year: Scalars['Int'];
};


export type MaximumInvoiceIdQueryQuery = (
  { __typename?: 'query_root' }
  & { invoice_aggregate: (
    { __typename?: 'invoice_aggregate' }
    & { aggregate: Maybe<(
      { __typename?: 'invoice_aggregate_fields' }
      & { max: Maybe<(
        { __typename?: 'invoice_max_fields' }
        & Pick<Invoice_Max_Fields, 'id'>
      )> }
    )> }
  ) }
);

export type RegistrationRequestVerificationQueryQueryVariables = {
  id: Scalars['uuid'];
};


export type RegistrationRequestVerificationQueryQuery = (
  { __typename?: 'query_root' }
  & { registration_request: Array<(
    { __typename?: 'registration_request' }
    & Pick<Registration_Request, 'id' | 'address_city' | 'address_country' | 'address_number' | 'address_street' | 'address_psc' | 'applicant_person_type' | 'contact_email' | 'contact_first_name' | 'contact_last_name' | 'contact_phone' | 'lawyer_services_help_required' | 'legal_person_bussiness_name' | 'legal_person_dic' | 'legal_person_dph' | 'legal_person_ico' | 'legal_person_ic_dph' | 'legal_person_official_first_name' | 'legal_person_official_function' | 'legal_person_official_last_name' | 'physical_person_first_name' | 'physical_person_identification_number' | 'physical_person_last_name' | 'services'>
  )> }
);


export const InsertRegistrationRequestMutationDocument = gql`
    mutation InsertRegistrationRequestMutation($objects: [registration_request_insert_input!]!) {
  insert_registration_request(objects: $objects) {
    returning {
      id
      contact_email
    }
  }
}
    `;
export const InsertVerificationRequestMutationDocument = gql`
    mutation InsertVerificationRequestMutation($objects: [verification_request_insert_input!]!) {
  insert_verification_request(objects: $objects) {
    returning {
      id
      email
    }
  }
}
    `;
export const UpdateVerificationRequestStatusMutationDocument = gql`
    mutation UpdateVerificationRequestStatusMutation($id: uuid!, $status: String!) {
  update_verification_request(_set: {status: $status}, where: {id: {_eq: $id}}) {
    returning {
      status
    }
  }
}
    `;
export const UpdateRegistrationRequestStatusMutationDocument = gql`
    mutation UpdateRegistrationRequestStatusMutation($id: uuid!, $status: String!) {
  update_registration_request(_set: {status: $status}, where: {id: {_eq: $id}}) {
    returning {
      status
    }
  }
}
    `;
export const InsertInvoiceMutationDocument = gql`
    mutation InsertInvoiceMutation($id: Int!, $year: Int!, $registration_request_id: uuid!) {
  insert_invoice(objects: {id: $id, registration_request_id: $registration_request_id, year: $year}) {
    returning {
      id
    }
  }
}
    `;
export const VerificationEmailRequestQueryDocument = gql`
    query VerificationEmailRequestQuery($id: uuid!) {
  verification_request(where: {id: {_eq: $id}}) {
    first_name
    last_name
    email
  }
}
    `;
export const VerificationRequestValidationQueryDocument = gql`
    query VerificationRequestValidationQuery($id: uuid!) {
  verification_request_by_pk(id: $id) {
    id
    first_name
    last_name
    phone
    status
    email
    value
    type
    category
  }
}
    `;
export const VerificationRequestCategoryQueryDocument = gql`
    query VerificationRequestCategoryQuery($id: uuid!) {
  verification_request_by_pk(id: $id) {
    category
  }
}
    `;
export const VerificationRequestQueryDocument = gql`
    query VerificationRequestQuery($id: uuid!) {
  verification_request_by_pk(id: $id) {
    category
    created_at
    email
    first_name
    id
    international_countries_validity
    last_name
    phone
    service_description
    status
    type
    updated_at
    value
  }
}
    `;
export const RegistrationRequestQueryDocument = gql`
    query RegistrationRequestQuery($id: uuid!) {
  registration_request_by_pk(id: $id) {
    id
    address_city
    address_country
    address_number
    address_street
    address_psc
    applicant_person_type
    contact_email
    contact_first_name
    contact_last_name
    contact_phone
    created_at
    lawyer_services_help_required
    legal_person_bussiness_name
    legal_person_dic
    legal_person_dph
    legal_person_ico
    legal_person_ic_dph
    legal_person_official_first_name
    legal_person_official_function
    legal_person_official_last_name
    physical_person_first_name
    physical_person_identification_number
    physical_person_last_name
    services
    status
    updated_at
    verification_request_id
  }
}
    `;
export const RegistrationRequestSuccessQueryDocument = gql`
    query RegistrationRequestSuccessQuery($id: uuid!) {
  registration_request_by_pk(id: $id) {
    id
    contact_email
    verification_request_id
  }
}
    `;
export const MaximumInvoiceIdQueryDocument = gql`
    query maximumInvoiceIdQuery($year: Int!) {
  invoice_aggregate(where: {year: {_eq: $year}}) {
    aggregate {
      max {
        id
      }
    }
  }
}
    `;
export const RegistrationRequestVerificationQueryDocument = gql`
    query RegistrationRequestVerificationQuery($id: uuid!) {
  registration_request(where: {verification_request_id: {_eq: $id}}) {
    id
    address_city
    address_country
    address_number
    address_street
    address_psc
    applicant_person_type
    contact_email
    contact_first_name
    contact_last_name
    contact_phone
    lawyer_services_help_required
    legal_person_bussiness_name
    legal_person_dic
    legal_person_dph
    legal_person_ico
    legal_person_ic_dph
    legal_person_official_first_name
    legal_person_official_function
    legal_person_official_last_name
    physical_person_first_name
    physical_person_identification_number
    physical_person_last_name
    services
  }
}
    `;
export function getSdk(client: GraphQLClient) {
  return {
    InsertRegistrationRequestMutation(variables: InsertRegistrationRequestMutationMutationVariables): Promise<InsertRegistrationRequestMutationMutation> {
      return client.request<InsertRegistrationRequestMutationMutation>(print(InsertRegistrationRequestMutationDocument), variables);
    },
    InsertVerificationRequestMutation(variables: InsertVerificationRequestMutationMutationVariables): Promise<InsertVerificationRequestMutationMutation> {
      return client.request<InsertVerificationRequestMutationMutation>(print(InsertVerificationRequestMutationDocument), variables);
    },
    UpdateVerificationRequestStatusMutation(variables: UpdateVerificationRequestStatusMutationMutationVariables): Promise<UpdateVerificationRequestStatusMutationMutation> {
      return client.request<UpdateVerificationRequestStatusMutationMutation>(print(UpdateVerificationRequestStatusMutationDocument), variables);
    },
    UpdateRegistrationRequestStatusMutation(variables: UpdateRegistrationRequestStatusMutationMutationVariables): Promise<UpdateRegistrationRequestStatusMutationMutation> {
      return client.request<UpdateRegistrationRequestStatusMutationMutation>(print(UpdateRegistrationRequestStatusMutationDocument), variables);
    },
    InsertInvoiceMutation(variables: InsertInvoiceMutationMutationVariables): Promise<InsertInvoiceMutationMutation> {
      return client.request<InsertInvoiceMutationMutation>(print(InsertInvoiceMutationDocument), variables);
    },
    VerificationEmailRequestQuery(variables: VerificationEmailRequestQueryQueryVariables): Promise<VerificationEmailRequestQueryQuery> {
      return client.request<VerificationEmailRequestQueryQuery>(print(VerificationEmailRequestQueryDocument), variables);
    },
    VerificationRequestValidationQuery(variables: VerificationRequestValidationQueryQueryVariables): Promise<VerificationRequestValidationQueryQuery> {
      return client.request<VerificationRequestValidationQueryQuery>(print(VerificationRequestValidationQueryDocument), variables);
    },
    VerificationRequestCategoryQuery(variables: VerificationRequestCategoryQueryQueryVariables): Promise<VerificationRequestCategoryQueryQuery> {
      return client.request<VerificationRequestCategoryQueryQuery>(print(VerificationRequestCategoryQueryDocument), variables);
    },
    VerificationRequestQuery(variables: VerificationRequestQueryQueryVariables): Promise<VerificationRequestQueryQuery> {
      return client.request<VerificationRequestQueryQuery>(print(VerificationRequestQueryDocument), variables);
    },
    RegistrationRequestQuery(variables: RegistrationRequestQueryQueryVariables): Promise<RegistrationRequestQueryQuery> {
      return client.request<RegistrationRequestQueryQuery>(print(RegistrationRequestQueryDocument), variables);
    },
    RegistrationRequestSuccessQuery(variables: RegistrationRequestSuccessQueryQueryVariables): Promise<RegistrationRequestSuccessQueryQuery> {
      return client.request<RegistrationRequestSuccessQueryQuery>(print(RegistrationRequestSuccessQueryDocument), variables);
    },
    maximumInvoiceIdQuery(variables: MaximumInvoiceIdQueryQueryVariables): Promise<MaximumInvoiceIdQueryQuery> {
      return client.request<MaximumInvoiceIdQueryQuery>(print(MaximumInvoiceIdQueryDocument), variables);
    },
    RegistrationRequestVerificationQuery(variables: RegistrationRequestVerificationQueryQueryVariables): Promise<RegistrationRequestVerificationQueryQuery> {
      return client.request<RegistrationRequestVerificationQueryQuery>(print(RegistrationRequestVerificationQueryDocument), variables);
    }
  };
}