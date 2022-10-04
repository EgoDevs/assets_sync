export const idlFactory = ({ IDL }) => {
  const InitPayload = IDL.Record({
    manager: IDL.Principal,
    salt: IDL.Opt(IDL.Vec(IDL.Nat8)),
  });
  const UserName = IDL.Text;
  const ManageListResponse = IDL.Variant({
    Failed: IDL.Null,
    Success: IDL.Null,
  });
  const ManageList = IDL.Record({
    manage_list: IDL.Vec(IDL.Tuple(IDL.Principal, IDL.Text)),
    last_update_time: IDL.Nat64,
  });
  const Operation = IDL.Variant({
    All: IDL.Null,
    Tentative: IDL.Null,
    Delegate: IDL.Null,
    NnsWallet: IDL.Null,
    MeWallet: IDL.Null,
    Device: IDL.Null,
  });
  const RecoverResponse = IDL.Variant({
    recovered: IDL.Record({ next_index: IDL.Nat64 }),
    finished: IDL.Null,
    failed: IDL.Record({ expected_index: IDL.Nat64 }),
  });
  const AppType = IDL.Variant({
    android_app: IDL.Null,
    mobile_extension: IDL.Null,
    mobile_browser: IDL.Null,
    desktop_extension: IDL.Null,
    desktop_browser: IDL.Null,
    desktop_app: IDL.Null,
    ios_app: IDL.Null,
  });
  const DeviceType = IDL.Variant({
    IdentityProvider: IDL.Null,
    RecoveryPhrase: IDL.Null,
    SecurityDevice: IDL.Null,
    EthereumMetaMask: IDL.Null,
  });
  const Purpose = IDL.Variant({
    authentication: IDL.Null,
    recovery: IDL.Null,
    management: IDL.Null,
  });
  const DeviceDataExternal = IDL.Record({
    os_type: IDL.Opt(AppType),
    device_name: IDL.Text,
    device_type: DeviceType,
    pub_key: IDL.Vec(IDL.Nat8),
    purpose: Purpose,
    credential_id: IDL.Opt(IDL.Vec(IDL.Nat8)),
  });
  const DeviceAddResponse = IDL.Variant({
    added: IDL.Record({ user_name: IDL.Text }),
    failed: IDL.Null,
  });
  const DeviceRemoveResponse = IDL.Variant({
    failed: IDL.Null,
    removed: IDL.Null,
  });
  const DeviceUpdateResponse = IDL.Variant({
    updated: IDL.Null,
    failed: IDL.Null,
  });
  const AddTentativeDeviceResponse = IDL.Variant({
    device_registration_mode_off: IDL.Null,
    another_device_tentatively_added: IDL.Null,
    added_tentatively: IDL.Record({
      verification_code: IDL.Text,
      device_registration_timeout: IDL.Nat64,
    }),
  });
  const AddTentativeDeviceResult = IDL.Variant({
    Ok: AddTentativeDeviceResponse,
    Err: IDL.Text,
  });
  const EnterTentativeModeResult = IDL.Variant({
    Ok: IDL.Nat64,
    Err: IDL.Text,
  });
  const ExitTentativeModeResult = IDL.Variant({
    Ok: IDL.Bool,
    Err: IDL.Text,
  });
  const DeviceVerificationCode = IDL.Text;
  const VerifyTentativeMode = IDL.Variant({
    active: IDL.Null,
    passive: IDL.Null,
  });
  const VerifyTentativeDeviceResponse = IDL.Variant({
    device_registration_mode_off: IDL.Null,
    verified: IDL.Null,
    wrong_code: IDL.Record({ retries_left: IDL.Nat8 }),
    no_device_to_verify: IDL.Null,
  });
  const VerifyTentativeDeviceResult = IDL.Variant({
    Ok: VerifyTentativeDeviceResponse,
    Err: IDL.Text,
  });
  const FrontEnd = IDL.Text;
  const SessionKey = IDL.Vec(IDL.Nat8);
  const DelegationMode = IDL.Variant({
    domain: IDL.Null,
    global: IDL.Null,
  });
  const TimeStamp = IDL.Nat64;
  const DelegationTargets = IDL.Vec(IDL.Principal);
  const NoUnify = IDL.Bool;
  const Delegation = IDL.Record({
    pubkey: IDL.Vec(IDL.Nat8),
    targets: IDL.Opt(IDL.Vec(IDL.Principal)),
    expiration: IDL.Nat64,
  });
  const SignedDelegation = IDL.Record({
    signature: IDL.Vec(IDL.Nat8),
    delegation: Delegation,
  });
  const GetDelegationResponse = IDL.Variant({
    no_such_delegation: IDL.Null,
    signed_delegation: SignedDelegation,
  });
  const PrepareDelegationResponse = IDL.Record({
    user_key: IDL.Vec(IDL.Nat8),
    expiration: IDL.Nat64,
  });
  const RegisterEvent = IDL.Record({
    user_name: IDL.Text,
    device_name: IDL.Text,
    device_type: DeviceType,
    os_version: IDL.Text,
    os_name: IDL.Text,
  });
  const RegisterResponse = IDL.Variant({
    existed: IDL.Record({ user_name: IDL.Text }),
    canister_full: IDL.Null,
    registered: IDL.Record({ user_name: IDL.Text }),
  });
  const HardwareWalletAccountDetails = IDL.Record({
    principal: IDL.Principal,
    name: IDL.Text,
    account_identifier: IDL.Text,
  });
  const SubAccountDetails = IDL.Record({
    name: IDL.Text,
    payment_limit: IDL.Opt(IDL.Nat64),
    sub_account: IDL.Vec(IDL.Nat8),
    account_identifier: IDL.Text,
  });
  const MEAccountDetails = IDL.Record({
    principal: IDL.Principal,
    active: IDL.Bool,
    account_identifier: IDL.Text,
    hardware_wallet_accounts: IDL.Vec(HardwareWalletAccountDetails),
    wallet_name: IDL.Text,
    sub_accounts: IDL.Vec(SubAccountDetails),
  });
  const UpdateMEWalletResponse = IDL.Variant({
    success: IDL.Null,
    failed: IDL.Null,
  });
  const NNSAccountDetails = IDL.Record({
    principal: IDL.Principal,
    active: IDL.Bool,
    account_identifier: IDL.Text,
    hardware_wallet_accounts: IDL.Vec(HardwareWalletAccountDetails),
    ii_anchor: IDL.Text,
    sub_accounts: IDL.Vec(SubAccountDetails),
  });
  const IIAnchor = IDL.Text;
  return IDL.Service({
    admin_backup_users: IDL.Func([IDL.Nat64, IDL.Nat64], [IDL.Vec(IDL.Nat8)], []),
    admin_manager_add: IDL.Func([IDL.Principal, UserName], [ManageListResponse], []),
    admin_manager_get: IDL.Func([], [ManageList], ['query']),
    admin_manager_is: IDL.Func([], [IDL.Bool], ['query']),
    admin_manager_remove: IDL.Func([IDL.Principal], [ManageListResponse], []),
    admin_manager_update: IDL.Func([IDL.Principal, UserName], [ManageListResponse], []),
    admin_operation_clear: IDL.Func([], [], []),
    admin_operation_list: IDL.Func([], [IDL.Vec(IDL.Text)], []),
    admin_operation_restart: IDL.Func([Operation], [], []),
    admin_operation_stop: IDL.Func([Operation], [], []),
    admin_recover_start: IDL.Func([IDL.Nat64], [], []),
    admin_recover_users: IDL.Func([IDL.Nat64, IDL.Nat64, IDL.Vec(IDL.Nat8)], [RecoverResponse], []),
    admin_salt_get: IDL.Func([], [IDL.Opt(IDL.Vec(IDL.Nat8))], ['query']),
    admin_salt_set: IDL.Func([IDL.Vec(IDL.Nat8)], [], []),
    admin_stats_device_count: IDL.Func([], [IDL.Nat64], ['query']),
    admin_stats_me_count: IDL.Func([], [IDL.Nat64], ['query']),
    admin_stats_nns_count: IDL.Func([], [IDL.Nat64], ['query']),
    admin_stats_user_count: IDL.Func([], [IDL.Nat64], ['query']),
    device_main_add: IDL.Func([UserName, DeviceDataExternal], [DeviceAddResponse], []),
    device_main_get: IDL.Func([UserName, IDL.Opt(DeviceType)], [IDL.Vec(DeviceDataExternal)], ['query']),
    device_main_remove: IDL.Func([UserName, IDL.Vec(IDL.Nat8)], [DeviceRemoveResponse], []),
    device_main_update: IDL.Func([UserName, DeviceDataExternal], [DeviceUpdateResponse], []),
    device_tentative_add: IDL.Func([UserName, IDL.Principal, DeviceDataExternal], [AddTentativeDeviceResult], []),
    device_tentative_enter: IDL.Func([UserName], [EnterTentativeModeResult], []),
    device_tentative_exit: IDL.Func([UserName], [ExitTentativeModeResult], []),
    device_tentative_has: IDL.Func([UserName], [IDL.Bool], ['query']),
    device_tentative_verify: IDL.Func([UserName, DeviceVerificationCode, VerifyTentativeMode], [VerifyTentativeDeviceResult], []),
    id_anchor_get: IDL.Func([UserName], [IDL.Vec(IDL.Text)], ['query']),
    id_delegation_get: IDL.Func(
      [UserName, FrontEnd, SessionKey, DelegationMode, TimeStamp, IDL.Opt(DelegationTargets), NoUnify],
      [GetDelegationResponse],
      ['query'],
    ),
    id_delegation_prepare: IDL.Func(
      [UserName, FrontEnd, SessionKey, DelegationMode, IDL.Opt(TimeStamp), IDL.Opt(DelegationTargets), NoUnify],
      [PrepareDelegationResponse],
      [],
    ),
    id_user_add: IDL.Func([UserName, DeviceDataExternal, RegisterEvent], [RegisterResponse], []),
    wallet_me_add: IDL.Func([UserName, MEAccountDetails], [UpdateMEWalletResponse], []),
    wallet_me_get: IDL.Func([UserName], [IDL.Vec(IDL.Tuple(IDL.Principal, MEAccountDetails))], ['query']),
    wallet_me_remove: IDL.Func([UserName, IDL.Principal], [UpdateMEWalletResponse], []),
    wallet_me_update: IDL.Func([UserName, MEAccountDetails], [UpdateMEWalletResponse], []),
    wallet_nns_add: IDL.Func([UserName, NNSAccountDetails], [UpdateMEWalletResponse], []),
    wallet_nns_get: IDL.Func([UserName], [IDL.Vec(IDL.Tuple(IDL.Text, NNSAccountDetails))], ['query']),
    wallet_nns_remove: IDL.Func([UserName, IIAnchor], [UpdateMEWalletResponse], []),
    wallet_nns_update: IDL.Func([UserName, NNSAccountDetails], [UpdateMEWalletResponse], []),
  });
};
export const init = ({ IDL }) => {
  const InitPayload = IDL.Record({
    manager: IDL.Principal,
    salt: IDL.Opt(IDL.Vec(IDL.Nat8)),
  });
  return [InitPayload];
};
