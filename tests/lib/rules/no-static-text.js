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
      filename: 'somepath/src/components/another-sub/libraryAcc/foo/BarGammaZZs.ts',
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
      output: `
        class Comp1 extends Component {
          render() {
            return (<div><FormattedMessage id="app.components.another_sub.library_acc.foo.bar_gamma_z_zs." defaultMessage="test"/></div>);
          }
        }
      `
    },
  ],
});
