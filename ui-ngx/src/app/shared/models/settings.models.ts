///
/// Copyright © 2016-2020 The Thingsboard Authors
///
/// Licensed under the Apache License, Version 2.0 (the "License");
/// you may not use this file except in compliance with the License.
/// You may obtain a copy of the License at
///
///     http://www.apache.org/licenses/LICENSE-2.0
///
/// Unless required by applicable law or agreed to in writing, software
/// distributed under the License is distributed on an "AS IS" BASIS,
/// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
/// See the License for the specific language governing permissions and
/// limitations under the License.
///

import { EntityId } from '@shared/models/id/entity-id';
import { TenantId } from '@shared/models/id/tenant-id';

export const smtpPortPattern: RegExp = /^([0-9]{1,4}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/;

export interface AdminSettings<T> {
  key: string;
  jsonValue: T;
}

export declare type SmtpProtocol = 'smtp' | 'smtps';

export interface MailServerSettings {
  mailFrom: string;
  smtpProtocol: SmtpProtocol;
  smtpHost: string;
  smtpPort: number;
  timeout: number;
  enableTls: boolean;
  username: string;
  password: string;
  enableProxy: boolean;
  proxyHost: string;
  proxyPort: number;
  proxyUser: string;
  proxyPassword: string;
}

export interface GeneralSettings {
  baseUrl: string;
}

export interface UserPasswordPolicy {
  minimumLength: number;
  minimumUppercaseLetters: number;
  minimumLowercaseLetters: number;
  minimumDigits: number;
  minimumSpecialCharacters: number;
  passwordExpirationPeriodDays: number;
}

export interface SecuritySettings {
  passwordPolicy: UserPasswordPolicy;
}

export interface UpdateMessage {
  message: string;
  updateAvailable: boolean;
}

export interface OAuth2Settings {
  enabled: boolean;
  domainsParams: DomainsParam[];
}

export interface DomainsParam {
  clientRegistrations: ClientRegistration[];
  domainInfos: DomainInfo[];
}

export interface DomainInfo {
  name: string;
  scheme: DomainSchema;
}

export enum DomainSchema{
  HTTP = 'HTTP',
  HTTPS = 'HTTPS',
  MIXED = 'MIXED'
}

export const domainSchemaTranslations = new Map<DomainSchema, string>(
  [
    [DomainSchema.HTTP, 'admin.oauth2.domain-schema-http'],
    [DomainSchema.HTTPS, 'admin.oauth2.domain-schema-https'],
    [DomainSchema.MIXED, 'admin.oauth2.domain-schema-mixed']
  ]
);

export enum MapperConfigType{
  BASIC = 'BASIC',
  CUSTOM = 'CUSTOM'
}

export enum TenantNameStrategy{
  DOMAIN = 'DOMAIN',
  EMAIL = 'EMAIL',
  CUSTOM = 'CUSTOM'
}

export interface ClientProviderTemplated extends ClientRegistration{
  comment: string;
  createdTime: number;
  helpLink: string;
  name: string;
  providerId: string;
  tenantId: TenantId;
}

export interface ClientRegistration {
  loginButtonLabel: string;
  loginButtonIcon: string;
  clientId: string;
  clientSecret: string;
  accessTokenUri: string;
  authorizationUri: string;
  scope: string[];
  jwkSetUri?: string;
  userInfoUri: string;
  clientAuthenticationMethod: ClientAuthenticationMethod;
  userNameAttributeName: string;
  mapperConfig: MapperConfig;
  id?: EntityId;
  additionalInfo: string;
}

export enum ClientAuthenticationMethod {
  BASIC = 'BASIC',
  POST = 'POST'
}

export interface MapperConfig {
  allowUserCreation: boolean;
  activateUser: boolean;
  type: MapperConfigType;
  basic?: MapperConfigBasic;
  custom?: MapperConfigCustom;
}

export interface MapperConfigBasic {
  emailAttributeKey: string;
  firstNameAttributeKey?: string;
  lastNameAttributeKey?: string;
  tenantNameStrategy: TenantNameStrategy;
  tenantNamePattern?: string;
  customerNamePattern?: string;
  defaultDashboardName?: string;
  alwaysFullScreen?: boolean;
}

export interface MapperConfigCustom {
  url: string;
  username?: string;
  password?: string;
}
