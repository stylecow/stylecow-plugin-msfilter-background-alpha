stylecow plugin msfilter-background-alpha
=========================================

Stylecow plugin to add ms filters emulating the rgba/hsla colors in backgrounds in explorer < 9 using ms filters.
More info: http://css-tricks.com/rgba-browser-support/

You write:

```css
body {
	background: rgba(0, 0, 0, 0.2);
}
```

And stylecow converts to:

```css
body {
	background: rgba(0, 0, 0, 0.2);
	-ms-filter: 'progid:DXImageTransform.Microsoft.gradient(startColorStr="#33000000", endColorStr="#33000000")';
}
```
