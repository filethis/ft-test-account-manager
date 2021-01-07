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
`<ft-code-panel>`

An element that provides a configurable alert or confirmation dialog that returns a Promise when invoked.

@demo
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@filethis/ft-clipboard-behavior/ft-clipboard-behavior.js';

import '@filethis/ft-error-behavior/ft-error-behavior.js';
import '@filethis/ft-http-behavior/ft-http-behavior.js';
import '@filethis/ft-labeled-icon-button/ft-labeled-icon-button.js';
import '@filethis/ft-url-param-behavior/ft-url-param-behavior.js';
import '@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '@filethis/juicy-ace-editor/juicy-ace-editor-module.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-checkbox/paper-checkbox.js';
import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/polymer/polymer-legacy.js';
import '@webcomponents/shadycss/entrypoints/apply-shim.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
Polymer({
  _template: html`
        <style include="iron-flex iron-flex-alignment iron-positioning"></style>

        <style>
            :host {
                display: block;
                overflow: hidden;
                @apply --layout-vertical;
                @apply --ft-code-panel;
            }
        </style>

        <div id="temp" class="layout horizontal center">

            <div style="font-family:'Roboto', sans-serif; font-size: 14pt; ">
                Your Back End Code — [[resourceHeading]]
            </div>
        </div>

        <!-- Menus -->
        <div class="layout horizontal center" style="margin-top:10px; ">
            <!-- Operation Menu -->
            <paper-dropdown-menu label="Operation" style="width:80px; " no-animations="true">
                <paper-listbox class="dropdown-content" slot="dropdown-content" attr-for-selected="name" selected="{{operationName}}">
                    <template is="dom-repeat" items="[[_operations]]" as="operation">
                        <paper-item name="[[operation.name]]">[[operation.label]]</paper-item>
                    </template>
                </paper-listbox>
            </paper-dropdown-menu>

            <div style="padding-left:15px; padding-top: 18px; padding-right: 17px; font-family:'Roboto', sans-serif; font-size: 13pt; ">
                using
            </div>

            <!-- Language and Library Menu -->
            <paper-dropdown-menu label="Language and Library" style="width:230px; " no-animations="true">
                <paper-listbox class="dropdown-content" slot="dropdown-content" style="width:230px; " attr-for-selected="name" selected="{{languageAndLibraryName}}">
                    <template is="dom-repeat" items="[[_languageAndLibraries]]" as="languageAndLibrary">
                        <paper-item name="[[languageAndLibrary.name]]">[[languageAndLibrary.label]]</paper-item>
                    </template>
                </paper-listbox>
            </paper-dropdown-menu>

            <div class="flex"></div>

            <!-- Copy code button -->
            <ft-labeled-icon-button id="copyCodeButton" icon="content-copy" label="Copy" on-click="_onCopyCodeButtonClicked">
            </ft-labeled-icon-button>
        </div>

        <!-- Code -->
        <juicy-ace-editor id="code" class="flex scroll" style="margin-top:12px; border: 1px solid #DDD; " readonly="" theme="ace/theme/chrome" mode="ace/mode/html" fontsize="14px" softtabs="" value="[[code]]" tabsize="4">
        </juicy-ace-editor>

        <div style="height:12px;"></div>

        <!-- Substitute fixture values checkbox -->
        <paper-checkbox checked="{{_substituteFixtureValues}}">
            Substitute fixture values into code (Warning: Contains secrets)
        </paper-checkbox>
`,

  is: 'ft-code-panel',

  behaviors: [
      FileThis.ErrorBehavior,
      FileThis.HttpBehavior,
      FileThis.ClipboardBehavior,
      FileThis.UrlParamBehavior
  ],

  observers:
  [
      "_onOperationsInitialized(operationName, _operations)",
      "_onLanguageAndLibraryInitialized(_onLanguageAndLibraryNameChanged, _languageAndLibraries)",
      "_onRequestChanged(_operation, resourceName, _languageAndLibrary, _substituteFixtureValues)",
  ],

  properties: {

      server: {
          type: String
      },

      apiKey: {
          type: String
      },

      apiSecret: {
          type: String
      },

      accountId: {
          type: String
      },

      partnerAccountId: {
          type: String
      },

      tokenId: {
          type: String
      },

      expiresIn: {
          type: String
      },

      _substituteFixtureValues: {
          type: Boolean,
          value: false
      },

      code: {
          type: String,
          value: ""
      },


      // Resource

      resourceName: {
          type: String
      },

      resourceHeading: {
          type: String
      },


      // Operation

      operationName: {
          type: String,
          value: "create",
          observer: "_onOperationNameChanged"
      },

      _operation: {
          type: Object
      },

      _operations:
      {
          type: Array,
          value: [
              {
                  name:'create',
                  label:'Create'
              },
              {
                  name:'delete',
                  label:'Delete'
              }
          ]
      },


      // Language and Library

      languageAndLibraryName: {
          type: String,
          observer: "_onLanguageAndLibraryNameChanged"
      },

      _languageAndLibrary: {
          type: Object,
          observer: "_onLanguageAndLibraryChanged"
      },

      _languageAndLibraries:
      {
          type: Array,
          value: [

              // API Blueprint
              {
                  name:'apiblueprint',
                  label:'API Blueprint',
                  language:'apib'
              },

              // C#
              {
                  name:'csharp-webrequest',
                  label:'C# — WebRequest',
                  language:'csharp'
              },
              {
                  name:'csharp-restsharp',
                  label:'C# — RestSharp',
                  language:'csharp'
              },

              // cURL
              {
                  name:'curl',
                  label:'cURL',
                  language:'sh'
              },

              // Go
              {
                  name:'golang',
                  label:'Go',
                  language:'golang'
              },

              // HTTP
              {
                  name:'http',
                  label:'HTTP',
                  language:'text'
              },

              // HTTPie
              {
                  name:'httpie',
                  label:'HTTPie',
                  language:'sh'
              },

              // Java
              {
                  name:'java-unirest',
                  label:'Java — Unirest',
                  language:'java'
              },
              {
                  name:'java-okhttp',
                  label:'Java — OkHttp',
                  language:'java'
              },
              {
                  name:'java-apachehttpclient',
                  label:'Java — Apache HttpClient',
                  language:'java'
              },

              // JavaScript
              {
                  name:'javascript-jquery',
                  label:'JavaScript — JQuery',
                  language:'javascript'
              },
              {
                  name:'javascript-xhr',
                  label:'JavaScript — XHR',
                  language:'javascript'
              },

              // Node
              {
                  name:'node-http',
                  label:'Node — http',
                  language:'javascript'
              },
              {
                  name:'node-request',
                  label:'Node — Request',
                  language:'javascript'
              },
              {
                  name:'node-unirest',
                  label:'Node — Unirest',
                  language:'javascript'
              },

              // PHP
              {
                  name:'php-curl',
                  label:'php — cURL',
                  language:'php'
              },
              {
                  name:'php-httprequest',
                  label:'php — HttpRequest',
                  language:'php'
              },

              // Python
              {
                  name:'python-requests',
                  label:'Python — Requests',
                  language:'python'
              },
              {
                  name:'python3-httpclient',
                  label:'Python 3 — http.client',
                  language:'python'
              },

              // Ruby
              {
                  name:'ruby-nethttp',
                  label:'Ruby — Net::HTTP',
                  language:'ruby'
              },

              // Wget
              {
                  name:'wget',
                  label:'Wget',
                  language:'sh'
              }
          ]
      }
  },

  ready: function()
  {
      // Suppress deprecation warning
      // this.$.code.editor.$blockScrolling = Infinity;
  },

  // Operation

  _onOperationsInitialized: function(to)
  {
      this._handleOperationNameChanged();
  },

  _onOperationNameChanged: function(to, from)
  {
      if (!this.operationName || !this._operations)
          return;
      this._handleOperationNameChanged();
  },

  _handleOperationNameChanged: function()
  {
      this._operation = this._findOperationNamed(this.operationName);
  },

  // Language and library

  _onLanguageAndLibraryInitialized: function(to)
  {
      this._handleLanguageAndLibraryNameChanged();
  },

  _onLanguageAndLibraryNameChanged: function(to, from)
  {
      if (!this.languageAndLibraryName || !this._languageAndLibraries)
          return;
      this._handleLanguageAndLibraryNameChanged();
  },

  _handleLanguageAndLibraryNameChanged: function()
  {
      this._languageAndLibrary = this._findLanguageAndLibraryNamed(this.languageAndLibraryName);
  },

  _onLanguageAndLibraryChanged: function(toLanguageAndLibrary, fromLanguageAndLibrary)
  {
      if (!toLanguageAndLibrary)
          return;

      // Set the code editor mode
      var language = toLanguageAndLibrary.language;
      var mode = "ace/mode/" + language;
      var editorInternal = this.$.code.editor;
      var session = editorInternal.getSession();
      session.setMode(mode);
  },

  // Request

  _onRequestChanged: function(to)
  {
      // Load the code template

      // TODO: This should not be necessary
      if (!this._languageAndLibrary)
          return;

      var language = this._languageAndLibrary.language;
      var fileExtension = this._mapLanguageToFileExtension(language);
      var filename = this.resourceName + "-" + this.operationName + "-" + this.languageAndLibraryName + "." + fileExtension;

      var base;
      if (this.getUrlParam("devel"))
          base = "../bower_components/ft-test-account-manager/data/";
      else
          base = "https://filethis.github.io/ft-test-account-manager/components/ft-test-account-manager/data/";
      var url = base + this.resourceName + "/" + this.operationName + "/" + filename;

      var options =
          {
              responseType: "text",
              headers:
                  {
                      Accept: "text/plain"
                  }
          };

      return this.httpGet(url, options)
          .then(function(codeTemplate)
          {
              var code = this._makeSubstitutionsInto(codeTemplate);
              this.code = code;
              var editorInternal = this.$.code.editor;
              editorInternal.selection.selectFileStart();
          }.bind(this))
          .catch(function(error)
          {
              log.error("Could not load local code template file: " + url);
          }.bind(this));
  },

  _onCopyCodeButtonClicked: function(event, detail)
  {
      this.copyTextToClipboard(this.code);
  },

  _makeSubstitutionsInto: function(template)
  {
      // TODO: Find a more efficient way to do this

      var code = template;
      code = code.replace(/{{SERVER}}/g, this.server);
      if (this._substituteFixtureValues)
      {
          code = code.replace(/{{ACCOUNT_ID}}/g, this.accountId);
          code = code.replace(/{{PARTNER_ACCOUNT_ID}}/g, this.partnerAccountId);
          code = code.replace(/{{TOKEN_ID}}/g, this.tokenId);
          code = code.replace(/{{EXPIRES_IN}}/g, this.expiresIn);
          var authorizationValue = btoa(this.apiKey + ":" + this.apiSecret);
          code = code.replace(/{{API_CREDENTIALS}}/g, authorizationValue);
      }
      return code;
  },

  _findOperationNamed: function(name)
  {
      var operations = this._operations;
      var count = operations.length;
      for (var index = 0; index < count; index++)
      {
          var operation = operations[index];
          if (operation.name === name)
              return operation;
      }
      return null;
  },

  _findLanguageAndLibraryNamed: function(name)
  {
      var languageAndLibraries = this._languageAndLibraries;
      var count = languageAndLibraries.length;
      for (var index = 0; index < count; index++)
      {
          var languageAndLibrary = languageAndLibraries[index];
          if (languageAndLibrary.name === name)
              return languageAndLibrary;
      }
      return null;
  },

  _mapLanguageToFileExtension: function(language)
  {
      switch (language)
      {
          case "text":
              return "txt";
          case "apib":
              return "apib";
          case "csharp":
              return "cs";
          case "sh":
              return "sh";
          case "golang":
              return "go";
          case "java":
              return "java";
          case "javascript":
              return "js";
          case "php":
              return "php";
          case "python":
              return "py";
          case "ruby":
              return "rb";
          default:
              return "txt";
      }
  }
});
