/**
 * @fileoverview extract static text 
 * @author 
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

// const parsers = require('../../helpers/parsers');

const parserOptions = {
  ecmaVersion: 2018,
  sourceType: 'module',
  ecmaFeatures: {
    jsx: true,
  },
};


const rule = require("../../../lib/rules/no-static-text"),
  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({ parserOptions });
ruleTester.run("no-static-text", rule, {
  valid: [
    // give me some code that won't trigger a warning
  ],

  invalid: [
    {
      code: `
        class Comp1 extends Component {
          render() {
            return (<div>test</div>);
          }
        }
      `,
      errors: [
        {
          messageId: 'literalNotInJSXExpression',
          data: { text: 'test' },
        },
      ],
      output:`
        class Comp1 extends Component {
          render() {
            return (<div><FormattedMessage id="app." defaultMessage="test"/></div>);
          }
        }
      `
    },
  ],
});
