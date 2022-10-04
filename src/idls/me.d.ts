import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type AddTentativeDeviceResponse =
  | {
      device_registration_mode_off: null;
    }
  | { another_device_tentatively_added: null }
  | {
      added_tentatively: {
        verification_code: string;
        device_registration_timeout: bigint;
      };
    };
export type AddTentativeDeviceResult = { Ok: AddTentativeDeviceResponse } | { Err: string };
export type AppType =
  | { android_app: null }
  | { mobile_extension: null }
  | { mobile_browser: null }
  | { desktop_extension: null }
  | { desktop_browser: null }
  | { desktop_app: null }
  | { ios_app: null };
export interface Delegation {
  pubkey: Array<number>;
  targets: [] | [Array<Principal>];
  expiration: bigint;
}
export type DelegationMode = { domain: null } | { global: null };
export type DelegationTargets = Array<Principal>;
export type DeviceAddResponse = { added: { user_name: string } } | { failed: null };
export interface DeviceDataExternal {
  os_type: [] | [AppType];
  device_name: string;
  device_type: DeviceType;
  pub_key: Array<number>;
  purpose: Purpose;
  credential_id: [] | [Array<number>];
}
export type DeviceRemoveResponse = { failed: null } | { removed: null };
export type DeviceType = { IdentityProvider: null } | { RecoveryPhrase: null } | { SecurityDevice: null } | { EthereumMetaMask: null };
export type DeviceUpdateResponse = { updated: null } | { failed: null };
export type DeviceVerificationCode = string;
export type EnterTentativeModeResult = { Ok: bigint } | { Err: string };
export type ExitTentativeModeResult = { Ok: boolean } | { Err: string };
export type Expiration = TimeStamp;
export type FrontEnd = string;
export type GetDelegationResponse = { no_such_delegation: null } | { signed_delegation: SignedDelegation };
export interface HardwareWalletAccountDetails {
  principal: Principal;
  name: string;
  account_identifier: string;
}
export type IIAnchor = string;
export interface InitPayload {
  manager: Principal;
  salt: [] | [Array<number>];
}
export interface MEAccountDetails {
  principal: Principal;
  active: boolean;
  account_identifier: string;
  hardware_wallet_accounts: Array<HardwareWalletAccountDetails>;
  wallet_name: string;
  sub_accounts: Array<SubAccountDetails>;
}
export interface ManageList {
  manage_list: Array<[Principal, string]>;
  last_update_time: bigint;
}
export type ManageListResponse = { Failed: null } | { Success: null };
export interface NNSAccountDetails {
  principal: Principal;
  active: boolean;
  account_identifier: string;
  hardware_wallet_accounts: Array<HardwareWalletAccountDetails>;
  ii_anchor: string;
  sub_accounts: Array<SubAccountDetails>;
}
export type NoUnify = boolean;
export type Operation = { All: null } | { Tentative: null } | { Delegate: null } | { NnsWallet: null } | { MeWallet: null } | { Device: null };
export interface PrepareDelegationResponse {
  user_key: Array<number>;
  expiration: bigint;
}
export type Purpose = { authentication: null } | { recovery: null } | { management: null };
export type RecoverResponse = { recovered: { next_index: bigint } } | { finished: null } | { failed: { expected_index: bigint } };
export interface RegisterEvent {
  user_name: string;
  device_name: string;
  device_type: DeviceType;
  os_version: string;
  os_name: string;
}
export type RegisterResponse = { existed: { user_name: string } } | { canister_full: null } | { registered: { user_name: string } };
export type Seed = Array<number>;
export type SessionKey = Array<number>;
export interface SignedDelegation {
  signature: Array<number>;
  delegation: Delegation;
}
export interface SubAccountDetails {
  name: string;
  payment_limit: [] | [bigint];
  sub_account: Array<number>;
  account_identifier: string;
}
export type TimeStamp = bigint;
export type UpdateMEWalletResponse = { success: null } | { failed: null };
export type UserName = string;
export type VerifyTentativeDeviceResponse =
  | {
      device_registration_mode_off: null;
    }
  | { verified: null }
  | { wrong_code: { retries_left: number } }
  | { no_device_to_verify: null };
