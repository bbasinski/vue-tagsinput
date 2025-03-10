# Voerro Vue Tags Input v2

[![npm (scoped)](https://img.shields.io/npm/v/@voerro/vue-tagsinput.svg?style=flat-square)](https://www.npmjs.com/package/@voerro/vue-tagsinput)
[![npm](https://img.shields.io/npm/dm/@voerro/vue-tagsinput.svg?style=flat-square)](https://www.npmjs.com/package/@voerro/vue-tagsinput)
[![MIT](https://img.shields.io/github/license/AlexMordred/vue-tagsinput.svg?style=flat-square)](https://opensource.org/licenses/MIT)

A simple tags input with typeahead built with Vue.js 2.

![](demo.gif)
![](demo2.gif)

[**Live Demo**](https://voerro.github.io/vue-tagsinput/)

## Installation via NPM

```
npm i @voerro/vue-tagsinput --save-dev
```
or
```
npm i @voerro/vue-tagsinput --save
```

Then register the component with Vue:

```javascript
import VoerroTagsInput from '@voerro/vue-tagsinput';

Vue.component('tags-input', VoerroTagsInput);
```

Include the `dist/style.css` file on your page to apply the styling. You can use CDN, `require()` it inside your JS code, or `@include` it inside your (S)CSS assets. Read the `Styling` section to learn how to customize the appearance.

## Installation via CDN

If you're not using NPM, you can include the required files into your page manually from a CDN. Don't forget to include Vue as well. For example:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.13/vue.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@voerro/vue-tagsinput@2.0.2/dist/voerro-vue-tagsinput.js"></script>

<script>
    new Vue({
        el: '#app',
        components: { "v-tags-input": VoerroTagsInput },
    });
</script>
```

Include the CSS file on your page to apply the styling. Read the `Styling` section to learn how to customize the appearance.

```
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@voerro/vue-tagsinput@2.0.2/dist/style.css">
```

**IMPORTANT:** Always grab the latest versions of the package from [JSDELIVR](https://www.jsdelivr.com/package/npm/@voerro/vue-tagsinput?path=dist), the ones provided in the examples above might be outdated. Same goes for Vue.js.

## Usage

```html
<tags-input element-id="tags"
    v-model="selectedTags"
    :existing-tags="[
        { key: 'web-development', value: 'Web Development' },
        { key: 'php', value: 'PHP' },
        { key: 'javascript', value: 'JavaScript' },
    ]"
    :typeahead="true"></tags-input>
```

```html
<tags-input element-id="tags"
    v-model="selectedTags"
    :existing-tags="[
        { key: 1, value: 'Web Development' },
        { key: 2, value: 'PHP' },
        { key: 3, value: 'JavaScript' },
    ]"
    :typeahead="true"></tags-input>
```

`element-id` will be applied to `id` and `name` attributes of the hidden input that contains the list of the selected tags as its value. Optionally you can also use the `v-model` directive to bind a variable to the array of selected tags.

`existing-tags` is the list of the existing on your website tags. Include it even if you're not using typeahead.

Remove the `typeahead` property to disable this functionality.

#### Setting Selected Tags Programmatically

If you need to programmatically (manually) set or change the list of selected tags from "outside" - just set the required value to the variable bound with the component via `v-model`.

For example, the variable name is `selectedTags`:
```html
<tags-input element-id="tags" 
    v-model="selectedTags"></tags-input>
```

You can pre-set the value of this variable:
```javascript
new Vue({
    el: '#app',

    components: { VoerroTagsInput },

    data: {
        selectedTags: [
            { key: 'web-development', value: 'Web Development' },
            { key: 'php', value: 'PHP' },
            { key: 'javascript', value: 'JavaScript' },
        ],
    }
});
```

... or change it whenever you need to:
```javascript
new Vue({
    el: '#app',

    components: { VoerroTagsInput },

    data: {
        selectedTags: [],
    },

    methods: {
        setSelectedTags() {
            this.selectedTags = [{ key: 'php', value: 'PHP' }];
        }
    }
});
```

#### All Available Props

Prop | Type | Default | Description
--- | --- | --- | ---
elementId | String | - | id & name for the hidden input.
existing-tags | Array | [] | An array with existing tags in the following format: `[{ key: 'id-or-slug-of-the-tag', value: 'Tag\'s text representation' }, {...}, ...]`
typeahead | Boolean | false | Whether the typeahead (autocomplete) functionality should be enabled.
typeahead-style | String | 'badges' | The autocomplete prompt style. Possible values: `badges`, `dropdown`.
typeahead-max-results | Number | 0 | Maximum number of typeahead results to be shown. 0 - unlimited.
typeahead-activation-threshold | Number | 1 | Show typeahead results only after at least this many characters were entered. When set to 0, typeahead with all the available tags will be displayed on input focus.
placeholder | String | 'Add a tag' | The placeholder of the tag input.
limit | Number | 0 | Limit the number of tags that can be chosen. 0 = no limit.
only-existing-tags | Boolean | false | Only existing tags can be added/chosen. New tags won't be created.
case-sensitive-tags | Boolean | false | Determines whether tags are case sensitive. Setting this to `true` would allow tags like `php`, `PHP`, `PhP`, and so on to be added at the same time.
delete-on-backspace | Boolean | true | Whether deleting tags by pressing Backspace is allowed.
allow-duplicates | Boolean | false | Allow users to add the same tags multiple times.
validate | Function | `text => true` | Callback to validate tags' text with.
add-tags-on-comma | Boolean | false | Add new tags when comma is pressed. The search (typeahead) results are ignored.
add-tags-on-blur | Boolean | false | Add new tags when on the input is blur. The search (typeahead) results are ignored.
sort-search-results | Boolean | true | Whether the search results should be sorted.
before-adding-tag | Function | `tag => true` | Callback to perform additional checks and actions before a tag is added. Return `true` to allow a tag to be added or `false` to forbid the action.
before-removing-tag | Function | `tag => true` | Callback to perform additional checks and actions before a tag is removed. Return `true` to allow a tag to be added or `false` to forbid the action.
disable | Boolean | false | Disables input.

#### Events

Event | Description
--- | ---
@initialized | Fired when the component is completely ready to be worked with. Fired from the Vue.js' `mounted()` method.
@tag-added | Fired when a new tag is added. The slug of the tag is passed along.
@tag-removed | Fired when a tag is removed. The slug of the tag is passed along.
@tags-updated | Fired when a tag is added or removed.
@limit-reached | Fired when the limit of tags is reached
@keydown | Fires on a keydown event
@keyup | Fires on a keyup event
@focus | Fired when the input is focused
@blur | Fired when the input is blurred

```html
<voerro-tags-input
    ...
    @initialized="onInitialized"
    @tag-added="onTagAdded"
    @tag-removed="onTagRemoved"
    @tags-updated="onTagsUpdated"
    @limit-reached="onLimitReached"
    @keydown="onKeyDown"
    @keyup="onKeyUp"
    @focus="onFocus"
    @blur="onBlur"
></voerro-tags-input>
```

```javascript
<script>
new Vue({
    ...

    methods: {
        onInitialized() {
            console.log('Initialized');
        },

        onTagAdded(slug) {
            console.log(`Tag added: ${slug}`);
        },

        onTagRemoved(slug) {
            console.log(`Tag removed: ${slug}`);
        },

        onTagsUpdated() {
            console.log('Tags updated');
        },
        
        onLimitReached() {
            console.log('Max Reached');
        },

        onKeyDown() {
            console.log('Key down');
        },

        onKeyUp() {
            console.log('Key up');
        },

        onFocus() {
            console.log('Input focused');
        },

        onBlur() {
            console.log('Input blurred');
        },
    }
});
</script>
```

## Data

You can bind the array of selected tags to a variable via `v-model`. A tag object within the array looks like this:

```
{ key: 'web-development', value: 'Web Development' }
```

`key` is whatever unique key you use for the tags in your project. It could be a unique slug, it could be a unique numeric id, it could be something else. `value` is the text representation of a tag.

There's also a hidden text input, which has the stringified version of the array of selected tags as its value. The `name` and `id` of the input equal to whatever you set to the `element-id` prop.

The tags that don't exist in the `existing-tags` array will have its `key` equal to an empty string `''`. In your backend you can consider these tags as `to be created`.

## Styling

If you want to completely re-style the component - write your own styles from scratch using `dist/style.css` as a reference. Alternatively you can override specific parts of `dist/style.css` using `!important`.

Certain classes/styles can be overridden via component props on a per instance basis in case you just want to make minor changes, e.g. you just want to change colors.

Prop | Default class | Area
--- | --- | ---
wrapper-class | tags-input-wrapper-default | Outer appearance of the input - a wrapper providing a border and padding around the selected tags. If you're using CSS frameworks, you could use the frameworks' native classes, e.g. `form-control` for Bootstrap or `input` for Bulma.

## Using Typeahead (Autocomplete)

When search results are displayed underneath the input, use the `arrow down` and `arrow up` keys on the keyboard to move the selection. Press `Enter` to select a tag. Press `Esc` to discard the search results and then `Enter` to add a new tag the way you've typed it.

## Updating From Older Versions

#### Older versions up to v1.5.0 -> v1.5.1

See the `v1` branch for details.

#### v1.5.1 and above -> v2.*

A pretty serious bug (#53) was fixed in `v2.0.0`. The data format for the `existing-tags` prop and the `v-model` directive has been changed. You can find the new format in this documentation, see above.

## Changelog

#### v.2.0.2

- Fix: [#43](../../issues/43)
- Fix: [#62](../../issues/62)

#### v.2.0.1

- Fix: broken dropdown
- Fix: typeahead/autocomplete doesn't show up on Android
- Fix: Add Tags on Comma doesn't work on Android
- Fix: Mobil users cannot press `Esc` to discard search results, so added a "Discard search results" button which seemlessly blends into the typeahead (both badges and dropdown).
- New: `limit-reached` prop

#### v.2.0.0

- The data format for the `existing-tags` prop and the `v-model` directive has been changed

## Contribution

Everyone is welcome to contribute. When making a contribution, please base your branch off of `dev` and merge it into `dev` as well. Thank you!

## Support

This software is absolutely free to use and is developed in the author's free time. If you found this software useful and would like to say thank you to the author, please consider making a donation. It's not the amount, it's the gesture.

- BTC (Bitcoin): 34ReKHWmSoGbcEHJw3HtyZ5CXz1UfoUKG5
- PayPal: https://paypal.me/AlexanderZavyalov
