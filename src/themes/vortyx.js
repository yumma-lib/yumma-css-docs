var lightVortyx = {
    "plain": {
        "backgroundColor": "rgb(246, 248, 250)", // Background color
    },
    "styles": [
        {
            "types": [
                "punctuation"
            ],
            "style": {
                "color": "rgb(40, 42, 54)", // Punctuation and Pharenteses
            }
        },
        {
            "types": [
                "tag"
            ],
            "style": {
                "color": "rgb(151, 124, 220)", // HTML tags
            }
        },
        {
            "types": [
                "attr-name"
            ],
            "style": {
                "color": "rgb(40, 42, 54)", // Attribute names
            }
        },
        {
            "types": [
                "attr-value"
            ],
            "style": {
                "color": "rgb(25, 118, 210)", // Attribute values
            }
        },
        {
            "types": [
                "string"
            ],
            "style": {
                "color": "rgb(40, 42, 54)", // Strings
            }
        },
        {
            "types": [
                "function"
            ],
            "style": {
                "color": "rgb(151, 124, 220)", // NPM Functions
            }
        },
        {
            "types": [
                "builtin"
            ],
            "style": {
                "color": "rgb(151, 124, 220)", // Built-in functions
            }
        },
        {
            "types": [
                "variable",
            ],
            "style": {
                "color": "rgb(25, 118, 210)", // SCSS Variables
            }
        },
        {
            "types": [
                "property",
            ],
            "style": {
                "color": "rgb(25, 118, 210)", // CSS properties
            }
        },
        {
            "types": [
                "comment",
            ],
            "style": {
                "color": "rgb(115, 116, 123)", // HTML comments
            }
        },
        {
            "types": [
                "keyword",
            ],
            "style": {
                "color": "rgb(151, 124, 220)", // Keywords, including @mixin, @media, @content
            }
        },
        {
            "types": [
                "operator",
            ],
            "style": {
                "color": "rgb(40, 42, 54)", // Parentheses and Curly Brackets
            }
        },
        {
            "types": [
                "class-name",
            ],
            "style": {
                "color": "rgb(40, 42, 54)", // Text next to @mixin
            }
        },
    ]
};

var darkVortyx = {
    "plain": {
        "backgroundColor": "rgb(40, 42, 54)", // Background color
    },
    "styles": [
        {
            "types": [
                "punctuation"
            ],
            "style": {
                "color": "rgb(219, 222, 225)", // Punctuation
            }
        },
        {
            "types": [
                "tag"
            ],
            "style": {
                "color": "rgb(134, 217, 202)", // HTML tags
            }
        },
        {
            "types": [
                "attr-name"
            ],
            "style": {
                "color": "rgb(179, 146, 240)", // Attribute names
            }
        },
        {
            "types": [
                "attr-value"
            ],
            "style": {
                "color": "rgb(255, 171, 112)", // Attribute values
            }
        },
        {
            "types": [
                "string"
            ],
            "style": {
                "color": "rgb(255, 171, 112)", // Punctuation and Pharenteses
            }
        },
        {
            "types": [
                "function"
            ],
            "style": {
                "color": "rgb(179, 146, 240)", // NPM Functions
            }
        },
        {
            "types": [
                "builtin"
            ],
            "style": {
                "color": "rgb(134, 217, 202)", // Built-in functions
            }
        },
        {
            "types": [
                "variable",
            ],
            "style": {
                "color": "rgb(151, 124, 220)", // SCSS Variables
            }
        },
        {
            "types": [
                "property",
            ],
            "style": {
                "color": "rgb(151, 124, 220)", // CSS properties
            }
        },
        {
            "types": [
                "comment",
            ],
            "style": {
                "color": "rgb(105, 106, 114)", // HTML comments
            }
        },
        {
            "types": [
                "keyword",
            ],
            "style": {
                "color": "rgb(249,117,131)", // Keywords, including @mixin, @media, @content
            }
        },
        {
            "types": [
                "operator",
            ],
            "style": {
                "color": "rgb(128, 128, 128)", // Parentheses and Curly Brackets
            }
        },
        {
            "types": [
                "class-name",
            ],
            "style": {
                "color": "rgb(151, 124, 220)", // Text next to @mixin
            }
        },
    ]
};

module.exports = {
    light: lightVortyx,
    dark: darkVortyx
};