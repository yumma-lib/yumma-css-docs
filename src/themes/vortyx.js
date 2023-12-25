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
                "color": "rgb(146, 113, 177)", // HTML tags
            }
        },
        {
            "types": [
                "attr-name"
            ],
            "style": {
                "color": "rgb(168, 99, 168)", // Attribute names
            }
        },
        {
            "types": [
                "attr-value"
            ],
            "style": {
                "color": "rgb(219, 188, 214)", // Attribute values
            }
        },
        {
            "types": [
                "string"
            ],
            "style": {
                "color": "rgb(255, 255, 255)", // Strings
            }
        },
        {
            "types": [
                "function"
            ],
            "style": {
                "color": "rgb(146, 113, 177)", // NPM Functions
            }
        },
        {
            "types": [
                "builtin"
            ],
            "style": {
                "color": "rgb(146, 113, 177)", // Built-in functions
            }
        },
        {
            "types": [
                "variable",
            ],
            "style": {
                "color": "rgb(168, 99, 168)", // Variables
            }
        },
        {
            "types": [
                "property",
            ],
            "style": {
                "color": "rgb(168, 99, 168)", // CSS properties
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
                "color": "rgb(119, 82, 113)", // Keywords, including @mixin, @media, @content
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
                "color": "rgb(219, 188, 214)", // Text next to @mixin
            }
        },
    ]
};

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
                "color": "rgb(40, 42, 54)", // Punctuation
            }
        },
        {
            "types": [
                "tag"
            ],
            "style": {
                "color": "rgb(86, 156, 214)", // HTML tags
            }
        },
        {
            "types": [
                "attr-name"
            ],
            "style": {
                "color": "rgb(42, 170, 255)", // Attribute names
            }
        },
        {
            "types": [
                "attr-value"
            ],
            "style": {
                "color": "rgb(206, 145, 120)", // Attribute values
            }
        },
        {
            "types": [
                "string"
            ],
            "style": {
                "color": "rgb(206, 145, 120)", // Strings
            }
        },
        {
            "types": [
                "function"
            ],
            "style": {
                "color": "rgb(197, 134, 192)", // NPM Functions
            }
        },
        {
            "types": [
                "builtin"
            ],
            "style": {
                "color": "rgb(42, 170, 255)", // Built-in functions
            }
        },
        {
            "types": [
                "variable",
            ],
            "style": {
                "color": "rgb(168, 99, 168)", // Variables
            }
        },
        {
            "types": [
                "property",
            ],
            "style": {
                "color": "rgb(168, 99, 168)", // CSS properties
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
                "color": "rgb(197, 134, 192)", // Keywords, including @mixin, @media, @content
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

module.exports = {
    dark: darkVortyx,
    light: lightVortyx,
};
