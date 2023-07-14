import yaml from 'yaml';

const CTX = `
UNAUTH:
    IntroOnBording: IntroOnBording
    LogInOrRegister: LogInOrRegister
    Register: Register
    Login: Login
    ForgotPassword: ForgotPassword
    Verification: Verification
TAB:
    Home: Home
    Create: Create
    Settings: Settings
AUTH:
    ProfileMain: ProfileMain
    ProfileApperance: ProfileApperance
    ProfileEdit: ProfileEdit
    ProfileTest: ProfileTest
    ProfileUserCard: ProfileUserCard
    ProfileSearchCard: ProfileSearchCard
    ProfileCreateCard: ProfileCreateCard
`;

export default yaml.parse(CTX) as {
  UNAUTH: {
    IntroOnBording: string;
    LogInOrRegister: string;
    Register: string;
    Login: string;
    ForgotPassword: string;
    Verification: string;
  };
  TAB: {
    Home: string;
    Create: string;
    Settings: string;
  };
  AUTH: {
    ProfileMain: string;
    ProfileApperance: string;
    ProfileEdit: string;
    ProfileTest: string;
    ProfileUserCard: string;
    ProfileSearchCard: string;
    ProfileCreateCard: string;
  };
};
