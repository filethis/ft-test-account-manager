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
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

import { IronValidatorBehavior } from '@polymer/iron-validator-behavior/iron-validator-behavior.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { IronMeta } from '@polymer/iron-meta/iron-meta.js';
import validator from 'validator/es';
Polymer({

    is: 'validator-js-validator',

    behaviors: [
        IronValidatorBehavior
    ],

    properties: {

        /** The name of the validator-js validation function. See bower_components/validator-js/src/lib/. */
        name: {
            type: String,
            notify: true,
            value: "isAlphanumeric",
            observer: "_nameChanged"
        },

        /** If true, an empty value is to be considered a valid one. */
        emptyIsValid: {
            type: Boolean,
            notify: true,
            value: false
        }
    },

    _nameChanged: function(to, from)
    {
        if (!to)
            return;

        new IronMeta(
            {
                type: 'validator',
                key: to,
                value: this
            });
    },

    validate: function(value)
    {
        if (!value)
            return this.emptyIsValid;

        return validator[this.name](value);
    }

});
