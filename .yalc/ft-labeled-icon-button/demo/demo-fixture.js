/* ft-labeled-icon-button element demo */
/* Imports */
/**
A square button that has an icon with a small text label below it.
@demo
 */
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/

import '@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '@polymer/polymer/polymer-legacy.js';
import '../ft-labeled-icon-button.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
Polymer
({
  _template: html`
        <style include="iron-flex iron-flex-alignment iron-positioning"></style>

        <style>
            :host {
                display: block;
                overflow: hidden;
            }
        </style>

        <div class="layout vertical center">

            <!-- Normal -->
            <div class="layout horizontal center">
                <div style="width:150px; font-size: 14pt" align="right">Normal:</div>
                <div style="width:35px;"></div>
                <ft-labeled-icon-button icon="delete"></ft-labeled-icon-button>
            </div>

            <div style="height:25px;"></div>

            <!-- Disabled -->
            <div class="layout horizontal center">
                <div style="width:150px; font-size: 14pt" align="right">Disabled:</div>
                <div style="width:35px;"></div>
                <ft-labeled-icon-button disabled="" icon="delete"></ft-labeled-icon-button>
            </div>

            <div style="height:25px;"></div>

            <!-- Toggle -->
            <div class="layout horizontal center">
                <div style="width:150px; font-size: 14pt" align="right">Toggles:</div>
                <div style="width:35px;"></div>
                <ft-labeled-icon-button toggles="" icon="delete"></ft-labeled-icon-button>
            </div>

        </div>
`,

  is: 'demo-fixture',

  properties:
  {
  }
});