export type VerifyTentativeDeviceResult =
  | {
      Ok: VerifyTentativeDeviceResponse;
    }
  | { Err: string };
export type VerifyTentativeMode = { active: null } | { passive: null };
export interface _SERVICE {
  admin_backup_users: ActorMethod<[bigint, bigint], Array<number>>;
  admin_manager_add: ActorMethod<[Principal, UserName], ManageListResponse>;
  admin_manager_get: ActorMethod<[], ManageList>;
  admin_manager_is: ActorMethod<[], boolean>;
  admin_manager_remove: ActorMethod<[Principal], ManageListResponse>;
  admin_manager_update: ActorMethod<[Principal, UserName], ManageListResponse>;
  admin_operation_clear: ActorMethod<[], undefined>;
  admin_operation_list: ActorMethod<[], Array<string>>;
  admin_operation_restart: ActorMethod<[Operation], undefined>;
  admin_operation_stop: ActorMethod<[Operation], undefined>;
  admin_recover_start: ActorMethod<[bigint], undefined>;
  admin_recover_users: ActorMethod<[bigint, bigint, Array<number>], RecoverResponse>;
  admin_salt_get: ActorMethod<[], [] | [Array<number>]>;
  admin_salt_set: ActorMethod<[Array<number>], undefined>;
  admin_stats_device_count: ActorMethod<[], bigint>;
  admin_stats_me_count: ActorMethod<[], bigint>;
  admin_stats_nns_count: ActorMethod<[], bigint>;
  admin_stats_user_count: ActorMethod<[], bigint>;
  device_main_add: ActorMethod<[UserName, DeviceDataExternal], DeviceAddResponse>;
  device_main_get: ActorMethod<[UserName, [] | [DeviceType]], Array<DeviceDataExternal>>;
  device_main_remove: ActorMethod<[UserName, Array<number>], DeviceRemoveResponse>;
  device_main_update: ActorMethod<[UserName, DeviceDataExternal], DeviceUpdateResponse>;
  device_tentative_add: ActorMethod<[UserName, Principal, DeviceDataExternal], AddTentativeDeviceResult>;
  device_tentative_enter: ActorMethod<[UserName], EnterTentativeModeResult>;
  device_tentative_exit: ActorMethod<[UserName], ExitTentativeModeResult>;
  device_tentative_has: ActorMethod<[UserName], boolean>;
  device_tentative_verify: ActorMethod<[UserName, DeviceVerificationCode, VerifyTentativeMode], VerifyTentativeDeviceResult>;
  id_anchor_get: ActorMethod<[UserName], Array<string>>;
  id_delegation_get: ActorMethod<
    [UserName, FrontEnd, SessionKey, DelegationMode, TimeStamp, [] | [DelegationTargets], NoUnify],
    GetDelegationResponse
  >;
  id_delegation_prepare: ActorMethod<
    [UserName, FrontEnd, SessionKey, DelegationMode, [] | [TimeStamp], [] | [DelegationTargets], NoUnify],
    PrepareDelegationResponse
  >;
  id_user_add: ActorMethod<[UserName, DeviceDataExternal, RegisterEvent], RegisterResponse>;
  wallet_me_add: ActorMethod<[UserName, MEAccountDetails], UpdateMEWalletResponse>;
  wallet_me_get: ActorMethod<[UserName], Array<[Principal, MEAccountDetails]>>;
  wallet_me_remove: ActorMethod<[UserName, Principal], UpdateMEWalletResponse>;
  wallet_me_update: ActorMethod<[UserName, MEAccountDetails], UpdateMEWalletResponse>;
  wallet_nns_add: ActorMethod<[UserName, NNSAccountDetails], UpdateMEWalletResponse>;
  wallet_nns_get: ActorMethod<[UserName], Array<[string, NNSAccountDetails]>>;
  wallet_nns_remove: ActorMethod<[UserName, IIAnchor], UpdateMEWalletResponse>;
  wallet_nns_update: ActorMethod<[UserName, NNSAccountDetails], UpdateMEWalletResponse>;
}
