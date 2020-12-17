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
`<ft-form-panel>`

An element that displays a header with a heading, a hide/show button, and a slot for content below the header.

@demo
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import 'ft-labeled-icon-button/ft-labeled-icon-button.js';

import '@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/polymer/polymer-legacy.js';
import '@webcomponents/shadycss/entrypoints/apply-shim.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
Polymer({
  _template: html`
        <style include="iron-flex iron-flex-alignment iron-positioning"></style>

        <style>
            :host
            {
                display: block;
                overflow: hidden;
                @apply --layout-vertical;
            }
        </style>

        <!-- Header -->
        <div class="layout horizontal center">

            <!-- Show/Hide button -->
            <paper-icon-button id="showHideButton" icon="clear" style="width:35px; height: 35px; " on-tap="_onShowOrHideButtonClicked">
            </paper-icon-button>

            <!-- Heading -->
            <div style="font-family:'Roboto', sans-serif; font-size: 14pt; ">
                [[heading]]
            </div>

            <div style="width:15px;&quot;"></div>

            <!-- Summary slot -->
            <slot name="summary">
            </slot>

            <div class="flex"></div>

            <!-- Controls slot -->
            <slot name="controls">
            </slot>

        </div>

        <!-- Content -->
        <div class="flex" style="padding-left:35px; " hidden\$="[[!contentShown]]">

            <!-- Content slot -->
            <slot id="content" name="content">
            </slot>
        </div>
`,

  is: 'ft-form-panel',

  properties: {

      /** Heading to display in header */
      heading:
      {
          type: String,
          value: "Untitled"
      },

      /**
       * Whether to display the panel content.
       *
       * Note that you can provide the strings "true" and "false" as attribute values.
       *
       * @type {boolean}
       */
      contentShown: {
          type: Object,
          notify: true,
          value: true,
          observer: "_contentShownChanged"
      }

  },

  _onShowOrHideButtonClicked: function()
  {
      this.contentShown = !this.contentShown;
  },

  _contentShownChanged: function(to, from)
  {
      var icon;
      var label;
      if (this.contentShown)
      {
          icon = "clear";
          label = "Hide";
      }
      else
      {
          icon = "add";
          label = "Show";
      }
      this.$.showHideButton.icon = icon;
      this.$.showHideButton.label = label;
  }
});
