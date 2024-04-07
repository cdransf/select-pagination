# `select-pagination`

A Web Component for selecting the desired page from a paginated list.

## Features

This Web Component allows you to progressively enhance a page count for a paginated view into a select element that allows for more convenient page navigation.

## Installation

Install via [npm](https://www.npmjs.com/package/@daviddarnes/component-name): `npm install @cdransf/select-pagination`

The component assumes your pagination starts at index `0`, but you may override this using the `baseIndex` attribute.

## Example usage

Add the `select-pagination.js` to your markup and define the necessary component markup:

```html
<select-pagination>
  <select>
    <!-- populate your option tags iteratively -->
    <option value="0">1 of 36</option>
    <option value="1">2 of 36</option>
  </select>
  <!-- add noscript display -->
  <noscript><div class="text--centered"><span aria-current="page">1</span> of 36</div></noscript>
</select-pagination>
```
