
export interface FormField {
  id: string;
  type: string;
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  defaultValue?: any;
  validations?: {
    type: string;
    params?: any;
    message: string;
  }[];
}

export interface FormSection {
  id: string;
  title: string;
  description?: string;
  fields: string[]; // Field IDs
}

export interface FormConfig {
  id: string;
  name: string;
  description?: string;
  fields: FormField[];
  sections?: FormSection[];
  submitButtonText?: string;
  cancelButtonText?: string;
  successMessage?: string;
  errorMessage?: string;
  redirectUrl?: string;
}

export interface ContentType {
  id: string;
  name: string;
  description?: string;
  form: FormConfig;
  dataSourceType: 'api' | 'localStorage' | 'database';
  dataSourceConfig?: {
    endpoint?: string;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    headers?: Record<string, string>;
    storageKey?: string;
    tableName?: string;
  };
  listView?: {
    columns: {
      id: string;
      header: string;
      field: string;
      sortable?: boolean;
    }[];
    actions?: string[];
  };
}

export interface DynamicForm {
  id: string;
  name: string;
  contentTypeId: string;
  data: Record<string, any>;
  created: Date;
  updated: Date;
  status: 'draft' | 'published' | 'archived';
}
