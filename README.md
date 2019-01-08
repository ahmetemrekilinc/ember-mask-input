ember-mask-input
==============================================================================

[![npm version](https://badge.fury.io/js/ember-mask-input.svg)](https://badge.fury.io/js/ember-mask-input.svg)
[![downloads](https://img.shields.io/npm/dm/ember-mask-input.svg?style=flat-square)](https://img.shields.io/npm/dm/ember-mask-input.svg?style=flat-square)
[![Build Status](https://travis-ci.org/ahmetemrekilinc/ember-mask-input.svg?branch=master)](https://travis-ci.org/ahmetemrekilinc/ember-mask-input.svg?branch=master)
[![Ember Observer Score](https://emberobserver.com/badges/ember-mask-input.svg)](https://emberobserver.com/badges/ember-mask-input.svg)
[![Dependency Status](https://david-dm.org/ahmetemrekilinc/ember-mask-input.svg)](https://david-dm.org/ahmetemrekilinc/ember-mask-input.svg)
[![devDependency Status](https://david-dm.org/ahmetemrekilinc/ember-mask-input/dev-status.svg)](https://david-dm.org/ahmetemrekilinc/ember-mask-input/dev-status.svg)
[![Code Climate](https://codeclimate.com/github/ahmetemrekilinc/ember-mask-input/badges/gpa.svg)](https://codeclimate.com/github/ahmetemrekilinc/ember-mask-input/badges/gpa.svg)

ember-mask-input is an addon that enables you creating masked text inputs in your Ember.js application.
[jquery-mask-plugin](https://github.com/igorescobar/jQuery-Mask-Plugin) is used in background.

Installation
------------------------------------------------------------------------------

```
cd your-project-directory
ember install ember-mask-input
```

Usage
------------------------------------------------------------------------------

You can pass your value as `value` parameter and custom mask type as `mask` parameter.
```hbs
{{ember-mask-input value='1234123443214321' mask='0000.0000.0000.0000' }}
```

You can handle actions as `onUpdate` parameter.
```hbs
{{ember-mask-input value='1234123443214321' mask='0000.0000.0000.0000' onUpdate=(action 'myMaskAction') }}
```

You can use default `maskType` parameters which are `iban`, `phone-no`, `credit-card`.
```hbs
{{ember-mask-input value='TR625373458726249832302426' maskType='iban' }}
```

You can bind masked value by setting `bindMasked` parameter to `true`.
```hbs
{{ember-mask-input value='TR62 5373 4587 2624 9832 3024 26' maskType='iban' bindMasked=true }}
```

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
