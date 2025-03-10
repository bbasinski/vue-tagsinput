<template>
    <div class="tags-input-root">
        <div :class="wrapperClass + ' tags-input'" :disabled="disabled">
            <span class="tags-input-badge tags-input-badge-pill tags-input-badge-selected-default"
                v-for="(tag, index) in tags"
                :key="index"
            >
                <span v-html="tag.value"></span>

                <i v-if="!disabled" href="#" class="tags-input-remove" @click.prevent="removeTag(index)"></i>
            </span>

            <input type="text"
                v-if="!disabled"
                ref="taginput"
                :placeholder="placeholder"
                v-model="input"
                @keydown.enter.prevent="tagFromInput(false)"
                @keydown.8="removeLastTag"
                @keydown.down="nextSearchResult"
                @keydown.up="prevSearchResult"
                @keydown="onKeyDown"
                @keyup="onKeyUp"
                @keyup.esc="clearSearchResults"
                @focus="onFocus"
                @blur="onBlur"
                @value="tags">

            <input type="hidden" v-if="elementId"
                :name="elementId"
                :id="elementId"
                v-model="hiddenInput">
        </div>

        <!-- Typeahead/Autocomplete -->
        <div v-show="searchResults.length">
            <p v-if="typeaheadStyle === 'badges'" :class="`typeahead-${typeaheadStyle}`">
                <span class="tags-input-badge typeahead-hide-btn tags-input-typeahead-item-default"
                    @click.prevent="clearSearchResults">Discard Search Results</span>

                <span v-for="(tag, index) in searchResults"
                    :key="index"
                    v-html="tag.value"
                    @mouseover="searchSelection = index"
                    @mousedown.prevent="tagFromSearchOnClick(tag)"
                    class="tags-input-badge"
                    v-bind:class="{
                        'tags-input-typeahead-item-default': index != searchSelection,
                        'tags-input-typeahead-item-highlighted-default': index == searchSelection
                    }"></span>
            </p>

            <ul v-else-if="typeaheadStyle === 'dropdown'" :class="`typeahead-${typeaheadStyle}`">
                <li class="tags-input-typeahead-item-default typeahead-hide-btn"
                    @mousedown.prevent="clearSearchResults">Discard search results</li>

                <li v-for="(tag, index) in searchResults"
                :key="index"
                v-html="tag.value"
                @mouseover="searchSelection = index"
                @mousedown.prevent="tagFromSearchOnClick(tag)"
                v-bind:class="{
                    'tags-input-typeahead-item-default': index != searchSelection,
                    'tags-input-typeahead-item-highlighted-default': index == searchSelection
                }"></li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        elementId: String,

        existingTags: {
            type: Array,
            default: () => {
                return [];
            }
        },

        value: {
            type: Array,
            default: () => {
                return [];
            }
        },

        typeahead: {
            type: Boolean,
            default: false
        },

        typeaheadStyle: {
            type: String,
            default: 'badges'
        },

        typeaheadActivationThreshold: {
            type: Number,
            default: 1
        },

        typeaheadMaxResults: {
            type: Number,
            default: 0
        },

        placeholder: {
            type: String,
            default: 'Add a tag'
        },

        limit: {
            type: Number,
            default: 0
        },

        onlyExistingTags: {
            type: Boolean,
            default: false
        },

        deleteOnBackspace: {
            type: Boolean,
            default: true
        },

        allowDuplicates: {
            type: Boolean,
            default: false
        },

        validate: {
            type: Function,
            default: () => true
        },

        addTagsOnComma: {
            type: Boolean,
            default: false
        },

        addTagsOnBlur: {
            type: Boolean,
            default: false
        },

        wrapperClass: {
            type: String,
            default: 'tags-input-wrapper-default'
        },

        sortSearchResults: {
            type: Boolean,
            default: true
        },

        caseSensitiveTags: {
            type: Boolean,
            default: false
        },

        beforeAddingTag: {
            type: Function,
            default: () => true
        },

        beforeRemovingTag: {
            type: Function,
            default: () => true
        },

        disabled: {
          type: Boolean,
          default: false
        },
    },

    data() {
        return {
            badgeId: 0,
            tags: [],

            input: '',
            oldInput: '',
            hiddenInput: '',

            searchResults: [],
            searchSelection: 0,

            selectedTag: -1,
        };
    },

    created () {
        this.tagsFromValue();

        // Emit an event
        this.$emit('initialized');
    },

    watch: {
        input(newVal, oldVal) {
            this.searchTag(false);

            if (newVal.length && newVal != oldVal) {
                const diff = newVal.substring(oldVal.length, newVal.length);

                if (this.addTagsOnComma) {
                    newVal = newVal.trim();

                    if (newVal.endsWith(',')) {
                        // The comma shouldn't actually be inserted
                        this.input = newVal.substring(0, newVal.length - 1);

                        // Add the inputed tag
                        this.tagFromInput(true);
                    }
                }
            }
        },

        tags() {
            // Updating the hidden input
            this.hiddenInput = JSON.stringify(this.tags);

            // Update the bound v-model value
            this.$emit('input', this.tags);
        },

        value() {
            this.tagsFromValue();
        }
    },

    methods: {
        /**
         * Remove reserved regex characters from a string so that they don't
         * affect search results
         *
         * @param string
         * @returns String
         */
        escapeRegExp(string) {
            return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        },

        /**
         * Add a tag whether from user input or from search results (typeahead)
         *
         * @param ignoreSearchResults
         * @returns void
         */
        tagFromInput(ignoreSearchResults = false) {
            // If we're choosing a tag from the search results
            if (this.searchResults.length && this.searchSelection >= 0 && !ignoreSearchResults) {
                this.tagFromSearch(this.searchResults[this.searchSelection]);

                this.input = '';
            } else {
                // If we're adding an unexisting tag
                let text = this.input.trim();

                // If the new tag is not an empty string and passes validation
                if (!this.onlyExistingTags && text.length && this.validate(text)) {
                    this.input = '';

                    // Determine if the inputted tag exists in the existingTags
                    // array
                    let newTag = {
                        key: '',
                        value: text,
                    };

                    const searchQuery = this.escapeRegExp(
                        this.caseSensitiveTags
                            ? newTag.value
                            : newTag.value.toLowerCase()
                    );

                    for (let tag of this.existingTags) {
                        const compareable = this.caseSensitiveTags
                            ? tag.value
                            : tag.value.toLowerCase();

                        if (searchQuery === compareable) {
                            newTag = Object.assign({}, tag);

                            break;
                        }
                    }

                    this.addTag(newTag);
                }
            }
        },

        /**
         * Add a tag from search results when a user clicks on it
         *
         * @param tag
         * @returns void
         */
        tagFromSearchOnClick(tag) {
            this.tagFromSearch(tag);

            this.$refs['taginput'].blur();
        },

        /**
         * Add the selected tag from the search results.
         * Clear search results.
         * Clear user input.
         *
         * @param tag
         * @return void
         */
        tagFromSearch(tag) {
            this.clearSearchResults();
            this.addTag(tag);

            this.$nextTick(() => {
                this.input = '';
                this.oldInput = '';
            });
        },

        /**
         * Add/Select a tag
         *
         * @param tag
         * @returns void | Boolean
         */
        addTag(tag) {
            if (!this.beforeAddingTag(tag)) {
                return false;
            }

            // Check if the limit has been reached
            if (this.limit > 0 && this.tags.length >= this.limit) {
                this.$emit('limit-reached');

                return false;
            }

            // Attach the tag if it hasn't been attached yet
            if (!this.tagSelected(tag)) {
                this.tags.push(tag);

                // Emit events
                this.$nextTick(() => {
                    this.$emit('tag-added', tag);
                    this.$emit('tags-updated');
                });
            }
        },

        /**
         * Remove the last tag in the tags array.
         *
         * @returns void
         */
        removeLastTag() {
            if (!this.input.length && this.deleteOnBackspace) {
                this.removeTag(this.tags.length - 1);
            }
        },

        /**
         * Remove the selected tag at the specified index.
         *
         * @param index
         * @returns void
         */
        removeTag(index) {
            let tag = this.tags[index];

            if (!this.beforeRemovingTag(tag)) {
                return false;
            }

            this.tags.splice(index, 1);

            // Emit events
            this.$nextTick(() => {
                this.$emit('tag-removed', tag);
                this.$emit('tags-updated');
            });
        },

        /**
         * Search the currently entered text in the list of existing tags
         *
         * @returns void | Boolean
         */
        searchTag() {
            if (this.typeahead !== true) {
                return false;
            }

            if (this.oldInput != this.input || (!this.searchResults.length && this.typeaheadActivationThreshold == 0)) {
                this.searchResults = [];
                this.searchSelection = 0;
                let input = this.input.trim();

                if ((input.length && input.length >= this.typeaheadActivationThreshold) || this.typeaheadActivationThreshold == 0) {
                    // Find all the existing tags which include the search text
                    const searchQuery = this.escapeRegExp(
                        this.caseSensitiveTags ? input : input.toLowerCase()
                    );

                    for (let tag of this.existingTags) {
                        const compareable = this.caseSensitiveTags
                            ? tag.value
                            : tag.value.toLowerCase();

                        if (compareable.search(searchQuery) > -1 && ! this.tagSelected(tag)) {
                            this.searchResults.push(tag);
                        }
                    }

                    // Sort the search results alphabetically
                    if (this.sortSearchResults) {
                        this.searchResults.sort((a, b) => {
                            if (a.value < b.value) return -1;
                            if (a.value > b.value) return 1;

                            return 0;
                        });
                    }

                    // Shorten Search results to desired length
                    if (this.typeaheadMaxResults > 0) {
                        this.searchResults = this.searchResults.slice(
                            0,
                            this.typeaheadMaxResults
                        );
                    }
                }

                this.oldInput = this.input;
            }
        },

        /**
         * Hide the typeahead if there's nothing intered into the input field.
         *
         * @returns void
         */
        hideTypeahead() {
            if (! this.input.length) {
                this.$nextTick(() => {
                    this.clearSearchResults();
                });
            }
        },

        /**
         * Select the next search result in typeahead.
         *
         * @returns void
         */
        nextSearchResult() {
            if (this.searchSelection + 1 <= this.searchResults.length - 1) {
                this.searchSelection++;
            }
        },

        /**
         * Select the previous search result in typeahead.
         *
         * @returns void
         */
        prevSearchResult() {
            if (this.searchSelection > 0) {
                this.searchSelection--;
            }
        },

        /**
         * Clear/Empty the search results.
         *
         * @reutrns void
         */
        clearSearchResults() {
            this.searchResults = [];
            this.searchSelection = 0;
        },

        /**
         * Clear the list of selected tags.
         *
         * @returns void
         */
        clearTags() {
            this.tags.splice(0, this.tags.length);
        },

        /**
         * Replace the currently selected tags with the tags from the value.
         *
         * @returns void
         */
        tagsFromValue() {
            if (this.value && this.value.length) {
                if (!Array.isArray(this.value)) {
                    console.error('Voerro Tags Input: the v-model value must be an array!');

                    return;
                }

                let tags = this.value;

                // Don't update if nothing has changed
                if (this.tags == tags) {
                    return;
                }

                this.clearTags();

                for (let tag of tags) {
                    this.addTag(tag);
                }
            } else {
                if (this.tags.length == 0) {
                    return;
                }

                this.clearTags();
            }
        },

        /**
         * Check if a tag is already selected.
         *
         * @param tag
         * @returns Boolean
         */
        tagSelected(tag) {
            if (this.allowDuplicates) {
                return false;
            }

            if (! tag) {
                return false;
            }

            const searchQuery = this.escapeRegExp(
                this.caseSensitiveTags ? tag.value : tag.value.toLowerCase()
            );

            for (let selectedTag of this.tags) {
                const compareable = this.caseSensitiveTags
                    ? selectedTag.value
                    : selectedTag.value.toLowerCase();

                if (selectedTag.key === tag.key && compareable.search(searchQuery) > -1) {
                    return true;
                }
            }

            return false;
        },

        /**
         * Process all the keyup events.
         *
         * @param e
         * @returns void
         */
        onKeyUp(e) {
            this.$emit('keyup', e);
        },

        /**
         * Process all the keydown events.
         *
         * @param e
         * @returns void
         */
        onKeyDown(e) {
            this.$emit('keydown', e);
        },

        /**
         * Process the onfocus event.
         *
         * @param e
         * @returns void
         */
        onFocus(e) {
            this.$emit('focus', e)

            this.searchTag();
        },

        /**
         * Process the onblur event.
         *
         * @param e
         * @returns void
         */
        onBlur(e) {
            this.$emit('blur', e)

            if (this.addTagsOnBlur) {
                // Add the inputed tag
                this.tagFromInput(true);
            }

            this.hideTypeahead();
        },
    }
}
</script>

<style>
.tags-input-root {
    position: relative;
}
</style>
