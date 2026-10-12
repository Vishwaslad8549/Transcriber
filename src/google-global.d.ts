// Type declarations for Google Identity Services - Sign In with Google

declare namespace google.accounts.id {
  interface CredentialResponse {
    credential: string;
    select_by?: string;
  }

  interface InitializeConfig {
    client_id: string;
    callback: (response: CredentialResponse) => void;
    auto_select?: boolean;
    cancel_on_tap_outside?: boolean;
  }

  interface RenderButtonOptions {
    type?: 'standard' | 'icon';
    theme?: 'outline' | 'filled_blue' | 'filled_black';
    size?: 'large' | 'medium' | 'small';
    text?: 'signin_with' | 'signup_with' | 'continue_with' | 'signin';
    shape?: 'rectangular' | 'pill' | 'circle';
    width?: number;
    logo_alignment?: 'left' | 'center';
    locale?: string;
  }

  interface ID {
    initialize: (config: InitializeConfig) => void;
    renderButton: (element: HTMLElement, options: RenderButtonOptions) => void;
    prompt: (momentListener?: (result: any) => void) => void;
    disableAutoSelect: () => void;
    storeCredential: (credential: string, callback: () => void) => void;
    cancel: () => void;
    revoke: (hint: string, callback?: (response: { successful: boolean }) => void) => void;
  }
}

declare namespace google.accounts {
  interface ID {
    id: google.accounts.id.ID;
  }
}

// Global google object loaded by Google Identity Services script
declare var google: {
  accounts: {
    id: google.accounts.id.ID;
  };
};