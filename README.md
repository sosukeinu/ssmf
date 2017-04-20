# Intro

Super-simple Mock-up framework meant to ease the transition from mock-ups to actual products. The idea would be to begin your mock-ups for each new product with a fresh download of this project, and then customize it to your heart's content. The focus should be in creating clean, modular markup, and visuals, which can then be transferred to your real project.

![](https://cloud.githubusercontent.com/assets/1004903/25249958/ced8bf9e-25e1-11e7-8484-bf61d022dba0.png)

**This folder still needs to be served from behind a server like Apache or Nginx.** - *In other words, you should access these mock-ups with a url like`my-mockups.dev` or `http://localhost/mockups` **not** `file://my-desktop/mockups/index.html`*

Uses:

- [HTML5 Boilerplate](https://html5boilerplate.com/)
- [jQuery 3](http://jquery.com/)
- [Bootstrap 3](http://getbootstrap.com/)

# Structural Presets

Uses jQuery imports to separate the main structure into:

- Header
- Content
- Footer

This project comes with five *structural presets*. That is, how the elements above (Header, Content, and Footer) interact with one another.

You set the preset in `index.html`

	// To customize the structural preset, comment all the presets you do not want to use, and uncomment the one you want applied.
        var structure_preset = 'elastic';
        // var structure_preset = 'scroll_behind';
        // var structure_preset = 'fixed_header';
        // var structure_preset = 'fixed_footer';
        // var structure_preset = 'sticky_footer';

**Elastic** (Default)

![](https://cloud.githubusercontent.com/assets/1004903/25249955/ced7d80e-25e1-11e7-9022-85e21fd8225e.gif)

**Fixed Scroll-Behind**

![](https://cloud.githubusercontent.com/assets/1004903/25249957/ced828fe-25e1-11e7-9e7a-353444cd67f0.gif)

**Fixed Header**

![](https://cloud.githubusercontent.com/assets/1004903/25249953/ced68620-25e1-11e7-8075-c84c3337d762.gif)

**Fixed Footer**

![](https://cloud.githubusercontent.com/assets/1004903/25249954/ced6d918-25e1-11e7-99ef-cac40972b955.gif)

**Sticky Footer**

![](https://cloud.githubusercontent.com/assets/1004903/25249956/ced80cca-25e1-11e7-9768-84c710966dd9.gif)

# Customize

Customize the Header with `structure/{preset}/header.html`

Customize the Content with `structure/content.html` either directly, or by including components

Customize the Footer with `structure/{preset}/footer.html`

Customize the CSS with `css/main.css`

Customize the JS functions with `js/main.js`

Add more JS libraries by including these in `js/vendor/` then adding the links in the `index.html` to include them in the `<head>` or in `structure/footer.html` to include them before `</body>`

# Components

Content can be added either directly in content.html, or through the use of components. This project includes some components to help you get started.

Included components:

- live filter

![](https://cloud.githubusercontent.com/assets/1004903/25250535/ebd4fb38-25e3-11e7-94f3-ea8a8c0b0531.gif)

- responsive table with inline editing

![](https://cloud.githubusercontent.com/assets/1004903/25250536/ebd581ca-25e3-11e7-8f74-15e3f67d0a15.gif)

- ajax/json data loader to approximate ajax responses in mock-up ***Coming Soon***

For examples on creating components, and including them in your mock-up, take a look at `structure/content.html`

I think that covers pretty much everything. Like I said, super-simple.

## Example of Mocked-up Interaction

Tabbed form field break out

![](https://cloud.githubusercontent.com/assets/1004903/25251955/33e925f2-25e9-11e7-9eab-396fd938b826.gif)

Miller Columns

![](https://cloud.githubusercontent.com/assets/1004903/25251954/33e467a6-25e9-11e7-8305-21609a85bb5d.gif)

Double Panes with ckEditor

![](https://cloud.githubusercontent.com/assets/1004903/25252123/ccc3d81c-25e9-11e7-836f-57e8cb833ea7.gif)
