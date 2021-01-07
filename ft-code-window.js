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
`<ft-code-window>`

An element that provides a configurable alert or confirmation dialog that returns a Promise when invoked.

@demo
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import './ft-code-panel.js';

import '@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '@filethis/juicy-ace-editor/juicy-ace-editor-module.js';
import '@polymer/paper-button/paper-button.js';
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
                @apply --ft-code-window;
            }
        </style>

        <paper-dialog modal="" id="dialog" class="layout vertical" style="width:765px; height: 710px; ">

            <ft-code-panel id="codePanel" class="flex" resource-heading="[[resourceHeading]]" operation-name="[[operationName]]" resource-name="[[resourceName]]" language-and-library-name="[[languageAndLibraryName]]" server="[[server]]" api-key="[[apiKey]]" api-secret="[[apiSecret]]" account-id="[[accountId]]" partner-account-id="[[partnerAccountId]]" token-id="[[tokenId]]" expires-in="[[expiresIn]]">
            </ft-code-panel>

            <!-- Buttons -->
            <div id="buttons" class="layout horizontal end-justified">

                <div id="cancelButtonSpacer" style="width:20px"></div>

                <!-- Done -->
                <paper-button dialog-confirm="" raised="" autofocus="">Done</paper-button>
            </div>

        </paper-dialog>
`,

  is: 'ft-code-window',

  properties: {

      resourceHeading: {
          type: String
      },

      operationName: {
          type: String
      },

      resourceName: {
          type: String
      },

      languageAndLibraryName: {
          type: String
      },

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
      }
  },

  pose: function()
  {
      // Override dumb default that disables Escape keyboard equivalent for cancel
      this.$.dialog.noCancelOnEscKey = false;

      return new Promise(function(resolve, reject)
      {
          this.$.dialog.open();

          this.doneListener = function doneListener(event)
              {
                  this.$.dialog.removeEventListener("iron-overlay-closed", this.doneListener);

                  var choice;
                  var closingReason = event.detail;
                  if (closingReason.canceled || !closingReason.confirmed)  // Huh?
                      choice = "cancel";
                  else
                      choice = "commit";

                  resolve(choice);
              }.bind(this);

          this.$.dialog.addEventListener("iron-overlay-closed", this.doneListener)
      }.bind(this))
  }
});
