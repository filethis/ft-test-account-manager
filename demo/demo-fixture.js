/* ft-test-account-manager element demo */
/* Imports */
/**

An element that allows partner admins to create user accounts for testing. Also allows the creation of access tickets for the account.

@demo
 */
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/

import '@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '@polymer/polymer/polymer-legacy.js';
import '../ft-test-account-manager.js';
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

        <div class="layout vertical center" style="padding-left:16px; padding-right: 16px;">

            <ft-test-account-manager style="border:1px solid #DDD" use-local-data="true">
            </ft-test-account-manager>

        </div>
`,

  is: 'demo-fixture',

  properties:
  {
  }
});
