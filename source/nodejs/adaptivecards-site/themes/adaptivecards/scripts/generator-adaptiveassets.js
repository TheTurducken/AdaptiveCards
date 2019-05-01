// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
"use strict";

// Copy various adaptive card assets from elsehwere in the repo into the output folder

var fs = require("hexo-fs");
var path = require("path");
var glob = require("glob");

var assets = [
    {
        // Sample payloads
        path: "../../../samples/v1.*/**/*.json",
        dest: function (p) { return "payloads/" + path.basename(p); }
    },
    {
        // JSON-schema file
        path: "../../../schemas/adaptive-card.json",
        dest: function (p) { return "schemas/adaptive-card.json"; }
    },
    {
        // adaptive cards module
        path: "node_modules/adaptivecards/dist/*.*",
        dest: function (p) { return p; }
	},
	{
        // designer module
        path: "node_modules/adaptivecards-designer/dist/*.*",
        dest: function (p) { return p; }
	},
	{
        // designer module (TODO: when monaco-editor is removed from the designer bundle, this can be simplified)
        path: "node_modules/adaptivecards-designer/dist/containers/*.*",
        dest: function (p) { return p; }
	},
	{
        // monaco-editor module
        path: "node_modules/monaco-editor/min/vs/**/*.*",
        dest: function (p) { return p; }
    },
    {
        // visualizer script
        path: "node_modules/adaptivecards-visualizer/dist/adaptivecards-visualizer.min.js",
        dest: function (p) { return "visualizer/adaptivecards-visualizer.min.js"; }
    },
    {
        // visualizer css
        path: "node_modules/adaptivecards-visualizer/css/*.css",
        dest: function (p) { return "visualizer/css/" + path.basename(p); }
    },
    {
        // visualizer assets
        path: "node_modules/adaptivecards-visualizer/assets/*",
        dest: function (p) { return "visualizer/assets/" + path.basename(p); }
    },
    {
        // visualizer monaco loader
        path: "node_modules/adaptivecards-visualizer/src/monaco-loader.js",
        dest: function (p) { return "visualizer/monaco-loader.js" }
	},
    {
        // receiver script
        path: "node_modules/adaptivecards-receiver/dist/adaptivecards-receiver.min.js",
        dest: function (p) { return "receiver/adaptivecards-receiver.min.js"; }
    },
    {
        // receiver css
        path: "node_modules/adaptivecards-receiver/css/*.css",
        dest: function (p) { return "receiver/css/" + path.basename(p); }
    },
    {
        // receiver assets
        path: "node_modules/adaptivecards-receiver/assets/*",
        dest: function (p) { return "receiver/assets/" + path.basename(p); }
    },
    {
        // receiver monaco loader
        path: "node_modules/adaptivecards-receiver/src/monaco-loader.js",
        dest: function (p) { return "receiver/monaco-loader.js" }
	}
];

hexo.extend.generator.register("generator-adaptiveassets", function (locals) {

    var allAssets = [];

    assets.forEach(function (asset) {
        var g = glob.sync(asset.path, { nocase: false }).map(function (p) {

            return {
                path: asset.dest(p),
                data: function () {
                    return fs.createReadStream(p);
                }
            }
        });

        g.forEach(function (item) {

            allAssets.push(item);
        });
    });

    return allAssets;
});
