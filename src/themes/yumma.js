var lightYumma = {
    "plain": {
        "backgroundColor": "rgb(246, 248, 250)", // Background color
    },
    "styles": [
        {
            "types": [
                "punctuation"
            ],
            "style": {
                "color": "rgb(40, 42, 54)", // Punctuation and Parentheses
            }
        },
        {
            "types": [
                "tag"
            ],
            "style": {
                "color": "rgb(221, 103, 161)", // HTML tags
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
                "color": "rgb(80, 191, 210)", // Attribute values
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
                "color": "rgb(221, 103, 161)", // NPM Functions
            }
        },
        {
            "types": [
                "builtin"
            ],
            "style": {
                "color": "rgb(221, 103, 161)", // Built-in functions
            }
        },
        {
            "types": [
                "variable",
            ],
            "style": {
                "color": "rgb(80, 191, 210)", // SCSS Variables
            }
        },
        {
            "types": [
                "property",
            ],
            "style": {
                "color": "rgb(80, 191, 210)", // CSS properties
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
                "color": "rgb(221, 103, 161)", // Keywords, including @mixin, @media, @content
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
        {
            "types": [
                "deleted"
            ],
            "style": {
                "color": "rgb(215, 61, 61)", // Removed lines
                "backgroundColor": "rgb(239, 177, 177)" // Removed lines background
            }
        },
        {
            "types": [
                "inserted"
            ],
            "style": {
                "color": "rgb(18, 166, 149)", // Added lines
                "backgroundColor": "rgb(160, 219, 213)" // Added lines background
            }
        }
    ]
};

var darkYumma = {
    "plain": {
        "backgroundColor": "rgb(40, 42, 54)", // Background color
    },
    "styles": [
        {
            "types": [
                "punctuation"
            ],
            "style": {
                "color": "rgb(227, 227, 227)", // Punctuation
            }
        },
        {
            "types": [
                "tag"
            ],
            "style": {
                "color": "rgb(221, 103, 161)", // HTML tags
            }
        },
        {
            "types": [
                "attr-name"
            ],
            "style": {
                "color": "rgb(227, 227, 227)", // Attribute names
            }
        },
        {
            "types": [
                "attr-value"
            ],
            "style": {
                "color": "rgb(80, 191, 210)", // Attribute values
            }
        },
        {
            "types": [
                "string"
            ],
            "style": {
                "color": "rgb(80, 191, 210)", // Strings
            }
        },
        {
            "types": [
                "function"
            ],
            "style": {
                "color": "rgb(221, 103, 161)", // NPM Functions
            }
        },
        {
            "types": [
                "builtin"
            ],
            "style": {
                "color": "rgb(80, 191, 210)", // Built-in functions
            }
        },
        {
            "types": [
                "variable",
            ],
            "style": {
                "color": "rgb(221, 103, 161)", // SCSS Variables
            }
        },
        {
            "types": [
                "property",
            ],
            "style": {
                "color": "rgb(221, 103, 161)", // CSS properties
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
                "color": "rgb(80, 191, 210)", // Keywords, including @mixin, @media, @content
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
                "color": "rgb(80, 191, 210)", // Text next to @mixin
            }
        },
        {
            "types": [
                "deleted"
            ],
            "style": {
                "color": "rgb(215, 61, 61)", // Removed lines
                "backgroundColor": "rgb(129, 37, 37)" // Removed lines background
            }
        },
        {
            "types": [
                "inserted"
            ],
            "style": {
                "color": "rgb(18, 166, 149)", // Added lines
                "backgroundColor": "rgb(11, 100, 89)" // Added lines background
            }
        }
    ]
};

module.exports = {
    light: lightYumma,
    dark: darkYumma
};