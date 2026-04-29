declare module '@unform/web' {
  import * as React from 'react';

  export interface FormProps
    extends React.FormHTMLAttributes<HTMLFormElement> {
    initialData?: Record<string, unknown>;
    onSubmit?: (data: any, helpers?: any) => void | Promise<void>;
    children?: React.ReactNode;
  }

  export const Form: React.ForwardRefExoticComponent<
    FormProps & React.RefAttributes<any>
  >;
}
