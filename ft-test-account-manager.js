/*
Copyright 2018 FileThis, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
/**
`<ft-test-account-manager>`

An element that allows partner admins to create user accounts for testing. Also allows the creation of user access tickets for the account.

@demo
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/app-storage/app-localstorage/app-localstorage-document.js';

import '@filethis/ft-clipboard-behavior/ft-clipboard-behavior.js';
import '@filethis/ft-confirmation-dialog/ft-confirmation-dialog.js';
import '@filethis/ft-error-behavior/ft-error-behavior.js';
import '@filethis/ft-form-panel/ft-form-panel.js';
import '@filethis/ft-http-behavior/ft-http-behavior.js';
import '@filethis/ft-labeled-icon-button/ft-labeled-icon-button.js';
import './ft-code-window.js';
import '@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-checkbox/paper-checkbox.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-tooltip/paper-tooltip.js';
import '@polymer/polymer/polymer-legacy.js';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce.js';
import '@webcomponents/shadycss/entrypoints/apply-shim.js';
import './validator-js-validator.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { timeOut } from '@polymer/polymer/lib/utils/async.js';
Polymer({
  _template: html`
        <style include="iron-flex iron-flex-alignment iron-positioning"></style>

        <style>
            :host {
                display: block;
                overflow: hidden;
                width: 400px;
                padding-top: 10px;
                padding-bottom: 5px;
                @apply --layout-vertical;

                @apply --ft-test-account-manager;
            }
        </style>

        <style>
            .form-panel
            {
                padding-left: 5px;
                padding-right: 15px;
                padding-bottom: 0px;
            }
            .section-divider
            {
                width: 100%;
                margin-bottom: 10px;
                height: 10px;
                border-bottom: 1px solid #DDD;
            }
            .field-to-buttons-space
            {
                width: 30px;
            }
            .inter-button-space
            {
                width: 5px;
            }
        </style>

        <app-localstorage-document key="ftTestAccountManager-serverPanelOpen" data="{{_serverPanelOpen}}">
        </app-localstorage-document>
        <app-localstorage-document key="ftTestAccountManager-apiCredentialsPanelOpen" data="{{_apiCredentialsPanelOpen}}">
        </app-localstorage-document>
        <app-localstorage-document key="ftTestAccountManager-userAccountPanelOpen" data="{{_userAccountPanelOpen}}">
        </app-localstorage-document>
        <app-localstorage-document key="ftTestAccountManager-userAccessTokenPanelOpen" data="{{_userAccessTokenPanelOpen}}">
        </app-localstorage-document>
        <app-localstorage-document key="ftTestAccountManager-secretsPanelOpen" data="{{_secretsPanelOpen}}">
        </app-localstorage-document>

        <!-- Server panel -->
        <ft-form-panel heading="FileThis Server" class="form-panel" content-shown="{{_serverPanelOpen}}">

            <!-- Summary -->
            <div slot="summary" style="font-family:'Roboto', sans-serif; font-size: 9pt; padding-top: 4px; color: #AAA; ">
                [[_serverDomain]]
            </div>

            <!-- Test Server button -->
            <ft-labeled-icon-button id="testServerButton" slot="controls" icon="check" label="Test" disabled="[[!_canTestServer]]" on-tap="_onTestServerButtonClicked">
            </ft-labeled-icon-button>

            <!-- Content -->
            <div slot="content" class="layout horizontal center">

                <!-- Server -->
                <validator-js-validator name="isURL"></validator-js-validator>
                <!-- For some reason, the validation field height does not propagate upward in layouts, so we add space for it. -->
                <paper-input id="serverField" class="flex" style="height:70px; " value="{{server}}" label="URL" auto-validate="" validator="isURL" error-message="Must be a valid URL" invalid="{{_serverInvalid}}">
                </paper-input>

                <div class="field-to-buttons-space"></div>

                <!-- Default button -->
                <ft-labeled-icon-button id="defaultServerButton" icon="undo" label="Default" disabled="[[!_canSetDefaultServer]]" on-tap="_onDefaultServerButtonClicked">
                </ft-labeled-icon-button>

            </div>
        </ft-form-panel>

        <!-- Divider -->
        <div class="section-divider"></div>

        <!-- API Credentials -->
        <ft-form-panel heading="API Credentials" class="form-panel" content-shown="{{_apiCredentialsPanelOpen}}">

            <!-- Test API credentials button -->
            <ft-labeled-icon-button id="testApiCredentialsButton" slot="controls" icon="check" label="Test" disabled="[[!_canTestApiCredentials]]" on-tap="_onTestApiCredentialsButtonClicked">
            </ft-labeled-icon-button>

            <!-- Content -->
            <div slot="content" class="layout vertical">

                <validator-js-validator name="isAlphanumeric"></validator-js-validator>

                <!-- API Key -->
                <div class="layout horizontal center">

                    <!-- API Key -->
                    <paper-input id="apiKeyField" autofocus="" class="flex" label="API Key" value="{{apiKey}}" type="[[_computeInputType(_showSecrets)]]" auto-validate="" validator="isAlphanumeric" error-message="Must be an alphanumeric string" invalid="{{_apiKeyInvalid}}" char-counter="">
                    </paper-input>

                </div>

                <!-- API Secret -->
                <div class="layout horizontal center">

                    <!-- API Secret -->
                    <paper-input id="apiSecretField" autofocus="" label="API Secret" class="flex" value="{{apiSecret}}" type="[[_computeInputType(_showSecrets)]]" auto-validate="" validator="isAlphanumeric" error-message="Must be an alphanumeric string" invalid="{{_apiSecretInvalid}}" char-counter="">
                    </paper-input>

                </div>
            </div>
        </ft-form-panel>

        <!-- Divider -->
        <div class="section-divider"></div>

        <!-- User Account -->
        <ft-form-panel heading="User Account" class="form-panel" content-shown="{{_userAccountPanelOpen}}">

            <!-- Summary -->
            <div slot="summary" style="font-family:'Roboto', sans-serif; font-size: 9pt; padding-top: 4px; color: #AAA; ">
                id=[[userAccountId]]
            </div>

            <!-- Test Account button -->
            <ft-labeled-icon-button id="testAccountButton" slot="controls" icon="check" label="Test" disabled="[[!_canTestUserAccount]]" on-tap="_onTestAccountButtonClicked">
            </ft-labeled-icon-button>

            <!-- Content -->
            <div slot="content" class="layout horizontal center">

                <!-- User acccount id -->
                <!-- For some reason, the validation field height does not propagate upward in layouts, so we add space for it. -->
                <paper-input id="userAccountIdField" label="Id" class="flex" style="height:70px; " value="{{userAccountId}}" auto-validate="" pattern="[0-9]+" error-message="Not a valid FileThis acccount id">
                </paper-input>

                <div class="field-to-buttons-space"></div>

                <!-- Copy button -->
                <ft-labeled-icon-button id="copyUserAccountIdButton" icon="content-copy" label="Copy" disabled="[[!_canCopyUserAccountId]]" on-tap="_onCopyUserAccountIdButtonClicked">
                </ft-labeled-icon-button>

                <div class="inter-button-space"></div>

                <!-- Code button -->
                <ft-labeled-icon-button id="viewUserAccountCodeButton" icon="code" label="Code" on-tap="_onViewUserAccountCodeButtonClicked">
                </ft-labeled-icon-button>

                <div class="inter-button-space"></div>

                <!-- Delete Account button -->
                <ft-labeled-icon-button id="deleteAccountButton" icon="remove" label="Delete" disabled="[[!_canDeleteUserAccount]]" on-tap="_onDeleteAccountButtonClicked">
                </ft-labeled-icon-button>

                <div class="inter-button-space"></div>

                <!-- Create Account button -->
                <ft-labeled-icon-button id="createAccountButton" icon="add" label="New" disabled="[[!_canCreateUserAccount]]" on-tap="_onCreateAccountButtonClicked">
                </ft-labeled-icon-button>
            </div>
        </ft-form-panel>

        <!-- Divider -->
        <div class="section-divider"></div>

        <!-- User Access Token -->
        <ft-form-panel heading="User Access Token" class="form-panel" content-shown="{{_userAccessTokenPanelOpen}}">

            <!-- Test Token button -->
            <ft-labeled-icon-button id="testTokenButton" icon="check" slot="controls" label="Test" disabled="[[!_canTestToken]]" on-tap="_onTestTokenButtonClicked">
            </ft-labeled-icon-button>

            <!-- Content -->
            <div slot="content" class="layout vertical">
                <!-- timeout -->
                <paper-input id="timeoutField" label="Timeout in Minutes" value="{{timeout}}" auto-validate="" pattern="[0-9]+" error-message="Must be an integer" invalid="{{_timeoutInvalid}}" style="width:110px;">
                </paper-input>

                <div class="layout horizontal center">

                    <!-- token -->
                    <validator-js-validator name="isAscii"></validator-js-validator>
                    <paper-input id="tokenField" class="flex" label="Token" value="{{token}}" type="[[_computeInputType(_showSecrets)]]" char-counter="" auto-validate="" validator="isAscii" error-message="Must be valid token string" invalid="{{_tokenInvalid}}">
                    </paper-input>

                    <div class="field-to-buttons-space"></div>

                    <!-- Copy button -->
                    <ft-labeled-icon-button id="copyUserAccessTokenButton" icon="content-copy" label="Copy" disabled="[[!_canCopyUserAccessToken]]" on-tap="_onCopyUserAccessTokenButtonClicked">
                    </ft-labeled-icon-button>

                    <div class="inter-button-space"></div>

                    <!-- Code button -->
                    <ft-labeled-icon-button id="viewUserAccessTokenCodeButton" icon="code" label="Code" on-tap="_onViewUserAccessTokenCodeButtonClicked">
                    </ft-labeled-icon-button>

                    <div class="inter-button-space"></div>

                    <!-- Delete Token button -->
                    <ft-labeled-icon-button id="deleteTokenButton" icon="remove" label="Delete" disabled="[[!_canDeleteToken]]" on-tap="_onDeleteTokenButtonClicked">
                    </ft-labeled-icon-button>

                    <div class="inter-button-space"></div>

                    <!-- Create Token button -->
                    <ft-labeled-icon-button id="createTokenButton" icon="add" label="New" disabled="[[!_canCreateToken]]" on-tap="_onCreateTokenButtonClicked">
                    </ft-labeled-icon-button>
                </div>
            </div>
        </ft-form-panel>

        <!-- Divider -->
        <div class="section-divider"></div>

        <!-- Secrets -->
        <ft-form-panel heading="Secrets" class="form-panel" content-shown="{{_secretsPanelOpen}}">

            <!-- Summary -->
            <div slot="summary" style="font-family:'Roboto', sans-serif; font-size: 9pt; padding-top: 4px; color: #AAA; ">
                [[_secretsShownText]]
            </div>

            <!-- Content -->
            <div slot="content" class="layout horizontal center">

                <!-- Show Secrets checkbox -->
                <paper-checkbox checked="{{_showSecrets}}">
                    Show
                </paper-checkbox>

                <div class="flex"></div>

                <!-- Clear Stored Secrets button -->
                <ft-labeled-icon-button id="clearSecretsButton" icon="clear" label="Clear" disabled="[[!_canClearSecrets]]" on-tap="_onClearSecretsButtonClicked">
                </ft-labeled-icon-button>
            </div>
        </ft-form-panel>

        <!-- Server test tooltip -->
        <paper-tooltip id="testServerButtonTooltip" manual-mode="true" for="testServerButton" position="right" animation-delay="0" offset="5">
            [[_testServerButtonTooltipText]]
        </paper-tooltip>

        <!-- API Credentials test tooltip -->
        <paper-tooltip id="testApiCredentialsButtonTooltip" manual-mode="true" for="testApiCredentialsButton" position="right" animation-delay="0" offset="5">
            [[_testApiCredentialsButtonTooltipText]]
        </paper-tooltip>

        <!-- User Account test tooltip -->
        <paper-tooltip id="testAccountButtonTooltip" manual-mode="true" for="testAccountButton" position="right" animation-delay="0" offset="5">
            [[_testAccountButtonTooltipText]]
        </paper-tooltip>

        <!-- User Access Token test tooltip -->
        <paper-tooltip id="testTokenButtonTooltip" manual-mode="true" for="testTokenButton" position="right" animation-delay="0" offset="5">
            [[_testTokenButtonTooltipText]]
        </paper-tooltip>

        <!-- Confirmation dialog -->
        <ft-confirmation-dialog id="confirmationDialog"></ft-confirmation-dialog>

        <!-- Code window -->
        <ft-code-window id="codeWindow" server="[[server]]" api-key="[[apiKey]]" api-secret="[[apiSecret]]" account-id="[[userAccountId]]" token-id="[[tokenId]]">
        </ft-code-window>
`,

  is: 'ft-test-account-manager',

  behaviors: [
      FileThis.ErrorBehavior,
      FileThis.HttpBehavior,
      FileThis.ClipboardBehavior,
  ],

  observers:
  [
      "_onSettingChanged(server, apiPath, apiKey, apiSecret, userAccountId, timeout, token)",
      "_onInvalidChanged(_serverInvalid, _apiKeyInvalid, _apiSecretInvalid, _timeoutInvalid, _tokenInvalid)"
  ],

  properties: {

      /** Whether the FileThis Connect instance is live or not */
      live:
      {
          type: Object,
          notify: true,
          value: false
      },

      /** Whether the FileThis Connect instance _can_ be live or not */
      canGoLive:
      {
          type: Object,
          notify: true,
          value: false
      },

      /** The FileThis server URL. Used by FileThis for testing against non-production servers. Defaults to value of _defaultServer_ property. */
      server: {
          type: String,
          notify: true,
          value: "",
          observer: "_onServerChanged"
      },

      _serverDomain: {
          type: String,
          value: ""
      },

      /** The path under the baseUrl used for API requests. For example: "/api/v1". Note that you should use a leading slash, and no trailing slash. */
      apiPath:
      {
          type: String,
          value: "/api/v1"
      },

      /** The Partner API key. */
      apiKey: {
          type: String,
          notify: true,
          value: ""
      },

      /** The Partner API secret. */
      apiSecret: {
          type: String,
          notify: true,
          value: ""
      },

      /** The user's FileThis account id. */
      userAccountId: {
          type: String,
          notify: true,
          value: ""
      },

      /** The user's FileThis user access token. Used to authenticate and authorize requests to the FileThis API endpoints. */
      tokenId: {
          type: String,
          notify: true,
          value: ""
      },

      /** Timeout in minutes for the end-user FileThis token. */
      timeout:
      {
          type: Number,
          notify: true,
          value: 120 // Two hours
      },

      /** The current user access token. */
      token: {
          type: String,
          notify: true,
          value: ""
      },

      /** The default server URL. Used by FileThis for testing against non-production servers. */
      defaultServer: {
          type: String,
          notify: false,
          value: "https://filethis.com"
      },

      // Properties that track validity of fields ---------------------------------------------------

      /** True when the server value is invalid. */
      _serverInvalid: {
          type: Boolean,
          value: false
      },

      /** True when the API key value is invalid. */
      _apiKeyInvalid: {
          type: Boolean,
          value: false
      },

      /** True when the API secret value is invalid. */
      _apiSecretInvalid: {
          type: Boolean,
          value: false
      },

      /** True when the timeout value is invalid. */
      _timeoutInvalid: {
          type: Boolean,
          value: false
      },

      /** True when the token value is invalid. */
      _tokenInvalid: {
          type: Boolean,
          value: false
      },


      // Properties that enable/disable buttons ---------------------------------------------------

      /** True when the server is not already set to the default. */
      _canSetDefaultServer: {
          type: Boolean,
          value: false
      },

      /** True when the prerequisites for testing the current server are valid. */
      _canTestServer: {
          type: Boolean,
          value: false
      },

      /** True when the prerequisites for testing the API credentials are valid. */
      _canTestApiCredentials: {
          type: Boolean,
          value: false
      },

      /** True when the prerequisites for creating a new FileThis user account are valid. */
      _canCreateUserAccount: {
          type: Boolean,
          value: false
      },

      /** True when the prerequisites for deleting the current FileThis user account are valid. */
      _canDeleteUserAccount: {
          type: Boolean,
          value: false
      },

      /** True when the prerequisites for testing access to the current FileThis user account are valid. */
      _canTestUserAccount: {
          type: Boolean,
          value: false
      },

      /** True when the prerequisites for creating a new FileThis user access token are valid. */
      _canCreateToken: {
          type: Boolean,
          value: false
      },

      /** True when the prerequisites for deleting the current FileThis user access token are valid. */
      _canDeleteToken: {
          type: Boolean,
          value: false
      },

      /** True when the prerequisites for testing the current FileThis user access token are valid. */
      _canTestToken: {
          type: Boolean,
          value: false
      },

      /** True when there are any secrets that can be cleared. */
      _canClearSecrets: {
          type: Boolean,
          value: false
      },

      /** True when the user has told us to display secrets in UI fields without obfuscation. */
      _showSecrets: {
          type: Boolean,
          value: false,
          observer: "_showSecretsChanged"
      },

      _secretsShownText: {
          type: String,
          value: "Shown"
      },

      /** Used internally when reading/writing values to local storage. */
      _suppressWriteToLocalStorage: {
          type: Boolean,
          value: true
      },

      _serverPanelOpen:
      {
          type: Object,
          notify: true,
          value: false,
      },
      _apiCredentialsPanelOpen:
      {
          type: Object,
          notify: true,
          value: true,
      },
      _userAccountPanelOpen:
      {
          type: Object,
          notify: true,
          value: true,
      },
      _userAccessTokenPanelOpen:
      {
          type: Object,
          notify: true,
          value: true,
      },
      _secretsPanelOpen:
      {
          type: Object,
          notify: true,
          value: false,
      },
  },

  // Startup -------------------------------------------------------------------------------------

  ready: function()
  {
      this.async(function()
      {
          this._readFromLocalStorage();
          this._enableOrDisableButtons();
      }, 200)
  },

  _onServerChanged: function()
  {
      var server = this.server;
      if (!server)
          return;
      var regex = /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n]+)/;
      var matches = server.match(regex);
      if (matches.length !== 2)
          return;
      var serverDomain = matches[1];
      this._serverDomain = serverDomain;
  },

  _showSecretsChanged: function()
  {
      if (this._showSecrets)
          this._secretsShownText = "Shown";
      else
          this._secretsShownText = "Hidden";
  },

  // Updating button enable/disable properties ---------------------------------------------------

  _checkCanSetDefaultServer: function()
  {
      if (!this.server)
          return true;
      if (this.server !== this.defaultServer)
          return true;
      return false;
  },

  _checkCanUseServer: function()
  {
      if (!this.server)
          return false;
      if (this.$.serverField.invalid)
          return false;

      return true;
  },

  _checkCanUsePartnerCredentials: function()
  {
      if (!this._checkCanUseServer())
          return false;

      if (!this.apiKey)
          return false;
      if (this.$.apiKeyField.invalid)
          return false;

      if (!this.apiSecret)
          return false;
      if (this.$.apiSecretField.invalid)
          return false;

      return true;
  },

  _checkCanUseUserAccount: function()
  {
      if (!this._checkCanUsePartnerCredentials())
          return false;

      if (!this.userAccountId)
          return false;
      if (this.$.userAccountIdField.invalid)
          return false;

      return true;
  },

  _checkCanUseToken: function()
  {
      if (!this._checkCanUseUserAccount())
          return false;

      if (!this.token)
          return false;
      if (this.$.tokenField.invalid)
          return false;

      return true;
  },

  _checkCanClearSecrets: function()
  {
      if (this.apiKey)
          return true;
      if (this.apiSecret)
          return true;
      if (this.token)
          return true;
      if (this.userAccountId)
          return true;
      return false;
  },

  _onSettingChanged: function(to, from)
  {
      this._settingChangedDebouncer = Debouncer.debounce
      (
          this._settingChangedDebouncer,
          timeOut.after(60),
          this._onSettingChangedDebounced.bind(this)
      );
  },

  _onSettingChangedDebounced: function(to, from)
  {
      this._writeToLocalStorage();
      this._enableOrDisableButtons();

      this.canGoLive = this._checkCanGoLive();
  },

  _onInvalidChanged: function(to, from)
  {
      this._invalidChangedDebouncer = Debouncer.debounce
      (
          this._invalidChangedDebouncer,
          timeOut.after(60),
          this._onInvalidChangedDebounced.bind(this)
      );
  },

  _onInvalidChangedDebounced: function(to, from)
  {
      this._enableOrDisableButtons();
  },

  _enableOrDisableButtons: function()
  {
      this._canSetDefaultServer = this._checkCanSetDefaultServer();
      this._canTestServer = this._checkCanUseServer();
      this._canTestApiCredentials = this._checkCanUsePartnerCredentials();
      this._canCreateUserAccount = this._checkCanUsePartnerCredentials();
      this._canDeleteUserAccount = this._checkCanUseUserAccount();
      this._canTestUserAccount = this._checkCanUseUserAccount();
      this._canCreateToken = this._checkCanUseUserAccount();
      this._canDeleteToken = this._checkCanUseToken();
      this._canTestToken = this._checkCanUseToken();
      this._canClearSecrets = this._checkCanClearSecrets();
  },

  _checkCanGoLive: function()
  {
      if (!this.server)
          return false;
      if (!this.apiPath)
          return false;
      if (!this.userAccountId)
          return false;
      if (!this.token)
          return false;
      return true;
  },

  _computeInputType: function(showSecrets)
  {
      if (showSecrets)
          return "text";
      else
          return "password";
  },

  // Local storage ----------------------------------------------------------------------------

  _readFromLocalStorage: function()
  {
      this._suppressWriteToLocalStorage = true;
      try
      {
          var server = this._readFromLocalStorageSingle(this.localName + "server");
          if (server)
              this.server = server;
          else
              this.server = this.defaultServer;
          this.apiKey = this._readFromLocalStorageSingle(this.localName + "apiKey");
          this.apiSecret = this._readFromLocalStorageSingle(this.localName + "apiSecret");
          this.userAccountId = this._readFromLocalStorageSingle(this.localName + "userAccountId");
          this.tokenId = this._readFromLocalStorageSingle(this.localName + "tokenId");
          var timeout = this._readFromLocalStorageSingle(this.localName + "timeout");
          if (!!timeout)
              this.timeout = timeout;
          else
              this.timeout = 120;  // Two hours
          this.token = this._readFromLocalStorageSingle(this.localName + "token");
      }
      finally
      {
          this._suppressWriteToLocalStorage = false;
      }
  },

  _writeToLocalStorage: function()
  {
      if (this._suppressWriteToLocalStorage === undefined || this._suppressWriteToLocalStorage)
          return;
      localStorage.setItem(this.localName + "server", this.server);
      localStorage.setItem(this.localName + "apiKey", this.apiKey);
      localStorage.setItem(this.localName + "apiSecret", this.apiSecret);
      localStorage.setItem(this.localName + "tokenId", this.tokenId);
      localStorage.setItem(this.localName + this.localName + "timeout", this.timeout);
      localStorage.setItem(this.localName + "token", this.token);
      localStorage.setItem(this.localName + "userAccountId", this.userAccountId);
  },

  _readFromLocalStorageSingle: function(name)
  {
      var value = localStorage.getItem(name);
      if (value === null)
          value = "";
      return value;
  },

  // Button click handlers ----------------------------------------------------------------------------

  _onViewUserAccountCodeButtonClicked: function(event, detail)
  {
      this.$.codeWindow.resourceHeading = "User Account";
      this.$.codeWindow.operationName = "create";
      this.$.codeWindow.resourceName = "account";
      this.$.codeWindow.languageAndLibraryName = "python-requests";
      var partnerAccountId = this._generateGuid();
      this.$.codeWindow.partnerAccountId = partnerAccountId;
      var expiresIn = this.timeout.toString();
      this.$.codeWindow.expiresIn = expiresIn;
      return this.$.codeWindow.pose().then(function()
          {
          }.bind(this))
  },

  _onViewUserAccessTokenCodeButtonClicked: function(event, detail)
  {
      this.$.codeWindow.resourceHeading = "User Access Token";
      this.$.codeWindow.operationName = "create";
      this.$.codeWindow.resourceName = "token";
      this.$.codeWindow.languageAndLibraryName = "python-requests";
      var partnerAccountId = this._generateGuid();
      this.$.codeWindow.partnerAccountId = partnerAccountId;
      var expiresIn = this.timeout.toString();
      this.$.codeWindow.expiresIn = expiresIn;
      return this.$.codeWindow.pose().then(function()
          {
          }.bind(this))
  },

  _onDefaultServerButtonClicked: function(event, detail)
  {
      var overrideWarning = event.metaKey;
      if (overrideWarning)
      {
          this._restoreDefaultServer();
          return;
      }

      var url = "https://filethis.com";
      var prompt = "Are you sure you want to restore the default of " + url + "?";
      return this.$.confirmationDialog.confirm(prompt, "Restore")
          .then(function(choice)
          {
              if (choice === "cancel")
                  return;
              this._restoreDefaultServer();
          }.bind(this))
  },

  _restoreDefaultServer: function(event, detail)
  {
      this.server = "https://filethis.com";
  },

  _onTestServerButtonClicked: function(event, detail)
  {
      var url = this.server + this.apiPath + "/healthcheck";
      var options = this._buildHttpOptions();
      this._makeTest
      (
          url,
          options,
          this.$.testServerButtonTooltip,
          "_testServerButtonTooltipText",
          "Server URL is valid and reachable",
          "Invalid Server URL, or not reachable"
      );
  },

  _onTestApiCredentialsButtonClicked: function(event, detail)
  {
      var url = this.server + this.apiPath + "/partners";
      var options = this._buildHttpOptions();
      this._makeTest
      (
          url,
          options,
          this.$.testApiCredentialsButtonTooltip,
          "_testApiCredentialsButtonTooltipText",
          "API credentials are valid",
          "Invalid API credentials"
      );
  },

  _onTestAccountButtonClicked: function(event, detail)
  {
      var url = this.server + this.apiPath + "/accounts/" + this.userAccountId;
      var options = this._buildHttpOptions();
      this._makeTest
      (
          url,
          options,
          this.$.testAccountButtonTooltip,
          "_testAccountButtonTooltipText",
          "User account is valid",
          "Invalid user account"
      );
  },

  _onTestTokenButtonClicked: function(event, detail)
  {
      var url = this.server + this.apiPath + "/accounts/" + this.userAccountId;
      var options =  {
          headers: {
              "X-FileThis-Session": this.token
          }
      };
      this._makeTest
      (
          url,
          options,
          this.$.testTokenButtonTooltip,
          "_testTokenButtonTooltipText",
          "Token is valid",
          "Invalid token"
      );
  },

  _onCreateAccountButtonClicked: function(event, detail)
  {
      Promise.resolve()
          .then(function()
          {
              // If there is no current user account, go ahead and create one
              var haveCurrentAccount = !!this.userAccountId;
              if (!haveCurrentAccount)
                  return this._createUserAccount();

              // If caller asked to override the warning, go ahead and delete and recreate the user account
              var overrideWarning = event.metaKey;
              if (overrideWarning)
                  return this._deleteAndRecreateUserAccount();

              // Ask the caller to confirm that they really want to delete the current user account
              var prompt = "Are you sure you want to create a new user account?";
              if (!!this.token)
                  prompt += "<br><br>The current account and access token will be deleted first, if they exist.";
              else
                  prompt += "<br><br>The current account will be deleted first, if it exists.";
              return this.$.confirmationDialog.confirm(prompt, "Proceed")
                  .then(function(choice)
                  {
                      if (choice === "cancel")
                          throw "cancel";
                      return this._deleteAndRecreateUserAccount();
                  }.bind(this))
          }.bind(this))
          .then(function(response)
          {
              this.userAccountId = response.id;
          }.bind(this))
          .catch(function(reason)
          {
              if (reason === "cancel")
                  return;
              this.handleCaughtError(reason);
          }.bind(this));
  },

  _deleteAndRecreateUserAccount: function()
  {
      return this._deleteUserAccount()
          .catch(function(reason)
          {
              if (reason === "cancel")
                  throw "cancel";
          }.bind(this))
          .then(function()
          {
              this.userAccountId = "";

              // Deleting an account deletes its tokens
              this.tokenId = "";
              this.token = "";
          }.bind(this))
          .then(this._createUserAccount.bind(this));
  },

  _onDeleteAccountButtonClicked: function(event, detail)
  {
      var overrideWarning = event.metaKey;
      if (overrideWarning)
          return this._deleteUserAccountAction();

      var prompt = "Are you sure you want to delete the user account?";
      if (!!this.token)
          prompt += "<br><br>This will also delete the current user access token, if it exists.";
      this.$.confirmationDialog.confirm(prompt, "Delete User Account")
          .then(function(choice)
          {
              if (choice === "cancel")
                  return;
              return this._deleteUserAccountAction();
          }.bind(this))
  },

  _deleteUserAccountAction: function()
  {
      this._deleteUserAccount()
          .then(function()
          {
              this.userAccountId = "";

              // Deleting an account deletes its tokens
              this.tokenId = "";
              this.token = "";
          }.bind(this))
          .catch(function(reason)
          {
              if (reason === "cancel")
                  return;
              this.handleCaughtError(reason);
          }.bind(this));
  },

  _onCreateTokenButtonClicked: function(event, detail)
  {
      Promise.resolve()
          .then(function()
          {
              // If there is no current token, go ahead and create one
              var haveCurrentToken = !!this.token;
              if (!haveCurrentToken)
                  return this._createToken();

              // If caller asked to override the warning, go ahead and delete and recreate the token
              var overrideWarning = event.metaKey;
              if (overrideWarning)
                  return this._deleteAndRecreateToken();

              // Ask the caller to confirm that they really want to delete the current token
              var prompt = "Creating a new user access token will first delete the current one, if it exists.\nDo you want do proceed?";
              return this.$.confirmationDialog.confirm(prompt, "Proceed")
                  .then(function(choice)
                  {
                      if (choice === "cancel")
                          throw "cancel";
                      return this._deleteAndRecreateToken();
                  }.bind(this))
          }.bind(this))
          .then(function(response)
          {
              this.tokenId = response.id;
              this.token = response.token;
          }.bind(this))
          .catch(function(reason)
          {
              if (reason === "cancel")
                  return;
              this.handleCaughtError(reason);
          }.bind(this));
  },

  _deleteAndRecreateToken: function()
  {
      return this._deleteToken()
          .catch(function(reason)
          {
              if (reason === "cancel")
                  throw "cancel";
              // Ignore. Token likely timed out.
          }.bind(this))
          .then(function()
          {
              this.tokenId = "";
              this.token = "";
          }.bind(this))
          .then(this._createToken.bind(this));
  },

  _onDeleteTokenButtonClicked: function(event, detail)
  {
      var overrideWarning = event.metaKey;
      if (overrideWarning)
          return this._onDeleteTokenButtonAction();

      var prompt = "Are you sure you want to delete the user access token?";
      this.$.confirmationDialog.confirm(prompt, "Delete Token")
          .then(function(choice)
          {
              if (choice === "cancel")
                  return;
              return this._onDeleteTokenButtonAction();
          }.bind(this))
  },

  _onDeleteTokenButtonAction: function()
  {
      this._deleteToken()
          .then(function()
          {
              this.tokenId = "";
              this.token = "";
          }.bind(this))
          .catch(function(reason)
          {
              if (reason === "cancel")
                  return;
              this.handleCaughtError(reason);
          }.bind(this));
  },

  _onClearSecretsButtonClicked: function(event, detail)
  {
      var overrideWarning = event.metaKey;
      if (overrideWarning)
          return this._onClearSecretsAction();

      var prompt = "Are you sure you want to the clear secrets stored in your browser's local storage?";
      prompt += "<br><br>Secrets include the API key, API secret, and the current user access token.";
      this.$.confirmationDialog.confirm(prompt, "Clear Secrets")
          .then(function(choice)
          {
              if (choice === "cancel")
                  return;
              return this._onClearSecretsAction();
          }.bind(this))
  },

  _onClearSecretsAction: function()
  {
      this._clearSecrets()
          .catch(function(reason)
          {
              if (reason === "cancel")
                  return;
              this.handleCaughtError(reason);
          }.bind(this));
  },

  _clearSecrets: function()
  {
      // TODO: Prompt to delete account and token

      this._suppressWriteToLocalStorage = true;
      try
      {
          this.apiKey = "";
          this.apiSecret = "";
          this.token = "";
          this.tokenId = "";
      }
      finally
      {
          this._suppressWriteToLocalStorage = false;
      }
      this._writeToLocalStorage();
  },

  // Actions -------------------------------------------------------------------------------------

  _deleteUserAccount: function()
  {
      var url = this.server + "/api/v1/accounts/" + this.userAccountId;
      var options = this._buildHttpOptions();
      return this.httpDelete(url, options);
  },

  _createUserAccount: function()
  {
      var url = this.server +
          "/api/v1/accounts/";
      var partnerAccountId = this._generateGuid();
      var body = {
          partnerAccountId: partnerAccountId
      };
      var options = this._buildHttpOptions();
      return this.httpPost(url, body, options);
  },

  _deleteToken: function()
  {
      var url = this.server + "/api/v1/accounts/" + this.userAccountId + "/tokens/" + this.tokenId;
      var options = this._buildHttpOptions();
      return this.httpDelete(url, options);
  },

  _createToken: function()
  {
      var url = this.server + "/api/v1/accounts/" + this.userAccountId + "/tokens/";
      var body = {
          expiresIn: this.timeout.toString()
      };
      var options = this._buildHttpOptions();
      return this.httpPost(url, body, options);
  },

  _buildHttpOptions: function()
  {
      var authorizationValue = "Basic " + btoa(this.apiKey + ":" + this.apiSecret);

      return {
          withCredentials: true,
          headers: {
              Authorization: authorizationValue
          }
      };
  },

  _generateGuid: function()
  {
      function s4()
      {
          return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
      }

      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
          s4() + '-' + s4() + s4() + s4();
  },

  _makeTest: function(url, options, tooltip, propertyName, successText, failureText)
  {
      this.httpGet(url, options)
          .then(function(response)
          {
              this._showTooltip
                  (
                      tooltip,
                      propertyName,
                      successText,
                      true // successful
                  );
          }.bind(this))
          .catch(function(error)
          {
              this._showTooltip
                  (
                      tooltip,
                      propertyName,
                      failureText,
                      false // failed
                  );
          }.bind(this));
  },

  _showTooltip: function(tooltip, propertyName, text, successful)
  {
      // Set label
      this.set(propertyName, text);

      // Set styles
      var styles = {
          '--paper-tooltip-text-color': 'black',
          '--paper-tooltip-opacity': '1.0',
      };
      var backgroundColor;
      if (successful)
          backgroundColor = '#ebfaeb';
      else // failed
          backgroundColor = '#ffe6e6';
      styles["--paper-tooltip-background"] = backgroundColor;
      tooltip.updateStyles(styles);

      // Show tooltip
      tooltip.show();
      setTimeout(function()
      {
          tooltip.hide();
      }.bind(this), 2000)  // Show for two seconds
  },

  _onCopyUserAccountIdButtonClicked: function(event, detail)
  {
      this.copyTextToClipboard(this.userAccountId);
  },

  _onCopyUserAccessTokenButtonClicked: function(event, detail)
  {
      this.copyTextToClipboard(this.token);
  }
});
