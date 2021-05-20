Trie step-by-step Example
===

### Set up
This is an example repository for a step-by-step form genereted from a list of configs.

To build the project just do
```
npm run build
```

You can also set a watch for building
```
npm run watch
```

The open the `index.html` file in a browser to see the result.

### Development

If you want to try a different set of configs, you can go to `trie.js` and edit the `availableConfigs` variable. There you should indicate the posible string configs. A string config contains a set of `attribute_name=attribute_value` pairs.
The `attributeOrder` variable indicates the order of such attributes names in the generated form.

Also, the code will look for images with the same name as the current configuration, so you will need to update the images inside `assets/` folder to make it work properly.
